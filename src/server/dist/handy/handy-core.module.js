"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandyCoreModule = void 0;
const core_1 = require("./core");
const _middlewares_1 = require("@middlewares");
const _services_1 = require("@services");
const web_app_socket_controller_1 = require("@socketControllers/web-app.socket.controller");
const _models_1 = require("@models");
const _routeControllers_1 = require("@routeControllers");
const pdf_service_1 = require("@services/handy-services/handy-pdf/pdf.service");
const handy_tracking_service_1 = require("@services/handy-services/handy-tracking/handy-tracking.service");
let HandyCoreModule = class HandyCoreModule {
};
HandyCoreModule = __decorate([
    core_1.HandyModule({
        imports: [
            _middlewares_1.HandyMiddleware,
            _middlewares_1.HandyErrorMiddleware,
            _middlewares_1.ClientServingMiddleware,
            _services_1.HandyMailerService,
            _services_1.HandyUtilsService,
            _services_1.HandyJwtService,
            web_app_socket_controller_1.WebAppSocketController,
            _services_1.HandySocketEmitter,
            _services_1.HandyCronService,
            _services_1.HandyUserService,
            _models_1.ShortlinkModel,
            _services_1.HandyShortlinkService,
            _routeControllers_1.ShortlinkRouteController,
            _services_1.HandyFileUploadService,
            _models_1.UploadsModel,
            _routeControllers_1.FileRouteController,
            pdf_service_1.HandyPdfService,
            handy_tracking_service_1.HandyTrackingService,
            _services_1.HandyCsvService
        ]
    })
], HandyCoreModule);
exports.HandyCoreModule = HandyCoreModule;
//# sourceMappingURL=handy-core.module.js.map