"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__HandyCoreUtils = void 0;
const decorators_1 = require("./decorators");
const _services_1 = require("@services");
let __HandyCoreUtils = class __HandyCoreUtils {
    constructor(config, handyJwtService, handyError) {
        this.config = config;
        this.handyJwtService = handyJwtService;
        this.handyError = handyError;
    }
    checkSocketAccessRules(socket, userData, rules = {}) {
        if (this.isSocketAccessFnTypeValidator(rules)) {
            return true;
        }
        if (isEmpty(rules)) {
            return true;
        }
        let { groups = [], permissions = [], publicAccess, roles = [] } = rules;
        let groupsLen = groups.length;
        let permissionsLen = permissions.length;
        let rolesLen = roles.length;
        if (!this.checkSocketPublicAccess(socket, publicAccess)) {
            return false;
        }
        let hasGroupsOrpermissionsRules = groupsLen > 0 || permissionsLen > 0 || rolesLen > 0;
        if (!userData.loggedIn && hasGroupsOrpermissionsRules) {
            return false;
        }
        if (!hasGroupsOrpermissionsRules) {
            return true;
        }
        if (groupsLen > 0 && userData.isMemberOfGroupTypes(groups)) {
            return true;
        }
        if (permissionsLen > 0 && userData.hasPermissions(permissions)) {
            return true;
        }
        if (rolesLen > 0 && userData.hasRoles(roles)) {
            return true;
        }
        return false;
    }
    checkSocketPublicAccess(socket, publicAccess = this.config.get().publicRoutingByDefault) {
        if (publicAccess) {
            return true;
        }
        // !Check if this one works correctly
        return socket.handshake.headers.host === this.config.get().domain;
    }
    isSocketAccessFnTypeValidator(rules = {}) {
        return isNotNullOrUndefined(rules.accessValidationfn);
    }
    attachSocketEventListener(socketInstance, eventListeneSettings) {
        let { eventName, namespace, accessRules, method, env = __env } = eventListeneSettings;
        if (!env.includes(__env)) {
            return;
        }
        socketInstance.of(namespace).on('connection', (socket) => {
            this.extendSocketEmitterAndClientListenrs(socketInstance, socket, namespace);
            this.parseEventPayload(socket);
            let hasFunctionTypeAccessvalidator = this.isSocketAccessFnTypeValidator(accessRules);
            if (hasFunctionTypeAccessvalidator) {
                socket.use((packet, next) => {
                    if (packet[0] === eventName) {
                        accessRules.accessValidationfn(socket, packet, next);
                    }
                    else {
                        return next();
                    }
                });
            }
            socket.on(eventName, (data) => {
                if (!hasFunctionTypeAccessvalidator && !this.checkSocketAccessRules(socket, data.user, accessRules)) {
                    return;
                }
                method(data.eventData, data.user, socket, data.rawData);
                return;
            });
        });
    }
    parseEventPayload(socket) {
        socket.use((packet, next) => {
            let originalPacaketData = packet[1];
            let packetdataKeys = Object.keys(originalPacaketData);
            if (packetdataKeys.includes('rawData') && packetdataKeys.includes('user')) {
                return next();
            }
            this.handyJwtService.extractUserDataFormToken(originalPacaketData.accessToken)
                .then(user => {
                // ! Parse user data from token
                let newSocketpayload = {
                    eventData: originalPacaketData.eventData,
                    rawData: originalPacaketData,
                    user
                };
                packet[1] = newSocketpayload;
                return next();
            })
                .catch(err => {
                return next(this.handyError.register(err, 'medium', 'Server error', undefined, { private: 'Error while parsing user data' }));
            });
        });
    }
    extendSocketEmitterAndClientListenrs(socketInstance, socket, eventNamespace) {
        if (socket.isHandyExtended === true) {
            return;
        }
        socket.on('leaveNamespace', () => {
            this.disconnectSocketFormNamespace(socket, eventNamespace);
        });
        socket.emitBackToSender = (eventName, data) => {
            socket.emit(eventName, data);
        };
        socket.emitToEveryoneExcludingSender = (eventName, rooms = [], data) => {
            let rommsLen = rooms.length;
            if (rommsLen === 0) {
                socket.broadcast.emit(eventName, data);
                return;
            }
            // for (let i = 0; i < rommsLen; i++) {
            //   const singleRoom = rooms[i];
            //   socket = socket.to(singleRoom) as any;
            //   todo original socket.to(singleRoom) as any;
            // }
            // todo check if not working, 
            socket.to(rooms).emit(eventName, data);
            return;
        };
        socket.emitToEveryoneIncludingSender = (eventName, rooms = [], data) => {
            let rommsLen = rooms.length;
            let nsp = socketInstance.of(eventNamespace);
            for (let i = 0; i < rommsLen; i++) {
                const singleRoom = rooms[i];
                nsp = nsp.to(singleRoom);
            }
            nsp.emit(eventName, data);
            return;
        };
        socket.emitToExternalNamespace = (namespaceName, eventName, rooms = [], data) => {
            let rommsLen = rooms.length;
            let nsp = socketInstance.of(namespaceName);
            for (let i = 0; i < rommsLen; i++) {
                const singleRoom = rooms[i];
                nsp = nsp.to(singleRoom);
            }
            nsp.emit(eventName, data);
            return;
        };
        socket.emitToAllConnectedClients = (eventName, data) => {
            socketInstance.emit(eventName, data);
        };
        socket.isHandyExtended = true;
    }
    disconnectSocketFormNamespace(socket, nameSpaceName) {
        if (nameSpaceName !== '/') {
            socket.disconnect(false);
        }
        return;
    }
};
__HandyCoreUtils = __decorate([
    decorators_1.Injectable(true),
    __metadata("design:paramtypes", [_services_1.HandyConfigService, _services_1.HandyJwtService, _services_1.HandyErrorService])
], __HandyCoreUtils);
exports.__HandyCoreUtils = __HandyCoreUtils;
//# sourceMappingURL=core-utils.js.map