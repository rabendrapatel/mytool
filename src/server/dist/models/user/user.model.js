"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const _services_1 = require("@services");
const _models_1 = require("@models");
const core_1 = require("@handy/core");
const model_declaration_1 = require("./model.declaration");
const _services_2 = require("@services");
let UserModel = class UserModel extends _models_1.HandyModelClass {
    constructor() {
        super();
        this._handyUserService = core_1.Inject(_services_2.HandyUserService);
        this._handyConfigService = core_1.Inject(_services_1.HandyConfigService);
        this._handyUtilsService = core_1.Inject(_services_1.HandyUtilsService);
        this._handySocketEmitter = core_1.Inject(_services_1.HandySocketEmitter);
    }
    /* -------------------------------------------------------------------------- */
    /*                                 Middlewares                                */
    /* -------------------------------------------------------------------------- */
    /* ------------------------------ Order matters ----------------------------- */
    _asignDefaultUserValues(mwThis, restArgs) {
        return new Promise((resolve, reject) => {
            mwThis = this._handyUserService.generateDefaultUserOnRegistration(mwThis);
            resolve();
        });
    }
    _hashUserPasswordMW(mwThis, restArgs) {
        let isUpdate = isNotNullOrUndefined(mwThis._update);
        let isDirectUpdate = true;
        let passVal;
        if (isUpdate) {
            if (isNotEmpty(mwThis._update.password)) {
                passVal = mwThis._update.password;
            }
            if (isNotEmpty(mwThis._update.$set) && isNotEmpty(mwThis._update.$set.password)) {
                passVal = mwThis._update.$set.password;
                isDirectUpdate = false;
            }
        }
        else {
            passVal = mwThis.password;
        }
        if (!passVal || passVal.endsWith(this._handyUserService.getPasswordSufix())) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            this._handyUserService.hashPassword(passVal)
                .then(hashedPass => {
                if (isUpdate) {
                    if (isDirectUpdate) {
                        mwThis._update.password = hashedPass;
                    }
                    else {
                        mwThis._update.$set.password = hashedPass;
                    }
                }
                else {
                    mwThis.password = hashedPass;
                }
                return resolve();
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
    _handleEmailChange(mwThis, restArgs) {
        mwThis.options.sendVerificationEmail = false;
        if (!this._handyConfigService.get().userRegistration.verifyEmail) {
            return Promise.resolve();
        }
        let updateName = '';
        if (isNotEmpty(mwThis._update.$push) && isNotEmpty(mwThis._update.$push.changesHistory)) {
            updateName = mwThis._update.$push.changesHistory.$each[0].updateName;
        }
        if (updateName === 'Email verification') {
            return Promise.resolve();
        }
        let isDirectUpdate = true;
        let newEmail;
        if (isNotEmpty(mwThis._update.email)) {
            newEmail = mwThis._update.email;
        }
        if (isNotEmpty(mwThis._update.$set) && isNotEmpty(mwThis._update.$set.email)) {
            newEmail = mwThis._update.$set.email;
            isDirectUpdate = false;
        }
        if (isUndefined(newEmail)) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            this._findOne(mwThis._conditions, { selectType: 'select', fields: ['email', 'newEmail', 'emailVerificationHash'] }).then(foundUser => {
                let { foundRecord, doc } = foundUser;
                if (!foundRecord) {
                    return resolve();
                }
                if ((doc.email === newEmail)) {
                    return resolve();
                }
                // ? Changing update to user actual email set in db
                if (isDirectUpdate) {
                    mwThis._update.email = doc.email;
                }
                else {
                    mwThis._update.$set.email = doc.email;
                }
                // ? Just avoiding repeating the same thing in case, user adds new email and then 
                // ? admin cganges role or something else...
                if (newEmail === doc.newEmail) {
                    return resolve();
                }
                // ? Checking if actual update doesn't include new email in it's update,
                // ? Just in case, you know
                let isDirectNewEmailUpdate = true;
                let updateNewEmailVal;
                if (isNotEmpty(mwThis._update.newEmail)) {
                    updateNewEmailVal = mwThis._update.newEmail;
                }
                if (isNotEmpty(mwThis._update.$set) && isNotEmpty(mwThis._update.$set.newEmail)) {
                    updateNewEmailVal = mwThis._update.$set.newEmail;
                    isDirectNewEmailUpdate = false;
                }
                // ? Changing update new email to provided value
                if (isDirectNewEmailUpdate) {
                    mwThis._update.newEmail = newEmail;
                }
                else {
                    mwThis._update.$set.newEmail = newEmail;
                }
                // ? Checking if actual update doesn't include verification hash in it's update,
                // ? Just in case, you know
                let hasDirectSetHash = false;
                let isDirectHashupdatepdate = true;
                let updateHashVal = this._handyUtilsService.generateHash({ length: 10, specialChars: false, emptySpace: false });
                if (isNotEmpty(mwThis._update.emailVerificationHash)) {
                    hasDirectSetHash = true;
                }
                if (isNotEmpty(mwThis._update.$set) && isNotEmpty(mwThis._update.$set.emailVerificationHash)) {
                    isDirectHashupdatepdate = false;
                    hasDirectSetHash = true;
                }
                if (isEmpty(doc.emailVerificationHash) && !hasDirectSetHash) {
                    // ? Changing update new email to provided value
                    if (isDirectHashupdatepdate) {
                        mwThis._update.emailVerificationHash = updateHashVal;
                    }
                    else {
                        mwThis._update.$set.emailVerificationHash = updateHashVal;
                    }
                }
                mwThis.options.sendVerificationEmail = { newEmail, updateHashVal };
                return resolve();
            })
                .catch(err => {
                return reject(this._handyError.register(err, 'high', 'Server error', undefined, { private: `Error while checking for email change` }));
            });
        });
    }
    _afterUpdate(mwThis = {}, restArgs) {
        if (!this._handyConfigService.get().userRegistration.verifyEmail || mwThis.options.sendVerificationEmail === false) {
            return Promise.resolve();
        }
        if (isNotEmpty(mwThis.options.sendVerificationEmail) && isNotEmpty(mwThis.options.sendVerificationEmail.newEmail) && isNotEmpty(mwThis.options.sendVerificationEmail.updateHashVal)) {
            this._handyUserService.sendVerificationEmail(mwThis.options.sendVerificationEmail.newEmail, mwThis.options.sendVerificationEmail.updateHashVal).then(() => {
                // ? email sent, all good
            })
                .catch(err => {
                this._handyError.register(err, 'medium');
            });
        }
        return Promise.resolve();
    }
    _updateClientsAfterDataUpdate(mwThis = {}, restArgs) {
        return new Promise((resolve, reject) => {
            resolve();
            let { options = null } = mwThis;
            if (options && options.customOptions && options.customOptions.skipSocketEventEmit) {
                return;
            }
            let clientSessionId = (isNotEmpty(options) && isNotEmpty(options.request)) ? options.request.handyClientSessionId : null;
            try {
                this._distinct('_id', mwThis._conditions)
                    .then(result => {
                    let resultLen = result.length;
                    if (resultLen > 0) {
                        let finalUsersRooms = [];
                        for (let i = 0; i < resultLen; i++) {
                            const id = result[i];
                            finalUsersRooms.push(`user_id_${id}`);
                        }
                        this._handySocketEmitter.emit('user-change', clientSessionId, '/web-app', finalUsersRooms);
                    }
                });
            }
            catch (error) {
                this._handyError.register(error, 'medium', 'Server error', undefined, { private: 'Error while sending notifications to client about user update' });
            }
        });
    }
    _afterRegistration(mwThis = {}, restArgs) {
        let { email, emailVerificationHash, registeredViaInvitation } = mwThis;
        if (!this._handyConfigService.get().userRegistration.verifyEmail && !mwThis.hasVerifiedEmail) {
            if (registeredViaInvitation && isNotNullOrUndefined(email)) {
                this._handyUserService.sendPasswordResetEmail(email, true).then(() => {
                    // ? email sent, all good
                })
                    .catch(err => {
                    this._handyError.register(err, 'medium');
                });
                return Promise.resolve();
            }
            else {
                return Promise.resolve();
            }
        }
        if (registeredViaInvitation && isNotNullOrUndefined(email)) {
            this._handyUserService.sendPasswordResetEmail(email, true).then(() => {
                // ? email sent, all good
            })
                .catch(err => {
                this._handyError.register(err, 'medium');
            });
            return Promise.resolve();
        }
        if (isNotNullOrUndefined(email) && isNotNullOrUndefined(emailVerificationHash)) {
            this._handyUserService.sendVerificationEmail(email, emailVerificationHash).then(() => {
                // ? email sent, all good
            })
                .catch(err => {
                this._handyError.register(err, 'medium');
            });
        }
        return Promise.resolve();
    }
};
__decorate([
    core_1.MongooseMW('save'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserModel.prototype, "_asignDefaultUserValues", null);
__decorate([
    core_1.MongooseMW('save'),
    core_1.MongooseMW('updateOne'),
    core_1.MongooseMW('updateMany'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserModel.prototype, "_hashUserPasswordMW", null);
__decorate([
    core_1.MongooseMW('updateOne'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserModel.prototype, "_handleEmailChange", null);
__decorate([
    core_1.MongooseMW('updateOne', 'post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserModel.prototype, "_afterUpdate", null);
__decorate([
    core_1.MongooseMW('updateOne', 'post'),
    core_1.MongooseMW('updateMany', 'post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserModel.prototype, "_updateClientsAfterDataUpdate", null);
__decorate([
    core_1.MongooseMW('save', 'post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserModel.prototype, "_afterRegistration", null);
UserModel = __decorate([
    core_1.MongooseModel({
        name: 'User',
        modelDeclaration: model_declaration_1.UserModelDeclaration,
        accessRules: {
        // create: {
        //   permission: 'loggedIn'
        // },
        // read: {
        //   groupIdField: 'groupId'
        // },
        // update: {
        //   permission: ['admin'],
        //   userIdField: '_id',
        //   groupIdField: 'groupId'
        // },
        // delete: {
        //   permission: ['admin']
        // }
        },
        softDelete: true,
        createdAt: true,
        createdBy: true,
        changesHistory: true,
        autoIncrement: true,
        defaultSelect: {
            selectType: 'deselect',
            fields: ['password']
        }
    }),
    __metadata("design:paramtypes", [])
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map