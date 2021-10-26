"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropModelDeclaration = void 0;
const _services_1 = require("@services");
const core_1 = require("@handy/core");
const config = core_1.Inject(_services_1.HandyConfigService);
exports.DropModelDeclaration = {
    _id: {
        publicName: 'Id',
    },
    content: {
        publicName: 'Content',
        inputType: 'rich-text',
        required: true,
        unique: false,
        type: 'Text',
    },
    password: {
        publicName: 'Password',
        inputType: 'password',
        required: true,
        unique: false,
        type: 'ShortString',
    },
    expiryAt: {
        publicName: 'Expiration',
        inputType: 'date',
        required: true,
        unique: false,
        type: 'Number'
    }
    // Rest of the fields
};
//# sourceMappingURL=model.declaration.js.map