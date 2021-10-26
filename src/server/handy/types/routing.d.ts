import { UserRole, UserGroup, AdditionalAccessPermission, HandyError, SingleOrArrayCombo, NextFn, ConfigData, ArrayOrUnionToUnion, UnSignedObject, HandyTimeUnit } from '@handy/types';
import { Router, Application } from 'express';
import { HandyTimeObject } from './handy';

export type ServerRequestUser = {
  email: string,
  _id: number,
  loggedIn: boolean,
  roles: UserRole[],
  groups: UserGroup[],
  groupId: number,
  permissions: AdditionalAccessPermission[],
  hasRoles(roles: UserRole[] | UserRole): boolean,
  hasPermissions(permission: AdditionalAccessPermission[] | AdditionalAccessPermission): boolean,
  isMemberOfGroupTypes(groups: UserGroup[] | UserGroup): boolean,
  isMemberOfGroupId(groupId: number | number[]): boolean,
}

// todo well you'll have to add all the methods and props here...
declare global {
  namespace Express {
    export interface Request {
      
      user: ServerRequestUser,
      handyClientSessionId?: string,
      isApiRoute?: boolean,
      // TODO
      isAssetRoute?: boolean,
      // TODO
      isFileRoute?: boolean,
      hasNonPublicRoutesAccess?: () => boolean,
      locals: UnSignedObject,
      startedAt?: number,
      endedAt?: number,
      duration?: number,
      url?: string,
      query?: UnSignedObject,
      body?: UnSignedObject,
      params?: UnSignedObject,
      methodType: RequestType,
      getCookie?: <T>(signed: boolean, name: string, returnValueIfEmpty: T) => any;
      getHeader?: (name: ArrayOrUnionToUnion<ConfigData['usedRequestHeaders']>, returnValueIfEmpty: string) => string;

    }
    export interface Response<ResBody = any, StatusCode extends number = number> {
      // token: any;
      // on(event: string, fn: Function): void,
      sent: boolean,
      status?(code: StatusCode): this;
      sendFile?: (path: string) => void;
      addHeader(name: string, value: SingleOrArrayCombo<string>): void,
      setCookie(name: string, value: any, cookieOptions?: CookieOptions): void,
      jsonResponse(value: any, success?: boolean, code?: number): void,
      errorResponse(error: HandyError): any // TODO: FIX: Add proper method type...
      redirect(urlToRedirect: string): any,
      redirectToClient(endpoint: string, querParams?: UnSignedObject): any,
      redirectToClientErrPage(err: HandyError): any,
      download(filePath: string, fileName?: string): any,

    }
  }
}

export type ServerRouter = Router;



export interface ServerMiddleware {
  middleware: (app: Application) => void,
  registerTemplatingEngine?: (app: Application) => void
}

export type ServerRequest = Express.Request;
export type ServerResponse = Express.Response;


export interface _PrivateRequest extends ServerRequest {
  signedCookies?: UnSignedObject,
  cookies?: UnSignedObject,
  headers?: UnSignedObject,
  baseUrl?: string,
  method?: string 
}

export interface _PrivateResponse extends ServerResponse {
  on(event: string, fn: Function): void,
  cookie(name: string, value: any, cookieOptions?: _PrivateCookieOptions): void,
  append(name: string, value: SingleOrArrayCombo<string>): void,
  headersSent: boolean,
  json(val: any): void,
  render(view: string, locals?: UnSignedObject, callback?: (err: any, html: string) => void): void,
  render(view: string, callback?: (err: any, html: string) => void): void,
  render(view: string): void,
  send(view: string): void,
}

export interface _PrivateCookieOptions {
  expires?: Date, 
  // maxAge?: number,
  path?: string,
  httpOnly?: boolean,
  signed?: boolean,
  sameSite?: boolean,
  secure?: boolean,

}

export interface CookieOptions {
  lifespan?: HandyTimeObject,
  path?: string,
  serverOnly?: boolean,
  signed?: boolean,
  sameSite?: boolean,
  secure?: boolean,
}

export interface ServerMiddlewareSettings {
  errorMiddleware?: boolean,
  clientServingMiddleware?: boolean,
}

export type RequestMiddlewareFn = (request: ServerRequest, response: ServerResponse, next: NextFn) => void;

export type RouteAcessRules = {
  roles?: SingleOrArrayCombo<UserRole>,
  groups?: SingleOrArrayCombo<UserGroup>,
  permissions?: SingleOrArrayCombo<AdditionalAccessPermission>,
  accessValidationfn?: RequestMiddlewareFn,
};

export interface DefaultMongoRoutingAccessRule extends RouteAcessRules {
  env?: SingleOrArrayCombo<EnvType>,
  publicRoute?: boolean,
  routable?: boolean,
  apiVersions?: SingleOrArrayCombo<ArrayOrUnionToUnion<ConfigData['apiVersions']>>,
  requestValidator?: RequestMiddlewareFn,
  requestModifier?: RequestMiddlewareFn,
  requiredParams?: RequiredParamsSettings
}

export interface RoutergDecoratorSettings {
  accessRestriction?: RouteAcessRules
  publicRoute?: boolean,
  customUrlPath?: string,
  apiVersions?: SingleOrArrayCombo<ArrayOrUnionToUnion<ConfigData['apiVersions']>>,
  env?: SingleOrArrayCombo<EnvType>
  requestValidator?: RequestMiddlewareFn,
  requestModifier?: RequestMiddlewareFn,
  requiredParams?: RequiredParamsSettings
  consolePath?: boolean,
}

export type RequestType = 'get' | 'post' | 'put' | 'delete';

export type RoutesPrototypeHolder<T extends RoutergDecoratorSettings> = {
  requestType: RequestType,
  settings: T,
  method: string,
  isApi: boolean
}

export interface RequestListenerSettings extends RouteAcessRules {

  requestType: RequestType,
  routePath: string,
  method: GetAndDeleteRequestFn | PostAndPutRequestFn,
  env: SingleOrArrayCombo<EnvType>,
  publicRoute: boolean, 
  requestValidator: RequestMiddlewareFn,
  requestModifier: RequestMiddlewareFn,
  requiredParams: RequiredParamsSettings,
  consolePath?: boolean
  
}

export interface RequiredParamsSettings {
  query?: string[],
  body?: string[],
  urlParams?: string[]
}

export interface ApiRequestListenerSettings extends RequestListenerSettings {

  apiVersions: SingleOrArrayCombo<ArrayOrUnionToUnion<ConfigData['apiVersions']>>,

}

export interface HandyJsonRequestResponse {
  success: boolean,
  data?: any
}

export interface HandyJsonRequestErrorResponse {
  success: false,
  errorCode: number,
  errorHeadline: string,
  refCode: string,
  errorMsg?: string
  additionalData?: any
}

export type GetAndDeleteRequestFn = (request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject) => void;
export type PostAndPutRequestFn = (request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject) => void;


export interface UserAccessTokenPayload {
  email: string,
  _id: number,
  roles: UserRole[],
  groups: UserGroup[],
  permissions: AdditionalAccessPermission[],
  groupId: number,
}