import { HandyConfigService, HandyUtilsService, HandySocketEmitter } from '@services';
import { HandyModelClass } from '@models';
import { UserModelInterfaces } from "./model.interface";
import { HandyUserService } from '@services';
export declare class UserModel extends HandyModelClass<UserModelInterfaces> {
    protected _handyUserService: HandyUserService;
    protected _handyConfigService: HandyConfigService;
    protected _handyUtilsService: HandyUtilsService;
    protected _handySocketEmitter: HandySocketEmitter;
    constructor();
    protected _asignDefaultUserValues(mwThis: any, restArgs: any[]): Promise<void>;
    protected _hashUserPasswordMW(mwThis: any, restArgs: any[]): Promise<void>;
    protected _handleEmailChange(mwThis: any, restArgs: any[]): Promise<void>;
    protected _afterUpdate(mwThis: any, restArgs: any[]): Promise<any>;
    protected _updateClientsAfterDataUpdate(mwThis: any, restArgs: any[]): Promise<void>;
    protected _afterRegistration(mwThis: any, restArgs: any[]): Promise<any>;
}
