"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortlinkModelDeclaration = void 0;
const _services_1 = require("@services");
const core_1 = require("@handy/core");
const config = core_1.Inject(_services_1.HandyConfigService);
exports.ShortlinkModelDeclaration = {
    _id: {
        publicName: 'Id',
    },
    finalUrl: {
        type: 'ShortString',
        required: true,
        unique: false,
        inputType: 'none',
        publicName: 'Final url'
    },
    shortlinkHash: {
        type: 'ShortString',
        required: true,
        unique: false,
        inputType: 'none',
        publicName: 'Hash'
    },
    oneTime: {
        type: 'Boolean',
        publicName: 'One time link',
        required: true,
        default: false,
        inputType: 'none'
    }
};
//# sourceMappingURL=model.declaration.js.map