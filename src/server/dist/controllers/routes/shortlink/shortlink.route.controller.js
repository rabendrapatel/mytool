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
exports.ShortlinkRouteController = void 0;
const core_1 = require("@handy/core");
const handy_shotlink_1 = require("@handy/core/defaults/services/handy-shortlink/handy-shotlink");
const shortlink_route_controller_1 = require("@handy/core/defaults/controllers/routes/shortlink/shortlink.route.controller");
let ShortlinkRouteController = class ShortlinkRouteController extends shortlink_route_controller_1.DefaultShortlinkRouteController {
    constructor() {
        super();
    }
};
ShortlinkRouteController = __decorate([
    core_1.RouteController({ rootUrl: handy_shotlink_1.ShortlinkUrlPrefix }),
    __metadata("design:paramtypes", [])
], ShortlinkRouteController);
exports.ShortlinkRouteController = ShortlinkRouteController;
//# sourceMappingURL=shortlink.route.controller.js.map