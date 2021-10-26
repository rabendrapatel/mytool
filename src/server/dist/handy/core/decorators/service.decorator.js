"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const Service = (ServiceSettings = {}) => {
    let { routable = false, singleton = true } = ServiceSettings;
    return (target) => {
        let InjectionType = {
            singleton,
            injectable: true,
            ClassType: 'service'
        };
        target.prototype.InjectionType = InjectionType;
        target.prototype.ServiceSettings = {
            routable,
            singleton
        };
    };
};
exports.Service = Service;
//# sourceMappingURL=service.decorator.js.map