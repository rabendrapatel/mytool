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
exports.FileRouteController = void 0;
const core_1 = require("@handy/core");
const _models_1 = require("@models");
const _services_1 = require("@services");
const file_serving_route_controller_1 = require("@handy/core/defaults/controllers/routes/file/file-serving.route.controller");
let FileRouteController = class FileRouteController extends file_serving_route_controller_1.DefaultFileRouteController {
    constructor(_uploadModel, _handyErrorService, _uploadService) {
        super(_uploadModel, _handyErrorService, _uploadService);
        this._uploadModel = _uploadModel;
        this._handyErrorService = _handyErrorService;
        this._uploadService = _uploadService;
    }
};
FileRouteController = __decorate([
    core_1.RouteController({ rootUrl: '/file' }),
    __metadata("design:paramtypes", [_models_1.UploadsModel, _services_1.HandyErrorService, _services_1.HandyFileUploadService])
], FileRouteController);
exports.FileRouteController = FileRouteController;
//# sourceMappingURL=file.route.controller.js.map