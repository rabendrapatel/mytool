import { Injectable } from "@handy/core/decorators";
import { HandyConfigService, HandyErrorService } from '@services';

import * as Http from 'http';
import Express, { Application } from 'express';
import { ServerRouter, ApiRequestListenerSettings, ConfigData, ServerResponse, ServerRequest, NextFn, RequestMiddlewareFn, HandyError, UnSignedObject, ServerRequestUser, RequiredParamsSettings, RequestListenerSettings, RequestType } from "@handy/types";

const socketIo = require('socket.io');
const redis = require('socket.io-redis');

import * as os from 'os';
import * as qrcode from 'qrcode-terminal';

@Injectable(true)
export class DefaultHandyServer {

  protected _express = Express;
  protected _http = Http;

  public app: Express.Application;
  public server: Http.Server;
  public router: ServerRouter;
  public socketIo: SocketIO.Server;

  private __defaultApivVersion: ConfigData['defaultApiVersions'] = this._config.get().defaultApiVersions;
  private __publicRoutingByDefault: ConfigData['publicRoutingByDefault'] = this._config.get().publicRoutingByDefault;

  constructor (protected _config: HandyConfigService, protected _handyError: HandyErrorService) {

    if (__isDev) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    this.app = this._express();
    this.router = this._express.Router();

  }

  public startServer(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      let port = this._config.get().serverPort;
      this.server = this._http.createServer(this.app);
      this.socketIo = socketIo(this.server, { transports: this._config.get().socketConnectionType });

      if (!__isDev) {
        this.socketIo.adapter(redis({ host: 'localhost', port: 6379 }))
      }

      let finalIp: string;

      this.server.listen(port, () => {

        if (__isDev && __isMasterCluster && this._config.get().logNetworkIpQrCodeOnDev) {

          let ifaces = os.networkInterfaces();

          Object.keys(ifaces).forEach(function (ifname) {
            var alias = 0;

            ifaces[ifname].forEach(function (iface: any) {
              if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
              }

              if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                // console.log(ifname + ':' + alias, iface.address);
                finalIp = `http://${iface.address}`;

              } else {
                finalIp = `http://${iface.address}`;

                // this interface has only one ipv4 adress

              }
              ++alias;
            });
          });

          handySuccessLog(`Server is listening on port ${port}`);

          if (finalIp) {

            handySuccessLog(`For testing on other devices visit ${finalIp} or scan this QR Code`);
            qrcode.generate(finalIp, { small: true });

          }

        }

        resolve(true);

      })

    })

  }

  public registerMiddleware(middlewareFunction: (app: Application) => void): void {

    middlewareFunction(this.app);

  }

  public addRequestListener(listenerSettings: ApiRequestListenerSettings | RequestListenerSettings, isApiListener: boolean = false): void {

    let { apiVersions = this.__defaultApivVersion, requestType, routePath, method, env = __env, publicRoute = false, requestValidator = null, requestModifier = null, consolePath = false } = listenerSettings as ApiRequestListenerSettings;

    if (!env.includes(__env)) {
      return;
    }

    if (!routePath.startsWith('/')) {
      routePath = `/${routePath}`;
    }

    let middlewares: RequestMiddlewareFn[] = [
      this.defaultRestrictionValidator(listenerSettings),
      this.defaultRequiredParamsValidator(listenerSettings)
    ];

    if (isNotEmpty(requestValidator)) {
      middlewares.push(requestValidator)
    }

    if (isNotEmpty(requestModifier)) {
      middlewares.push(requestModifier)
    }

    if (isApiListener) {

      if (!isArray(apiVersions)) {
        apiVersions = [apiVersions as ConfigData['apiVersions'][number]];
      }

      let apiVersionsLen: number = apiVersions.length;
      for (let i = 0; i < apiVersionsLen; i++) {
        const singleApiVersion = apiVersions[i];

        let finalRoutePath: string = `/api/v${singleApiVersion}${routePath}`;
        this.__singleListenerAttaching(requestType, finalRoutePath, middlewares, method, listenerSettings.consolePath);

      }

    } else {

      this.__singleListenerAttaching(requestType, routePath, middlewares, method, listenerSettings.consolePath);

    }


  }

  private __singleListenerAttaching(requestType: RequestType, finalRoutePath: string, middlewares: RequestMiddlewareFn[], method: any, consolePath: boolean = false): void {

    try {

      finalRoutePath = this.__clearListenerPath(finalRoutePath);

      if (consolePath && __isMasterCluster) {
        console.log(`Request path: ${finalRoutePath}`);
      }

      this.app[requestType](finalRoutePath, middlewares, (request: ServerRequest, response: ServerResponse) => {

        let requestQuery: UnSignedObject = request.query;
        let requestUser: ServerRequestUser = request.user;
        let args: [ServerRequest, ServerResponse, ServerRequestUser, UnSignedObject, UnSignedObject?] = [
          request,
          response,
          requestUser,
          requestQuery
        ]

        let includeBody: boolean = (requestType === 'post' || requestType === 'put') ? true : false;

        if (includeBody) {
          args.push(request.body);
        }

        method(...args);
        return;

      })

    } catch (error) {
      this._handyError.register(error, 'high', 'Server error', undefined, { private: { requestType, finalRoutePath, hint: 'Failed to register request listener' } })
    }

  }

  private __clearListenerPath(path: string): string {

    while (path.includes('//')) {
      path = path.replace('//', '/');
    }

    while (path.includes(' ')) {
      path = path.replace(' ', '_');
    }

    return path;

  }

  public defaultRequiredParamsValidator(accessRestrictionSettings?: ApiRequestListenerSettings | RequestListenerSettings): RequestMiddlewareFn {

    let { requiredParams = {} } = accessRestrictionSettings;

    if (isEmpty(requiredParams)) {
      return (request: ServerRequest, response: ServerResponse, next: NextFn): void => {
        return next();
      }
    }

    let requiredKeys: RequiredParamsSettings = {
      query: isNotEmpty(requiredParams.query) ? requiredParams.query : [],
      body: isNotEmpty(requiredParams.body) ? requiredParams.body : [],
      urlParams: isNotEmpty(requiredParams.urlParams) ? requiredParams.urlParams : [],
    }

    return (request: ServerRequest, response: ServerResponse, next: NextFn) => {

      let { query = {}, body = {}, params = {} } = request;

      let queryKeysLen: number = requiredKeys.query.length;
      for (let i = 0; i < queryKeysLen; i++) {
        const requiredKey = requiredKeys.query[i];

        if (isEmpty(query[requiredKey])) {
          return next(this.__badRequestError(request, response))
        }

      }

      let bodyKeysLen: number = requiredKeys.body.length;
      for (let i = 0; i < bodyKeysLen; i++) {
        const requiredKey = requiredKeys.body[i];

        if (isEmpty(body[requiredKey])) {
          return next(this.__badRequestError(request, response))
        }

      }

      let paramsKeysLen: number = requiredKeys.urlParams.length;
      for (let i = 0; i < paramsKeysLen; i++) {
        const requiredKey = requiredKeys.urlParams[i];

        if (isEmpty(params[requiredKey])) {
          return next(this.__badRequestError(request, response))
        }

      }

      return next();

    }

  }

  public defaultRestrictionValidator(accessRestrictionSettings?: ApiRequestListenerSettings | RequestListenerSettings): RequestMiddlewareFn {

    let { accessValidationfn, groups = [], permissions = [], publicRoute = this.__publicRoutingByDefault, roles = [] } = accessRestrictionSettings;

    let groupsLen: number = groups.length;
    let permissionsLen: number = permissions.length;
    let rolesLen: number = roles.length;

    if (isEmpty(accessRestrictionSettings) || (isNullOrUndefined(accessValidationfn) && groupsLen === 0 && permissionsLen === 0 && rolesLen === 0 && publicRoute)) {
      return (request: ServerRequest, response: ServerResponse, next: NextFn): void => {
        return next();
      }
    }

    return (request: ServerRequest, response: ServerResponse, next: NextFn) => {

      if (!publicRoute && !request.hasNonPublicRoutesAccess()) {
        return next(this.__forbiddenError(request, response, 'Failed public'));
      }

      if (isNotUndefined(accessValidationfn)) {
        return accessValidationfn(request, response, next);
      }

      if (groupsLen === 0 && permissionsLen === 0 && rolesLen === 0) {
        return next();
      }

      let user: ServerRequestUser = request.user;

      if (!user.loggedIn) {
        return next(this.__unAuthorizedError(request, response));
      }

      if (groupsLen > 0 && user.isMemberOfGroupTypes(groups)) {
        return next();
      }

      if (permissionsLen > 0 && user.hasPermissions(permissions)) {
        return next();
      }

      if (rolesLen > 0 && user.hasRoles(roles)) {
        return next();
      }

      return next(this.__forbiddenError(request, response));

    }

  }

  private __forbiddenError(request: ServerRequest, response: ServerResponse, privateMsg?: string): HandyError {
    return this._handyError.register(null, 'low', 'Forbidden', undefined, { private: { msg: privateMsg } }, request, response);
  }

  private __badRequestError(request: ServerRequest, response: ServerResponse): HandyError {
    return this._handyError.register(null, 'low', 'Bad request', undefined, undefined, request, response);
  }

  private __unAuthorizedError(request: ServerRequest, response: ServerResponse): HandyError {
    return this._handyError.register(null, 'low', 'Unauthorized', undefined, undefined, request, response);
  }

}

/*

  "Cannot read property 'lazyrouter' of undefined"
  Got this error while working on this file, funny, never seen that before.

  Developers live is so rich and colorful, there is alway some new surprising error
  waiting for you ;)

*/