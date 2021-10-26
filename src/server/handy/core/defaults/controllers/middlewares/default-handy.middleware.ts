import { Inject } from '@handy/core';
import {
  ServerMiddleware, _PrivateRequest, ServerRouter, ServerRequest, NextFn,
  UserRole, AdditionalAccessPermission, UserGroup, ServerRequestUser,
  ArrayOrUnionToUnion, ConfigData, _PrivateResponse, CookieOptions,
  HandyError, _PrivateCookieOptions, SingleOrArrayCombo, HandyJsonRequestResponse, HandyJsonRequestErrorResponse, RequestType, RefreshTokenKeyPairCheck, UnSignedObject
} from "@handy/types";
import { HandyConfigService, HandyJwtService, HandyErrorService, HandyUtilsService, HandyUserService } from '@services';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import cors, { CorsOptionsDelegate } from 'cors';
import { Application } from 'express';
import { stringify } from 'querystring';

export class DefaultHandyMiddleware implements ServerMiddleware {

  protected _handyConfigService: HandyConfigService = Inject(HandyConfigService);
  protected _handyErrorService: HandyErrorService = Inject(HandyErrorService);
  protected _handyJwtService: HandyJwtService = Inject(HandyJwtService);
  protected _handyUtilsService: HandyUtilsService = Inject(HandyUtilsService);
  protected _handyUserService: HandyUserService = Inject(HandyUserService);

  protected _bodyParser = bodyParser;
  protected _cookieParser = cookieParser;
  protected _allowedCorsOrigins: ConfigData['cors']['allowedOrigins'] = this._handyConfigService.get().cors.allowedOrigins;
  protected _corsActive: boolean = this._handyConfigService.get().cors.active;
  protected _corsMethods: ConfigData['cors']['methodsToCheck'] = this._handyConfigService.get().cors.methodsToCheck;
  protected _handyCookieObjectValPrefix: string = this._handyConfigService.get().objectCookiePreffix;

  protected _refreshTokenKoeficient: number = this._handyConfigService.get().jwt.types.refresh.refreshKoeficient;

  constructor () {
  }

  public middleware(app: Application): void {

    this._addStartedAt(app);
    this._bodyParserMiddleware(app);
    this._cookieParserMiddleware(app);
    this._requestAndResponseExtender(app);
    this._parseUserDataFromToken(app);
    this._corsMiddleware(app);
    this._extendRefreshToken(app);

  }

  /* -------------------------------------------------------------------------- */
  /*                             Regular middlewares                            */
  /* -------------------------------------------------------------------------- */

  protected _addStartedAt(app: Application): void {

    app.use((request: ServerRequest, response: _PrivateResponse, next: NextFn) => {

      const startMoment = process.hrtime();
      request.startedAt = Date.now();

      response.on('finish', () => {

        response.sent = true;
        request.endedAt = Date.now();

        const elapsedTime = process.hrtime(startMoment);
        const elapsedTimeInMs = parseInt((elapsedTime[0] * 1000 + elapsedTime[1] / 1e6).toFixed(0));

        request.duration = elapsedTimeInMs;

      })

      return next();

    })

  }

  protected _bodyParserMiddleware(app: Application): void {

    app.use(this._bodyParser.urlencoded({
      extended: true
    }));
    app.use(this._bodyParser.json());

  }

  protected _cookieParserMiddleware(app: Application): void {

    app.use(this._cookieParser.default(this._handyConfigService.get().cookieSecret));

  }

  protected _corsMiddleware(app: Application): void {

    if (this._corsActive) {
      app.use(cors(this._corsOptionsDelegate));
    }

  }
  

  /* -------------------------------------------------------------------------- */
  /*                       Request and response extenders                       */
  /* -------------------------------------------------------------------------- */

  protected _requestAndResponseExtender(app: Application): void {

    app.use((request: _PrivateRequest, response: _PrivateResponse, next: NextFn) => {

      request.locals = {};

      request.isApiRoute = request.url.startsWith('/api');

      this._addRequestMethodGetter(request);
      this._addCookieGetter(request);
      this._addHeaderGetter(request);
      this._addHasNonPublicRoutesAccessCheck(request);

      this._addJsonResponse(response);
      this._addResponseClientRedirect(response);
      this._addErrorResponse(request, response);
      this._addCookieSetter(response);
      this._addHeadersSetter(response);

      request.handyClientSessionId = request.getHeader('Handy-client-session-id', null);

      let deviceIdCookie: string = request.getCookie(true, this._handyConfigService.get().deviceIdCookieHash, null);
      let deviceIdHeader: string = request.getHeader('Handy-client-device-id', null);

      let deviceId = (deviceIdCookie) ? deviceIdCookie : deviceIdHeader;

      if (deviceId) {

        request.locals.deviceId = deviceId;

        if (deviceIdCookie) {
          response.setCookie(this._handyConfigService.get().deviceIdCookieHash, deviceId, { signed: true, lifespan: { d: 365 }, sameSite: false });
          request.locals.deviceIdType = 'cookie';
        } else {
          request.locals.deviceIdType = 'header';
        }

      }

      return next();

    })

  }

  protected _parseUserDataFromToken(app: Application): void {

    app.use((request: ServerRequest, response: _PrivateResponse, next: NextFn) => {

      let AuthorizationCookie = request.getCookie(true, 'Authorization', null);
      let AuthorizationHeader = request.getHeader('Authorization', null);

      let token: string = null;

      if (AuthorizationCookie) {
        token = AuthorizationCookie;
      }
  
      if (!token && AuthorizationHeader) {
        token = AuthorizationHeader;
      }

      this._handyJwtService.extractUserDataFormToken(token)
      .then(finalresult => {

        request.user = finalresult;
        return next();

      })
      .catch(err => {

        err = this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request, response);
        return next(err);

      })

    })

  }
  
  protected _extendRefreshToken(app: Application): void {

    app.use((request: ServerRequest, response: _PrivateResponse, next: NextFn) => {

      let AuthorizationRefreshCookie = request.getCookie(true, 'Authorization_refresh', null);

      if (!AuthorizationRefreshCookie) {
        return next();
      }

      this._handyJwtService.decodeToken(AuthorizationRefreshCookie)
      .then(tokenData => {

        let now = new Date().getTime();
        let { expiresIn, expiryMoment } = tokenData;
        let tokenPayload: { email: string, keyPairCheck: RefreshTokenKeyPairCheck } = tokenData.data as { email: string, keyPairCheck: RefreshTokenKeyPairCheck };
        let lifeSpanLeft: number = expiryMoment - now;
        
        if (lifeSpanLeft < 1 || lifeSpanLeft > expiresIn - (expiresIn * this._refreshTokenKoeficient)) {
          
          return Promise.resolve(null);

        }

        return this._handyUserService.generateRefreshToken(tokenPayload.email, tokenPayload.keyPairCheck);

      })
      .then(refreshToken => {

        if (isNotNullOrUndefined(refreshToken)) {
          response.setCookie('Authorization_refresh', refreshToken.token, { lifespan: { [refreshToken.lifeSpanUnit]: refreshToken.lifeSpan }, signed: true, sameSite: true, serverOnly: true });
        }

        return next();
      })
      .catch(err => {

        this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request, response);
        return next()

      })
  

    })

  }

  protected _addRequestMethodGetter(request: _PrivateRequest): void {

    request.methodType = <unknown>request.method.toLowerCase as RequestType;

  }

  protected _addCookieGetter(request: _PrivateRequest): void {

    request.getCookie = (signed: boolean, name: string, returnValueIfEmpty: any): any => {
      
      if (!name) {
        return returnValueIfEmpty;
      }

      let cookieVal: string = request[(signed) ? 'signedCookies' : 'cookies'][name];

      if (isNotEmpty(cookieVal) && typeof cookieVal === 'string') {

        if (cookieVal.startsWith(this._handyCookieObjectValPrefix)) {
          cookieVal = JSON.parse(cookieVal.replace(this._handyCookieObjectValPrefix, '')).value;
        }

      }

      return isNotEmpty(cookieVal) ? cookieVal : returnValueIfEmpty;

    }

  }

  protected _addCookieSetter(response: _PrivateResponse): void {

    response.setCookie = (name: string, value: any, cookieOptions: CookieOptions = {}): void => {
      
      let { path = '/', lifespan = {}, signed = true, sameSite = true, secure = this._handyConfigService.get().ssl, serverOnly = false } = cookieOptions;

      let maxAge: number = this._handyUtilsService.handyTimeObjectToMs(lifespan);

      let finalCookieOptions: _PrivateCookieOptions = {
        path,
        signed,
        sameSite,
        secure,
        httpOnly: serverOnly,
        expires: new Date(Date.now() + maxAge),
      }

      let finalVal: string;

      if (typeof value === 'string') {
        finalVal = value;
      } else {

        finalVal = `${this._handyCookieObjectValPrefix}${JSON.stringify({ value })}`;

      }

      response.cookie(name, finalVal, finalCookieOptions);

    }

  }

  protected _addHeaderGetter(request: _PrivateRequest): void {

    request.getHeader = (name: ArrayOrUnionToUnion<ConfigData['usedRequestHeaders']>, returnValueIfEmpty: string): string => {

      let headerVal: string = request.headers[name.toLowerCase()];
      return isNotEmpty(headerVal) ? headerVal : returnValueIfEmpty;

    }

  }

  protected _addHeadersSetter(response: _PrivateResponse): void {

    response.addHeader = (name: string, value: SingleOrArrayCombo<string>) => {
      response.append(name.toLowerCase(), value);
    }

  }

  protected _addJsonResponse(response: _PrivateResponse): void {

    response.jsonResponse = (data: any, success: boolean = true, code: number = 200) => {

      let result: HandyJsonRequestResponse = {
        success,
        data
      }

      if (response.sent) {
        this._handyErrorService.register(null, 'high', 'Server error', 'Sending response after it was sent already!', { private: response });
      }
      
      response.status(code);
      response.json(result);

    }

  }
  
  protected _addResponseClientRedirect(response: _PrivateResponse): void {

    response.redirectToClient = (endpoint: string, queryParams?: UnSignedObject) => {

      let qString: string;

      if (queryParams !== undefined) {
        qString = `?${stringify(queryParams)}`;
      }

      while (endpoint.includes('//')) {
        endpoint = endpoint.replace('//', '/');
      }

      if (endpoint.startsWith('/')) {
        endpoint = endpoint.substr(1);
      }

      if (qString !== undefined) {
        endpoint += qString;
      }
      
      endpoint = `${this._handyConfigService.getClientUrl()}${endpoint}`;
      return response.redirect(endpoint);

    }
    
    response.redirectToClientErrPage = (err: HandyError) => {

      let queryParams: UnSignedObject = { code: err.errorCode };

      if (err.refCode) {
        queryParams.refCode = err.refCode;
      }

      return response.redirectToClient('error', queryParams);

    }

  }

  protected _addErrorResponse(request: _PrivateRequest, response: _PrivateResponse): void {

    response.errorResponse = (error: HandyError): void => {

      if (!this._handyErrorService.isHandyError(error, request, response)) {
        error = this._handyErrorService.register(error, 'high', 'Server error', undefined, { private: 'Uncatched untyped error' }, request, response)
      }

      let { refCode, errorCode, errorHeadline, errorMsg, additionalData = {} } = error;

      let result: HandyJsonRequestErrorResponse = {
        success: false,
        errorCode,
        refCode,
        errorHeadline,
        errorMsg: (__isDev) ? errorMsg : this._handyErrorService.getDefaultErrorMsg(errorHeadline),
        additionalData: additionalData.public,
      }

      if (request.isApiRoute || request.methodType !== 'get') {
        response.jsonResponse(result, false, errorCode);
      } else {

        // TODO: Redirect to client error page
        response.jsonResponse({ error: `Shoudl redirect to clients error page because it's not an api route` })

      }

    }

  }

  protected _addHasNonPublicRoutesAccessCheck(request: _PrivateRequest): void {

    request.hasNonPublicRoutesAccess = (): boolean => {

      if (__isDev) {
        return true;
      }

      if (typeof request.locals.hasNonPublicRoutesAccess === 'boolean') {
        return request.locals.hasNonPublicRoutesAccess;
      }

      let hasNonPublicRoutesAccess = false;

      let headerToken: string = request.getHeader('X-xsrf-token', null);
      let cookieToken: string = request.getCookie(true, 'XSRF-TOKEN', null);

      // ? Check for anguar universal...
      if (!cookieToken && headerToken && headerToken.includes(`_${this._handyConfigService.get().secret}`)) {
        cookieToken = headerToken.replace(`_${ this._handyConfigService.get().secret }`, '');
        headerToken = cookieToken;
      }

      if (isNotNull(headerToken) && isNotNull(cookieToken)) {
        hasNonPublicRoutesAccess = headerToken === cookieToken;
      }

      request.locals.hasNonPublicRoutesAccess = hasNonPublicRoutesAccess;
      return request.locals.hasNonPublicRoutesAccess;

    }

  }

  protected _corsOptionsDelegate: CorsOptionsDelegate = (request: ServerRequest, callback) => {

    let corsOptions = {
      origin: true,
      methods: this._corsMethods,
    };

    // ? is public route or all origins are allowed or is dev enviroment
    if (this._allowedCorsOrigins.includes('*') || __isDev) {
      callback(null, corsOptions);
      return;
    }

    let origin: string = request.getHeader("Origin", null);

    // ? origin is unknown
    if (isNullOrUndefined(origin)) {
      callback(null, corsOptions);
      return;
    }

    // ? is listed in allowed origins
    if (this._allowedCorsOrigins.includes(origin as any)) {
      callback(null, corsOptions);
      return;
    } else {

      corsOptions.origin = false;

      let err: HandyError = this._handyErrorService.register(null, 'medium', 'Unauthorized', 'Cors origin', undefined, request);

      callback(<unknown>err as Error, corsOptions) // is not listed in allowed origins
      return;

    }

  }


}