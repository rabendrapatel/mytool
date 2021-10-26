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
exports.HandyCsvService = void 0;
const handy_csv_service_1 = require("@handy/core/defaults/services/handy-csv/handy-csv.service");
const core_1 = require("@handy/core");
const _services_1 = require("@services");
const _models_1 = require("@models");
let HandyCsvService = class HandyCsvService extends handy_csv_service_1.DefaultHandyCsvService {
    constructor(_handyError, _uploadsModel, _uploadsService, _utils, _config) {
        super(_handyError, _uploadsModel, _uploadsService, _utils, _config);
        this._handyError = _handyError;
        this._uploadsModel = _uploadsModel;
        this._uploadsService = _uploadsService;
        this._utils = _utils;
        this._config = _config;
    }
};
HandyCsvService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [_services_1.HandyErrorService,
        _models_1.UploadsModel,
        _services_1.HandyFileUploadService,
        _services_1.HandyUtilsService,
        _services_1.HandyConfigService])
], HandyCsvService);
exports.HandyCsvService = HandyCsvService;
//# sourceMappingURL=handy-csv.service.js.map