import { Inject } from '@handy/core';
import { UserModel, UserModelInterfaces } from '@models/user';
import { HandyErrorService, HandyUtilsService, HandyJwtService, HandyConfigService, HandyMailerService, HandySocketEmitter, HandyShortlinkService } from '@services';
import { PostApiRequest, GetApiRequest, DeleteApiRequest, GetRequest } from '@handy/core/decorators';
import {
  ServerResponse, ServerRequest, ServerRequestUser,
  UnSignedObject, WebAppLoginResult, OnInit, UserRole, AdditionalAccessPermission,
  SingleOrArrayCombo, ConfigData, TokenData, UserAccessTokenPayload, RefreshTokenKeyPairCheck,
  ArrayOrUnionToUnion, HandyTimeUnit, CanUserLogIn, HandySocket, HandyError
} from '@handy/types';

import { hash, compare } from 'bcryptjs'
import { OnSocketEvent } from '@handy/core/decorators/socket-event.decorator';

export class DefaultHandyUserService implements OnInit {

  protected _userModel: UserModel;
  protected _handyErrorService: HandyErrorService = Inject(HandyErrorService);
  protected _handyUtilsService: HandyUtilsService = Inject(HandyUtilsService);
  protected _handyJwtService: HandyJwtService = Inject(HandyJwtService);
  protected _handyMailerService: HandyMailerService = Inject(HandyMailerService);
  protected _handyConfigService: HandyConfigService = Inject(HandyConfigService);
  protected _handySocketEmitter: HandySocketEmitter = Inject(HandySocketEmitter);
  protected _handyShortlinkService: HandyShortlinkService = Inject(HandyShortlinkService);

  protected _loginFailsList: WebAppLoginResult['failReason'][] = ['banned', 'invalidCreds', 'locked', 'unverified'];
  protected _failedLoginLockSettings: ConfigData['failedLoginLock'] = this._handyConfigService.get().failedLoginLock;
  protected _loginsRecordsTrackLength: ConfigData['loginsRecordsTrackLength'] = this._handyConfigService.get().loginsRecordsTrackLength;

  protected _cryptHash: typeof hash = hash;
  protected _cryptCompare: typeof compare = compare;

  protected _userPasswordSufixFlag: string = this._handyConfigService.get().userPassSufixFlag;
  protected _defaultUserRole: UserRole[] = (isArray(this._handyConfigService.get().defaultUserRole)) ? <unknown>this._handyConfigService.get().defaultUserRole as UserRole[] : [this._handyConfigService.get().defaultUserRole] as UserRole[];

  constructor () { }

  public onInit(): void {

    this._userModel = Inject(UserModel);
    this._checkSuperAdminExistence();

  }

  /* -------------------------------------------------------------------------- */
  /*                                   Routes                                   */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------------- Auth ---------------------------------- */

  @PostApiRequest({ publicRoute: false, apiVersions: '1', requiredParams: { body: ['email', 'password'] } })
  public webAppRegister(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void {

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

      })

  }

  @PostApiRequest({ publicRoute: false, apiVersions: '1', requiredParams: { body: ['email', 'password'] } })
  public webAppLogin(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void {

    let { email, password } = body;
    let match: boolean = false;
    let responseData: WebAppLoginResult = {};

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

        let canLogin: CanUserLogIn = this.canLogin(findOneResult.doc);

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

        let deviceIdData: RefreshTokenKeyPairCheck;
        if (isNotEmpty(request.locals.deviceId)) {
          deviceIdData = {
            checkSet: {
              type: request.locals.deviceIdType,
              name: this._handyConfigService.get().deviceIdCookieHash,
              value: request.locals.deviceId
            }
          }
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

      })

  }

  @DeleteApiRequest({ publicRoute: false, apiVersions: '1', accessRestriction: {} })
  public webAppLogout(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void {

    this._removeWebAppAuthCookies(request, response);
    return response.jsonResponse(null, true);

  }

  @GetRequest({
    customUrlPath: 'verifyEmail/:email/:hash',
    publicRoute: true,
  })
  public verifyEmailEndpoint(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void {

    let { email = null, hash = null } = request.params;

    if (typeof email === 'string') {
      email = email.replace(' ', '+');
    }

    this.verifyEmail(email, hash)
      .then(result => {

        if (!result) {

          let err: HandyError = this._handyErrorService.register(null, 'low', 'Bad request', undefined, { private: 'Error while verifiing email address' }, request, response);
          return Promise.reject(err);

        }

        if (this._handyConfigService.get().isMicroService) {
          return response.jsonResponse({});
        }

        return response.redirectToClient('auth-msg', { email, action: 'emailVerified' })

      })
      .catch(err => {

        let parsedErr: HandyError = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);

        if (this._handyConfigService.get().isMicroService) {
          return response.errorResponse(parsedErr);
        }

        return response.redirectToClientErrPage(parsedErr);

      })

  }

  @GetRequest({
    customUrlPath: 'unlockAccount/:email/:hash',
    publicRoute: true,
  })
  public unlockAccountEndpoint(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void {

    let { email = null, hash = null } = request.params;

    if (typeof email === 'string') {
      email = email.replace(' ', '+');
    }

    this._userModel.findOne({ email }, { selectType: 'select', fields: ['unLockHash'] })
      .then(result => {

        if (!result.foundRecord) {

          let err: HandyError = this._handyErrorService.register(null, 'low', 'Bad request', undefined, { private: 'Unlocking unknow account' }, request, response);
          return Promise.reject(err);

        }

        if (result.doc.unLockHash !== hash) {

          let err: HandyError = this._handyErrorService.register(null, 'low', 'Bad request', undefined, { private: 'Error while verifiing email address' }, request, response);
          return Promise.reject(err);

        }

        this._userModel.updateOne({ email }, { unLockHash: null, lockedUntil: 0, unlockedAt: new Date().getTime() });

      })
      .then(() => {

        if (this._handyConfigService.get().isMicroService) {
          return response.jsonResponse({});
        }

        return response.redirectToClient('auth-msg', { email, action: 'accountUnlocked' })

      })
      .catch(err => {

        let parsedErr: HandyError = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);

        if (this._handyConfigService.get().isMicroService) {
          return response.errorResponse(parsedErr);
        }

        return response.redirectToClientErrPage(parsedErr);

      })

  }

  @GetApiRequest({
    publicRoute: false,
    apiVersions: '1'
  })
  public refreshWebAppAccessToken(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void {

    let refreshToken: string = request.getCookie(true, 'Authorization_refresh', null);

    if (!refreshToken) {
      return response.errorResponse(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, undefined, request, response));
    }

    this._handyJwtService.decodeToken<{ email: string, keyPairCheck: RefreshTokenKeyPairCheck }>(refreshToken)
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

        let canLogin: CanUserLogIn = this.canLogin(result.doc);

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

      })

  }

  @GetApiRequest({
    publicRoute: true,
    apiVersions: '1'
  })
  public requestVerificationEmail(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void {

    let email: string = query.email;

    if (typeof email === 'string') {
      email = email.replace(' ', '+');
    }

    let hash: string;

    this._userModel.findOne({ $or: [{ email }, { newEmail: email }] }, { selectType: 'select', fields: ['emailVerificationHash'] })
      .then(result => {

        if (!result.foundRecord) {

          let err: HandyError = this._handyErrorService.register('Unknown account', 'low', 'Bad request', undefined, undefined, request, response);
          return Promise.reject(err);

        }

        if (!result.doc.emailVerificationHash) {

          hash = this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false, length: 10 });
          return this._userModel.updateOne({ email }, { emailVerificationHash: hash });

        }

        hash = result.doc.emailVerificationHash;
        return Promise.resolve() as any;

      })
      .then(result => {

        if (result) {

          if (result.updatedRecords < 1) {

            let err: HandyError = this._handyErrorService.register('Email verification hash update error', 'medium', 'Server error', undefined, undefined, request, response);
            return Promise.reject(err);

          }

        }

        return this.sendVerificationEmail(email, hash)

      })
      .then(() => {

        response.jsonResponse({})

      })
      .catch(err => {

        let parsedErr: HandyError = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
        return response.errorResponse(parsedErr);

      })

  }

  @GetApiRequest({
    publicRoute: true,
    apiVersions: '1'
  })
  public requestUnlockEmail(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void {

    let email: string = query.email;

    if (typeof email === 'string') {
      email = email.replace(' ', '+');
    }

    this.sendUnlockEmail(email)
      .then(() => {

        response.jsonResponse({})

      })
      .catch(err => {

        let parsedErr: HandyError = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
        return response.errorResponse(parsedErr);

      })

  }

  @GetApiRequest({
    publicRoute: true,
    apiVersions: '1'
  })
  public requestPasswordResetEmail(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject,): void {

    let email: string = query.email;

    if (typeof email === 'string') {
      email = email.replace(' ', '+');
    }

    this.sendPasswordResetEmail(email)
      .then(() => {

        response.jsonResponse({})

      })
      .catch(err => {

        let parsedErr: HandyError = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
        return response.errorResponse(parsedErr);

      })

  }

  @PostApiRequest({
    publicRoute: false,
    apiVersions: '1',
    requiredParams: {
      body: ['email']
    }
  })
  public sendInvitationEmail(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void {

    if (!this._handyConfigService.get().userRegistration.emailInvitation) {

      let err = this._handyErrorService.register(null, 'medium', 'Forbidden', undefined, undefined, request, response);
      response.errorResponse(err);
      return;

    }

    let email: string = query.email;

    if (typeof email === 'string') {
      email = email.replace(' ', '+');
    }

    this.sendPasswordResetEmail(email, true)
      .then(() => {

        response.jsonResponse({})

      })
      .catch(err => {

        let parsedErr: HandyError = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
        return response.errorResponse(parsedErr);

      })

  }

  @GetApiRequest({
    publicRoute: false,
    apiVersions: '1'
  })
  public webAppAccessTokenData(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void {

    let accessToken: string = request.getCookie(true, 'Authorization', null);

    if (!accessToken) {
      this._removeWebAppAuthCookies(request, response);
      return response.errorResponse(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, undefined, request, response));
    }

    this._handyJwtService.decodeToken<UserAccessTokenPayload>(accessToken)
      .then(tokenData => {

        let { expiresIn, lifeSpan, lifeSpanUnit, expiryMoment } = tokenData;

        let tokenDetails: TokenData = {
          token: accessToken,
          expiresIn,
          lifeSpan,
          lifeSpanUnit,
          expiryMoment
        }

        return response.jsonResponse(tokenDetails);

      })
      .catch(err => {

        return response.errorResponse(this._handyErrorService.register(err, 'medium', 'Server error', undefined, { private: { msg: `Error while refreshing web app token. reason` } }, request, response));

      })

  }

  @GetApiRequest({
    publicRoute: false,
    apiVersions: '1'
  })
  public getMyData(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void {

    if (!user.loggedIn) {
      return response.errorResponse(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, undefined, request, response));
    }

    this._userModel.findOne({ email: user.email })
      .then(result => {

        if (!result.foundRecord) {

          return Promise.reject(this._handyErrorService.register(new Error(), 'low', 'Bad request', undefined, undefined, request, response));
        }

        let canLogin: CanUserLogIn = this.canLogin(result.doc);

        if (!canLogin.can) {
          return Promise.reject(this._handyErrorService.register(new Error(), 'low', 'Unauthorized', undefined, { private: { msg: `Error while refreshing web app token. reason`, canLogin } }, request, response));
        }

        return response.jsonResponse(result.doc);

      })
      .catch(err => {

        return response.errorResponse(this._handyErrorService.register(err, 'medium', 'Server error', undefined, { private: { msg: `Error while refreshing web app token. reason` } }, request, response));

      })

  }

  @PostApiRequest({ publicRoute: true, apiVersions: '1', requiredParams: { body: ['email', 'password', 'resetHash'] } })
  public passwordReset(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void {

    let { email, password, resetHash } = body;

    this._userModel.findOne({ email }, { selectType: 'select', fields: ['passwordResetHash'] })
      .then(findresult => {

        let { doc, foundRecord } = findresult;

        if (!foundRecord) {

          let unknowAccountErr: HandyError = this._handyErrorService.register(null, 'low', 'Bad request', undefined, undefined, request, response);
          return Promise.reject(unknowAccountErr);

        }

        if (resetHash !== doc.passwordResetHash) {

          let invalidHashErr: HandyError = this._handyErrorService.register(null, 'medium', 'Unauthorized', undefined, undefined, request, response);
          return Promise.reject(invalidHashErr);

        }

        return this._userModel.updateOne({ email }, { password, passwordResetHash: null, hasVerifiedEmail: true, emailVerificationHash: null });

      })
      .then(updateResult => {

        response.jsonResponse(updateResult);

      })
      .catch(err => {

        let respErr: HandyError = this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, request, response);
        return response.errorResponse(respErr);

      })

  }

  /* -------------------------------------------------------------------------- */
  /*                                   Sockets                                  */
  /* -------------------------------------------------------------------------- */

  @OnSocketEvent({
    eventName: 'stateChange',
    namespace: 'web-app'
  })
  protected onUserStateChangeEvent(eventData?: any, user?: ServerRequestUser, socket?: HandySocket, rawData?: any): void {

    if (!user.loggedIn) {
      return;
    }

    socket.emitToEveryoneExcludingSender('stateChange', [`user_email_${user.email}`], eventData);

    this._userModel.updateOne({ _id: user._id }, { state: eventData }, { skipUpdateHistory: true, updateName: 'stateChange', customOptions: { skipSocketEventEmit: true } })
      .then(result => {


      })
      .catch(err => {

        this._handyErrorService.register(err, 'low');

      })

  }

  /* -------------------------------------------------------------------------- */
  /*                               Helper methods                               */
  /* -------------------------------------------------------------------------- */

  protected _checkSuperAdminExistence(): void {

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
          ])

      }

    }))
      .catch(err => {
        handyErrLog(err);
      })

  }

  protected _addLoginRecord(email: string, loginData: UserModelInterfaces['fullModelShape']['loginsHistory'][number], request?: ServerRequest): void {

    this._userModel.updateOne({ email }, { $push: { loginsHistory: { $each: [loginData], $slice: 0 - this._loginsRecordsTrackLength } } }, { skipUpdateHistory: true })
      .then(() => {
        // Login record added
      })
      .catch(err => {
        this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: `Error while adding login record` } }, request);
      })

  }

  public generateDefaultUserOnRegistration(postedUserData: UserModelInterfaces['createShape']): UserModelInterfaces['createShape'] {

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

  public hashPassword(password: string): Promise<string> {

    return new Promise((resolve, reject) => {

      this._cryptHash(password, 10).then(hashedPass => {

        let finalHashWithPreffix: string = `${hashedPass}${this._userPasswordSufixFlag}`;

        return resolve(finalHashWithPreffix);

      })
        .catch(err => {

          let handyParsedErr = this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: 'User password hashing error' } });
          return reject(handyParsedErr);

        })

    })

  }

  public getDefaultPersmissionsForRoles(rolesList: SingleOrArrayCombo<UserRole> = []): AdditionalAccessPermission[] {

    let permissionsList: AdditionalAccessPermission[] = [];

    let rolesToCheck: UserRole[];

    if (isArray(rolesList)) {
      rolesToCheck = [...rolesList as UserRole[]];
    } else {
      rolesToCheck = [rolesList as UserRole];
    }

    let rolesLen: number = rolesToCheck.length;
    for (let i = 0; i < rolesLen; i++) {
      const singleRole: UserRole = rolesToCheck[i];

      let defaultRolePermissions: AdditionalAccessPermission[] = this._handyConfigService.get().usersRoles[singleRole as keyof ConfigData['usersRoles']].defaultPermissions as AdditionalAccessPermission[];

      let defaultRolePermissionsLen: number = defaultRolePermissions.length;
      for (let j = 0; j < defaultRolePermissionsLen; j++) {
        const singleRoleDefaultPermission: AdditionalAccessPermission = defaultRolePermissions[j];

        if (!permissionsList.includes(singleRoleDefaultPermission)) {
          permissionsList.push(singleRoleDefaultPermission);
        }
      }

    }

    return permissionsList;

  }

  public getPasswordSufix(): string {
    return this._userPasswordSufixFlag;
  }

  public compareUserPasswordAgainstEmail(email: string, password: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

      let existingUser: boolean = true;
      let userLoginsHistory: UserModelInterfaces['fullModelShape']['loginsHistory'] = [];
      let userLockedUntil: number = 0;
      let userUnlockedAt: number = 0;
      let userBanned: boolean;

      let lock: boolean = true;
      let thisMoment: number;
      let comparsionResult: boolean = false;
      let sendUnlockEmail: boolean = false;
      let unlockEmailSent: boolean = false;
      let userVerified: boolean = false;

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

          let loginsHistoryLen: number = userLoginsHistory.length;
          let checkLen: number = 2;

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
          } else {

            let { unit, length } = this._failedLoginLockSettings.lockDuration;
            let lockedUntilTime: number = thisMoment + this._handyUtilsService.handyTimeUnitToMs(length, unit as HandyTimeUnit);
            sendUnlockEmail = true;

            return <unknown>this._userModel.updateOne(
              { email },
              {
                lockedUntil: lockedUntilTime,
              },
              { updateName: 'Failed login lock' }
            ) as Promise<void>;

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

        })

    })

  }

  public verifyEmail(email: string, emailVerificationHash: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

      let searchQuery: UnSignedObject = { $or: [{ emailVerificationHash, email }, { emailVerificationHash, newEmail: email }] };

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

            })

        })
        .catch(err => {

          this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: `Error while verifing user email`, email, emailVerificationHash } });
          return reject(err);

        })

    })

  }

  public sendUnlockEmail(email: string): Promise<void> {

    let unlokHashToSend: string;

    return new Promise((resolve, reject) => {

      return this._userModel.findOne({ email }, { selectType: 'select', fields: 'unLockHash' })
        .then(userDataResult => {

          if (!userDataResult.foundRecord) {
            return Promise.reject(`Unknown account ${email}`);
          }

          unlokHashToSend = userDataResult.doc.unLockHash;

          if (!unlokHashToSend) {

            unlokHashToSend = this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false });
            return <unknown>this._userModel.updateOne({ email }, { unLockHash: unlokHashToSend }, { updateName: 'Generated unlock hash', skipUpdateHistory: true }) as Promise<void>;

          }

          return Promise.resolve();

        })
        .then(() => {

          return this._handyShortlinkService.generateShortlink(`${this._handyConfigService.getClientUrl()}service/handyUser/unlockAccount/${email}/${unlokHashToSend}`, false)

        })
        .then(unlockLink => {

          return this._handyMailerService.sendMail({
            to: email,
            template: 'user-emails/account-login-unlock.hbs',
            subject: this._failedLoginLockSettings.unlockEmailSubject,
            data: {
              unlockLink
            }
          })

        })
        .then(() => {
          return resolve();
        })
        .catch(err => {
          return reject(this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: 'Error while sending unlock email to user' } }))
        })


    })

  }

  public sendPasswordResetEmail(email: string, invitation: boolean = false): Promise<void> {

    let resetHash: string;

    return new Promise((resolve, reject) => {

      return this._userModel.findOne({ email }, { selectType: 'select', fields: 'passwordResetHash' })
        .then(userDataResult => {

          if (!userDataResult.foundRecord) {
            return Promise.reject(`Unknown account ${email}`);
          }

          resetHash = userDataResult.doc.passwordResetHash;

          if (!resetHash) {

            resetHash = this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false });
            return <unknown>this._userModel.updateOne({ email }, { passwordResetHash: resetHash }, { updateName: 'Generated unlock hash', skipUpdateHistory: true }) as Promise<void>;

          }

          return Promise.resolve();

        })
        .then(() => {

          let clientSubPath: string = (!invitation) ? 'password-reset' : 'invitation-password-set';

          return this._handyShortlinkService.generateShortlink(`${this._handyConfigService.getClientUrl()}${clientSubPath}/${email}/${resetHash}`, false)

        })
        .then(passwordResetLink => {

          return this._handyMailerService.sendMail({
            to: email,
            template: (!invitation) ? 'user-emails/password-reset.hbs' : 'user-emails/user-invitation.hbs',
            subject: (!invitation) ? 'Password reset link' : `Invitation to ${this._handyConfigService.get().projectName}`,
            data: {
              passwordResetLink
            }
          })

        })
        .then(() => {
          return resolve();
        })
        .catch(err => {
          return reject(this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: 'Error while sending unlock email to user' } }))
        })


    })

  }

  public sendVerificationEmail(email: string, hash: string): Promise<void> {

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
          })

        })
        .then(emailresult => {
          return resolve(emailresult);
        })
        .catch(err => {
          let handyErr: HandyError = this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: { msg: 'Eror while sending verification email', email, hash } });
          return reject(handyErr);
        })

    })


  }

  public generateAccessTokenFromUserData(userData: Pick<UserModelInterfaces['fullModelShape'], 'email' | '_id' | 'roles' | 'permissions' | 'groups' | 'groupId'>): Promise<TokenData> {

    let { email, _id, roles, groups, permissions, groupId } = userData;
    return this._handyJwtService.generateToken<UserAccessTokenPayload>({ email, _id, roles, groups, permissions, groupId });

  }

  public generateRefreshToken(email: string, keyPairCheck: RefreshTokenKeyPairCheck = {}): Promise<TokenData> {

    return this._handyJwtService.generateToken({ email, keyPairCheck }, 'refresh');

  }

  public getUserData(email: string) {

    return this._userModel.findOne({ email });

  }

  public extractUserDataFromRefreshToken(token: string, request: ServerRequest): Promise<ServerRequestUser> {

    let requestUserData: ServerRequestUser = this._handyJwtService.generateEmptyServerRequestUser();

    if (isEmpty(token)) {
      return Promise.resolve(requestUserData);
    }

    return new Promise((resolve, reject) => {

      this._handyJwtService.decodeToken<{ email: string, keyPairCheck: RefreshTokenKeyPairCheck }>(token)
        .then(tokenResult => {

          let canRefresh: boolean = true;
          let { email, keyPairCheck } = tokenResult.data;

          if (isNotEmpty(tokenResult.data.keyPairCheck)) {

            let { checkSet } = keyPairCheck;
            let { type, name, value } = checkSet;

            switch (type) {
              case 'cookie':

                canRefresh = request.getCookie(true, name as string, null) === value;

                break;

              case 'header':

                canRefresh = request.getHeader(name as ArrayOrUnionToUnion<ConfigData['usedRequestHeaders']>, null) === value;

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

          return resolve({ ...requestUserData, ...findOneResult.doc, ...{ loggedIn: true } });

        })
        .catch(err => {

          this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request);
          return resolve(requestUserData);

        })


    })

  }

  public canLogin(userData: Pick<UserModelInterfaces['fullModelShape'], 'lockedUntil' | 'banned' | 'hasVerifiedEmail'>): CanUserLogIn {

    let { lockedUntil = 0, banned, hasVerifiedEmail = !this._handyConfigService.get().userRegistration.verifyEmail } = userData;

    let result: CanUserLogIn = {
      can: true,
      reason: null
    }

    if (banned) {
      result.can = false;
      result.reason = 'banned';
    }

    if (!hasVerifiedEmail) {
      result.can = false;
      result.reason = 'unverified';
    }

    if (lockedUntil) {
      let thisMoment: number = new Date().getTime();

      if (thisMoment < lockedUntil) {
        result.can = false;
        result.reason = 'locked';
      }

    }

    return result;

  }

  protected _emitDeviceLoginStatusChange(request: ServerRequest, status: boolean): void {

    if (request.locals.deviceId) {

      let handyClientSessionId = request.handyClientSessionId;

      setTimeout(() => {
        this._handySocketEmitter.emit('login-status-change', { session: handyClientSessionId, status }, 'web-app', [`web_device_id_${request.locals.deviceId}`])
      }, 500);

    }

  }

  protected _emitDeviceTokenRefresh(request: ServerRequest): void {

    if (request.locals.deviceId) {

      let handyClientSessionId = request.handyClientSessionId;

      setTimeout(() => {
        this._handySocketEmitter.emit('access-token-change', handyClientSessionId, 'web-app', [`web_device_id_${request.locals.deviceId}`])
      }, 500);

    }

  }

  protected _removeWebAppAuthCookies(request: ServerRequest, response: ServerResponse): void {

    response.setCookie('Authorization', '', { lifespan: { sec: -1 }, signed: true, sameSite: true, serverOnly: true });
    response.setCookie('Authorization_refresh', '', { lifespan: { sec: -1 }, signed: true, sameSite: true, serverOnly: true });

    this._emitDeviceLoginStatusChange(request, false);

  }

  public isKnownLoginFail(failReason: any): boolean {
    return this._loginFailsList.includes(failReason);
  }

}