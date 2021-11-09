"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModelDeclaration = void 0;
const _services_1 = require("@services");
const core_1 = require("@handy/core");
const config = core_1.Inject(_services_1.HandyConfigService);
exports.StudentModelDeclaration = {
    _id: {
        publicName: 'Id',
    },
    studentName: {
        publicName: 'Student Name',
        inputType: 'text',
        required: true,
        unique: false,
        type: 'Text'
    },
    studentAddress: {
        publicName: 'Full Address',
        inputType: 'text-area',
        required: true,
        unique: false,
        type: 'Text'
    },
    studentCourse: {
        publicName: 'Course',
        inputType: 'select',
        required: true,
        unique: false,
        type: 'Text'
    },
    studentMobile: {
        publicName: 'Mobile No',
        inputType: 'number',
        required: true,
        unique: true,
        type: 'Number'
    },
    studentEmail: {
        publicName: 'Email',
        inputType: 'text',
        required: false,
        unique: false,
        type: 'Text'
    },
};
//# sourceMappingURL=model.declaration.js.map