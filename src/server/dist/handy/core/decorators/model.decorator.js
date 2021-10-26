"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseMW = exports.MongooseModel = void 0;
const addMiddlewaresHoldersToPrototype = (prototype) => {
    if (prototype.middlewares === undefined) {
        let emptyMiddlewaresHolder = [];
        prototype.middlewares = emptyMiddlewaresHolder;
    }
};
const addMiddlewareToPrototype = (method, hook, type, prototype, className) => {
    addMiddlewaresHoldersToPrototype(prototype);
    let mwHolder = {
        type,
        hook,
        method: `__${className}__${method}`
    };
    prototype.middlewares.push(mwHolder);
};
const MongooseModel = (ModelSettings) => {
    return (target) => {
        let InjectionType = {
            singleton: true,
            injectable: true,
            ClassType: 'model'
        };
        target.prototype.InjectionType = InjectionType;
        target.prototype.ModelSettings = ModelSettings;
        addMiddlewaresHoldersToPrototype(target.prototype);
    };
};
exports.MongooseModel = MongooseModel;
const MongooseMW = (hook, type = 'pre') => {
    return (target, methodName, descriptor) => {
        addMiddlewareToPrototype(methodName, hook, type, target.constructor.prototype, target.constructor.name);
    };
};
exports.MongooseMW = MongooseMW;
//# sourceMappingURL=model.decorator.js.map