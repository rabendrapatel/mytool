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
exports.HandyTrackingService = void 0;
const core_1 = require("@handy/core");
const default_handy_tracking_service_1 = require("@handy/core/defaults/services/handy-tracking/default-handy-tracking.service");
const handy_config_serice_1 = require("../handy-config/handy-config.serice");
const handy_error_service_1 = require("../handy-error/handy-error.service");
const handy_external_api_service_1 = require("../handy-external-api/handy-external-api.service");
let HandyTrackingService = class HandyTrackingService extends default_handy_tracking_service_1.DefaultHandyTrackingService {
    constructor(_config, _externalApi, _handyErrorService) {
        super(_config, _externalApi, _handyErrorService);
        this._config = _config;
        this._externalApi = _externalApi;
        this._handyErrorService = _handyErrorService;
    }
};
HandyTrackingService = __decorate([
    core_1.Service({
        routable: true,
        singleton: true
    }),
    __metadata("design:paramtypes", [handy_config_serice_1.HandyConfigService, handy_external_api_service_1.HandyExternalApiService, handy_error_service_1.HandyErrorService])
], HandyTrackingService);
exports.HandyTrackingService = HandyTrackingService;
//# sourceMappingURL=handy-tracking.service.js.map