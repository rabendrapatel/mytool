"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyServer = void 0;
const decorators_1 = require("@handy/core/decorators");
const _services_1 = require("@services");
const Http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
const socketIo = require('socket.io');
const redis = require('socket.io-redis');
const os = __importStar(require("os"));
const qrcode = __importStar(require("qrcode-terminal"));
let DefaultHandyServer = class DefaultHandyServer {
    constructor(_config, _handyError) {
        this._config = _config;
        this._handyError = _handyError;
        this._express = express_1.default;
        this._http = Http;
        this.__defaultApivVersion = this._config.get().defaultApiVersions;
        this.__publicRoutingByDefault = this._config.get().publicRoutingByDefault;
        if (__isDev) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        this.app = this._express();
        this.router = this._express.Router();
    }
    startServer() {
        return new Promise((resolve, reject) => {
            let port = this._config.get().serverPort;
            this.server = this._http.createServer(this.app);
            this.socketIo = socketIo(this.server, { transports: this._config.get().socketConnectionType });
            if (!__isDev) {
                this.socketIo.adapter(redis({ host: 'localhost', port: 6379 }));
            }
            let finalIp;
            this.server.listen(port, () => {
                if (__isDev && __isMasterCluster && this._config.get().logNetworkIpQrCodeOnDev) {
                    let ifaces = os.networkInterfaces();
                    Object.keys(ifaces).forEach(function (ifname) {
                        var alias = 0;
                        ifaces[ifname].forEach(function (iface) {
                            if ('IPv4' !== iface.family || iface.internal !== false) {
                                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                                return;
                            }
                            if (alias >= 1) {
                                // this single interface has multiple ipv4 addresses
                                // console.log(ifname + ':' + alias, iface.address);
                                finalIp = `http://${iface.address}`;
                            }
                            else {
                                finalIp = `http://${iface.address}`;
                                // this interface has only one ipv4 adress
                            }
                            ++alias;
                        });
                    });
                    handySuccessLog(`Server is listening on port ${port}`);
                    if (finalIp) {
                        handySuccessLog(`For testing on other devices visit ${finalIp} or scan this QR Code`);
                        qrcode.generate(finalIp, { small: true });
                    }
                }
                resolve(true);
            });
        });
    }
    registerMiddleware(middlewareFunction) {
        middlewareFunction(this.app);
    }
    addRequestListener(listenerSettings, isApiListener = false) {
        let { apiVersions = this.__defaultApivVersion, requestType, routePath, method, env = __env, publicRoute = false, requestValidator = null, requestModifier = null, consolePath = false } = listenerSettings;
        if (!env.includes(__env)) {
            return;
        }
        if (!routePath.startsWith('/')) {
            routePath = `/${routePath}`;
        }
        let middlewares = [
            this.defaultRestrictionValidator(listenerSettings),
            this.defaultRequiredParamsValidator(listenerSettings)
        ];
        if (isNotEmpty(requestValidator)) {
            middlewares.push(requestValidator);
        }
        if (isNotEmpty(requestModifier)) {
            middlewares.push(requestModifier);
        }
        if (isApiListener) {
            if (!isArray(apiVersions)) {
                apiVersions = [apiVersions];
            }
            let apiVersionsLen = apiVersions.length;
            for (let i = 0; i < apiVersionsLen; i++) {
                const singleApiVersion = apiVersions[i];
                let finalRoutePath = `/api/v${singleApiVersion}${routePath}`;
                this.__singleListenerAttaching(requestType, finalRoutePath, middlewares, method, listenerSettings.consolePath);
            }
        }
        else {
            this.__singleListenerAttaching(requestType, routePath, middlewares, method, listenerSettings.consolePath);
        }
    }
    __singleListenerAttaching(requestType, finalRoutePath, middlewares, method, consolePath = false) {
        try {
            finalRoutePath = this.__clearListenerPath(finalRoutePath);
            if (consolePath && __isMasterCluster) {
                console.log(`Request path: ${finalRoutePath}`);
            }
            this.app[requestType](finalRoutePath, middlewares, (request, response) => {
                let requestQuery = request.query;
                let requestUser = request.user;
                let args = [
                    request,
                    response,
                    requestUser,
                    requestQuery
                ];
                let includeBody = (requestType === 'post' || requestType === 'put') ? true : false;
                if (includeBody) {
                    args.push(request.body);
                }
                method(...args);
                return;
            });
        }
        catch (error) {
            this._handyError.register(error, 'high', 'Server error', undefined, { private: { requestType, finalRoutePath, hint: 'Failed to register request listener' } });
        }
    }
    __clearListenerPath(path) {
        while (path.includes('//')) {
            path = path.replace('//', '/');
        }
        while (path.includes(' ')) {
            path = path.replace(' ', '_');
        }
        return path;
    }
    defaultRequiredParamsValidator(accessRestrictionSettings) {
        let { requiredParams = {} } = accessRestrictionSettings;
        if (isEmpty(requiredParams)) {
            return (request, response, next) => {
                return next();
            };
        }
        let requiredKeys = {
            query: isNotEmpty(requiredParams.query) ? requiredParams.query : [],
            body: isNotEmpty(requiredParams.body) ? requiredParams.body : [],
            urlParams: isNotEmpty(requiredParams.urlParams) ? requiredParams.urlParams : [],
        };
        return (request, response, next) => {
            let { query = {}, body = {}, params = {} } = request;
            let queryKeysLen = requiredKeys.query.length;
            for (let i = 0; i < queryKeysLen; i++) {
                const requiredKey = requiredKeys.query[i];
                if (isEmpty(query[requiredKey])) {
                    return next(this.__badRequestError(request, response));
                }
            }
            let bodyKeysLen = requiredKeys.body.length;
            for (let i = 0; i < bodyKeysLen; i++) {
                const requiredKey = requiredKeys.body[i];
                if (isEmpty(body[requiredKey])) {
                    return next(this.__badRequestError(request, response));
                }
            }
            let paramsKeysLen = requiredKeys.urlParams.length;
            for (let i = 0; i < paramsKeysLen; i++) {
                const requiredKey = requiredKeys.urlParams[i];
                if (isEmpty(params[requiredKey])) {
                    return next(this.__badRequestError(request, response));
                }
            }
            return next();
        };
    }
    defaultRestrictionValidator(accessRestrictionSettings) {
        let { accessValidationfn, groups = [], permissions = [], publicRoute = this.__publicRoutingByDefault, roles = [] } = accessRestrictionSettings;
        let groupsLen = groups.length;
        let permissionsLen = permissions.length;
        let rolesLen = roles.length;
        if (isEmpty(accessRestrictionSettings) || (isNullOrUndefined(accessValidationfn) && groupsLen === 0 && permissionsLen === 0 && rolesLen === 0 && publicRoute)) {
            return (request, response, next) => {
                return next();
            };
        }
        return (request, response, next) => {
            if (!publicRoute && !request.hasNonPublicRoutesAccess()) {
                return next(this.__forbiddenError(request, response, 'Failed public'));
            }
            if (isNotUndefined(accessValidationfn)) {
                return accessValidationfn(request, response, next);
            }
            if (groupsLen === 0 && permissionsLen === 0 && rolesLen === 0) {
                return next();
            }
            let user = request.user;
            if (!user.loggedIn) {
                return next(this.__unAuthorizedError(request, response));
            }
            if (groupsLen > 0 && user.isMemberOfGroupTypes(groups)) {
                return next();
            }
            if (permissionsLen > 0 && user.hasPermissions(permissions)) {
                return next();
            }
            if (rolesLen > 0 && user.hasRoles(roles)) {
                return next();
            }
            return next(this.__forbiddenError(request, response));
        };
    }
    __forbiddenError(request, response, privateMsg) {
        return this._handyError.register(null, 'low', 'Forbidden', undefined, { private: { msg: privateMsg } }, request, response);
    }
    __badRequestError(request, response) {
        return this._handyError.register(null, 'low', 'Bad request', undefined, undefined, request, response);
    }
    __unAuthorizedError(request, response) {
        return this._handyError.register(null, 'low', 'Unauthorized', undefined, undefined, request, response);
    }
};
DefaultHandyServer = __decorate([
    decorators_1.Injectable(true),
    __metadata("design:paramtypes", [_services_1.HandyConfigService, _services_1.HandyErrorService])
], DefaultHandyServer);
exports.DefaultHandyServer = DefaultHandyServer;
/*

  "Cannot read property 'lazyrouter' of undefined"
  Got this error while working on this file, funny, never seen that before.

  Developers live is so rich and colorful, there is alway some new surprising error
  waiting for you ;)

*/ 
//# sourceMappingURL=server.initializer.js.map