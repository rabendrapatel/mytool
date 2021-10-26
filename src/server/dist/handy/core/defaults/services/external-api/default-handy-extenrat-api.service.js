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
exports.DefaultHandyExternalApiService = void 0;
const _services_1 = require("@services");
const https = __importStar(require("https"));
const http = __importStar(require("http"));
const querystring = __importStar(require("querystring"));
const injector_1 = require("@handy/core/injector/injector");
class DefaultHandyExternalApiService extends _services_1.HandyService {
    constructor() {
        super();
        this._protocol = 'https:';
    }
    set hostNme(host) {
        this._host = host;
    }
    set protocol(protocol) {
        this._protocol = protocol;
    }
    onInit() {
        this._handyErrorService = injector_1.Inject(_services_1.HandyErrorService);
    }
    get(endpoint, queryParams, headers, resEncoding = 'utf8') {
        return new Promise((resolve, reject) => {
            let handler = (this._protocol === 'https:') ? https : http;
            let requestCall = handler.request(this._parseRequestoptions(endpoint, 'get', queryParams, headers), res => {
                res.setEncoding(resEncoding);
                let body = '';
                res.on('data', chunk => {
                    body += chunk;
                });
                res.on('end', () => {
                    return resolve(this._parseResponse(body, res));
                });
            });
            requestCall.on('error', (err => {
                return reject(err);
            }));
            requestCall.end();
        });
    }
    delete(endpoint, queryParams, headers, resEncoding = 'utf8') {
        return new Promise((resolve, reject) => {
            let handler = (this._protocol === 'https:') ? https : http;
            let requestCall = handler.request(this._parseRequestoptions(endpoint, 'delete', queryParams, headers), res => {
                res.setEncoding(resEncoding);
                let body = '';
                res.on('data', chunk => {
                    body += chunk;
                });
                res.on('end', () => {
                    return resolve(this._parseResponse(body, res));
                });
            });
            requestCall.on('error', (err => {
                return reject(err);
            }));
            requestCall.end();
        });
    }
    postJSON(endpoint, body, queryParams, headers, resEncoding = 'utf8') {
        return new Promise((resolve, reject) => {
            let bodyString = JSON.stringify(body);
            let handler = (this._protocol === 'https:') ? https : http;
            let requestCall = handler.request(this._parseRequestoptions(endpoint, 'post', queryParams, this._appendOutgoingJSONHeaders(bodyString, headers)), res => {
                res.setEncoding(resEncoding);
                let body = '';
                res.on('data', chunk => {
                    body += chunk;
                });
                res.on('end', () => {
                    return resolve(this._parseResponse(body, res));
                });
            });
            requestCall.on('error', (err => {
                return reject(err);
            }));
            requestCall.write(bodyString);
            requestCall.end();
        });
    }
    putJSON(endpoint, body, queryParams, headers, resEncoding = 'utf8') {
        return new Promise((resolve, reject) => {
            let bodyString = JSON.stringify(body);
            let handler = (this._protocol === 'https:') ? https : http;
            let requestCall = handler.request(this._parseRequestoptions(endpoint, 'put', queryParams, this._appendOutgoingJSONHeaders(bodyString, headers)), res => {
                res.setEncoding(resEncoding);
                let body = '';
                res.on('data', chunk => {
                    body += chunk;
                });
                res.on('end', () => {
                    return resolve(this._parseResponse(body, res));
                });
            });
            requestCall.on('error', (err => {
                return reject(err);
            }));
            requestCall.write(bodyString);
            requestCall.end();
        });
    }
    postFormUrlencoded(endpoint, body, queryParams, headers, resEncoding = 'utf8') {
        return new Promise((resolve, reject) => {
            let bodyString = querystring.stringify(body);
            let handler = (this._protocol === 'https:') ? https : http;
            let requestCall = handler.request(this._parseRequestoptions(endpoint, 'post', queryParams, this._appendOutgoingFormUrlencodedHeaders(bodyString, headers)), res => {
                res.setEncoding(resEncoding);
                let body = '';
                res.on('data', chunk => {
                    body += chunk;
                });
                res.on('end', () => {
                    return resolve(this._parseResponse(body, res));
                });
            });
            requestCall.on('error', (err => {
                return reject(err);
            }));
            requestCall.write(bodyString);
            requestCall.end();
        });
    }
    putFormUrlencoded(endpoint, body, queryParams, headers, resEncoding = 'utf8') {
        return new Promise((resolve, reject) => {
            let bodyString = querystring.stringify(body);
            let handler = (this._protocol === 'https:') ? https : http;
            let requestCall = handler.request(this._parseRequestoptions(endpoint, 'put', queryParams, this._appendOutgoingFormUrlencodedHeaders(bodyString, headers)), res => {
                res.setEncoding(resEncoding);
                let body = '';
                res.on('data', chunk => {
                    body += chunk;
                });
                res.on('end', () => {
                    return resolve(this._parseResponse(body, res));
                });
            });
            requestCall.on('error', (err => {
                return reject(err);
            }));
            requestCall.write(bodyString);
            requestCall.end();
        });
    }
    _parseResponse(respBody, res) {
        let { headers = {}, statusCode } = res;
        let body = respBody;
        if (isNotEmpty(headers['content-type']) && (headers['content-type'].includes('application/json') || headers['content-type'].includes('text/javascript'))) {
            body = JSON.parse(respBody);
        }
        return {
            statusCode: res.statusCode,
            body,
            headers: res.headers
        };
    }
    _parseEndpoint(endpoint, queryParams) {
        if (endpoint.length > 0 && !endpoint.startsWith('/')) {
            endpoint = `/${endpoint}`;
        }
        if (queryParams) {
            if (!endpoint.endsWith('?')) {
                endpoint = `${endpoint}?`;
            }
            endpoint += querystring.stringify(queryParams);
        }
        return endpoint;
    }
    _parseRequestoptions(endpoint, method, queryParams, headers) {
        return { hostname: this._host, path: this._parseEndpoint(endpoint, queryParams), protocol: this._protocol, method: method.toUpperCase(), headers };
    }
    _appendOutgoingJSONHeaders(body, headers = {}) {
        headers['Content-Type'] = 'application/json; charset=UTF-8';
        headers['Content-Length'] = body.length;
        return headers;
    }
    _appendOutgoingFormUrlencodedHeaders(body, headers = {}) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        headers['Content-Length'] = Buffer.byteLength(body);
        return headers;
    }
}
exports.DefaultHandyExternalApiService = DefaultHandyExternalApiService;
//# sourceMappingURL=default-handy-extenrat-api.service.js.map