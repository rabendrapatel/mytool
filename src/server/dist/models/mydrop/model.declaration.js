"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MydropModelDeclaration = void 0;
const _services_1 = require("@services");
const core_1 = require("@handy/core");
const config = core_1.Inject(_services_1.HandyConfigService);
exports.MydropModelDeclaration = {
    _id: {
        publicName: 'Id',
    },
    // Rest of the fields
    content: {
        publicName: 'Content',
        inputType: 'rich-text',
        type: "Text",
        required: true,
        unique: false,
    },
    password: {
        publicName: 'Password',
        inputType: 'password',
        type: "ShortString",
        required: true,
        unique: false,
    },
    expireAt: {
        publicName: 'Expiration',
        inputType: 'date',
        required: true,
        unique: false,
        type: 'Number'
    }
};
//# sourceMappingURL=model.declaration.js.map