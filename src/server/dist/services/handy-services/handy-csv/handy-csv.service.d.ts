import { DefaultHandyCsvService } from "@handy/core/defaults/services/handy-csv/handy-csv.service";
import { HandyConfigService, HandyErrorService, HandyFileUploadService, HandyUtilsService } from "@services";
import { UploadsModel } from "@models";
export declare class HandyCsvService extends DefaultHandyCsvService {
    protected _handyError: HandyErrorService;
    protected _uploadsModel: UploadsModel;
    protected _uploadsService: HandyFileUploadService;
    protected _utils: HandyUtilsService;
    protected _config: HandyConfigService;
    constructor(_handyError: HandyErrorService, _uploadsModel: UploadsModel, _uploadsService: HandyFileUploadService, _utils: HandyUtilsService, _config: HandyConfigService);
}
