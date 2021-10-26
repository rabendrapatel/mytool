"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsModelDeclaration = void 0;
const _services_1 = require("@services");
const core_1 = require("@handy/core");
const config = core_1.Inject(_services_1.HandyConfigService);
exports.UploadsModelDeclaration = {
    _id: {
        publicName: 'Id',
    },
    url: {
        type: 'ShortString',
        required: true,
        unique: true,
        publicName: 'File url',
        inputType: 'none'
    },
    storragePath: {
        type: 'ShortString',
        required: true,
        unique: false,
        publicName: 'Storrage path',
        inputType: 'none'
    },
    storrageFileName: {
        type: 'ShortString',
        required: true,
        unique: false,
        publicName: 'Storrage file name',
        inputType: 'none'
    },
    fileType: {
        type: 'ShortString',
        required: true,
        unique: false,
        publicName: 'File type',
        inputType: 'none'
    },
    originalFileName: {
        type: 'ShortString',
        required: true,
        unique: false,
        publicName: 'File name',
        inputType: 'none'
    },
    accessRules: {
        type: 'Mixed',
        required: false,
        unique: false,
        publicName: 'Access rules',
        inputType: 'none'
    },
    thumbs: {
        type: 'Mixed',
        required: false,
        unique: false,
        publicName: 'Thumbnails',
        inputType: 'none'
    }
    // Rest of the fields
};
//# sourceMappingURL=model.declaration.js.map