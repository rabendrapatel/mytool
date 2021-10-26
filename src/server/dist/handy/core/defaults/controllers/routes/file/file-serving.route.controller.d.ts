import { ServerRequest, ServerResponse, ServerRequestUser, UnSignedObject } from "@handy/types";
import { UploadsModel, UploadsModelInterfaces } from "@models";
import { HandyErrorService, HandyFileUploadService } from "@services";
export declare class DefaultFileRouteController {
    protected _uploadModel: UploadsModel;
    protected _handyErrorService: HandyErrorService;
    protected _uploadService: HandyFileUploadService;
    constructor(_uploadModel: UploadsModel, _handyErrorService: HandyErrorService, _uploadService: HandyFileUploadService);
    serveFile(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
    protected _getFileAndThumbName(requestedFileName: string): {
        fileName: string;
        thumb: string;
    };
    protected _addContentTypeHeaders(response: ServerResponse, fileType: string, originalFileName: string, thumb?: string): void;
    protected _getFileNameWithThumb(originalFileName: string, thumb?: string): string;
    protected _checkFileAccess(rules: UploadsModelInterfaces['fullModelShape']['accessRules'], user: ServerRequestUser, request: ServerRequest, response: ServerResponse, requestedName: string, providedPassword?: string): boolean;
}
