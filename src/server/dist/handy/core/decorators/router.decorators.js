"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteApiRequest = exports.PutApiRequest = exports.PostApiRequest = exports.GetApiRequest = exports.DeleteRequest = exports.PutRequest = exports.PostRequest = exports.GetRequest = void 0;
const addRoutesHoldersToPrototype = (prototype) => {
    if (prototype.__handyRequestListeners === undefined) {
        let emptyRoutesPrototypeHolder = [];
        prototype.__handyRequestListeners = emptyRoutesPrototypeHolder;
        prototype.__getHandyRequestListeners = () => {
            return prototype.__handyRequestListeners;
        };
    }
};
const addRequestListenerToPrototype = (method, settings, requestType, prototype, isApi = false) => {
    addRoutesHoldersToPrototype(prototype);
    let listener = {
        requestType,
        settings,
        method,
        isApi
    };
    prototype.__handyRequestListeners.push(listener);
};
/* ---------------------------- Regular listeners --------------------------- */
const GetRequest = (requestListenerSettings = {}) => {
    return (target, methodName, descriptor) => {
        addRequestListenerToPrototype(methodName, requestListenerSettings, 'get', target.constructor.prototype);
    };
};
exports.GetRequest = GetRequest;
const PostRequest = (requestListenerSettings = {}) => {
    return (target, methodName, descriptor) => {
        addRequestListenerToPrototype(methodName, requestListenerSettings, 'post', target.constructor.prototype);
    };
};
exports.PostRequest = PostRequest;
const PutRequest = (requestListenerSettings = {}) => {
    return (target, methodName, descriptor) => {
        addRequestListenerToPrototype(methodName, requestListenerSettings, 'put', target.constructor.prototype);
    };
};
exports.PutRequest = PutRequest;
const DeleteRequest = (requestListenerSettings = {}) => {
    return (target, methodName, descriptor) => {
        addRequestListenerToPrototype(methodName, requestListenerSettings, 'delete', target.constructor.prototype);
    };
};
exports.DeleteRequest = DeleteRequest;
/* ------------------------------ Api listeners ----------------------------- */
const GetApiRequest = (requestListenerSettings = {}) => {
    return (target, methodName, descriptor) => {
        addRequestListenerToPrototype(methodName, requestListenerSettings, 'get', target.constructor.prototype, true);
    };
};
exports.GetApiRequest = GetApiRequest;
const PostApiRequest = (requestListenerSettings = {}) => {
    return (target, methodName, descriptor) => {
        addRequestListenerToPrototype(methodName, requestListenerSettings, 'post', target.constructor.prototype, true);
    };
};
exports.PostApiRequest = PostApiRequest;
const PutApiRequest = (requestListenerSettings = {}) => {
    return (target, methodName, descriptor) => {
        addRequestListenerToPrototype(methodName, requestListenerSettings, 'put', target.constructor.prototype, true);
    };
};
exports.PutApiRequest = PutApiRequest;
const DeleteApiRequest = (requestListenerSettings = {}) => {
    return (target, methodName, descriptor) => {
        addRequestListenerToPrototype(methodName, requestListenerSettings, 'delete', target.constructor.prototype, true);
    };
};
exports.DeleteApiRequest = DeleteApiRequest;
//# sourceMappingURL=router.decorators.js.map