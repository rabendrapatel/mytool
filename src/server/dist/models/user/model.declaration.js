"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelDeclaration = void 0;
const _services_1 = require("@services");
const core_1 = require("@handy/core");
const config = core_1.Inject(_services_1.HandyConfigService);
exports.UserModelDeclaration = {
    _id: {
        publicName: 'Id',
    },
    email: {
        type: 'ShortString',
        publicName: 'Email',
        required: true,
        unique: 'all',
        inputType: 'text'
    },
    password: {
        type: 'ShortString',
        required: false,
        publicName: 'Password',
        validators: [],
        inputType: 'password'
    },
    name: {
        type: 'ShortString',
        required: false,
        default: null,
        publicName: 'Name',
        inputType: 'text'
    },
    roles: {
        type: '[ShortString]',
        publicName: 'Roles',
        required: false,
        inputType: 'multi-select'
    },
    permissions: {
        type: '[ShortString]',
        publicName: 'Permissions',
        required: false,
        inputType: 'multi-select'
    },
    hasVerifiedEmail: {
        type: 'Boolean',
        required: false,
        publicName: 'Verified email',
        inputType: 'check-box'
    },
    emailVerificationHash: {
        type: 'ShortString',
        required: false,
        publicName: 'Email verification hash',
        inputType: 'none'
    },
    groupId: {
        type: 'Number',
        required: false,
        publicName: 'Company id',
        default: null,
        inputType: 'none'
    },
    groups: {
        type: '[ShortString]',
        required: false,
        publicName: 'Company type',
        inputType: 'none'
    },
    newEmail: {
        type: 'ShortString',
        default: null,
        required: false,
        publicName: 'New email',
        inputType: 'text'
    },
    banned: {
        type: 'Boolean',
        default: false,
        required: false,
        publicName: 'Banned',
        inputType: 'check-box'
    },
    lockedUntil: {
        type: 'Number',
        default: 0,
        required: false,
        publicName: 'Locked untill',
        inputType: 'none'
    },
    unlockedAt: {
        publicName: 'Last time unlocked',
        default: 0,
        inputType: 'none',
        required: false,
        type: 'Number'
    },
    registeredViaInvitation: {
        type: 'Boolean',
        publicName: 'Registered via invitation',
        inputType: 'none',
        required: false,
        unique: false,
        default: false
    },
    completeProfile: {
        type: 'Boolean',
        publicName: 'Has completed profile',
        inputType: 'none',
        required: false,
        unique: false,
        default: false
    },
    unLockHash: {
        type: 'ShortString',
        required: false,
        publicName: 'Unlock Hash',
        inputType: 'none'
    },
    passwordResetHash: {
        type: 'ShortString',
        required: false,
        publicName: 'Password reset hash',
        inputType: 'none'
    },
    loginsHistory: {
        type: '[Mixed]',
        publicName: 'Logins history',
        required: false,
        default: [],
        inputType: 'none'
    },
    preferences: {
        type: 'Mixed',
        publicName: 'Preferences',
        required: false,
        default: {},
        inputType: 'none'
    },
    state: {
        type: 'Mixed',
        publicName: 'State',
        required: false,
        default: {},
        inputType: 'none'
    }
};
//# sourceMappingURL=model.declaration.js.map