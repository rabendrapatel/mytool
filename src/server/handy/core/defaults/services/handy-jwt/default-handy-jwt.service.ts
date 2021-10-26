import { HandyConfigService, HandyUtilsService, HandyErrorService } from '@services';
import * as jsonWebToken from 'jsonwebtoken';
import { Inject } from '@handy/core';
import { OnInit, ConfigJwtInterface, HandyError, HandyTimeUnit, UnSignedObject, ServerRequestUser, UserRole, AdditionalAccessPermission, UserGroup, UserAccessTokenPayload, TokenData, JwtType } from '@handy/types';

export class DefaultHandyJwtService implements OnInit {

  protected _jwt = jsonWebToken;
  protected _settings: ConfigJwtInterface = this.config.get().jwt;
  protected _handyUtilsService: HandyUtilsService;
  protected _sufixesHolder: { [key: string]: JwtType } = {};
  protected _sufixesList: string[] = [];
  protected _sufixesLen: number = 0;

  constructor (
    protected config: HandyConfigService,
    protected errorService: HandyErrorService) {

    this._parseSufixesHolder();

  }

  onInit() {

    this._handyUtilsService = Inject(HandyUtilsService);

  }

  public generateToken<Payload extends UnSignedObject = {}>(payLoad: Payload, jwtType: JwtType = 'webApp'): Promise<TokenData> {

    return new Promise((resolve, reject) => {

      let { lifeSpan = 0, lifeSpanUnit = 'ms', secret, sufix, prefix } = this._settings.types[jwtType];

      let expiresIn = this._handyUtilsService.handyTimeUnitToMs(lifeSpan, <HandyTimeUnit>lifeSpanUnit).toString();
      let expiryMoment = new Date(new Date().getTime() + parseInt(expiresIn)).getTime();

      let finalPayload: UnSignedObject = {
        data: payLoad,
        expiryMoment,
        lifeSpan,
        expiresIn: parseInt(expiresIn),
        lifeSpanUnit: <HandyTimeUnit>lifeSpanUnit
      }

      this._jwt.sign(finalPayload, secret, { expiresIn }, (err, token) => {

        token = `${prefix}${token}${sufix}`;

        if (err) {

          let additionalData: HandyError['additionalData'] = {
            private: {
              msg: 'Error while generating JWT token',
              payLoad
            }
          }

          let jwtError: HandyError = this.errorService.register(err, 'high', 'Server error', undefined, additionalData);
          return reject(jwtError);

        }

        let result: TokenData = {
          token,
          expiryMoment,
          lifeSpan,
          expiresIn: parseInt(expiresIn),
          lifeSpanUnit: <HandyTimeUnit>lifeSpanUnit
        }

        return resolve(result);

      })

    })

  }

  public decodeToken<PayLoadType>(token: string): Promise<DecodedTokenPayload<PayLoadType>> {

    return new Promise((resolve, reject) => {

      let jwtType: JwtType = this._getTokenType(token);

      if (!jwtType) {
        let jwtError: HandyError = this.errorService.register(new Error('Unknown token type'), 'medium', 'Bad request');
        return reject(jwtError);
      }

      let { secret, prefix, sufix } = this._settings.types[jwtType];
      token = token.replace(prefix, '');
      token = this._handyUtilsService.sliceFromEndOfString(token, sufix.length);

      this._jwt.verify(token, secret, (err, payLoad: any) => {


        if (err) {

          let additionalData: HandyError['additionalData'] = {
            private: {
              msg: 'Error while decoding JWT token',
              token,
              jwtType
            }
          }

          let jwtError: HandyError = this.errorService.register(err, 'low', undefined, undefined, additionalData);
          return reject(jwtError);

        }

        return resolve(<DecodedTokenPayload<PayLoadType>>payLoad);

      })

    })

  }

  public extractUserDataFormToken(token: string): Promise<ServerRequestUser> {

    let serverRequestUser: ServerRequestUser = this.generateEmptyServerRequestUser();

    if (!token) {
      return Promise.resolve(serverRequestUser);
    } else {

      return new Promise((resolve, reject) => {

        this.decodeToken<UserAccessTokenPayload>(token)
          .then(payLoad => {

            return resolve(this.generateKnownServerRequestUser(payLoad.data));

          })
          .catch(err => {
            return reject(this.errorService.register(err, 'medium', 'Server error', undefined, { private: `Token parsing error ` }));

          })

      })

    }

  }

  public generateEmptyServerRequestUser(): ServerRequestUser {

    let serverRequestUser: ServerRequestUser = {
      loggedIn: false,
      email: null,
      _id: null,
      roles: [],
      groups: [],
      permissions: [],
      groupId: null,
      hasRoles: (roles: UserRole[] | UserRole) => {

        if (!serverRequestUser.loggedIn) {
          return false;
        }

        if (serverRequestUser.roles.includes('superAdmin')) {
          return true;
        }

        if (isArray(roles)) {

          let rolesLen: number = roles.length;
          for (let i = 0; i < rolesLen; i++) {
            const requiredRole = roles[i] as UserRole;

            if (serverRequestUser.roles.includes(requiredRole)) {
              return true;
            }
          }

          return false;

        } else {

          return serverRequestUser.roles.includes(<UserRole>roles);

        }

      },
      hasPermissions: (permissions: AdditionalAccessPermission[] | AdditionalAccessPermission) => {

        if (!serverRequestUser.loggedIn) {
          return false;
        }

        if (serverRequestUser.roles.includes('superAdmin')) {
          return true;
        }

        if (isArray(permissions)) {

          if (permissions.includes('loggedIn')) {
            return true;
          }

          let permissionsLen: number = permissions.length;
          for (let i = 0; i < permissionsLen; i++) {
            const requiredPermission = permissions[i] as AdditionalAccessPermission;

            if (serverRequestUser.permissions.includes(requiredPermission)) {
              return true;
            }
          }

          return false;

        } else {

          if (permissions === 'loggedIn') {
            return true;
          }

          return serverRequestUser.permissions.includes(<unknown>permissions as AdditionalAccessPermission);

        }

      },
      isMemberOfGroupTypes: (groups: UserGroup[] | UserGroup) => {

        if (!serverRequestUser.loggedIn) {
          return false;
        }

        if (serverRequestUser.roles.includes('superAdmin')) {
          return true;
        }

        if (isArray(groups)) {

          let groupsLen: number = groups.length;
          for (let i = 0; i < groupsLen; i++) {
            const requiredgroup = groups[i] as UserGroup;

            if (serverRequestUser.groups.includes(requiredgroup)) {
              return true;
            }
          }

          return false;

        } else {

          return serverRequestUser.groups.includes(<UserGroup>groups);

        }

      },
      isMemberOfGroupId: (groupId: number | number[]) => {

        if (!serverRequestUser.loggedIn) {
          return false;
        }

        if (isArray(groupId)) {

          let groupIdLen: number = (<number[]>groupId).length;
          for (let i = 0; i < groupIdLen; i++) {
            const requiredGrupId = (<number[]>groupId)[i];

            if (serverRequestUser.groupId === requiredGrupId) {
              return true;
            }
          }

          return false;

        } else {

          return serverRequestUser.groupId === groupId;

        }
      },

    }

    return { ...serverRequestUser };

  }

  public generateKnownServerRequestUser(userData: UserAccessTokenPayload): ServerRequestUser {

    let { email = null, _id = null, roles = [], groups = [], permissions = [], groupId = null } = userData

    let serverRequestUser: ServerRequestUser = {
      loggedIn: true,
      email,
      _id,
      roles,
      groups,
      permissions,
      groupId,
      hasRoles: (roles: UserRole[] | UserRole) => {

        if (!serverRequestUser.loggedIn) {
          return false;
        }

        if (serverRequestUser.roles.includes('superAdmin')) {
          return true;
        }

        if (isArray(roles)) {

          let rolesLen: number = roles.length;
          for (let i = 0; i < rolesLen; i++) {
            const requiredRole = roles[i] as UserRole;

            if (serverRequestUser.roles.includes(requiredRole)) {
              return true;
            }
          }

          return false;

        } else {

          return serverRequestUser.roles.includes(<UserRole>roles);

        }

      },
      hasPermissions: (permissions: AdditionalAccessPermission[] | AdditionalAccessPermission) => {


        if (!serverRequestUser.loggedIn) {
          return false;
        }

        if (serverRequestUser.roles.includes('superAdmin')) {
          return true;
        }

        if (isArray(permissions)) {

          if (permissions.includes('loggedIn')) {
            return true;
          }

          let permissionsLen: number = permissions.length;
          for (let i = 0; i < permissionsLen; i++) {
            const requiredPermission = permissions[i] as AdditionalAccessPermission;

            if (serverRequestUser.permissions.includes(requiredPermission)) {
              return true;
            }
          }

          return false;

        } else {

          if (permissions === 'loggedIn') {
            return true;
          }

          return serverRequestUser.permissions.includes(<unknown>permissions as AdditionalAccessPermission);

        }

      },
      isMemberOfGroupTypes: (groups: UserGroup[] | UserGroup) => {

        if (!serverRequestUser.loggedIn) {
          return false;
        }

        if (serverRequestUser.roles.includes('superAdmin')) {
          return true;
        }

        if (isArray(groups)) {

          let groupsLen: number = groups.length;
          for (let i = 0; i < groupsLen; i++) {
            const requiredgroup = groups[i] as UserGroup;

            if (serverRequestUser.groups.includes(requiredgroup)) {
              return true;
            }
          }

          return false;

        } else {

          return serverRequestUser.groups.includes(<UserGroup>groups);

        }

      },
      isMemberOfGroupId: (groupId: number | number[]) => {

        if (!serverRequestUser.loggedIn) {
          return false;
        }

        if (isArray(groupId)) {

          let groupIdLen: number = (<number[]>groupId).length;
          for (let i = 0; i < groupIdLen; i++) {
            const requiredGrupId = (<number[]>groupId)[i];

            if (serverRequestUser.groupId === requiredGrupId) {
              return true;
            }
          }

          return false;

        } else {

          return serverRequestUser.groupId === groupId;

        }
      },

    }

    return { ...serverRequestUser };

  }

  protected _getTokenType(token: string): JwtType {

    let tokenType: JwtType;
    for (let i = 0; i < this._sufixesLen; i++) {
      const sufix = this._sufixesList[i];
      if (token.endsWith(sufix)) {

        tokenType = this._sufixesHolder[sufix];
        break;
      }
    }

    return tokenType;

  }

  protected _parseSufixesHolder(): void {

    let tokenTypes: JwtType[] = Object.keys(this._settings.types) as JwtType[];
    let typesLen: number = tokenTypes.length;

    for (let i = 0; i < typesLen; i++) {
      const type = tokenTypes[i];
      const sufix = this._settings.types[type].sufix;
      this._sufixesHolder[sufix] = type;

      this._sufixesList.push(sufix);
      this._sufixesLen++;
    }

  }

}

interface DecodedTokenPayload<PayloadType> {
  data: PayloadType,
  expiryMoment: number,
  lifeSpan: number,
  expiresIn: number,
  lifeSpanUnit: HandyTimeUnit
}