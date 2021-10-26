import { FileInputData } from "@handy/types";
import { UploadsModel, UploadsModelInterfaces } from "@models";
import { HandyService, HandyErrorService, HandyFileUploadService, HandyUtilsService, HandyConfigService } from "@services";
export declare class DefaultHandyCsvService extends HandyService {
    protected _handyError: HandyErrorService;
    protected _uploadsModel: UploadsModel;
    protected _uploadsService: HandyFileUploadService;
    protected _utils: HandyUtilsService;
    protected _config: HandyConfigService;
    constructor(_handyError: HandyErrorService, _uploadsModel: UploadsModel, _uploadsService: HandyFileUploadService, _utils: HandyUtilsService, _config: HandyConfigService);
    generateCsvString(docs: any[], emptyFieldValue?: string, expandArrayObjects?: boolean, unwindArrays?: boolean): Promise<string>;
    generateCsv(docs: any[], fileName: string, emptyFieldValue?: string, expandArrayObjects?: boolean, unwindArrays?: boolean, accessRules?: UploadsModelInterfaces['fullModelShape']['accessRules']): Promise<FileInputData>;
}
