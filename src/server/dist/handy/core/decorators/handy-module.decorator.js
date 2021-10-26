"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandyModule = void 0;
const HandyModule = (handyModuleSettings = {}) => {
    let { imports = [], preBoot = [] } = handyModuleSettings;
    return (target) => {
        let InjectionType = {
            singleton: true,
            injectable: true,
            ClassType: 'module'
        };
        target.prototype.InjectionType = InjectionType;
        target.prototype.handyModuleSettings = {
            imports,
            preBoot,
        };
        target.prototype.getImports = () => {
            return target.prototype.handyModuleSettings.imports;
        };
        target.prototype.getPreboot = () => {
            return target.prototype.handyModuleSettings.preBoot;
        };
    };
};
exports.HandyModule = HandyModule;
//# sourceMappingURL=handy-module.decorator.js.map