"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnSocketEvent = void 0;
const addSocketListenersHoldersToPrototype = (prototype) => {
    if (prototype.__handySocketEventListeners === undefined) {
        let emptySocketListenersPrototypeHolder = [];
        prototype.__handySocketEventListeners = emptySocketListenersPrototypeHolder;
        prototype.__getSocketEventListeners = () => {
            return prototype.__handySocketEventListeners;
        };
    }
};
const addSocketEventListenerToPrototype = (method, settings, prototype, className) => {
    addSocketListenersHoldersToPrototype(prototype);
    let automaticSettings = {
        eventName: method,
        method
    };
    // if (condition) {
    // }
    prototype.__handySocketEventListeners.push(Object.assign(Object.assign({}, automaticSettings), settings));
};
/* ---------------------------- Socket event listeners --------------------------- */
const OnSocketEvent = (socketEventListener = {}) => {
    return (target, methodName, descriptor) => {
        addSocketEventListenerToPrototype(methodName, socketEventListener, target.constructor.prototype, target.constructor.name);
    };
};
exports.OnSocketEvent = OnSocketEvent;
//# sourceMappingURL=socket-event.decorator.js.map