"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const Middleware = (middlewareSettings = {}) => {
    let { errorMiddleware = false, clientServingMiddleware = false } = middlewareSettings;
    return (target) => {
        let InjectionType = {
            singleton: true,
            injectable: true,
            ClassType: 'middleware'
        };
        target.prototype.InjectionType = InjectionType;
        target.prototype.middlewareSettings = {
            errorMiddleware,
            clientServingMiddleware
        };
    };
};
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.decorator.js.map