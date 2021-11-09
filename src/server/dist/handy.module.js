"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandyServer = void 0;
const core_1 = require("@handy/core");
const core_2 = require("@handy/core");
const _services_1 = require("@services");
const handy_core_module_1 = require("@handy/handy-core.module");
const user_1 = require("@models/user");
const _models_1 = require("@models");
const mydrop_service_1 = require("@services/mydrop/mydrop.service");
const student_1 = require("@models/student");
let HandyServer = class HandyServer {
};
HandyServer = __decorate([
    core_2.HandyModule({
        // Basically prebuild services that are essential to run first...
        preBoot: [
            _services_1.HandyConfigService,
            _services_1.HandyErrorService,
        ],
        imports: [
            handy_core_module_1.HandyCoreModule,
            user_1.UserModel,
            _models_1.DropModel,
            _models_1.MydropModel,
            student_1.StudentModel,
            _services_1.DropService,
            mydrop_service_1.MydropService
        ]
    })
], HandyServer);
exports.HandyServer = HandyServer;
core_1.HandyBootstrap.loadRootModule(HandyServer);
//# sourceMappingURL=handy.module.js.map