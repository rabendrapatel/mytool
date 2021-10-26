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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyConfigService = void 0;
const _services_1 = require("@services");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const decorators_1 = require("@handy/core/decorators");
const process_1 = require("process");
class DefaultHandyConfigService extends _services_1.HandyService {
    constructor() {
        super();
        this.path = path;
        this.fs = fs;
        this._nodeVersionString = process_1.versions.node;
        this.loadRawData();
        this.parseRawData();
    }
    loadRawData() {
        this.rawData = JSON.parse(this.fs.readFileSync(this.path.join(__rootDir, 'handy.json'), { encoding: 'utf-8' }));
    }
    parseRawData() {
        let settingNames = Object.keys(this.rawData);
        let settingsLen = settingNames.length;
        let values = {};
        let publicValues = {};
        let envPreffix;
        if (__env === 'stag') {
            envPreffix = 'stagVal';
        }
        if (__env === 'dev') {
            envPreffix = 'devVal';
        }
        for (let i = 0; i < settingsLen; i++) {
            const settingName = settingNames[i];
            let settingVal = this.rawData[settingName].val;
            const envVal = (envPreffix === undefined) ? undefined : this.rawData[settingName][envPreffix];
            const isObject = (typeof settingVal === 'object');
            const isPublic = (this.rawData[settingName].public === true) ? true : false;
            if (envVal !== undefined) {
                if (isObject) {
                    settingVal = Object.assign(Object.assign({}, settingVal), envVal);
                }
                else {
                    settingVal = envVal;
                }
            }
            values[settingName] = settingVal;
            if (isPublic) {
                publicValues[settingName] = settingVal;
            }
        }
        this.configData = values;
        if (__isStag) {
            // @ts-ignore
            let jwtTypes = Object.keys(this.configData.jwt.types);
            let typesLen = jwtTypes.length;
            for (let i = 0; i < typesLen; i++) {
                const singleType = jwtTypes[i];
                this.configData.jwt.types[singleType].secret += '_stag';
            }
        }
        this.publicConfigData = publicValues;
    }
    get() {
        return this.configData;
    }
    getPublic() {
        return Object.assign(Object.assign({}, this.publicConfigData), { env: __env });
    }
    getMongoConnectionUri() {
        let mongoSettings = this.configData.mongoDB;
        let uri = '';
        if (mongoSettings.local) {
            mongoSettings.host = 'localhost';
        }
        if (mongoSettings.dbName == 'this#projectName') {
            this.configData.mongoDB.dbName = this.get().projectName;
            this.configData.mongoDB.dbName += `_${__env}_mongo_db`;
        }
        let dbName = this.configData.mongoDB.dbName = this.configData.mongoDB.dbName.replace(/ /g, '_').toLowerCase();
        uri = 'mongodb://' + mongoSettings.host + ':' + mongoSettings.port + '/' + mongoSettings.dbName;
        if (mongoSettings.auth) {
            uri = 'mongodb://' + mongoSettings.user + ':' + mongoSettings.password + '@' + mongoSettings.host + ':' + mongoSettings.port + '/' + dbName + '?authSource=admin';
        }
        if (mongoSettings.secret == 'this#default') {
            this.configData.mongoDB.secret = this.get().secret;
        }
        return uri.replace(/ /g, '_');
    }
    getServerUrl() {
        if (this._serverUrl) {
            return this._serverUrl;
        }
        let configDomain = this.get().domain;
        configDomain = configDomain.replace('http://', '').replace('https://', '');
        if (configDomain.startsWith('www.')) {
            configDomain = configDomain.replace('www.', '');
        }
        while (configDomain.includes('/')) {
            configDomain.replace('/', '');
        }
        let finalServerUrl = (this.configData.ssl) ? 'https://' : 'http://';
        this._serverUrl = `${finalServerUrl}${configDomain}`;
        return this._serverUrl;
    }
    getClientUrl() {
        let url = this.getServerUrl();
        if (!url.endsWith('/')) {
            url += '/';
        }
        return url;
    }
    getApiUrl() {
        if (this._serverApiUrl) {
            return this._serverApiUrl;
        }
        this._serverApiUrl = `${this.getServerUrl()}/api`;
        return this._serverApiUrl;
    }
    getNodeVersion(type) {
        if (type === 'string') {
            // @ts-ignore
            return this._nodeVersionString;
        }
        if (this._nodeVersionNumber !== undefined) {
            // @ts-ignore
            return this._nodeVersionNumber;
        }
        let splittedStr = this._nodeVersionString.split('.');
        let splittedLen = splittedStr.length;
        let finalStr;
        if (splittedLen > 2) {
            splittedStr.length = 2;
        }
        finalStr = this._nodeVersionString;
        if (splittedLen > 1) {
            finalStr = splittedStr.join('.');
        }
        // @ts-ignore
        return parseFloat(finalStr);
    }
    servePublicConfigData(request, response, user, query) {
        let XSRF_TOKEN = request.getCookie(true, 'XSRF-TOKEN', undefined);
        let HANDY_CLIENT_DEVICE_ID = request.getCookie(true, this.get().deviceIdCookieHash, undefined);
        response.jsonResponse(Object.assign(Object.assign({}, this.getPublic()), { XSRF_TOKEN, HANDY_CLIENT_DEVICE_ID }));
    }
}
__decorate([
    decorators_1.GetApiRequest({
        publicRoute: true,
        customUrlPath: 'public-config-data',
        apiVersions: '1'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyConfigService.prototype, "servePublicConfigData", null);
exports.DefaultHandyConfigService = DefaultHandyConfigService;
//# sourceMappingURL=default-handy-config.service.js.map