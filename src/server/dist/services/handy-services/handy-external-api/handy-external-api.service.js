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
exports.HandyExternalApiService = void 0;
const default_handy_extenrat_api_service_1 = require("@handy/core/defaults/services/external-api/default-handy-extenrat-api.service");
const core_1 = require("@handy/core");
let HandyExternalApiService = class HandyExternalApiService extends default_handy_extenrat_api_service_1.DefaultHandyExternalApiService {
    constructor() {
        super();
    }
};
HandyExternalApiService = __decorate([
    core_1.Service({
        singleton: false,
        routable: false
    }),
    __metadata("design:paramtypes", [])
], HandyExternalApiService);
exports.HandyExternalApiService = HandyExternalApiService;
//# sourceMappingURL=handy-external-api.service.js.map