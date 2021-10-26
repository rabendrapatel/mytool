import { Inject } from '@handy/core';
import * as express from 'express';
import {
  ServerMiddleware, _PrivateRequest, NextFn, _PrivateResponse, UnSignedObject
} from "@handy/types";

import { HandyConfigService, HandyErrorService, HandyUtilsService, HandyUserService } from '@services';
import * as path from "path";
import { UserModelInterfaces } from '@models';

export class DefaultClientServingMiddleware implements ServerMiddleware {

  protected _handyConfigService: HandyConfigService = Inject(HandyConfigService);
  protected _handyError: HandyErrorService = Inject(HandyErrorService);
  protected _handyUtilsService: HandyUtilsService = Inject(HandyUtilsService);
  protected _handyUserService: HandyUserService = Inject(HandyUserService);

  protected _clientRootPath: string = path.join(__rootDir, this._handyConfigService.get().webClientSettings.clientRootPath);
  protected _clientDistPath: string = path.join(this._clientRootPath, 'dist/web');
  protected _clientBrowserPath: string = path.join(this._clientDistPath, 'browser');
  protected _clientServerPath: string = path.join(this._clientDistPath, 'server');
  protected _clientServerTemplatingEnginePath: string = path.join(this._clientServerPath, 'main.js');
  protected _clientIndexFilePath: string = path.join(this._clientBrowserPath, 'index.html');
  protected _assetsPath: string = path.join(this._clientBrowserPath, 'assets/');
  protected _angSsr = require(this._clientServerTemplatingEnginePath);

  constructor () { }

  public middleware(app: express.Application) {

    if (!this._handyConfigService.get().isMicroService) {

      // @ts-ignore
      app.get('/assets', express.static(this._assetsPath));
      // @ts-ignore
      app.get('*.*', express.static(this._clientBrowserPath));

      if (this._handyConfigService.get().webClientSettings.ssr) {
        this._ssrServing(app);
      } else {
        this._nonSsrServing(app);
      }

    } else {

      app.get('/', (req, res) => {

        res.jsonResponse({
          msg: 'This is a microservice'
        })
        
      });

    }

  }

  protected _nonSsrServing(app: express.Application): void {


    app.get('*', (request: _PrivateRequest, response: _PrivateResponse, next: NextFn) => {

      if (request.isApiRoute === true) {
        return next();
      }

      this._attachClientCookies(request, response);
      return response.sendFile(this._clientIndexFilePath);

    })

  }

  protected _ssrServing(app: express.Application): void {

    app.get('*', (request: _PrivateRequest, response: _PrivateResponse, next: NextFn) => {

      if (request.isApiRoute === true) {
        return next();
      }

      const XSRF_TOKEN = this._attachClientCookies(request, response);
      let userDataToAttach: UnSignedObject;

      new Promise<string>((resolve, reject) => {

        if (!request.user.loggedIn) {
          
          let refreshToken: string = request.getCookie(true, 'Authorization_refresh', null);

          if (!refreshToken) {
            return resolve(null)
          }

          this._handyUserService.extractUserDataFromRefreshToken(refreshToken, request)
          .then(result => {
            return resolve(result.email);
          })
          .catch(err => {
            return resolve(null)
          })

        } else {

          return resolve(request.user.email);

        }

      })
      .then(userEmail => {

        if (!userEmail) {
          return Promise.resolve(null);
        }

        return this._handyUserService.getUserData(userEmail);

      })
        .then(userData => {

          if (!userData || !userData.foundRecord) {
            return Promise.resolve(null);
          }
          
          userDataToAttach = userData.doc;
          return this._handyUserService.generateAccessTokenFromUserData(userDataToAttach as UserModelInterfaces['fullModelShape']);

        })
        .then(accessTokenData => {

          // ? just in case of some bug causing ssr rendering issue without thowing an error, eg unsubscribed observable 
          let timeout: NodeJS.Timeout = setTimeout(() => {

            if (!response.sent) {

              response.sendFile(this._clientIndexFilePath);
              this._handyError.register(null, 'high', 'Server error', undefined, { private: 'Ssr rendering failed because of timeout' }, request, response);
              return;

            }

          }, this._handyConfigService.get().webClientSettings.ssrRenderingTimeout)

          // Return promise with generating user token...
          response.render(this._clientIndexFilePath, {
            req: request, providers: [
              { provide: this._angSsr.ANG_BASE_HREF, useValue: request.baseUrl },
              { provide: 'XSRF_TOKEN', useValue: XSRF_TOKEN },
              { provide: 'SERVER_SECRET', useValue: this._handyConfigService.get().secret },
              { provide: 'HANDY_CONFIG', useValue: this._handyConfigService.getPublic() },
              { provide: 'HANDY_USER_DATA', useValue: userDataToAttach },
              { provide: 'HANDY_USER_ACCESS_TOKEN', useValue: accessTokenData?.token },
              { provide: 'SERVER_REQUEST', useValue: request },
              { provide: 'SERVER_RESPONSE', useValue: response },
            ]
          }, (err: any, html: string) => {

            clearTimeout(timeout);

            if (err) {

              this._handyError.register(err, 'high', 'Server error', undefined, { private: 'Ssr rendering failed' }, request, response);

              if (!response.sent) {
                response.sendFile(this._clientIndexFilePath);
                return;
              }

            } else {

              if (!response.sent) {

                response.send(html);
                return;

              }

            }

          })

        })
        .catch(err => {

          response.sendFile(this._clientIndexFilePath);
          this._handyError.register(err, 'high', 'Server error', undefined, { private: 'Ssr rendering failed' }, request, response);
          return;

        })


    })

  }

  public registerTemplatingEngine(app: express.Application): void {

    app.engine('html', this._angSsr.engine())

    app.set('view engine', 'html');
    app.set('views', this._clientBrowserPath);

  }

  protected _attachClientCookies(request: _PrivateRequest, response: _PrivateResponse): string {

    this._attachDeviceCookie(request, response);
    return this._attachXSRF(request, response);

  }

  protected _attachXSRF(request: _PrivateRequest, response: _PrivateResponse): string {

    let XSRF_TOKEN = request.getCookie(true, 'XSRF-TOKEN', this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false }));
    response.setCookie('XSRF-TOKEN', XSRF_TOKEN, { signed: true, lifespan: { d: 365 }, serverOnly: false, sameSite: true });
    return XSRF_TOKEN;

  }

  protected _attachDeviceCookie(request: _PrivateRequest, response: _PrivateResponse): void {

    let deviceId: string = request.getCookie(true, this._handyConfigService.get().deviceIdCookieHash, null);

    if (!deviceId) {
      response.setCookie(this._handyConfigService.get().deviceIdCookieHash, this._handyUtilsService.generateHash({ lowerCaseletters: true, capitalsLetters: true, digits: true, emptySpace: false, specialChars: false }, true), { signed: true, lifespan: { d: 365 }, sameSite: false });
      request.locals.deviceId = deviceId;
      request.locals.deviceIdType = 'cookie';
    }

  }

}