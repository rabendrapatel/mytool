/// <reference types="node" />
/// <reference types="socket.io" />
import { HandyConfigService, HandyErrorService } from '@services';
import * as Http from 'http';
import Express, { Application } from 'express';
import { ServerRouter, ApiRequestListenerSettings, RequestMiddlewareFn, RequestListenerSettings } from "@handy/types";
export declare class DefaultHandyServer {
    protected _config: HandyConfigService;
    protected _handyError: HandyErrorService;
    protected _express: typeof Express;
    protected _http: typeof Http;
    app: Express.Application;
    server: Http.Server;
    router: ServerRouter;
    socketIo: SocketIO.Server;
    private __defaultApivVersion;
    private __publicRoutingByDefault;
    constructor(_config: HandyConfigService, _handyError: HandyErrorService);
    startServer(): Promise<boolean>;
    registerMiddleware(middlewareFunction: (app: Application) => void): void;
    addRequestListener(listenerSettings: ApiRequestListenerSettings | RequestListenerSettings, isApiListener?: boolean): void;
    private __singleListenerAttaching;
    private __clearListenerPath;
    defaultRequiredParamsValidator(accessRestrictionSettings?: ApiRequestListenerSettings | RequestListenerSettings): RequestMiddlewareFn;
    defaultRestrictionValidator(accessRestrictionSettings?: ApiRequestListenerSettings | RequestListenerSettings): RequestMiddlewareFn;
    private __forbiddenError;
    private __badRequestError;
    private __unAuthorizedError;
}
