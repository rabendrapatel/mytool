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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyMiddleware = void 0;
const core_1 = require("@handy/core");
const _services_1 = require("@services");
const bodyParser = __importStar(require("body-parser"));
const cookieParser = __importStar(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const querystring_1 = require("querystring");
class DefaultHandyMiddleware {
    constructor() {
        this._handyConfigService = core_1.Inject(_services_1.HandyConfigService);
        this._handyErrorService = core_1.Inject(_services_1.HandyErrorService);
        this._handyJwtService = core_1.Inject(_services_1.HandyJwtService);
        this._handyUtilsService = core_1.Inject(_services_1.HandyUtilsService);
        this._handyUserService = core_1.Inject(_services_1.HandyUserService);
        this._bodyParser = bodyParser;
        this._cookieParser = cookieParser;
        this._allowedCorsOrigins = this._handyConfigService.get().cors.allowedOrigins;
        this._corsActive = this._handyConfigService.get().cors.active;
        this._corsMethods = this._handyConfigService.get().cors.methodsToCheck;
        this._handyCookieObjectValPrefix = this._handyConfigService.get().objectCookiePreffix;
        this._refreshTokenKoeficient = this._handyConfigService.get().jwt.types.refresh.refreshKoeficient;
        this._corsOptionsDelegate = (request, callback) => {
            let corsOptions = {
                origin: true,
                methods: this._corsMethods,
            };
            // ? is public route or all origins are allowed or is dev enviroment
            if (this._allowedCorsOrigins.includes('*') || __isDev) {
                callback(null, corsOptions);
                return;
            }
            let origin = request.getHeader("Origin", null);
            // ? origin is unknown
            if (isNullOrUndefined(origin)) {
                callback(null, corsOptions);
                return;
            }
            // ? is listed in allowed origins
            if (this._allowedCorsOrigins.includes(origin)) {
                callback(null, corsOptions);
                return;
            }
            else {
                corsOptions.origin = false;
                let err = this._handyErrorService.register(null, 'medium', 'Unauthorized', 'Cors origin', undefined, request);
                callback(err, corsOptions); // is not listed in allowed origins
                return;
            }
        };
    }
    middleware(app) {
        this._addStartedAt(app);
        this._bodyParserMiddleware(app);
        this._cookieParserMiddleware(app);
        this._requestAndResponseExtender(app);
        this._parseUserDataFromToken(app);
        this._corsMiddleware(app);
        this._extendRefreshToken(app);
    }
    /* -------------------------------------------------------------------------- */
    /*                             Regular middlewares                            */
    /* -------------------------------------------------------------------------- */
    _addStartedAt(app) {
        app.use((request, response, next) => {
            const startMoment = process.hrtime();
            request.startedAt = Date.now();
            response.on('finish', () => {
                response.sent = true;
                request.endedAt = Date.now();
                const elapsedTime = process.hrtime(startMoment);
                const elapsedTimeInMs = parseInt((elapsedTime[0] * 1000 + elapsedTime[1] / 1e6).toFixed(0));
                request.duration = elapsedTimeInMs;
            });
            return next();
        });
    }
    _bodyParserMiddleware(app) {
        app.use(this._bodyParser.urlencoded({
            extended: true
        }));
        app.use(this._bodyParser.json());
    }
    _cookieParserMiddleware(app) {
        app.use(this._cookieParser.default(this._handyConfigService.get().cookieSecret));
    }
    _corsMiddleware(app) {
        if (this._corsActive) {
            app.use(cors_1.default(this._corsOptionsDelegate));
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                       Request and response extenders                       */
    /* -------------------------------------------------------------------------- */
    _requestAndResponseExtender(app) {
        app.use((request, response, next) => {
            request.locals = {};
            request.isApiRoute = request.url.startsWith('/api');
            this._addRequestMethodGetter(request);
            this._addCookieGetter(request);
            this._addHeaderGetter(request);
            this._addHasNonPublicRoutesAccessCheck(request);
            this._addJsonResponse(response);
            this._addResponseClientRedirect(response);
            this._addErrorResponse(request, response);
            this._addCookieSetter(response);
            this._addHeadersSetter(response);
            request.handyClientSessionId = request.getHeader('Handy-client-session-id', null);
            let deviceIdCookie = request.getCookie(true, this._handyConfigService.get().deviceIdCookieHash, null);
            let deviceIdHeader = request.getHeader('Handy-client-device-id', null);
            let deviceId = (deviceIdCookie) ? deviceIdCookie : deviceIdHeader;
            if (deviceId) {
                request.locals.deviceId = deviceId;
                if (deviceIdCookie) {
                    response.setCookie(this._handyConfigService.get().deviceIdCookieHash, deviceId, { signed: true, lifespan: { d: 365 }, sameSite: false });
                    request.locals.deviceIdType = 'cookie';
                }
                else {
                    request.locals.deviceIdType = 'header';
                }
            }
            return next();
        });
    }
    _parseUserDataFromToken(app) {
        app.use((request, response, next) => {
            let AuthorizationCookie = request.getCookie(true, 'Authorization', null);
            let AuthorizationHeader = request.getHeader('Authorization', null);
            let token = null;
            if (AuthorizationCookie) {
                token = AuthorizationCookie;
            }
            if (!token && AuthorizationHeader) {
                token = AuthorizationHeader;
            }
            this._handyJwtService.extractUserDataFormToken(token)
                .then(finalresult => {
                request.user = finalresult;
                return next();
            })
                .catch(err => {
                err = this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request, response);
                return next(err);
            });
        });
    }
    _extendRefreshToken(app) {
        app.use((request, response, next) => {
            let AuthorizationRefreshCookie = request.getCookie(true, 'Authorization_refresh', null);
            if (!AuthorizationRefreshCookie) {
                return next();
            }
            this._handyJwtService.decodeToken(AuthorizationRefreshCookie)
                .then(tokenData => {
                let now = new Date().getTime();
                let { expiresIn, expiryMoment } = tokenData;
                let tokenPayload = tokenData.data;
                let lifeSpanLeft = expiryMoment - now;
                if (lifeSpanLeft < 1 || lifeSpanLeft > expiresIn - (expiresIn * this._refreshTokenKoeficient)) {
                    return Promise.resolve(null);
                }
                return this._handyUserService.generateRefreshToken(tokenPayload.email, tokenPayload.keyPairCheck);
            })
                .then(refreshToken => {
                if (isNotNullOrUndefined(refreshToken)) {
                    response.setCookie('Authorization_refresh', refreshToken.token, { lifespan: { [refreshToken.lifeSpanUnit]: refreshToken.lifeSpan }, signed: true, sameSite: true, serverOnly: true });
                }
                return next();
            })
                .catch(err => {
                this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request, response);
                return next();
            });
        });
    }
    _addRequestMethodGetter(request) {
        request.methodType = request.method.toLowerCase;
    }
    _addCookieGetter(request) {
        request.getCookie = (signed, name, returnValueIfEmpty) => {
            if (!name) {
                return returnValueIfEmpty;
            }
            let cookieVal = request[(signed) ? 'signedCookies' : 'cookies'][name];
            if (isNotEmpty(cookieVal) && typeof cookieVal === 'string') {
                if (cookieVal.startsWith(this._handyCookieObjectValPrefix)) {
                    cookieVal = JSON.parse(cookieVal.replace(this._handyCookieObjectValPrefix, '')).value;
                }
            }
            return isNotEmpty(cookieVal) ? cookieVal : returnValueIfEmpty;
        };
    }
    _addCookieSetter(response) {
        response.setCookie = (name, value, cookieOptions = {}) => {
            let { path = '/', lifespan = {}, signed = true, sameSite = true, secure = this._handyConfigService.get().ssl, serverOnly = false } = cookieOptions;
            let maxAge = this._handyUtilsService.handyTimeObjectToMs(lifespan);
            let finalCookieOptions = {
                path,
                signed,
                sameSite,
                secure,
                httpOnly: serverOnly,
                expires: new Date(Date.now() + maxAge),
            };
            let finalVal;
            if (typeof value === 'string') {
                finalVal = value;
            }
            else {
                finalVal = `${this._handyCookieObjectValPrefix}${JSON.stringify({ value })}`;
            }
            response.cookie(name, finalVal, finalCookieOptions);
        };
    }
    _addHeaderGetter(request) {
        request.getHeader = (name, returnValueIfEmpty) => {
            let headerVal = request.headers[name.toLowerCase()];
            return isNotEmpty(headerVal) ? headerVal : returnValueIfEmpty;
        };
    }
    _addHeadersSetter(response) {
        response.addHeader = (name, value) => {
            response.append(name.toLowerCase(), value);
        };
    }
    _addJsonResponse(response) {
        response.jsonResponse = (data, success = true, code = 200) => {
            let result = {
                success,
                data
            };
            if (response.sent) {
                this._handyErrorService.register(null, 'high', 'Server error', 'Sending response after it was sent already!', { private: response });
            }
            response.status(code);
            response.json(result);
        };
    }
    _addResponseClientRedirect(response) {
        response.redirectToClient = (endpoint, queryParams) => {
            let qString;
            if (queryParams !== undefined) {
                qString = `?${querystring_1.stringify(queryParams)}`;
            }
            while (endpoint.includes('//')) {
                endpoint = endpoint.replace('//', '/');
            }
            if (endpoint.startsWith('/')) {
                endpoint = endpoint.substr(1);
            }
            if (qString !== undefined) {
                endpoint += qString;
            }
            endpoint = `${this._handyConfigService.getClientUrl()}${endpoint}`;
            return response.redirect(endpoint);
        };
        response.redirectToClientErrPage = (err) => {
            let queryParams = { code: err.errorCode };
            if (err.refCode) {
                queryParams.refCode = err.refCode;
            }
            return response.redirectToClient('error', queryParams);
        };
    }
    _addErrorResponse(request, response) {
        response.errorResponse = (error) => {
            if (!this._handyErrorService.isHandyError(error, request, response)) {
                error = this._handyErrorService.register(error, 'high', 'Server error', undefined, { private: 'Uncatched untyped error' }, request, response);
            }
            let { refCode, errorCode, errorHeadline, errorMsg, additionalData = {} } = error;
            let result = {
                success: false,
                errorCode,
                refCode,
                errorHeadline,
                errorMsg: (__isDev) ? errorMsg : this._handyErrorService.getDefaultErrorMsg(errorHeadline),
                additionalData: additionalData.public,
            };
            if (request.isApiRoute || request.methodType !== 'get') {
                response.jsonResponse(result, false, errorCode);
            }
            else {
                // TODO: Redirect to client error page
                response.jsonResponse({ error: `Shoudl redirect to clients error page because it's not an api route` });
            }
        };
    }
    _addHasNonPublicRoutesAccessCheck(request) {
        request.hasNonPublicRoutesAccess = () => {
            if (__isDev) {
                return true;
            }
            if (typeof request.locals.hasNonPublicRoutesAccess === 'boolean') {
                return request.locals.hasNonPublicRoutesAccess;
            }
            let hasNonPublicRoutesAccess = false;
            let headerToken = request.getHeader('X-xsrf-token', null);
            let cookieToken = request.getCookie(true, 'XSRF-TOKEN', null);
            // ? Check for anguar universal...
            if (!cookieToken && headerToken && headerToken.includes(`_${this._handyConfigService.get().secret}`)) {
                cookieToken = headerToken.replace(`_${this._handyConfigService.get().secret}`, '');
                headerToken = cookieToken;
            }
            if (isNotNull(headerToken) && isNotNull(cookieToken)) {
                hasNonPublicRoutesAccess = headerToken === cookieToken;
            }
            request.locals.hasNonPublicRoutesAccess = hasNonPublicRoutesAccess;
            return request.locals.hasNonPublicRoutesAccess;
        };
    }
}
exports.DefaultHandyMiddleware = DefaultHandyMiddleware;
//# sourceMappingURL=default-handy.middleware.js.map