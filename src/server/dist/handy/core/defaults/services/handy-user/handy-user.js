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
exports.DefaultHandyUserService = void 0;
const core_1 = require("@handy/core");
const user_1 = require("@models/user");
const _services_1 = require("@services");
const decorators_1 = require("@handy/core/decorators");
const bcryptjs_1 = require("bcryptjs");
const socket_event_decorator_1 = require("@handy/core/decorators/socket-event.decorator");
class DefaultHandyUserService {
    constructor() {
        this._handyErrorService = core_1.Inject(_services_1.HandyErrorService);
        this._handyUtilsService = core_1.Inject(_services_1.HandyUtilsService);
        this._handyJwtService = core_1.Inject(_services_1.HandyJwtService);
        this._handyMailerService = core_1.Inject(_services_1.HandyMailerService);
        this._handyConfigService = core_1.Inject(_services_1.HandyConfigService);
        this._handySocketEmitter = core_1.Inject(_services_1.HandySocketEmitter);
        this._handyShortlinkService = core_1.Inject(_services_1.HandyShortlinkService);
        this._loginFailsList = ['banned', 'invalidCreds', 'locked', 'unverified'];
        this._failedLoginLockSettings = this._handyConfigService.get().failedLoginLock;
        this._loginsRecordsTrackLength = this._handyConfigService.get().loginsRecordsTrackLength;
        this._cryptHash = bcryptjs_1.hash;
        this._cryptCompare = bcryptjs_1.compare;
        this._userPasswordSufixFlag = this._handyConfigService.get().userPassSufixFlag;
        this._defaultUserRole = (isArray(this._handyConfigService.get().defaultUserRole)) ? this._handyConfigService.get().defaultUserRole : [this._handyConfigService.get().defaultUserRole];
    }
    onInit() {
        this._userModel = core_1.Inject(user_1.UserModel);
        this._checkSuperAdminExistence();
    }
    /* -------------------------------------------------------------------------- */
    /*                                   Routes                                   */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- Auth ---------------------------------- */
    webAppRegister(request, response, user, query, body) {
        if (!this._handyConfigService.get().userRegistration.openRegistration) {
            let err = this._handyErrorService.register(null, 'medium', 'Forbidden', undefined, undefined, request, response);
            response.errorResponse(err);
            return;
        }
        let { email, password } = body;
        this._userModel.createOne({ email, password })
            .then(registerResult => {
            response.jsonResponse(registerResult);
        })
            .catch(err => {
            err = this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request, response);
            response.errorResponse(err);
            return;
        });
    }
    webAppLogin(request, response, user, query, body) {
        let { email, password } = body;
        let match = false;
        let responseData = {};
        this.compareUserPasswordAgainstEmail(email, password)
            .then(passWordMatch => {
            match = passWordMatch;
            return this._userModel.findOne({ email });
        })
            .then(findOneResult => {
            if (!findOneResult.foundRecord) {
                responseData.failReason = 'invalidCreds';
                return Promise.reject('invalidCreds');
            }
            let canLogin = this.canLogin(findOneResult.doc);
            if (!canLogin.can) {
                responseData.failReason = canLogin.reason;
                if (canLogin.reason === 'locked') {
                    let { lockedUntil = 0 } = findOneResult.doc;
                    responseData.lockedTill = lockedUntil;
                    responseData.lockTimeLeft = lockedUntil - new Date().getTime();
                }
                return Promise.reject(canLogin.reason);
            }
            if (!match) {
                responseData.failReason = 'invalidCreds';
                return Promise.reject('invalidCreds');
            }
            responseData.userData = findOneResult.doc;
            return this.generateAccessTokenFromUserData(responseData.userData);
        })
            .then(accessTokenData => {
            response.setCookie('Authorization', accessTokenData.token, { lifespan: { [accessTokenData.lifeSpanUnit]: accessTokenData.lifeSpan }, signed: true, sameSite: true, serverOnly: true });
            let deviceIdData;
            if (isNotEmpty(request.locals.deviceId)) {
                deviceIdData = {
                    checkSet: {
                        type: request.locals.deviceIdType,
                        name: this._handyConfigService.get().deviceIdCookieHash,
                        value: request.locals.deviceId
                    }
                };
            }
            responseData.accessTokenData = accessTokenData;
            return this.generateRefreshToken(responseData.userData.email, deviceIdData);
        })
            .then(refreshTokenresult => {
            response.setCookie('Authorization_refresh', refreshTokenresult.token, { lifespan: { [refreshTokenresult.lifeSpanUnit]: refreshTokenresult.lifeSpan }, signed: true, sameSite: true, serverOnly: true });
            this._addLoginRecord(email, { at: new Date().getTime(), success: true, clientType: 'web', deviceId: request.locals.deviceId });
            this._emitDeviceLoginStatusChange(request, true);
            return response.jsonResponse(responseData, true);
        })
            .catch(err => {
            this._removeWebAppAuthCookies(request, response);
            if (this.isKnownLoginFail(err)) {
                if (err === 'invalidCreds') {
                    this._addLoginRecord(email, { at: new Date().getTime(), success: false, clientType: 'web', deviceId: request.locals.deviceId });
                }
                response.jsonResponse(responseData, false);
                return;
            }
            err = this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request, response);
            response.errorResponse(err);
            return;
        });
    }
    webAppLogout(request, response, user, query) {
        this._removeWebAppAuthCookies(request, response);
        return response.jsonResponse(null, true);
    }
    verifyEmailEndpoint(request, response, user, query) {
        let { email = null, hash = null } = request.params;
        if (typeof email === 'string') {
            email = email.replace(' ', '+');
        }
        this.verifyEmail(email, hash)
            .then(result => {
            if (!result) {
                let err = this._handyErrorService.register(null, 'low', 'Bad request', undefined, { private: 'Error while verifiing email address' }, request, response);
                return Promise.reject(err);
            }
            if (this._handyConfigService.get().isMicroService) {
                return response.jsonResponse({});
            }
            return response.redirectToClient('auth-msg', { email, action: 'emailVerified' });
        })
            .catch(err => {
            let parsedErr = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
            if (this._handyConfigService.get().isMicroService) {
                return response.errorResponse(parsedErr);
            }
            return response.redirectToClientErrPage(parsedErr);
        });
    }
    unlockAccountEndpoint(request, response, user, query) {
        let { email = null, hash = null } = request.params;
        if (typeof email === 'string') {
            email = email.replace(' ', '+');
        }
        this._userModel.findOne({ email }, { selectType: 'select', fields: ['unLockHash'] })
            .then(result => {
            if (!result.foundRecord) {
                let err = this._handyErrorService.register(null, 'low', 'Bad request', undefined, { private: 'Unlocking unknow account' }, request, response);
                return Promise.reject(err);
            }
            if (result.doc.unLockHash !== hash) {
                let err = this._handyErrorService.register(null, 'low', 'Bad request', undefined, { private: 'Error while verifiing email address' }, request, response);
                return Promise.reject(err);
            }
            this._userModel.updateOne({ email }, { unLockHash: null, lockedUntil: 0, unlockedAt: new Date().getTime() });
        })
            .then(() => {
            if (this._handyConfigService.get().isMicroService) {
                return response.jsonResponse({});
            }
            return response.redirectToClient('auth-msg', { email, action: 'accountUnlocked' });
        })
            .catch(err => {
            let parsedErr = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
            if (this._handyConfigService.get().isMicroService) {
                return response.errorResponse(parsedErr);
            }
            return response.redirectToClientErrPage(parsedErr);
        });
    }
    refreshWebAppAccessToken(request, response, user, query) {
        let refreshToken = request.getCookie(true, 'Authorization_refresh', null);
        if (!refreshToken) {
            return response.errorResponse(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, undefined, request, response));
        }
        this._handyJwtService.decodeToken(refreshToken)
            .then(tokenData => {
            let { keyPairCheck = {}, email } = tokenData.data;
            if (isNotEmpty(keyPairCheck.checkSet)) {
                let { name, type, value } = keyPairCheck.checkSet;
                if (type === 'cookie') {
                    if (request.getCookie(true, name, null) !== value) {
                        return Promise.reject(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, { private: { msg: `Invalid device key pair check for refresh token`, tokenData } }, request, response));
                    }
                }
            }
            return this._userModel.findOne({ email });
        })
            .then(result => {
            if (!result.foundRecord) {
                return Promise.reject(this._handyErrorService.register(new Error(), 'low', 'Bad request', undefined, undefined, request, response));
            }
            let canLogin = this.canLogin(result.doc);
            if (!canLogin.can) {
                return Promise.reject(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, { private: { msg: `Error while refreshing web app token. reason`, canLogin } }, request, response));
            }
            return this.generateAccessTokenFromUserData(result.doc);
        })
            .then(tokenData => {
            response.setCookie('Authorization', tokenData.token, { lifespan: { [tokenData.lifeSpanUnit]: tokenData.lifeSpan }, signed: true, sameSite: true, serverOnly: true });
            this._emitDeviceTokenRefresh(request);
            return response.jsonResponse(tokenData);
        })
            .catch(err => {
            this._removeWebAppAuthCookies(request, response);
            return response.errorResponse(this._handyErrorService.register(err, 'medium', 'Server error', undefined, { private: { msg: `Error while refreshing web app token. reason` } }, request, response));
        });
    }
    requestVerificationEmail(request, response, user, query) {
        let email = query.email;
        if (typeof email === 'string') {
            email = email.replace(' ', '+');
        }
        let hash;
        this._userModel.findOne({ $or: [{ email }, { newEmail: email }] }, { selectType: 'select', fields: ['emailVerificationHash'] })
            .then(result => {
            if (!result.foundRecord) {
                let err = this._handyErrorService.register('Unknown account', 'low', 'Bad request', undefined, undefined, request, response);
                return Promise.reject(err);
            }
            if (!result.doc.emailVerificationHash) {
                hash = this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false, length: 10 });
                return this._userModel.updateOne({ email }, { emailVerificationHash: hash });
            }
            hash = result.doc.emailVerificationHash;
            return Promise.resolve();
        })
            .then(result => {
            if (result) {
                if (result.updatedRecords < 1) {
                    let err = this._handyErrorService.register('Email verification hash update error', 'medium', 'Server error', undefined, undefined, request, response);
                    return Promise.reject(err);
                }
            }
            return this.sendVerificationEmail(email, hash);
        })
            .then(() => {
            response.jsonResponse({});
        })
            .catch(err => {
            let parsedErr = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
            return response.errorResponse(parsedErr);
        });
    }
    requestUnlockEmail(request, response, user, query) {
        let email = query.email;
        if (typeof email === 'string') {
            email = email.replace(' ', '+');
        }
        this.sendUnlockEmail(email)
            .then(() => {
            response.jsonResponse({});
        })
            .catch(err => {
            let parsedErr = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
            return response.errorResponse(parsedErr);
        });
    }
    requestPasswordResetEmail(request, response, user, query) {
        let email = query.email;
        if (typeof email === 'string') {
            email = email.replace(' ', '+');
        }
        this.sendPasswordResetEmail(email)
            .then(() => {
            response.jsonResponse({});
        })
            .catch(err => {
            let parsedErr = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
            return response.errorResponse(parsedErr);
        });
    }
    sendInvitationEmail(request, response, user, query, body) {
        if (!this._handyConfigService.get().userRegistration.emailInvitation) {
            let err = this._handyErrorService.register(null, 'medium', 'Forbidden', undefined, undefined, request, response);
            response.errorResponse(err);
            return;
        }
        let email = query.email;
        if (typeof email === 'string') {
            email = email.replace(' ', '+');
        }
        this.sendPasswordResetEmail(email, true)
            .then(() => {
            response.jsonResponse({});
        })
            .catch(err => {
            let parsedErr = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
            return response.errorResponse(parsedErr);
        });
    }
    webAppAccessTokenData(request, response, user, query) {
        let accessToken = request.getCookie(true, 'Authorization', null);
        if (!accessToken) {
            this._removeWebAppAuthCookies(request, response);
            return response.errorResponse(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, undefined, request, response));
        }
        this._handyJwtService.decodeToken(accessToken)
            .then(tokenData => {
            let { expiresIn, lifeSpan, lifeSpanUnit, expiryMoment } = tokenData;
            let tokenDetails = {
                token: accessToken,
                expiresIn,
                lifeSpan,
                lifeSpanUnit,
                expiryMoment
            };
            return response.jsonResponse(tokenDetails);
        })
            .catch(err => {
            return response.errorResponse(this._handyErrorService.register(err, 'medium', 'Server error', undefined, { private: { msg: `Error while refreshing web app token. reason` } }, request, response));
        });
    }
    getMyData(request, response, user, query) {
        if (!user.loggedIn) {
            return response.errorResponse(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, undefined, request, response));
        }
        this._userModel.findOne({ email: user.email })
            .then(result => {
            if (!result.foundRecord) {
                return Promise.reject(this._handyErrorService.register(new Error(), 'low', 'Bad request', undefined, undefined, request, response));
            }
            let canLogin = this.canLogin(result.doc);
            if (!canLogin.can) {
                return Promise.reject(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, { private: { msg: `Error while refreshing web app token. reason`, canLogin } }, request, response));
            }
            return response.jsonResponse(result.doc);
        })
            .catch(err => {
            return response.errorResponse(this._handyErrorService.register(err, 'medium', 'Server error', undefined, { private: { msg: `Error while refreshing web app token. reason` } }, request, response));
        });
    }
    passwordReset(request, response, user, query, body) {
        let { email, password, resetHash } = body;
        this._userModel.findOne({ email }, { selectType: 'select', fields: ['passwordResetHash'] })
            .then(findresult => {
            let { doc, foundRecord } = findresult;
            if (!foundRecord) {
                let unknowAccountErr = this._handyErrorService.register(null, 'low', 'Bad request', undefined, undefined, request, response);
                return Promise.reject(unknowAccountErr);
            }
            if (resetHash !== doc.passwordResetHash) {
                let invalidHashErr = this._handyErrorService.register(null, 'medium', 'Unauthorized', undefined, undefined, request, response);
                return Promise.reject(invalidHashErr);
            }
            return this._userModel.updateOne({ email }, { password, passwordResetHash: null, hasVerifiedEmail: true, emailVerificationHash: null });
        })
            .then(updateResult => {
            response.jsonResponse(updateResult);
        })
            .catch(err => {
            let respErr = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
            return response.errorResponse(respErr);
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                                   Sockets                                  */
    /* -------------------------------------------------------------------------- */
    onUserStateChangeEvent(eventData, user, socket, rawData) {
        if (!user.loggedIn) {
            return;
        }
        socket.emitToEveryoneExcludingSender('stateChange', [`user_email_${user.email}`], eventData);
        this._userModel.updateOne({ _id: user._id }, { state: eventData }, { skipUpdateHistory: true, updateName: 'stateChange', customOptions: { skipSocketEventEmit: true } })
            .then(result => {
        })
            .catch(err => {
            this._handyErrorService.register(err, 'low');
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                               Helper methods                               */
    /* -------------------------------------------------------------------------- */
    _checkSuperAdminExistence() {
        if (!this._handyConfigService.get().createSuperAdminAccount) {
            return;
        }
        this._userModel.findOne({ email: this._handyConfigService.get().superAdminEmail }).then((result => {
            if (!result.foundRecord) {
                this._userModel.createOne({ email: this._handyConfigService.get().superAdminEmail, roles: ['superAdmin'], permissions: [], hasVerifiedEmail: false, registeredViaInvitation: true }, undefined, undefined, { skipVerificationEmail: true })
                    .then(superAdminGeneration => {
                    handySuccessLog(`Super admin account ${this._handyConfigService.get().superAdminEmail} was generated, check your inbox to set password`);
                })
                    .catch(err => [
                    console.log({ err })
                ]);
            }
        }))
            .catch(err => {
            handyErrLog(err);
        });
    }
    _addLoginRecord(email, loginData, request) {
        this._userModel.updateOne({ email }, { $push: { loginsHistory: { $each: [loginData], $slice: 0 - this._loginsRecordsTrackLength } } }, { skipUpdateHistory: true })
            .then(() => {
            // Login record added
        })
            .catch(err => {
            this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: `Error while adding login record` } }, request);
        });
    }
    generateDefaultUserOnRegistration(postedUserData) {
        if (isEmpty(postedUserData.roles)) {
            postedUserData.roles = this._defaultUserRole;
        }
        if (isEmpty(postedUserData.permissions)) {
            postedUserData.permissions = this.getDefaultPersmissionsForRoles(postedUserData.roles);
        }
        if (!postedUserData.hasVerifiedEmail && this._handyConfigService.get().userRegistration.verifyEmail) {
            postedUserData.emailVerificationHash = this._handyUtilsService.generateHash({ length: 10, specialChars: false, emptySpace: false });
        }
        if (!postedUserData.password) {
            postedUserData.password = this._handyUtilsService.generateStrongPassword();
        }
        return postedUserData;
    }
    hashPassword(password) {
        return new Promise((resolve, reject) => {
            this._cryptHash(password, 10).then(hashedPass => {
                let finalHashWithPreffix = `${hashedPass}${this._userPasswordSufixFlag}`;
                return resolve(finalHashWithPreffix);
            })
                .catch(err => {
                let handyParsedErr = this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: 'User password hashing error' } });
                return reject(handyParsedErr);
            });
        });
    }
    getDefaultPersmissionsForRoles(rolesList = []) {
        let permissionsList = [];
        let rolesToCheck;
        if (isArray(rolesList)) {
            rolesToCheck = [...rolesList];
        }
        else {
            rolesToCheck = [rolesList];
        }
        let rolesLen = rolesToCheck.length;
        for (let i = 0; i < rolesLen; i++) {
            const singleRole = rolesToCheck[i];
            let defaultRolePermissions = this._handyConfigService.get().usersRoles[singleRole].defaultPermissions;
            let defaultRolePermissionsLen = defaultRolePermissions.length;
            for (let j = 0; j < defaultRolePermissionsLen; j++) {
                const singleRoleDefaultPermission = defaultRolePermissions[j];
                if (!permissionsList.includes(singleRoleDefaultPermission)) {
                    permissionsList.push(singleRoleDefaultPermission);
                }
            }
        }
        return permissionsList;
    }
    getPasswordSufix() {
        return this._userPasswordSufixFlag;
    }
    compareUserPasswordAgainstEmail(email, password) {
        return new Promise((resolve, reject) => {
            let existingUser = true;
            let userLoginsHistory = [];
            let userLockedUntil = 0;
            let userUnlockedAt = 0;
            let userBanned;
            let lock = true;
            let thisMoment;
            let comparsionResult = false;
            let sendUnlockEmail = false;
            let unlockEmailSent = false;
            let userVerified = false;
            this._userModel.findOne({ email }, { selectType: 'select', fields: ['password', 'loginsHistory', 'lockedUntil', 'banned', 'hasVerifiedEmail', 'unLockHash', 'unlockedAt'] }, { deletedDocs: 'all' })
                .then(foundUser => {
                if (!foundUser.foundRecord) {
                    existingUser = false;
                    return Promise.resolve(false);
                }
                let { loginsHistory = [], lockedUntil = 0, banned = false, hasVerifiedEmail, unLockHash = null, unlockedAt = 0 } = foundUser.doc;
                userLoginsHistory = loginsHistory;
                userLockedUntil = lockedUntil;
                userUnlockedAt = unlockedAt;
                userBanned = banned;
                userVerified = (this._handyConfigService.get().userRegistration.verifyEmail) ? hasVerifiedEmail : true;
                unlockEmailSent = (!!unLockHash);
                return this._cryptCompare(password, foundUser.doc.password.replace(this._userPasswordSufixFlag, ''));
            })
                .then(finalResult => {
                comparsionResult = finalResult;
                if (finalResult || !this._failedLoginLockSettings.active || !existingUser || userBanned || !userVerified) {
                    return Promise.resolve();
                }
                thisMoment = new Date().getTime();
                if (userLockedUntil > thisMoment) {
                    return Promise.resolve();
                }
                let loginsHistoryLen = userLoginsHistory.length;
                let checkLen = 2;
                if (loginsHistoryLen < this._failedLoginLockSettings.lockAfterFailedLoginAttemptsCount) {
                    lock = false;
                }
                for (let i = loginsHistoryLen - 1; i >= 0; i--) {
                    const loginHistoryRecord = userLoginsHistory[i];
                    if (loginHistoryRecord.success || (userLockedUntil && loginHistoryRecord.at < userLockedUntil) || (loginHistoryRecord.at < userUnlockedAt)) {
                        lock = false;
                        break;
                    }
                    if (checkLen >= this._failedLoginLockSettings.lockAfterFailedLoginAttemptsCount) {
                        break;
                    }
                    checkLen++;
                }
                if (!lock) {
                    return Promise.resolve();
                }
                else {
                    let { unit, length } = this._failedLoginLockSettings.lockDuration;
                    let lockedUntilTime = thisMoment + this._handyUtilsService.handyTimeUnitToMs(length, unit);
                    sendUnlockEmail = true;
                    return this._userModel.updateOne({ email }, {
                        lockedUntil: lockedUntilTime,
                    }, { updateName: 'Failed login lock' });
                }
            })
                .then(() => {
                resolve(comparsionResult);
                if ((sendUnlockEmail && !unlockEmailSent) && this._failedLoginLockSettings.sendUnlockEmailAfterLock) {
                    this.sendUnlockEmail(email);
                }
                return;
            })
                .catch(err => {
                return reject(this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: 'Error while dehashing user password', email, password } }));
            });
        });
    }
    verifyEmail(email, emailVerificationHash) {
        return new Promise((resolve, reject) => {
            let searchQuery = { $or: [{ emailVerificationHash, email }, { emailVerificationHash, newEmail: email }] };
            this._userModel.findOne(searchQuery, { selectType: 'select', fields: ['email', 'newEmail'] })
                .then(foundUser => {
                if (!foundUser.foundRecord) {
                    return resolve(false);
                }
                this._userModel.updateOne(searchQuery, { email, emailVerificationHash: null, newEmail: null, hasVerifiedEmail: true }, { updateName: `Email verification` })
                    .then(updateResult => {
                    return resolve(true);
                })
                    .catch(err => {
                    this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: `Error while verifing user email`, email, emailVerificationHash } });
                    return reject(err);
                });
            })
                .catch(err => {
                this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: `Error while verifing user email`, email, emailVerificationHash } });
                return reject(err);
            });
        });
    }
    sendUnlockEmail(email) {
        let unlokHashToSend;
        return new Promise((resolve, reject) => {
            return this._userModel.findOne({ email }, { selectType: 'select', fields: 'unLockHash' })
                .then(userDataResult => {
                if (!userDataResult.foundRecord) {
                    return Promise.reject(`Unknown account ${email}`);
                }
                unlokHashToSend = userDataResult.doc.unLockHash;
                if (!unlokHashToSend) {
                    unlokHashToSend = this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false });
                    return this._userModel.updateOne({ email }, { unLockHash: unlokHashToSend }, { updateName: 'Generated unlock hash', skipUpdateHistory: true });
                }
                return Promise.resolve();
            })
                .then(() => {
                return this._handyShortlinkService.generateShortlink(`${this._handyConfigService.getClientUrl()}service/handyUser/unlockAccount/${email}/${unlokHashToSend}`, false);
            })
                .then(unlockLink => {
                return this._handyMailerService.sendMail({
                    to: email,
                    template: 'user-emails/account-login-unlock.hbs',
                    subject: this._failedLoginLockSettings.unlockEmailSubject,
                    data: {
                        unlockLink
                    }
                });
            })
                .then(() => {
                return resolve();
            })
                .catch(err => {
                return reject(this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: 'Error while sending unlock email to user' } }));
            });
        });
    }
    sendPasswordResetEmail(email, invitation = false) {
        let resetHash;
        return new Promise((resolve, reject) => {
            return this._userModel.findOne({ email }, { selectType: 'select', fields: 'passwordResetHash' })
                .then(userDataResult => {
                if (!userDataResult.foundRecord) {
                    return Promise.reject(`Unknown account ${email}`);
                }
                resetHash = userDataResult.doc.passwordResetHash;
                if (!resetHash) {
                    resetHash = this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false });
                    return this._userModel.updateOne({ email }, { passwordResetHash: resetHash }, { updateName: 'Generated unlock hash', skipUpdateHistory: true });
                }
                return Promise.resolve();
            })
                .then(() => {
                let clientSubPath = (!invitation) ? 'password-reset' : 'invitation-password-set';
                return this._handyShortlinkService.generateShortlink(`${this._handyConfigService.getClientUrl()}${clientSubPath}/${email}/${resetHash}`, false);
            })
                .then(passwordResetLink => {
                return this._handyMailerService.sendMail({
                    to: email,
                    template: (!invitation) ? 'user-emails/password-reset.hbs' : 'user-emails/user-invitation.hbs',
                    subject: (!invitation) ? 'Password reset link' : `Invitation to ${this._handyConfigService.get().projectName}`,
                    data: {
                        passwordResetLink
                    }
                });
            })
                .then(() => {
                return resolve();
            })
                .catch(err => {
                return reject(this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: 'Error while sending unlock email to user' } }));
            });
        });
    }
    sendVerificationEmail(email, hash) {
        return new Promise((resolve, reject) => {
            this._handyShortlinkService.generateShortlink(`${this._handyConfigService.getClientUrl()}service/handyUser/verifyEmail/${email}/${hash}`, false)
                .then(shortlink => {
                return this._handyMailerService.sendMail({
                    subject: 'Verify your email',
                    template: 'user-emails/email-verification.hbs',
                    to: email,
                    data: {
                        verificationLink: shortlink
                    }
                });
            })
                .then(emailresult => {
                return resolve(emailresult);
            })
                .catch(err => {
                let handyErr = this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: 'Eror while sending verification email', email, hash } });
                return reject(handyErr);
            });
        });
    }
    generateAccessTokenFromUserData(userData) {
        let { email, _id, roles, groups, permissions, groupId } = userData;
        return this._handyJwtService.generateToken({ email, _id, roles, groups, permissions, groupId });
    }
    generateRefreshToken(email, keyPairCheck = {}) {
        return this._handyJwtService.generateToken({ email, keyPairCheck }, 'refresh');
    }
    getUserData(email) {
        return this._userModel.findOne({ email });
    }
    extractUserDataFromRefreshToken(token, request) {
        let requestUserData = this._handyJwtService.generateEmptyServerRequestUser();
        if (isEmpty(token)) {
            return Promise.resolve(requestUserData);
        }
        return new Promise((resolve, reject) => {
            this._handyJwtService.decodeToken(token)
                .then(tokenResult => {
                let canRefresh = true;
                let { email, keyPairCheck } = tokenResult.data;
                if (isNotEmpty(tokenResult.data.keyPairCheck)) {
                    let { checkSet } = keyPairCheck;
                    let { type, name, value } = checkSet;
                    switch (type) {
                        case 'cookie':
                            canRefresh = request.getCookie(true, name, null) === value;
                            break;
                        case 'header':
                            canRefresh = request.getHeader(name, null) === value;
                            break;
                        default:
                            break;
                    }
                }
                if (canRefresh) {
                    return this._userModel.findOne({ email }, { selectType: 'select', fields: ['email', '_id', 'roles', 'groupId', 'groups', 'permissions'] });
                }
                return Promise.resolve(null);
            })
                .then(findOneResult => {
                if (findOneResult === null || !findOneResult.foundRecord) {
                    return resolve(requestUserData);
                }
                return resolve(Object.assign(Object.assign(Object.assign({}, requestUserData), findOneResult.doc), { loggedIn: true }));
            })
                .catch(err => {
                this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request);
                return resolve(requestUserData);
            });
        });
    }
    canLogin(userData) {
        let { lockedUntil = 0, banned, hasVerifiedEmail = !this._handyConfigService.get().userRegistration.verifyEmail } = userData;
        let result = {
            can: true,
            reason: null
        };
        if (banned) {
            result.can = false;
            result.reason = 'banned';
        }
        if (!hasVerifiedEmail) {
            result.can = false;
            result.reason = 'unverified';
        }
        if (lockedUntil) {
            let thisMoment = new Date().getTime();
            if (thisMoment < lockedUntil) {
                result.can = false;
                result.reason = 'locked';
            }
        }
        return result;
    }
    _emitDeviceLoginStatusChange(request, status) {
        if (request.locals.deviceId) {
            let handyClientSessionId = request.handyClientSessionId;
            setTimeout(() => {
                this._handySocketEmitter.emit('login-status-change', { session: handyClientSessionId, status }, 'web-app', [`web_device_id_${request.locals.deviceId}`]);
            }, 500);
        }
    }
    _emitDeviceTokenRefresh(request) {
        if (request.locals.deviceId) {
            let handyClientSessionId = request.handyClientSessionId;
            setTimeout(() => {
                this._handySocketEmitter.emit('access-token-change', handyClientSessionId, 'web-app', [`web_device_id_${request.locals.deviceId}`]);
            }, 500);
        }
    }
    _removeWebAppAuthCookies(request, response) {
        response.setCookie('Authorization', '', { lifespan: { sec: -1 }, signed: true, sameSite: true, serverOnly: true });
        response.setCookie('Authorization_refresh', '', { lifespan: { sec: -1 }, signed: true, sameSite: true, serverOnly: true });
        this._emitDeviceLoginStatusChange(request, false);
    }
    isKnownLoginFail(failReason) {
        return this._loginFailsList.includes(failReason);
    }
}
__decorate([
    decorators_1.PostApiRequest({ publicRoute: false, apiVersions: '1', requiredParams: { body: ['email', 'password'] } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "webAppRegister", null);
__decorate([
    decorators_1.PostApiRequest({ publicRoute: false, apiVersions: '1', requiredParams: { body: ['email', 'password'] } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "webAppLogin", null);
__decorate([
    decorators_1.DeleteApiRequest({ publicRoute: false, apiVersions: '1', accessRestriction: {} }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "webAppLogout", null);
__decorate([
    decorators_1.GetRequest({
        customUrlPath: 'verifyEmail/:email/:hash',
        publicRoute: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "verifyEmailEndpoint", null);
__decorate([
    decorators_1.GetRequest({
        customUrlPath: 'unlockAccount/:email/:hash',
        publicRoute: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "unlockAccountEndpoint", null);
__decorate([
    decorators_1.GetApiRequest({
        publicRoute: false,
        apiVersions: '1'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "refreshWebAppAccessToken", null);
__decorate([
    decorators_1.GetApiRequest({
        publicRoute: true,
        apiVersions: '1'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "requestVerificationEmail", null);
__decorate([
    decorators_1.GetApiRequest({
        publicRoute: true,
        apiVersions: '1'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "requestUnlockEmail", null);
__decorate([
    decorators_1.GetApiRequest({
        publicRoute: true,
        apiVersions: '1'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "requestPasswordResetEmail", null);
__decorate([
    decorators_1.PostApiRequest({
        publicRoute: false,
        apiVersions: '1',
        requiredParams: {
            body: ['email']
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "sendInvitationEmail", null);
__decorate([
    decorators_1.GetApiRequest({
        publicRoute: false,
        apiVersions: '1'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "webAppAccessTokenData", null);
__decorate([
    decorators_1.GetApiRequest({
        publicRoute: false,
        apiVersions: '1'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "getMyData", null);
__decorate([
    decorators_1.PostApiRequest({ publicRoute: true, apiVersions: '1', requiredParams: { body: ['email', 'password', 'resetHash'] } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "passwordReset", null);
__decorate([
    socket_event_decorator_1.OnSocketEvent({
        eventName: 'stateChange',
        namespace: 'web-app'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyUserService.prototype, "onUserStateChangeEvent", null);
exports.DefaultHandyUserService = DefaultHandyUserService;
//# sourceMappingURL=handy-user.js.map