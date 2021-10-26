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
exports.DefaultHandySocketController = void 0;
const _services_1 = require("@services");
const core_1 = require("@handy/core");
const core_utils_1 = require("@handy/core/core-utils");
const cookieParser = __importStar(require("socket.io-cookie-parser"));
class DefaultHandySocketController {
    constructor() {
        this._namespaceSettings = this.constructor.prototype.SocketControllerSettings;
        this._handyError = core_1.Inject(_services_1.HandyErrorService);
        this._handyJwtService = core_1.Inject(_services_1.HandyJwtService);
        this._handyConfig = core_1.Inject(_services_1.HandyConfigService);
        this.__coreUtils = core_1.Inject(core_utils_1.__HandyCoreUtils);
        this.__parseNamespaceDecoratorSettings();
    }
    __parseNamespaceDecoratorSettings() {
        let { namespace = '/', connectionRestrictions = {}, defaultRommsManagement = true, roomJoiningRestrictions = {}, defaultConnectionManagement = true, } = this._namespaceSettings;
        this.__nameSpaceName = (namespace.startsWith('/')) ? namespace : `/${namespace}`;
        this.__namespaceConnectionRestrictions = connectionRestrictions;
        this.__defaultRoomsManagement = defaultRommsManagement;
        this.__defaultConnectionManagement = defaultConnectionManagement;
        this.__roomJoiningRestrictions = roomJoiningRestrictions;
    }
    // ? Called from bootstrap...
    __connectToServer(socketIo) {
        this._ioInstance = socketIo;
        this._ioNsp = this._ioInstance.of(this.__nameSpaceName);
        this._ioNsp.use(cookieParser.default(this._handyConfig.get().cookieSecret));
        this._ioNsp.on('connection', ((socket) => {
            this._rawSocketMiddleware(socket);
            this.__coreUtils.extendSocketEmitterAndClientListenrs(socketIo, socket, this.__nameSpaceName);
            this.__coreUtils.parseEventPayload(socket);
            this._checkConnectionAccess(socket)
                .then(() => {
                if (this.__defaultConnectionManagement) {
                    this.__defaultOnConnectionHandler(socket);
                }
                if (this.__defaultRoomsManagement) {
                    this.__roomsManagement(socket);
                }
                this._onConnectionHandler(socket);
            })
                .catch(err => {
                this._handyError.register(err, 'medium', 'Server error');
                this.__coreUtils.disconnectSocketFormNamespace(socket, this.__nameSpaceName);
            });
        }));
    }
    __roomsManagement(socket) {
        let isFnTypeValidator = this.__coreUtils.isSocketAccessFnTypeValidator(this.__roomJoiningRestrictions);
        if (isFnTypeValidator) {
            socket.use((packet, next) => {
                if (packet[0] === 'joinRooms') {
                    this.__roomJoiningRestrictions.accessValidationfn(socket, packet, next);
                }
                else {
                    return next();
                }
            });
        }
        socket.on('joinRooms', (data) => {
            if (!isFnTypeValidator && !this.__coreUtils.checkSocketAccessRules(socket, data.user, this.__roomJoiningRestrictions)) {
                return;
            }
            socket.join(data.eventData, (err) => {
                if (err) {
                    this._handyError.register(err, 'medium', 'Server error', undefined, { private: { msg: 'Socket rooms joining error', data } });
                }
            });
        });
        socket.on('leaveRooms', data => {
            socket.leave(data.eventData, (err) => {
                if (err) {
                    this._handyError.register(err, 'medium', 'Server error', undefined, { private: { msg: 'Socket rooms leaving error', data } });
                }
            });
        });
    }
    __defaultOnConnectionHandler(socket) {
    }
    _onConnectionHandler(socket) {
    }
    _rawSocketMiddleware(socket) {
    }
    _checkConnectionAccess(socket) {
        let { accessToken = null } = socket.handshake.query;
        return new Promise((resolve, reject) => {
            if (accessToken === 'undefined' || accessToken === 'null') {
                accessToken = null;
            }
            this._handyJwtService.extractUserDataFormToken(accessToken)
                .then(user => {
                let isFnTypeValidator = this.__coreUtils.isSocketAccessFnTypeValidator(this.__namespaceConnectionRestrictions);
                if (isFnTypeValidator) {
                    this.__namespaceConnectionRestrictions.accessValidationfn(socket, user);
                    return resolve();
                }
                if (!isFnTypeValidator && this.__coreUtils.checkSocketAccessRules(socket, user, this.__namespaceConnectionRestrictions)) {
                    return resolve();
                }
                return reject(this._handyError.register(null, 'low', 'Forbidden'));
            })
                .catch(err => {
                return reject(this._handyError.register(err, 'medium', 'Server error', undefined, { private: `Error while checking socket connection access` }));
            });
        });
    }
}
exports.DefaultHandySocketController = DefaultHandySocketController;
//# sourceMappingURL=default-handy-socket.controller.js.map