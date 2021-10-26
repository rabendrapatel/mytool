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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultClientServingMiddleware = void 0;
const core_1 = require("@handy/core");
const express = __importStar(require("express"));
const _services_1 = require("@services");
const path = __importStar(require("path"));
class DefaultClientServingMiddleware {
    constructor() {
        this._handyConfigService = core_1.Inject(_services_1.HandyConfigService);
        this._handyError = core_1.Inject(_services_1.HandyErrorService);
        this._handyUtilsService = core_1.Inject(_services_1.HandyUtilsService);
        this._handyUserService = core_1.Inject(_services_1.HandyUserService);
        this._clientRootPath = path.join(__rootDir, this._handyConfigService.get().webClientSettings.clientRootPath);
        this._clientDistPath = path.join(this._clientRootPath, 'dist/web');
        this._clientBrowserPath = path.join(this._clientDistPath, 'browser');
        this._clientServerPath = path.join(this._clientDistPath, 'server');
        this._clientServerTemplatingEnginePath = path.join(this._clientServerPath, 'main.js');
        this._clientIndexFilePath = path.join(this._clientBrowserPath, 'index.html');
        this._assetsPath = path.join(this._clientBrowserPath, 'assets/');
        this._angSsr = require(this._clientServerTemplatingEnginePath);
    }
    middleware(app) {
        if (!this._handyConfigService.get().isMicroService) {
            // @ts-ignore
            app.get('/assets', express.static(this._assetsPath));
            // @ts-ignore
            app.get('*.*', express.static(this._clientBrowserPath));
            if (this._handyConfigService.get().webClientSettings.ssr) {
                this._ssrServing(app);
            }
            else {
                this._nonSsrServing(app);
            }
        }
        else {
            app.get('/', (req, res) => {
                res.jsonResponse({
                    msg: 'This is a microservice'
                });
            });
        }
    }
    _nonSsrServing(app) {
        app.get('*', (request, response, next) => {
            if (request.isApiRoute === true) {
                return next();
            }
            this._attachClientCookies(request, response);
            return response.sendFile(this._clientIndexFilePath);
        });
    }
    _ssrServing(app) {
        app.get('*', (request, response, next) => {
            if (request.isApiRoute === true) {
                return next();
            }
            const XSRF_TOKEN = this._attachClientCookies(request, response);
            let userDataToAttach;
            new Promise((resolve, reject) => {
                if (!request.user.loggedIn) {
                    let refreshToken = request.getCookie(true, 'Authorization_refresh', null);
                    if (!refreshToken) {
                        return resolve(null);
                    }
                    this._handyUserService.extractUserDataFromRefreshToken(refreshToken, request)
                        .then(result => {
                        return resolve(result.email);
                    })
                        .catch(err => {
                        return resolve(null);
                    });
                }
                else {
                    return resolve(request.user.email);
                }
            })
                .then(userEmail => {
                if (!userEmail) {
                    return Promise.resolve(null);
                }
                return this._handyUserService.getUserData(userEmail);
            })
                .then(userData => {
                if (!userData || !userData.foundRecord) {
                    return Promise.resolve(null);
                }
                userDataToAttach = userData.doc;
                return this._handyUserService.generateAccessTokenFromUserData(userDataToAttach);
            })
                .then(accessTokenData => {
                // ? just in case of some bug causing ssr rendering issue without thowing an error, eg unsubscribed observable 
                let timeout = setTimeout(() => {
                    if (!response.sent) {
                        response.sendFile(this._clientIndexFilePath);
                        this._handyError.register(null, 'high', 'Server error', undefined, { private: 'Ssr rendering failed because of timeout' }, request, response);
                        return;
                    }
                }, this._handyConfigService.get().webClientSettings.ssrRenderingTimeout);
                // Return promise with generating user token...
                response.render(this._clientIndexFilePath, {
                    req: request,
                    providers: [
                        { provide: this._angSsr.ANG_BASE_HREF, useValue: request.baseUrl },
                        { provide: 'XSRF_TOKEN', useValue: XSRF_TOKEN },
                        { provide: 'SERVER_SECRET', useValue: this._handyConfigService.get().secret },
                        { provide: 'HANDY_CONFIG', useValue: this._handyConfigService.getPublic() },
                        { provide: 'HANDY_USER_DATA', useValue: userDataToAttach },
                        { provide: 'HANDY_USER_ACCESS_TOKEN', useValue: accessTokenData === null || accessTokenData === void 0 ? void 0 : accessTokenData.token },
                        { provide: 'SERVER_REQUEST', useValue: request },
                        { provide: 'SERVER_RESPONSE', useValue: response },
                    ]
                }, (err, html) => {
                    clearTimeout(timeout);
                    if (err) {
                        this._handyError.register(err, 'high', 'Server error', undefined, { private: 'Ssr rendering failed' }, request, response);
                        if (!response.sent) {
                            response.sendFile(this._clientIndexFilePath);
                            return;
                        }
                    }
                    else {
                        if (!response.sent) {
                            response.send(html);
                            return;
                        }
                    }
                });
            })
                .catch(err => {
                response.sendFile(this._clientIndexFilePath);
                this._handyError.register(err, 'high', 'Server error', undefined, { private: 'Ssr rendering failed' }, request, response);
                return;
            });
        });
    }
    registerTemplatingEngine(app) {
        app.engine('html', this._angSsr.engine());
        app.set('view engine', 'html');
        app.set('views', this._clientBrowserPath);
    }
    _attachClientCookies(request, response) {
        this._attachDeviceCookie(request, response);
        return this._attachXSRF(request, response);
    }
    _attachXSRF(request, response) {
        let XSRF_TOKEN = request.getCookie(true, 'XSRF-TOKEN', this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false }));
        response.setCookie('XSRF-TOKEN', XSRF_TOKEN, { signed: true, lifespan: { d: 365 }, serverOnly: false, sameSite: true });
        return XSRF_TOKEN;
    }
    _attachDeviceCookie(request, response) {
        let deviceId = request.getCookie(true, this._handyConfigService.get().deviceIdCookieHash, null);
        if (!deviceId) {
            response.setCookie(this._handyConfigService.get().deviceIdCookieHash, this._handyUtilsService.generateHash({ lowerCaseletters: true, capitalsLetters: true, digits: true, emptySpace: false, specialChars: false }, true), { signed: true, lifespan: { d: 365 }, sameSite: false });
            request.locals.deviceId = deviceId;
            request.locals.deviceIdType = 'cookie';
        }
    }
}
exports.DefaultClientServingMiddleware = DefaultClientServingMiddleware;
//# sourceMappingURL=default-client-serving.middleware.js.map