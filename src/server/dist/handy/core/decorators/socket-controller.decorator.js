"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketNamespaceController = void 0;
const SocketNamespaceController = (socketControllerSettings = {}) => {
    return (target) => {
        let InjectionType = {
            singleton: true,
            injectable: true,
            ClassType: 'socketController'
        };
        if (isNullOrUndefined(socketControllerSettings.namespace)) {
            socketControllerSettings.namespace = '/';
        }
        if (isNullOrUndefined(socketControllerSettings.routable)) {
            socketControllerSettings.routable = false;
        }
        target.prototype.InjectionType = InjectionType;
        target.prototype.SocketControllerSettings = socketControllerSettings;
    };
};
exports.SocketNamespaceController = SocketNamespaceController;
//# sourceMappingURL=socket-controller.decorator.js.map