"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandyBootstrap = void 0;
// To get the correct error line
const source_map_support_1 = require("source-map-support");
source_map_support_1.install({
    enviroment: 'node'
});
// Loading injector, using require in order to load Injector
require('./injector/injector');
const decorators_1 = require("./decorators");
const injector_1 = require("./injector/injector");
let HandyBootstrapClass = class HandyBootstrapClass {
    constructor() {
        this.preboot = [];
        this.prebootLen = 0;
    }
    loadRootModule(RootModule) {
        let rootIntance = injector_1.Inject(RootModule);
        let errorsService;
        let configService;
        this.preboot = rootIntance.getPreboot();
        this.prebootLen = this.preboot.length;
        for (let i = 0; i < this.prebootLen; i++) {
            const classDef = this.preboot[i];
            let intName = classDef.name;
            if (intName !== undefined && intName === 'HandyErrorService') {
                errorsService = injector_1.Inject(classDef);
            }
            if (intName !== undefined && intName === 'HandyConfigService') {
                configService = injector_1.Inject(classDef);
            }
            // !Should most likely go away 
            if (configService !== undefined && errorsService !== undefined) {
                break;
            }
        }
        const HandyMongoDbInitializer = require('./initializers/db/mongo/mongo.initializer').HandyMongoDbInitializer;
        const mongoInitializer = injector_1.Inject(HandyMongoDbInitializer);
        const HandyServer = require('./initializers/server/server.initializer').DefaultHandyServer;
        const serverInitializer = injector_1.Inject(HandyServer);
        const HandyCoreUtils = require('./core-utils').__HandyCoreUtils;
        const handyCoreUtils = injector_1.Inject(HandyCoreUtils);
        mongoInitializer.connect()
            .then(() => {
            try {
                for (let i = 0; i < this.prebootLen; i++) {
                    const classDef = this.preboot[i];
                    injector_1.Inject(classDef);
                }
                this.extractModuleImports(rootIntance);
                injector_1.Injector.registerMiddlwares(serverInitializer);
                injector_1.Injector.registerRoutesListeners(serverInitializer);
                injector_1.Injector.registerTemplatingEnginesMiddlware(serverInitializer);
                injector_1.Injector.registerClientServingMiddleware(serverInitializer);
                injector_1.Injector.registerErrorMiddlwares(serverInitializer);
                // Starts server listening
                return serverInitializer.startServer();
            }
            catch (error) {
                return Promise.reject(error);
            }
        })
            .then(() => {
            let socketIo = serverInitializer.socketIo;
            injector_1.Injector.registerSocketEmmiter(socketIo);
            injector_1.Injector.registerSocketControlers(socketIo);
            injector_1.Injector.attachSocketEventsListeners(socketIo, handyCoreUtils);
            injector_1.Injector.registerCronJobs();
            if (__isMasterCluster) {
                handySuccessLog('Server started');
            }
        })
            .catch((err) => {
            if (errorsService === undefined || typeof errorsService.register !== 'function') {
                handyErrLog(err);
            }
            else {
                errorsService.register(err);
            }
        });
    }
    extractModuleImports(Module) {
        if (isNotEmpty(Module.InjectionType) && Module.InjectionType.ClassType === 'module') {
            let imports = Module.getImports();
            let importsLen = imports.length;
            for (let i = 0; i < importsLen; i++) {
                const SingleImportDefinition = imports[i];
                const SingleImportInjectionType = this.extractClassTypeFromDeclarationOrInstance(SingleImportDefinition);
                const singleNestedModuleInstance = injector_1.Inject(SingleImportDefinition);
                if (SingleImportInjectionType === 'module') {
                    this.extractModuleImports(singleNestedModuleInstance);
                }
            }
        }
    }
    extractClassTypeFromDeclarationOrInstance(classDefinitionOrInstance) {
        let isInstance = (typeof classDefinitionOrInstance === 'object') ? true : (typeof classDefinitionOrInstance === 'function') ? false : null;
        if (isInstance === null) {
            return null;
        }
        if (!isInstance && (isEmpty(classDefinitionOrInstance.prototype) || isEmpty(classDefinitionOrInstance.prototype.InjectionType))) {
            return null;
        }
        if (!isInstance) {
            return classDefinitionOrInstance.prototype.InjectionType.ClassType;
        }
        if (isEmpty(classDefinitionOrInstance.InjectionType)) {
            return null;
        }
        return classDefinitionOrInstance.InjectionType.ClassType;
    }
};
HandyBootstrapClass = __decorate([
    decorators_1.Injectable(true),
    __metadata("design:paramtypes", [])
], HandyBootstrapClass);
exports.HandyBootstrap = injector_1.Inject(HandyBootstrapClass);
// ! Very likely not needed 
// require('../../handy.module'); 
//# sourceMappingURL=bootstrap.js.map