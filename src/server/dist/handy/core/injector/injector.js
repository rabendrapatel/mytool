"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = exports.Injector = void 0;
class HandyInjector {
    constructor() {
        this.regularMiddlewares = [];
        this.templatingEngineMiddlewares = [];
        this.errorMiddlewares = [];
        this.services = [];
        this.routeControllers = [];
        this.socketControllers = [];
        this.nonApiRoutestRequestListeners = [];
        this.apiRoutestRequestListeners = [];
        this.socketEventsListeners = [];
        this.cronJobs = [];
        this.handySocketEmitters = [];
        this.singletonsList = [];
        this.singletonsStorrage = {};
    }
    resolve(target) {
        if (target === undefined) {
            try {
                target.name;
            }
            catch (undefinedErr) {
                handyErrLog(`Circular dependency detected.\n\n Check error below for details details.`);
                handyErrLog(undefinedErr);
            }
        }
        let className = target.name;
        if (target.prototype === undefined) {
            handyErrLog({ msg: 'Injection failed. Wrong parameter as an injection target.', target });
        }
        if (target.prototype.InjectionType === undefined || !target.prototype.InjectionType.injectable) {
            handyErrLog(`${className} injection failed. ${className} is not injectable.`);
        }
        let { singleton, ClassType } = target.prototype.InjectionType;
        if (this.singletonsList.includes(className)) {
            return this.singletonsStorrage[className];
        }
        let tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        let injections = tokens.map((token, index) => {
            if (token !== undefined) {
                return exports.Injector.resolve(token);
            }
            else {
                handyErrLog(`Circular dependency detected in ${className} constructor at position ${index}.\n\n Implement OnInit for loading this parameter.`);
                return undefined;
            }
        });
        let instance = new target(...injections);
        if (typeof instance.onInit === 'function') {
            setTimeout(() => {
                instance.onInit();
            });
        }
        if (singleton) {
            this.singletonsStorrage[className] = instance;
            this.singletonsList.push(className);
        }
        this.__parseListeners(instance, ClassType, singleton, className, target.prototype);
        return instance;
    }
    __parseListeners(ClassInstance, classType, singleton, className, prototype) {
        let routable = true;
        switch (classType) {
            case 'middleware':
                this.__parseMiddleware(ClassInstance, classType, singleton, className, prototype);
                break;
            case 'model':
                routable = ClassInstance._ModelSettings.routable;
                this.__parseModel(ClassInstance, classType, singleton, className, prototype);
                break;
            case 'service':
                routable = ClassInstance.ServiceSettings.routable;
                this.__parseService(ClassInstance, classType, singleton, className, prototype);
                break;
            case 'routeController':
                this.__parseRoutesController(ClassInstance, classType, singleton, className, prototype);
                break;
            case 'socketController':
                let env = (isNotEmpty(ClassInstance.SocketControllerSettings.env)) ? ClassInstance.SocketControllerSettings.env : __env;
                if (!env.includes(__env)) {
                    return;
                }
                routable = ClassInstance.SocketControllerSettings.routable;
                this.__parseSocketController(ClassInstance, classType, singleton, className, prototype);
                break;
            default:
                break;
        }
        if (routable) {
            this.__parseRequestsListeners(ClassInstance, classType, singleton);
        }
        this.__parseSocketEventsListeners(ClassInstance, classType, singleton);
        this.__parseCronJobs(ClassInstance, singleton);
    }
    __parseMiddleware(ClassInstance, classType, singleton, className, prototype) {
        const isErrorMiddleware = prototype.middlewareSettings.errorMiddleware;
        const isClientServingMiddleware = prototype.middlewareSettings.clientServingMiddleware;
        if (!isErrorMiddleware) {
            if (ClassInstance.registerTemplatingEngine !== undefined) {
                this.templatingEngineMiddlewares.push(ClassInstance.registerTemplatingEngine.bind(ClassInstance));
            }
            if (isClientServingMiddleware) {
                this.clietnServingMiddleware = ClassInstance.middleware.bind(ClassInstance);
                return;
            }
            this.regularMiddlewares.push(ClassInstance.middleware.bind(ClassInstance));
        }
        else {
            this.errorMiddlewares.push(ClassInstance.middleware.bind(ClassInstance));
        }
    }
    __parseModel(ClassInstance, classType, singleton, className, prototype) {
        let defaultModelMethodsSettings = ClassInstance.__getDefaultMethodsRoutes();
        let defaultModelMethodsSettingsLen = defaultModelMethodsSettings.length;
        for (let i = 0; i < defaultModelMethodsSettingsLen; i++) {
            let singleMethodSetting = defaultModelMethodsSettings[i];
            this.apiRoutestRequestListeners.push(singleMethodSetting);
        }
    }
    __parseService(ClassInstance, classType, singleton, className, prototype) {
        this.services.push(ClassInstance);
        if (isNotNullOrUndefined(ClassInstance.__isHandySocketEmitter)) {
            this.handySocketEmitters.push(ClassInstance);
        }
        if (isNotNullOrUndefined(ClassInstance.__isCronHandler)) {
            this.cronHandler = ClassInstance;
        }
        // ! TODO Get back to this
        // this.parseRequestsListeners(ServiceInstance);
        // this.parseSocketEventsListeners(ServiceInstance);
    }
    __parseRoutesController(ClassInstance, classType, singleton, className, prototype) {
        this.routeControllers.push(ClassInstance);
    }
    __parseSocketController(ClassInstance, classType, singleton, className, prototype) {
        this.socketControllers.push(ClassInstance);
    }
    __parseRequestsListeners(ClassInstance, classType, singleton) {
        if (isNotNullOrUndefined(ClassInstance.__getHandyRequestListeners)) {
            let customListeners = ClassInstance.__getHandyRequestListeners();
            let customListenersLen = customListeners.length;
            if (customListenersLen > 0 && !singleton) {
                handyErrLog(`Class ${ClassInstance.constructor.name} has to be singleton in order to use routing listeners.`);
                return;
            }
            for (let i = 0; i < customListenersLen; i++) {
                const { isApi, settings = {}, method, requestType } = customListeners[i];
                let bindedMethod = ClassInstance[method].bind(ClassInstance);
                let { requiredParams, requestModifier, requestValidator, env, apiVersions, customUrlPath, publicRoute, accessRestriction = {}, consolePath = false } = settings;
                let { accessValidationfn, groups, permissions, roles } = accessRestriction;
                if (customUrlPath) {
                    if (customUrlPath.startsWith('/')) {
                        customUrlPath.replace('/', '');
                    }
                }
                else {
                    customUrlPath = method;
                }
                let routePath = `${this.__extractRequestListenerPathPreffixFromClass(ClassInstance, classType)}/${customUrlPath}`;
                let routeSettings = {
                    requiredParams,
                    requestModifier,
                    requestValidator,
                    env,
                    routePath,
                    publicRoute,
                    requestType,
                    method: bindedMethod,
                    accessValidationfn,
                    groups,
                    permissions,
                    consolePath,
                    roles
                };
                if (isApi) {
                    routeSettings.apiVersions = apiVersions;
                    this.apiRoutestRequestListeners.push(routeSettings);
                }
                else {
                    this.nonApiRoutestRequestListeners.push(routeSettings);
                }
            }
        }
    }
    __parseCronJobs(ClassInstance, singleton) {
        if (isNotNullOrUndefined(ClassInstance.__getDecoratedCrons)) {
            let customCronJobs = ClassInstance.__getDecoratedCrons();
            let customCronJobsLen = customCronJobs.length;
            if (customCronJobsLen > 0 && !singleton) {
                handyErrLog(`Class ${ClassInstance.constructor.name} has to be singleton in order to use cron jobs.`);
                return;
            }
            for (let i = 0; i < customCronJobsLen; i++) {
                let { methodName, cronType, cronSettings } = customCronJobs[i];
                this.cronJobs.push({
                    method: ClassInstance[methodName].bind(ClassInstance),
                    methodName,
                    cronType,
                    cronSettings
                });
            }
        }
    }
    __parseSocketEventsListeners(ClassInstance, classType, singleton) {
        if (isNotNullOrUndefined(ClassInstance.__getSocketEventListeners)) {
            let listeners = ClassInstance.__getSocketEventListeners();
            let listenersLen = listeners.length;
            if (listenersLen > 0 && !singleton) {
                handyErrLog(`Class ${ClassInstance.constructor.name} has to be singleton in order to use socket event listeners.`);
                return;
            }
            for (let i = 0; i < listenersLen; i++) {
                const singleEventListener = listeners[i];
                if (isEmpty(singleEventListener.namespace)) {
                    if (classType === 'socketController') {
                        singleEventListener.namespace = ClassInstance.SocketControllerSettings.namespace;
                    }
                    else {
                        singleEventListener.namespace = '/';
                    }
                }
                if (!singleEventListener.namespace.startsWith('/')) {
                    singleEventListener.namespace = `/${singleEventListener.namespace}`;
                }
                singleEventListener.method = ClassInstance[singleEventListener.method].bind(ClassInstance);
                this.socketEventsListeners.push(singleEventListener);
            }
        }
    }
    __extractRequestListenerPathPreffixFromClass(ClassInstance, classType) {
        let result;
        let className = ClassInstance.constructor.name.LcFirst();
        switch (classType) {
            case 'model':
                result = `model/${ClassInstance._ModelSettings.name.LcFirst()}`;
                break;
            case 'service':
                result = `service/${className.replace('undefined', '_').replace('Service', '').replace('service', '')}`;
                break;
            case 'socketController':
                let namespace = (ClassInstance.constructor.prototype.SocketControllerSettings.namespace !== '/') ? ClassInstance.constructor.prototype.SocketControllerSettings.namespace : 'global';
                result = `socket/${namespace}`;
                break;
            case 'middleware':
                result = `middleware/${className.replace('Middleware', '').replace('middleware', '')}`;
                break;
            case 'plain':
                result = `utility/${className}`;
                break;
            case 'module':
                result = `module/${className}`;
                break;
            case 'routeController':
                result = `${ClassInstance.RouteControllerSettings.rootUrl}`;
                break;
            default:
                break;
        }
        return result;
    }
    registerMiddlwares(serverInitializer) {
        let middlewaresLen = this.regularMiddlewares.length;
        for (let i = 0; i < middlewaresLen; i++) {
            const singleMiddleware = this.regularMiddlewares[i];
            serverInitializer.registerMiddleware(singleMiddleware);
        }
    }
    registerClientServingMiddleware(serverInitializer) {
        if (this.clietnServingMiddleware) {
            serverInitializer.registerMiddleware(this.clietnServingMiddleware);
        }
    }
    registerRoutesListeners(serverInitializer) {
        let nonApiRoutestRequestListenersLen = this.nonApiRoutestRequestListeners.length;
        for (let i = 0; i < nonApiRoutestRequestListenersLen; i++) {
            const singleNonApiListener = this.nonApiRoutestRequestListeners[i];
            serverInitializer.addRequestListener(singleNonApiListener);
        }
        let apiRoutestRequestListenersLen = this.apiRoutestRequestListeners.length;
        for (let i = 0; i < apiRoutestRequestListenersLen; i++) {
            const singleApiListener = this.apiRoutestRequestListeners[i];
            serverInitializer.addRequestListener(singleApiListener, true);
        }
    }
    registerTemplatingEnginesMiddlware(serverInitializer) {
        let templatingEnginesLen = this.templatingEngineMiddlewares.length;
        for (let i = 0; i < templatingEnginesLen; i++) {
            const singleEngineMiddleware = this.templatingEngineMiddlewares[i];
            serverInitializer.registerMiddleware(singleEngineMiddleware);
        }
    }
    registerErrorMiddlwares(serverInitializer) {
        let expressErrorHandlersLen = this.errorMiddlewares.length;
        for (let i = 0; i < expressErrorHandlersLen; i++) {
            const singleErrorMiddleware = this.errorMiddlewares[i];
            serverInitializer.registerMiddleware(singleErrorMiddleware);
        }
    }
    registerSocketEmmiter(ioInstance) {
        let socketEmmitersLen = this.handySocketEmitters.length;
        for (let i = 0; i < socketEmmitersLen; i++) {
            const singleEmitter = this.handySocketEmitters[i];
            singleEmitter.__attachIoInstance(ioInstance);
        }
    }
    registerSocketControlers(ioInstance) {
        let socketControllerLen = this.socketControllers.length;
        for (let i = 0; i < socketControllerLen; i++) {
            const singleController = this.socketControllers[i];
            singleController.__connectToServer(ioInstance);
        }
    }
    attachSocketEventsListeners(ioInstance, coreUtilsInstance) {
        let listenersLen = this.socketEventsListeners.length;
        for (let i = 0; i < listenersLen; i++) {
            const singleSocketEventListener = this.socketEventsListeners[i];
            coreUtilsInstance.attachSocketEventListener(ioInstance, singleSocketEventListener);
        }
    }
    registerCronJobs() {
        if (isNotNullOrUndefined(this.cronHandler) && isNotNullOrUndefined(this.cronHandler.registerCron)) {
            let cronJobsLen = this.cronJobs.length;
            for (let i = 0; i < cronJobsLen; i++) {
                const singleCronJob = this.cronJobs[i];
                this.cronHandler.registerCron(singleCronJob);
            }
            this.cronHandler.startCron();
        }
    }
}
;
exports.Injector = new HandyInjector();
const Inject = (target) => {
    return exports.Injector.resolve(target);
};
exports.Inject = Inject;
//# sourceMappingURL=injector.js.map