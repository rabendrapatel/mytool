import { UploadsModel } from "@models";
import { HandyErrorService, HandyFileUploadService } from "@services";
import { DefaultFileRouteController } from "@handy/core/defaults/controllers/routes/file/file-serving.route.controller";
export declare class FileRouteController extends DefaultFileRouteController {
    protected _uploadModel: UploadsModel;
    protected _handyErrorService: HandyErrorService;
    protected _uploadService: HandyFileUploadService;
    constructor(_uploadModel: UploadsModel, _handyErrorService: HandyErrorService, _uploadService: HandyFileUploadService);
}
