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
exports.HandyMailerService = void 0;
const _services_1 = require("@services");
const default_handy_mailer_service_1 = require("@handy/core/defaults/services/handy-mailer/default-handy-mailer.service");
const core_1 = require("@handy/core");
let HandyMailerService = class HandyMailerService extends default_handy_mailer_service_1.DefaultHandyMailerService {
    constructor(config, errorService) {
        super(config, errorService);
        this.config = config;
        this.errorService = errorService;
    }
};
HandyMailerService = __decorate([
    core_1.Service({
        routable: false
    }),
    __metadata("design:paramtypes", [_services_1.HandyConfigService, _services_1.HandyErrorService])
], HandyMailerService);
exports.HandyMailerService = HandyMailerService;
//# sourceMappingURL=handy-mailer.service.js.map