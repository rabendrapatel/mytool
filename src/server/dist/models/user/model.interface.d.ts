import { MongooseModelInterfaces, SearchableMongooseModelFields, CompleteMongooseModelShapeInterface, MongooseModelCreateShape, CompleteMongoModelFields, UserRole, AdditionalAccessPermission, UserGroup, UnSignedObject } from "@handy/types";
export interface UserModelInterfaces extends MongooseModelInterfaces {
    shape: {
        email: string;
        password?: string;
        roles?: UserRole[];
        permissions?: AdditionalAccessPermission[];
        hasVerifiedEmail?: boolean;
        emailVerificationHash?: string;
        registeredViaInvitation?: boolean;
        groupId?: number;
        groups?: UserGroup[];
        banned?: boolean;
        lockedUntil?: number;
        unlockedAt?: number;
        unLockHash?: string;
        passwordResetHash?: string;
        loginsHistory?: {
            success: boolean;
            at: number;
            deviceId?: string;
            clientType?: 'web' | 'mobile' | 'desktop' | 'unknown';
        }[];
        name?: string;
        newEmail?: string;
        preferences?: {
            webDarkTheme?: boolean;
            webSidenavOpenState?: boolean;
            webSidenavMode?: 'over' | 'push' | 'side';
            webSidenavPosition?: 'over' | 'side';
            webSidenavPinned?: boolean;
            mobileWebSidenavPinned?: boolean;
            webNotificationPosition?: {
                horizontal: 'right' | 'left' | 'center';
                vertical: 'top' | 'bottom';
            };
            webNotificationDurationInSeconds?: number;
        };
        completeProfile?: boolean;
        state?: UnSignedObject;
    };
    softDelete: true;
    createdAt: true;
    createdBy: true;
    autoIncrement: true;
    changesHistory: true;
    defaultSelect: {
        selectType: 'deselect';
        fields: ['password'];
    };
    fullModelShape: CompleteMongooseModelShapeInterface<this['shape'], this['softDelete'], this['createdAt'], this['createdBy'], this['autoIncrement'], this['changesHistory']>;
    docShape: this['fullModelShape'];
    createShape: MongooseModelCreateShape<this['fullModelShape']>;
    allFields: CompleteMongoModelFields<keyof this['fullModelShape'], this['softDelete'], this['createdAt'], this['createdBy'], this['changesHistory']>;
    idType: this['fullModelShape']['_id'];
    searchableFields: SearchableMongooseModelFields<this>;
}
