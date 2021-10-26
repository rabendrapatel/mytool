import { ClassType, Type, InjectionType, ExtendedCronsHolderSetting, ApiRequestListenerSettings, RequestListenerSettings, RoutesPrototypeHolder, RoutergDecoratorSettings, HandySocketEventListenerSettings, CronsHolderSetting, ServerRouter } from "@handy/types";
import { Application } from "express";
class HandyInjector {

  private regularMiddlewares: any[] = [];
  private templatingEngineMiddlewares: any = [];
  private clietnServingMiddleware: any;
  private errorMiddlewares: any = [];

  private services: Type<any>[] = [];

  private routeControllers: Type<any>[] = [];
  private socketControllers: Type<any>[] = [];

  private nonApiRoutestRequestListeners: RequestListenerSettings[] = [];
  private apiRoutestRequestListeners: ApiRequestListenerSettings[] = [];

  private socketEventsListeners: HandySocketEventListenerSettings[] = [];
  private cronJobs: ExtendedCronsHolderSetting[] = [];

  private cronHandler: any;
  private handySocketEmitters: any[] = [];

  private singletonsList: string[] = [];
  private singletonsStorrage: { [key: string]: any } = {};

  resolve<T>(target: Type<any>): T {

    if (target === undefined) {

      try {

        target.name;

      } catch (undefinedErr) {

        handyErrLog(`Circular dependency detected.\n\n Check error below for details details.`);
        handyErrLog(undefinedErr);

      }
    }

    let className: string = target.name;

    if (target.prototype === undefined) {

      handyErrLog({ msg: 'Injection failed. Wrong parameter as an injection target.', target });

    }

    if (target.prototype.InjectionType === undefined || !target.prototype.InjectionType.injectable) {
      handyErrLog(`${className} injection failed. ${className} is not injectable.`);
    }

    let { singleton, ClassType } = (<InjectionType>target.prototype.InjectionType);

    if (this.singletonsList.includes(className)) {

      return <T>this.singletonsStorrage[className];

    }

    let tokens = Reflect.getMetadata('design:paramtypes', target) || [];

    let injections = tokens.map((token: any, index: number) => {

      if (token !== undefined) {
        return Injector.resolve<any>(token);
      } else {
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

  private __parseListeners(ClassInstance: any, classType: ClassType, singleton: boolean, className: string, prototype: any): void {

    let routable: boolean = true;

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

  private __parseMiddleware(ClassInstance: any, classType: ClassType, singleton: boolean, className: string, prototype: any): void {

    const isErrorMiddleware = prototype.middlewareSettings.errorMiddleware;
    const isClientServingMiddleware = prototype.middlewareSettings.clientServingMiddleware;

    if (!isErrorMiddleware) {

      if (ClassInstance.registerTemplatingEngine !== undefined) {
        this.templatingEngineMiddlewares.push(ClassInstance.registerTemplatingEngine.bind(ClassInstance))
      }

      if (isClientServingMiddleware) {
        this.clietnServingMiddleware = ClassInstance.middleware.bind(ClassInstance);
        return;
      }

      this.regularMiddlewares.push(ClassInstance.middleware.bind(ClassInstance));

    } else {
      this.errorMiddlewares.push(ClassInstance.middleware.bind(ClassInstance));
    }

  }

  private __parseModel(ClassInstance: any, classType: ClassType, singleton: boolean, className: string, prototype: any): void {

    let defaultModelMethodsSettings: ApiRequestListenerSettings[] = ClassInstance.__getDefaultMethodsRoutes();
    let defaultModelMethodsSettingsLen: number = defaultModelMethodsSettings.length;

    for (let i = 0; i < defaultModelMethodsSettingsLen; i++) {
      let singleMethodSetting = defaultModelMethodsSettings[i];
      this.apiRoutestRequestListeners.push(singleMethodSetting);
    }

  }

  private __parseService(ClassInstance: any, classType: ClassType, singleton: boolean, className: string, prototype: any): void {

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

  private __parseRoutesController(ClassInstance: any, classType: ClassType, singleton: boolean, className: string, prototype: any): void {

    this.routeControllers.push(ClassInstance)

  }

  private __parseSocketController(ClassInstance: any, classType: ClassType, singleton: boolean, className: string, prototype: any): void {

    this.socketControllers.push(ClassInstance)

  }

  private __parseRequestsListeners(ClassInstance: any, classType: ClassType, singleton: boolean): void {

    if (isNotNullOrUndefined(ClassInstance.__getHandyRequestListeners)) {

      let customListeners: RoutesPrototypeHolder<RoutergDecoratorSettings>[] = ClassInstance.__getHandyRequestListeners();
      let customListenersLen: number = customListeners.length;

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
        } else {
          customUrlPath = method;
        }

        let routePath: string = `${this.__extractRequestListenerPathPreffixFromClass(ClassInstance, classType)}/${customUrlPath}`;

        let routeSettings: RequestListenerSettings | ApiRequestListenerSettings = {
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
        }

        if (isApi) {

          (<ApiRequestListenerSettings>routeSettings).apiVersions = apiVersions;
          this.apiRoutestRequestListeners.push(routeSettings as ApiRequestListenerSettings);

        } else {

          this.nonApiRoutestRequestListeners.push(routeSettings);

        }

      }

    }

  }

  private __parseCronJobs(ClassInstance: any, singleton: boolean): void {

    if (isNotNullOrUndefined(ClassInstance.__getDecoratedCrons)) {

      let customCronJobs: CronsHolderSetting[] = ClassInstance.__getDecoratedCrons();
      let customCronJobsLen: number = customCronJobs.length;

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
        })

      }

    }

  }

  private __parseSocketEventsListeners(ClassInstance: any, classType: ClassType, singleton: boolean): void {

    if (isNotNullOrUndefined(ClassInstance.__getSocketEventListeners)) {

      let listeners: HandySocketEventListenerSettings[] = ClassInstance.__getSocketEventListeners();
      let listenersLen: number = listeners.length;

      if (listenersLen > 0 && !singleton) {

        handyErrLog(`Class ${ClassInstance.constructor.name} has to be singleton in order to use socket event listeners.`);
        return;

      }

      for (let i = 0; i < listenersLen; i++) {
        const singleEventListener: HandySocketEventListenerSettings = listeners[i];

        if (isEmpty(singleEventListener.namespace)) {

          if (classType === 'socketController') {
            singleEventListener.namespace = ClassInstance.SocketControllerSettings.namespace;
          } else {
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

  private __extractRequestListenerPathPreffixFromClass(ClassInstance: any, classType: ClassType): string {

    let result: string;
    let className: string = ClassInstance.constructor.name.LcFirst();

    switch (classType) {
      case 'model':

        result = `model/${ClassInstance._ModelSettings.name.LcFirst()}`;

        break;

      case 'service':

        result = `service/${className.replace('undefined', '_').replace('Service', '').replace('service', '')}`;

        break;

      case 'socketController':

        let namespace: string = (ClassInstance.constructor.prototype.SocketControllerSettings.namespace !== '/') ? ClassInstance.constructor.prototype.SocketControllerSettings.namespace : 'global'
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

  public registerMiddlwares(serverInitializer: ExpressInitializer): void {

    let middlewaresLen: number = this.regularMiddlewares.length;

    for (let i = 0; i < middlewaresLen; i++) {
      const singleMiddleware = this.regularMiddlewares[i];

      serverInitializer.registerMiddleware(singleMiddleware);

    }

  }
  
  public registerClientServingMiddleware(serverInitializer: ExpressInitializer): void {

    if (this.clietnServingMiddleware) {
      serverInitializer.registerMiddleware(this.clietnServingMiddleware);
    }

  }

  public registerRoutesListeners(serverInitializer: ExpressInitializer): void {

    let nonApiRoutestRequestListenersLen: number = this.nonApiRoutestRequestListeners.length;
    for (let i = 0; i < nonApiRoutestRequestListenersLen; i++) {
      const singleNonApiListener = this.nonApiRoutestRequestListeners[i];

      serverInitializer.addRequestListener(singleNonApiListener);

    }

    let apiRoutestRequestListenersLen: number = this.apiRoutestRequestListeners.length;
    for (let i = 0; i < apiRoutestRequestListenersLen; i++) {
      const singleApiListener = this.apiRoutestRequestListeners[i];

      serverInitializer.addRequestListener(singleApiListener, true);

    }

  }

  public registerTemplatingEnginesMiddlware(serverInitializer: ExpressInitializer): void {

    let templatingEnginesLen: number = this.templatingEngineMiddlewares.length;
    for (let i = 0; i < templatingEnginesLen; i++) {
      const singleEngineMiddleware = this.templatingEngineMiddlewares[i];

      serverInitializer.registerMiddleware(singleEngineMiddleware);

    }

  }

  public registerErrorMiddlwares(serverInitializer: ExpressInitializer): void {

    let expressErrorHandlersLen: number = this.errorMiddlewares.length;
    for (let i = 0; i < expressErrorHandlersLen; i++) {
      const singleErrorMiddleware = this.errorMiddlewares[i];

      serverInitializer.registerMiddleware(singleErrorMiddleware);

    }

  }

  public registerSocketEmmiter(ioInstance: SocketIO.Server): void {

    let socketEmmitersLen: number = this.handySocketEmitters.length;
    for (let i = 0; i < socketEmmitersLen; i++) {
      const singleEmitter = this.handySocketEmitters[i];
      singleEmitter.__attachIoInstance(ioInstance);
    }

  }

  public registerSocketControlers(ioInstance: SocketIO.Server): void {

    let socketControllerLen: number = this.socketControllers.length;
    for (let i = 0; i < socketControllerLen; i++) {
      const singleController: any = this.socketControllers[i] as any;
      singleController.__connectToServer(ioInstance);
    }

  }

  public attachSocketEventsListeners(ioInstance: SocketIO.Server, coreUtilsInstance: any): void {

    let listenersLen: number = this.socketEventsListeners.length;
    for (let i = 0; i < listenersLen; i++) {
      const singleSocketEventListener = this.socketEventsListeners[i];
      coreUtilsInstance.attachSocketEventListener(ioInstance, singleSocketEventListener);

    }

  }

  public registerCronJobs(): void {

    if (isNotNullOrUndefined(this.cronHandler) && isNotNullOrUndefined(this.cronHandler.registerCron)) {

      let cronJobsLen: number = this.cronJobs.length;
      for (let i = 0; i < cronJobsLen; i++) {
        const singleCronJob = this.cronJobs[i];
        this.cronHandler.registerCron(singleCronJob);
      }

      this.cronHandler.startCron();

    }

  }

};

export const Injector = new HandyInjector();

export const Inject = <T>(target: Type<T>): T => {
  return Injector.resolve(target);
}

interface ExpressInitializer {
  app: Application,
  router: ServerRouter,
  registerMiddleware(fn: any): void,
  registerErrorHandler(fn: any): void,
  addRequestListener(listenerSettings: ApiRequestListenerSettings | RequestListenerSettings, isApiListener?: boolean): void
}