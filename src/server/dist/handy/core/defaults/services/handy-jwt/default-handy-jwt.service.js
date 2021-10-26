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
exports.DefaultHandyJwtService = void 0;
const _services_1 = require("@services");
const jsonWebToken = __importStar(require("jsonwebtoken"));
const core_1 = require("@handy/core");
class DefaultHandyJwtService {
    constructor(config, errorService) {
        this.config = config;
        this.errorService = errorService;
        this._jwt = jsonWebToken;
        this._settings = this.config.get().jwt;
        this._sufixesHolder = {};
        this._sufixesList = [];
        this._sufixesLen = 0;
        this._parseSufixesHolder();
    }
    onInit() {
        this._handyUtilsService = core_1.Inject(_services_1.HandyUtilsService);
    }
    generateToken(payLoad, jwtType = 'webApp') {
        return new Promise((resolve, reject) => {
            let { lifeSpan = 0, lifeSpanUnit = 'ms', secret, sufix, prefix } = this._settings.types[jwtType];
            let expiresIn = this._handyUtilsService.handyTimeUnitToMs(lifeSpan, lifeSpanUnit).toString();
            let expiryMoment = new Date(new Date().getTime() + parseInt(expiresIn)).getTime();
            let finalPayload = {
                data: payLoad,
                expiryMoment,
                lifeSpan,
                expiresIn: parseInt(expiresIn),
                lifeSpanUnit: lifeSpanUnit
            };
            this._jwt.sign(finalPayload, secret, { expiresIn }, (err, token) => {
                token = `${prefix}${token}${sufix}`;
                if (err) {
                    let additionalData = {
                        private: {
                            msg: 'Error while generating JWT token',
                            payLoad
                        }
                    };
                    let jwtError = this.errorService.register(err, 'high', 'Server error', undefined, additionalData);
                    return reject(jwtError);
                }
                let result = {
                    token,
                    expiryMoment,
                    lifeSpan,
                    expiresIn: parseInt(expiresIn),
                    lifeSpanUnit: lifeSpanUnit
                };
                return resolve(result);
            });
        });
    }
    decodeToken(token) {
        return new Promise((resolve, reject) => {
            let jwtType = this._getTokenType(token);
            if (!jwtType) {
                let jwtError = this.errorService.register(new Error('Unknown token type'), 'medium', 'Bad request');
                return reject(jwtError);
            }
            let { secret, prefix, sufix } = this._settings.types[jwtType];
            token = token.replace(prefix, '');
            token = this._handyUtilsService.sliceFromEndOfString(token, sufix.length);
            this._jwt.verify(token, secret, (err, payLoad) => {
                if (err) {
                    let additionalData = {
                        private: {
                            msg: 'Error while decoding JWT token',
                            token,
                            jwtType
                        }
                    };
                    let jwtError = this.errorService.register(err, 'low', undefined, undefined, additionalData);
                    return reject(jwtError);
                }
                return resolve(payLoad);
            });
        });
    }
    extractUserDataFormToken(token) {
        let serverRequestUser = this.generateEmptyServerRequestUser();
        if (!token) {
            return Promise.resolve(serverRequestUser);
        }
        else {
            return new Promise((resolve, reject) => {
                this.decodeToken(token)
                    .then(payLoad => {
                    return resolve(this.generateKnownServerRequestUser(payLoad.data));
                })
                    .catch(err => {
                    return reject(this.errorService.register(err, 'medium', 'Server error', undefined, { private: `Token parsing error ` }));
                });
            });
        }
    }
    generateEmptyServerRequestUser() {
        let serverRequestUser = {
            loggedIn: false,
            email: null,
            _id: null,
            roles: [],
            groups: [],
            permissions: [],
            groupId: null,
            hasRoles: (roles) => {
                if (!serverRequestUser.loggedIn) {
                    return false;
                }
                if (serverRequestUser.roles.includes('superAdmin')) {
                    return true;
                }
                if (isArray(roles)) {
                    let rolesLen = roles.length;
                    for (let i = 0; i < rolesLen; i++) {
                        const requiredRole = roles[i];
                        if (serverRequestUser.roles.includes(requiredRole)) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return serverRequestUser.roles.includes(roles);
                }
            },
            hasPermissions: (permissions) => {
                if (!serverRequestUser.loggedIn) {
                    return false;
                }
                if (serverRequestUser.roles.includes('superAdmin')) {
                    return true;
                }
                if (isArray(permissions)) {
                    if (permissions.includes('loggedIn')) {
                        return true;
                    }
                    let permissionsLen = permissions.length;
                    for (let i = 0; i < permissionsLen; i++) {
                        const requiredPermission = permissions[i];
                        if (serverRequestUser.permissions.includes(requiredPermission)) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    if (permissions === 'loggedIn') {
                        return true;
                    }
                    return serverRequestUser.permissions.includes(permissions);
                }
            },
            isMemberOfGroupTypes: (groups) => {
                if (!serverRequestUser.loggedIn) {
                    return false;
                }
                if (serverRequestUser.roles.includes('superAdmin')) {
                    return true;
                }
                if (isArray(groups)) {
                    let groupsLen = groups.length;
                    for (let i = 0; i < groupsLen; i++) {
                        const requiredgroup = groups[i];
                        if (serverRequestUser.groups.includes(requiredgroup)) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return serverRequestUser.groups.includes(groups);
                }
            },
            isMemberOfGroupId: (groupId) => {
                if (!serverRequestUser.loggedIn) {
                    return false;
                }
                if (isArray(groupId)) {
                    let groupIdLen = groupId.length;
                    for (let i = 0; i < groupIdLen; i++) {
                        const requiredGrupId = groupId[i];
                        if (serverRequestUser.groupId === requiredGrupId) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return serverRequestUser.groupId === groupId;
                }
            },
        };
        return Object.assign({}, serverRequestUser);
    }
    generateKnownServerRequestUser(userData) {
        let { email = null, _id = null, roles = [], groups = [], permissions = [], groupId = null } = userData;
        let serverRequestUser = {
            loggedIn: true,
            email,
            _id,
            roles,
            groups,
            permissions,
            groupId,
            hasRoles: (roles) => {
                if (!serverRequestUser.loggedIn) {
                    return false;
                }
                if (serverRequestUser.roles.includes('superAdmin')) {
                    return true;
                }
                if (isArray(roles)) {
                    let rolesLen = roles.length;
                    for (let i = 0; i < rolesLen; i++) {
                        const requiredRole = roles[i];
                        if (serverRequestUser.roles.includes(requiredRole)) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return serverRequestUser.roles.includes(roles);
                }
            },
            hasPermissions: (permissions) => {
                if (!serverRequestUser.loggedIn) {
                    return false;
                }
                if (serverRequestUser.roles.includes('superAdmin')) {
                    return true;
                }
                if (isArray(permissions)) {
                    if (permissions.includes('loggedIn')) {
                        return true;
                    }
                    let permissionsLen = permissions.length;
                    for (let i = 0; i < permissionsLen; i++) {
                        const requiredPermission = permissions[i];
                        if (serverRequestUser.permissions.includes(requiredPermission)) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    if (permissions === 'loggedIn') {
                        return true;
                    }
                    return serverRequestUser.permissions.includes(permissions);
                }
            },
            isMemberOfGroupTypes: (groups) => {
                if (!serverRequestUser.loggedIn) {
                    return false;
                }
                if (serverRequestUser.roles.includes('superAdmin')) {
                    return true;
                }
                if (isArray(groups)) {
                    let groupsLen = groups.length;
                    for (let i = 0; i < groupsLen; i++) {
                        const requiredgroup = groups[i];
                        if (serverRequestUser.groups.includes(requiredgroup)) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return serverRequestUser.groups.includes(groups);
                }
            },
            isMemberOfGroupId: (groupId) => {
                if (!serverRequestUser.loggedIn) {
                    return false;
                }
                if (isArray(groupId)) {
                    let groupIdLen = groupId.length;
                    for (let i = 0; i < groupIdLen; i++) {
                        const requiredGrupId = groupId[i];
                        if (serverRequestUser.groupId === requiredGrupId) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return serverRequestUser.groupId === groupId;
                }
            },
        };
        return Object.assign({}, serverRequestUser);
    }
    _getTokenType(token) {
        let tokenType;
        for (let i = 0; i < this._sufixesLen; i++) {
            const sufix = this._sufixesList[i];
            if (token.endsWith(sufix)) {
                tokenType = this._sufixesHolder[sufix];
                break;
            }
        }
        return tokenType;
    }
    _parseSufixesHolder() {
        let tokenTypes = Object.keys(this._settings.types);
        let typesLen = tokenTypes.length;
        for (let i = 0; i < typesLen; i++) {
            const type = tokenTypes[i];
            const sufix = this._settings.types[type].sufix;
            this._sufixesHolder[sufix] = type;
            this._sufixesList.push(sufix);
            this._sufixesLen++;
        }
    }
}
exports.DefaultHandyJwtService = DefaultHandyJwtService;
//# sourceMappingURL=default-handy-jwt.service.js.map