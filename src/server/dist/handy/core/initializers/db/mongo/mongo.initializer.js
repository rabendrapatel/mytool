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
exports.HandyMongoDbInitializer = void 0;
const decorators_1 = require("@handy/core/decorators");
const _services_1 = require("@services");
const mongoose_1 = require("mongoose");
let HandyMongoDbInitializer = class HandyMongoDbInitializer {
    constructor(configService, errorService) {
        this.configService = configService;
        this.errorService = errorService;
        this.connectionUri = this.configService.getMongoConnectionUri();
        mongoose_1.set('debug', this.configService.get().mongoDB.mongooseDebugMode);
    }
    connect() {
        return new Promise((resolve, reject) => {
            mongoose_1.connect(this.connectionUri, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                autoIndex: this.configService.get().mongoDB.mongooseAutoIndexing
            });
            mongoose_1.connection.on('error', (connectionErr) => {
                let HandyError = this.errorService.register(connectionErr, 'high');
                reject(HandyError);
                this.connect();
            });
            mongoose_1.connection.on('connected', () => {
                if (__isMasterCluster) {
                    handySuccessLog('Connected to mongoDB: ' + this.configService.get().mongoDB.dbName + ' @ ' + this.configService.get().mongoDB.host);
                }
                resolve(true);
            });
        });
    }
};
HandyMongoDbInitializer = __decorate([
    decorators_1.Injectable(true),
    __metadata("design:paramtypes", [_services_1.HandyConfigService, _services_1.HandyErrorService])
], HandyMongoDbInitializer);
exports.HandyMongoDbInitializer = HandyMongoDbInitializer;
//# sourceMappingURL=mongo.initializer.js.map