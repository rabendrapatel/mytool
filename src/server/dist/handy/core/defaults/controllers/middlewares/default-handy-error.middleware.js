"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyErrorMiddleware = void 0;
const core_1 = require("@handy/core");
const _services_1 = require("@services");
class DefaultHandyErrorMiddleware {
    constructor() {
        this.errorService = core_1.Inject(_services_1.HandyErrorService);
    }
    middleware(app) {
        app.use((request, response, next) => {
            return next(this.errorService.register(null, 'low', 'Resource not found', undefined, undefined, request, response));
        });
        app.use((error, request, response, next) => {
            let err = this.errorService.register(error, 'medium', 'Server error', undefined, undefined, request);
            return response.errorResponse(err);
        });
    }
}
exports.DefaultHandyErrorMiddleware = DefaultHandyErrorMiddleware;
//# sourceMappingURL=default-handy-error.middleware.js.map