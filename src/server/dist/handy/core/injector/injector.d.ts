/// <reference types="socket.io" />
import { Type, ApiRequestListenerSettings, RequestListenerSettings, ServerRouter } from "@handy/types";
import { Application } from "express";
declare class HandyInjector {
    private regularMiddlewares;
    private templatingEngineMiddlewares;
    private clietnServingMiddleware;
    private errorMiddlewares;
    private services;
    private routeControllers;
    private socketControllers;
    private nonApiRoutestRequestListeners;
    private apiRoutestRequestListeners;
    private socketEventsListeners;
    private cronJobs;
    private cronHandler;
    private handySocketEmitters;
    private singletonsList;
    private singletonsStorrage;
    resolve<T>(target: Type<any>): T;
    private __parseListeners;
    private __parseMiddleware;
    private __parseModel;
    private __parseService;
    private __parseRoutesController;
    private __parseSocketController;
    private __parseRequestsListeners;
    private __parseCronJobs;
    private __parseSocketEventsListeners;
    private __extractRequestListenerPathPreffixFromClass;
    registerMiddlwares(serverInitializer: ExpressInitializer): void;
    registerClientServingMiddleware(serverInitializer: ExpressInitializer): void;
    registerRoutesListeners(serverInitializer: ExpressInitializer): void;
    registerTemplatingEnginesMiddlware(serverInitializer: ExpressInitializer): void;
    registerErrorMiddlwares(serverInitializer: ExpressInitializer): void;
    registerSocketEmmiter(ioInstance: SocketIO.Server): void;
    registerSocketControlers(ioInstance: SocketIO.Server): void;
    attachSocketEventsListeners(ioInstance: SocketIO.Server, coreUtilsInstance: any): void;
    registerCronJobs(): void;
}
export declare const Injector: HandyInjector;
export declare const Inject: <T>(target: Type<T>) => T;
interface ExpressInitializer {
    app: Application;
    router: ServerRouter;
    registerMiddleware(fn: any): void;
    registerErrorHandler(fn: any): void;
    addRequestListener(listenerSettings: ApiRequestListenerSettings | RequestListenerSettings, isApiListener?: boolean): void;
}
export {};
