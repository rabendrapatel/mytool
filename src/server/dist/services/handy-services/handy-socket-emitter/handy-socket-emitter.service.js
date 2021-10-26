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
exports.HandySocketEmitter = void 0;
const default_handy_socket_emitter_service_1 = require("@handy/core/defaults/services/handy-socket-emitter/default-handy-socket-emitter.service");
const core_1 = require("@handy/core");
let HandySocketEmitter = class HandySocketEmitter extends default_handy_socket_emitter_service_1.DefaulthandySocketEmitterService {
    constructor() {
        super();
    }
};
HandySocketEmitter = __decorate([
    core_1.Service({
        singleton: true,
        routable: false
    }),
    __metadata("design:paramtypes", [])
], HandySocketEmitter);
exports.HandySocketEmitter = HandySocketEmitter;
//# sourceMappingURL=handy-socket-emitter.service.js.map