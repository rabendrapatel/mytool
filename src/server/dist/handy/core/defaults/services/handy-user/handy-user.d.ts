import { UserModel, UserModelInterfaces } from '@models/user';
import { HandyErrorService, HandyUtilsService, HandyJwtService, HandyConfigService, HandyMailerService, HandySocketEmitter, HandyShortlinkService } from '@services';
import { ServerResponse, ServerRequest, ServerRequestUser, UnSignedObject, WebAppLoginResult, OnInit, UserRole, AdditionalAccessPermission, SingleOrArrayCombo, ConfigData, TokenData, RefreshTokenKeyPairCheck, CanUserLogIn, HandySocket } from '@handy/types';
import { hash, compare } from 'bcryptjs';
export declare class DefaultHandyUserService implements OnInit {
    protected _userModel: UserModel;
    protected _handyErrorService: HandyErrorService;
    protected _handyUtilsService: HandyUtilsService;
    protected _handyJwtService: HandyJwtService;
    protected _handyMailerService: HandyMailerService;
    protected _handyConfigService: HandyConfigService;
    protected _handySocketEmitter: HandySocketEmitter;
    protected _handyShortlinkService: HandyShortlinkService;
    protected _loginFailsList: WebAppLoginResult['failReason'][];
    protected _failedLoginLockSettings: ConfigData['failedLoginLock'];
    protected _loginsRecordsTrackLength: ConfigData['loginsRecordsTrackLength'];
    protected _cryptHash: typeof hash;
    protected _cryptCompare: typeof compare;
    protected _userPasswordSufixFlag: string;
    protected _defaultUserRole: UserRole[];
    constructor();
    onInit(): void;
    webAppRegister(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void;
    webAppLogin(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void;
    webAppLogout(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    verifyEmailEndpoint(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    unlockAccountEndpoint(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    refreshWebAppAccessToken(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    requestVerificationEmail(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    requestUnlockEmail(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    requestPasswordResetEmail(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    sendInvitationEmail(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void;
    webAppAccessTokenData(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    getMyData(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    passwordReset(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void;
    protected onUserStateChangeEvent(eventData?: any, user?: ServerRequestUser, socket?: HandySocket, rawData?: any): void;
    protected _checkSuperAdminExistence(): void;
    protected _addLoginRecord(email: string, loginData: UserModelInterfaces['fullModelShape']['loginsHistory'][number], request?: ServerRequest): void;
    generateDefaultUserOnRegistration(postedUserData: UserModelInterfaces['createShape']): UserModelInterfaces['createShape'];
    hashPassword(password: string): Promise<string>;
    getDefaultPersmissionsForRoles(rolesList?: SingleOrArrayCombo<UserRole>): AdditionalAccessPermission[];
    getPasswordSufix(): string;
    compareUserPasswordAgainstEmail(email: string, password: string): Promise<boolean>;
    verifyEmail(email: string, emailVerificationHash: string): Promise<boolean>;
    sendUnlockEmail(email: string): Promise<void>;
    sendPasswordResetEmail(email: string, invitation?: boolean): Promise<void>;
    sendVerificationEmail(email: string, hash: string): Promise<void>;
    generateAccessTokenFromUserData(userData: Pick<UserModelInterfaces['fullModelShape'], 'email' | '_id' | 'roles' | 'permissions' | 'groups' | 'groupId'>): Promise<TokenData>;
    generateRefreshToken(email: string, keyPairCheck?: RefreshTokenKeyPairCheck): Promise<TokenData>;
    getUserData(email: string): Promise<import("../../../../types").HandyMongooseFindOneResult<UserModelInterfaces, {
        selectType: "deselect";
        fields: ["password"];
    }>>;
    extractUserDataFromRefreshToken(token: string, request: ServerRequest): Promise<ServerRequestUser>;
    canLogin(userData: Pick<UserModelInterfaces['fullModelShape'], 'lockedUntil' | 'banned' | 'hasVerifiedEmail'>): CanUserLogIn;
    protected _emitDeviceLoginStatusChange(request: ServerRequest, status: boolean): void;
    protected _emitDeviceTokenRefresh(request: ServerRequest): void;
    protected _removeWebAppAuthCookies(request: ServerRequest, response: ServerResponse): void;
    isKnownLoginFail(failReason: any): boolean;
}
