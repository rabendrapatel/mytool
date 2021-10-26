"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
const Injectable = (singleton) => {
    let InjectionType = {
        singleton,
        injectable: true,
        ClassType: 'plain'
    };
    return (target) => {
        target.prototype.InjectionType = InjectionType;
    };
};
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.decorator.js.map