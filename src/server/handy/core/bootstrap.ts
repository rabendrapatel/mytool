// To get the correct error line
import { install } from "source-map-support";
install({
  enviroment: 'node'
})

// Loading injector, using require in order to load Injector
require('./injector/injector');
import { Injectable } from './decorators';
import { Inject, Injector } from "./injector/injector";
import { Type, ClassType } from "@handy/types";

@Injectable(true)
class HandyBootstrapClass {

  private preboot: Type<any>[] = [];
  private prebootLen: number = 0;

  constructor () {
  }

  loadRootModule(RootModule: Type<any>): void {

    let rootIntance = Inject(RootModule);

    let errorsService: any;
    let configService: any;

    this.preboot = rootIntance.getPreboot();
    this.prebootLen = this.preboot.length;

    for (let i = 0; i < this.prebootLen; i++) {
      const classDef = this.preboot[i];

      let intName: string | undefined = classDef.name;
      if (intName !== undefined && intName === 'HandyErrorService') {
        errorsService = Inject(classDef);
      }

      if (intName !== undefined && intName === 'HandyConfigService') {
        configService = Inject(classDef);
      }

      // !Should most likely go away 
      if (configService !== undefined && errorsService !== undefined) {
        break;
      }

    }

    const HandyMongoDbInitializer = require('./initializers/db/mongo/mongo.initializer').HandyMongoDbInitializer;
    const mongoInitializer = Inject<any>(HandyMongoDbInitializer);

    const HandyServer = require('./initializers/server/server.initializer').DefaultHandyServer;
    const serverInitializer = Inject<any>(HandyServer);

    const HandyCoreUtils = require('./core-utils').__HandyCoreUtils;
    const handyCoreUtils = Inject<any>(HandyCoreUtils);

    mongoInitializer.connect()
      .then(() => {

        try {

          for (let i = 0; i < this.prebootLen; i++) {
            const classDef = this.preboot[i];
            Inject(classDef);
          }

          this.extractModuleImports(rootIntance);

          Injector.registerMiddlwares(serverInitializer);

          Injector.registerRoutesListeners(serverInitializer);

          Injector.registerTemplatingEnginesMiddlware(serverInitializer);
          Injector.registerClientServingMiddleware(serverInitializer);
          Injector.registerErrorMiddlwares(serverInitializer);

          // Starts server listening
          return serverInitializer.startServer();

        } catch (error) {

          return Promise.reject(error)

        }

      })
      .then(() => {

        let socketIo = serverInitializer.socketIo;

        Injector.registerSocketEmmiter(socketIo);
        Injector.registerSocketControlers(socketIo);

        Injector.attachSocketEventsListeners(socketIo, handyCoreUtils);
        Injector.registerCronJobs();

        if (__isMasterCluster) {
          handySuccessLog('Server started')
        }

      })
      .catch((err: any) => {

        if (errorsService === undefined || typeof errorsService.register !== 'function') {

          handyErrLog(err);

        } else {

          errorsService.register(err);

        }

      })

  }

  private extractModuleImports(Module: any): void {

    if (isNotEmpty(Module.InjectionType) && Module.InjectionType.ClassType === 'module') {

      let imports: any[] = Module.getImports();
      let importsLen: number = imports.length;
      for (let i = 0; i < importsLen; i++) {
        const SingleImportDefinition = imports[i];
        const SingleImportInjectionType: ClassType = this.extractClassTypeFromDeclarationOrInstance(SingleImportDefinition);

        const singleNestedModuleInstance = Inject(SingleImportDefinition);

        if (SingleImportInjectionType === 'module') {
          this.extractModuleImports(singleNestedModuleInstance);
        }

      }

    }

  }

  private extractClassTypeFromDeclarationOrInstance(classDefinitionOrInstance: any): ClassType | null {

    let isInstance: boolean = (typeof classDefinitionOrInstance === 'object') ? true : (typeof classDefinitionOrInstance === 'function') ? false : null;

    if (isInstance === null) {
      return null;
    }

    if (!isInstance && (isEmpty(classDefinitionOrInstance.prototype) || isEmpty(classDefinitionOrInstance.prototype.InjectionType))) {
      return null;
    }

    if (!isInstance) {
      return classDefinitionOrInstance.prototype.InjectionType.ClassType
    }

    if (isEmpty(classDefinitionOrInstance.InjectionType)) {
      return null;
    }

    return classDefinitionOrInstance.InjectionType.ClassType;

  }

}

export const HandyBootstrap = Inject<HandyBootstrapClass>(HandyBootstrapClass);


// ! Very likely not needed 
// require('../../handy.module'); 