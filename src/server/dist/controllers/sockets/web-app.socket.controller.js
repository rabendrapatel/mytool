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
exports.WebAppSocketController = void 0;
const default_web_app_socket_controller_1 = require("@handy/core/defaults/controllers/sockets/default-web-app-socket.controller");
const core_1 = require("@handy/core");
const default_web_app_rooms_joining_validator_1 = require("@handy/core/defaults/validators/socket/default-web-app-rooms-joining.validator");
let WebAppSocketController = class WebAppSocketController extends default_web_app_socket_controller_1.DefaultWebAppSocketController {
    constructor() {
        super();
    }
    _rawSocketMiddleware(socket) {
        socket.use((packet, next) => {
            socket.request.deviceIdCookie = socket.request.signedCookies[this._handyConfig.get().deviceIdCookieHash];
            return next();
        });
    }
};
WebAppSocketController = __decorate([
    core_1.SocketNamespaceController({
        namespace: 'web-app',
        connectionRestrictions: {
            publicAccess: true
        },
        roomJoiningRestrictions: {
            accessValidationfn: default_web_app_rooms_joining_validator_1.DefaultWebAppRoomsJoiningAccessValidator
        },
    }),
    __metadata("design:paramtypes", [])
], WebAppSocketController);
exports.WebAppSocketController = WebAppSocketController;
//# sourceMappingURL=web-app.socket.controller.js.map