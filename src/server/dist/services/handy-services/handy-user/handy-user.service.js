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
exports.HandyUserService = void 0;
const handy_user_1 = require("@handy/core/defaults/services/handy-user/handy-user");
const core_1 = require("@handy/core");
let HandyUserService = class HandyUserService extends handy_user_1.DefaultHandyUserService {
    constructor() {
        super();
    }
    /**
     * Handles default data for user generation
     *
     * @param {UserModelInterfaces['createShape']} postedUserData
     * @returns {UserModelInterfaces['createShape']}
     * @memberof HandyUserService
     */
    generateDefaultUserOnRegistration(postedUserData) {
        if (isEmpty(postedUserData.roles)) {
            postedUserData.roles = this._defaultUserRole;
        }
        if (isEmpty(postedUserData.permissions)) {
            postedUserData.permissions = this.getDefaultPersmissionsForRoles(postedUserData.roles);
        }
        if (!postedUserData.hasVerifiedEmail && this._handyConfigService.get().userRegistration.verifyEmail) {
            postedUserData.emailVerificationHash = this._handyUtilsService.generateHash({ length: 10, specialChars: false, emptySpace: false });
        }
        if (!postedUserData.password) {
            postedUserData.password = this._handyUtilsService.generateStrongPassword();
        }
        return postedUserData;
    }
};
HandyUserService = __decorate([
    core_1.Service({
        routable: true,
        singleton: true
    }),
    __metadata("design:paramtypes", [])
], HandyUserService);
exports.HandyUserService = HandyUserService;
//# sourceMappingURL=handy-user.service.js.map