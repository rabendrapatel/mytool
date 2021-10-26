"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteController = void 0;
const RouteController = (RouteControllerSettings) => {
    return (target) => {
        let InjectionType = {
            singleton: true,
            injectable: true,
            ClassType: 'routeController'
        };
        target.prototype.InjectionType = InjectionType;
        target.prototype.RouteControllerSettings = RouteControllerSettings;
    };
};
exports.RouteController = RouteController;
//# sourceMappingURL=route-controller.decorator.js.map