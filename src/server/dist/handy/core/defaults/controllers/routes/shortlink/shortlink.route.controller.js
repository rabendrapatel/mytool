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
exports.DefaultShortlinkRouteController = void 0;
const core_1 = require("@handy/core");
const _services_1 = require("@services");
const injector_1 = require("@handy/core/injector/injector");
class DefaultShortlinkRouteController {
    constructor() {
        this._handyShortlinkService = injector_1.Inject(_services_1.HandyShortlinkService);
    }
    redirectToFinalPath(req, res, requestUser) {
        this._handyShortlinkService.redirectToFinalPath(req, res);
    }
}
__decorate([
    core_1.GetRequest({
        customUrlPath: ':shortlinkHash',
        publicRoute: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultShortlinkRouteController.prototype, "redirectToFinalPath", null);
exports.DefaultShortlinkRouteController = DefaultShortlinkRouteController;
//# sourceMappingURL=shortlink.route.controller.js.map