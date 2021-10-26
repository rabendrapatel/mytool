import { HandyModelClass } from '@models';
import { UploadsModelInterfaces } from "./model.interface";
export declare class UploadsModel extends HandyModelClass<UploadsModelInterfaces> {
    constructor();
    safeFileName(mwThis: UploadsModelInterfaces['createShape'], rest: any[]): Promise<UploadsModelInterfaces['createShape']>;
    private __normalizeFileName;
}
