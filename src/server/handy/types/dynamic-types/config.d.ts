/// Config types and interfaces
export type ConfigSetting = keyof ConfigData;

export interface ConfigErrorsInterface {
  'console': ['low' |'medium' |'high'],
  'notifyByEmail': ['high'],
  'emailTo': string,
  'defaultResponses': {
    'Server error': {
      'code': number,
      'msg': string,
    },
    'Bad request': {
      'code': number,
      'msg': string,
    },
    'Unauthorized': {
      'code': number,
      'msg': string,
    },
    'Forbidden': {
      'code': number,
      'msg': string,
    },
    'Resource not found': {
      'code': number,
      'msg': string,
    },
    'Gone': {
      'code': number,
      'msg': string,
    },
    'Unsupported Media Type': {
      'code': number,
      'msg': string,
    },
  },
  'refCodeLenght': number,
  'errorsLogHistorylength': number,
} 

export interface ConfigMailerInterface {
  'providers': {
    'zenbox': {
      'host': string,
      'port': number,
      'accounts': {
        'noReply': {
          'mail': string,
          'password': string,
          'from': string,
        },
      },
      'defaultAccount': string,
    },
  },
  'defaultProvider': string,
  'templatesPath': string,
  'defaultTextMsg': string,
} 

export interface ConfigJwtInterface {
  'types': {
    'webApp': {
      'secret': string,
      'prefix': string,
      'sufix': string,
      'lifeSpanUnit': string,
      'lifeSpan': number,
      'refreshKoeficient': number,
    },
    'mobileApp': {
      'secret': string,
      'prefix': string,
      'sufix': string,
      'lifeSpanUnit': string,
      'lifeSpan': number,
      'refreshKoeficient': number,
    },
    'refresh': {
      'secret': string,
      'prefix': string,
      'sufix': string,
      'lifeSpanUnit': string,
      'lifeSpan': number,
      'refreshKoeficient': number,
    },
  },
} 

export interface ConfigUsersRolesInterface {
  'superAdmin': {
    'description': string,
    'canBeCreatedBy': ['superAdmin'],
    'defaultPermissions': [],
    'publicName': string,
  },
  'admin': {
    'description': string,
    'canBeCreatedBy': ['superAdmin' |'admin'],
    'defaultPermissions': ['loggedIn'],
    'publicName': string,
  },
  'user': {
    'description': string,
    'defaultPermissions': ['loggedIn'],
    'canBeCreatedBy': ['superAdmin' |'admin'],
    'publicName': string,
  },
} 

export type ConfigAllowUsersGroupsInterface = boolean; 

export interface ConfigUserGroupsInterface {
  'paid': {
    'description': string,
  },
  'free': {
    'description': string,
  },
} 

export interface ConfigAdditionalAccessPermissionsSettingsInterface {
  'loggedIn': {
    'description': string,
    'publicName': string,
  },
} 

export interface ConfigMongoDBInterface {
  'active': boolean,
  'defaultQueryLimit': number,
  'defaultSoftDelete': boolean,
  'defaultCreatedAt': boolean,
  'defaultCreatedBy': boolean,
  'defaultLeanFindResults': boolean,
  'defaultPaginationDataIncluded': boolean,
  'defaultExactPagination': boolean,
  'defaultQueryDeletedOption': string,
  'defaultChangesHistory': boolean,
  'defaultChangesHistoryLength': number,
  'defaultChangesHistoryLimited': boolean,
  'defaultKeysToRemoveFromChangesHistory': ['createdBy' |'createdAt' |'changesHistory' |'_id'],
  'searchDefaultOptions': {
    'caseSensitive': boolean,
    'multiline': boolean,
    'extended': boolean,
    'dotAsWildCard': boolean,
  },
  'defaultModelsRoutable': boolean,
  'defaultValidationOnUpdate': boolean,
  'returnUpdatedDocOnUpdateByDefault': boolean,
  'mongooseAutoIndexing': boolean,
  'stringAutoTrimming': boolean,
  'port': number,
  'dbName': string,
  'local': boolean,
  'host': string,
  'auth': boolean,
  'user': string,
  'password': string,
  'secret': string,
  'wrongIndexingWaring': boolean,
  'uniqueValidatorOnNonIndexedFieldWarning': boolean,
  'mongooseDebugMode': boolean,
} 

export interface ConfigData {
  'projectName': string,
  'superAdminEmail': string,
  'createSuperAdminAccount': boolean,
  'domain': string,
  'ssl': boolean,
  errors: ConfigErrorsInterface,
  mailer: ConfigMailerInterface,
  'secret': string,
  'cookieSecret': string,
  jwt: ConfigJwtInterface,
  'userRegistration': {
    'openRegistration': boolean,
    'emailInvitation': boolean,
    'verifyEmail': boolean,
    'minPasswordStrengthPoints': number,
    'multiStepRegistration': boolean,
  },
  usersRoles: ConfigUsersRolesInterface,
  'defaultUserRole': string,
  allowUsersGroups: ConfigAllowUsersGroupsInterface,
  userGroups: ConfigUserGroupsInterface,
  'defaultUserGroupType': string,
  additionalAccessPermissionsSettings: ConfigAdditionalAccessPermissionsSettingsInterface,
  'userPassSufixFlag': string,
  mongoDB: ConfigMongoDBInterface,
  'apiVersions': ['1'],
  'defaultApiVersions': string,
  'publicRoutingByDefault': boolean,
  'serverPort': number,
  'usedRequestHeaders': ['Authorization' |'Dev-authorization' |'Origin' |'Handy-client-session-id' |'Handy-client-device-id' |'X-xsrf-token'],
  'deviceIdCookieHash': string,
  'objectCookiePreffix': string,
  'cors': {
    'active': boolean,
    'allowedOrigins': ['*'],
    'methodsToCheck': string,
  },
  'isMicroService': boolean,
  'webClientSettings': {
    'clientRootPath': string,
    'ssr': boolean,
    'ssrRenderingTimeout': number,
  },
  'socketConnectionType': ['websocket' |'polling'],
  'failedLoginLock': {
    'active': boolean,
    'lockAfterFailedLoginAttemptsCount': number,
    'sendUnlockEmailAfterLock': boolean,
    'unlockEmailSubject': string,
    'lockDuration': {
      'unit': string,
      'length': number,
    },
  },
  'loginsRecordsTrackLength': number,
  'defaultUserPreferences': {
    'webNotificationPosition': {
      'horizontal': string,
      'vertical': string,
    },
    'webNotificationDurationInSeconds': number,
    'webDarkTheme': boolean,
    'webSidenavOpenState': boolean,
    'webSidenavMode': string,
    'webSidenavPosition': string,
    'webSidenavPinned': boolean,
    'mobileWebSidenavPinned': boolean,
  },
  'logNetworkIpQrCodeOnDev': boolean,
  'fileUpload': {
    'maxFileSizeInMB': number,
    'allowedFileTypes': ['jpg' |'jpeg' |'png' |'svg' |'pdf' |'csv'],
    'imgFileTypes': ['jpg' |'jpeg' |'svg' |'png'],
    'separateUploadHandlersFileTypes': ['svg'],
    'thumsSets': {
      'logo': {
        'width': number,
        'height': number,
        'position': string,
        'background': string,
        'fit': string,
      },
    },
    'fileTypeThumbsIcons': {
      'jpg': string,
      'jpeg': string,
      'png': string,
      'svg': string,
      'pdf': string,
      'rest': string,
    },
    'imgThumbIconPlaceholder': string,
    'loadingImageIcon': string,
  },
  'clientAnalytics': {
    'tracking': boolean,
    'abTesting': boolean,
    'recordSession': boolean,
  },
}

type ConfigEnv = { env?: 'dev' | 'stag' | 'prod' }; 
export interface PublicConfigData extends ConfigEnv {
  'projectName': string,
  'domain': string,
  'ssl': boolean,
  'userRegistration': {
    'openRegistration': boolean,
    'emailInvitation': boolean,
    'verifyEmail': boolean,
    'minPasswordStrengthPoints': number,
    'multiStepRegistration': boolean,
  },
  usersRoles: ConfigUsersRolesInterface,
  allowUsersGroups: ConfigAllowUsersGroupsInterface,
  userGroups: ConfigUserGroupsInterface,
  additionalAccessPermissionsSettings: ConfigAdditionalAccessPermissionsSettingsInterface,
  'apiVersions': ['1'],
  'defaultApiVersions': string,
  'deviceIdCookieHash': string,
  'objectCookiePreffix': string,
  'socketConnectionType': ['websocket' |'polling'],
  'defaultUserPreferences': {
    'webNotificationPosition': {
      'horizontal': string,
      'vertical': string,
    },
    'webNotificationDurationInSeconds': number,
    'webDarkTheme': boolean,
    'webSidenavOpenState': boolean,
    'webSidenavMode': string,
    'webSidenavPosition': string,
    'webSidenavPinned': boolean,
    'mobileWebSidenavPinned': boolean,
  },
  'fileUpload': {
    'maxFileSizeInMB': number,
    'allowedFileTypes': ['jpg' |'jpeg' |'png' |'svg' |'pdf' |'csv'],
    'imgFileTypes': ['jpg' |'jpeg' |'svg' |'png'],
    'separateUploadHandlersFileTypes': ['svg'],
    'thumsSets': {
      'logo': {
        'width': number,
        'height': number,
        'position': string,
        'background': string,
        'fit': string,
      },
    },
    'fileTypeThumbsIcons': {
      'jpg': string,
      'jpeg': string,
      'png': string,
      'svg': string,
      'pdf': string,
      'rest': string,
    },
    'imgThumbIconPlaceholder': string,
    'loadingImageIcon': string,
  },
  'clientAnalytics': {
    'tracking': boolean,
    'abTesting': boolean,
    'recordSession': boolean,
  },
}

///Other types and interfaces
export type ErrorReasons = 'Server error' | 'Bad request' | 'Unauthorized' | 'Forbidden' | 'Resource not found' | 'Gone' | 'Unsupported Media Type';

///User role type 
export type UserRole = keyof ConfigData['usersRoles'];

///Users Group type 
export type UserGroup = keyof ConfigData['userGroups'];

///Users Group type 
export type AdditionalAccessPermission = keyof ConfigData['additionalAccessPermissionsSettings'];

///Email provider 
export type EmailProvider = keyof ConfigData['mailer']['providers'];

///Email templates list 
export type EmailTemplatePath = 'error/error-notice.hbs' | 'partials/email-footer.hbs' | 'partials/email-header.hbs' | 'user-emails/account-login-unlock.hbs' | 'user-emails/email-verification.hbs' | 'user-emails/password-reset.hbs' | 'user-emails/user-invitation.hbs';