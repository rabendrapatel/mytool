/// <reference types="multer" />
import { HandyService, HandyErrorService } from "@services";
import { UploadsModel, UploadsModelInterfaces } from "@models";
import { ServerRequest, ServerResponse, ServerRequestUser, UnSignedObject, RequestMiddlewareFn, ConfigData, FileInputData } from "@handy/types";
import { HandyConfigService } from "@services/handy-services/handy-config/handy-config.serice";
import { HandyUtilsService } from "@services/handy-services/handy-utils/handy-utils.service";
export declare class DefaultHandyFileUploadService extends HandyService {
    static handyConfigService: HandyConfigService;
    static handyErrorService: HandyErrorService;
    protected static _uploadsDest: string;
    static get uploadsDest(): string;
    protected static _tmpUploadsDest: string;
    static get tmpUploadsDest(): string;
    protected static _maxFileSize: number;
    static get maxFileSize(): number;
    protected static _allowedFileTypes: string[];
    static get allowedFileTypes(): string[];
    protected static _imgFileTypes: string[];
    static get imgFileTypes(): string[];
    protected static _separateUploadHandlersFileTypes: string[];
    static get separateUploadHandlersFileTypes(): string[];
    protected static _thumbSets: string[];
    static get thumbSets(): string[];
    protected _uploadsModel: UploadsModel;
    protected _handyUtilsService: HandyUtilsService;
    constructor();
    upload(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void;
    svgUpload(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void;
    protected _saveFileDataToDb(file: Express.Multer.File, fileType: string, storredFilePath: string, storredFileName: string, thumbs: {
        [key in ThumbSetsNames]?: string;
    }, body: UnSignedObject, request: ServerRequest): Promise<import("../../../../types").CompleteMongooseModelShapeInterface<{
        url: string;
        fileType: string;
        storrageFileName: string;
        originalFileName: string;
        storragePath: string;
        accessRules?: {
            publicAccess?: boolean;
            roles?: ("superAdmin" | "admin" | "user")[];
            permissions?: "loggedIn"[];
            groupTypes?: ("paid" | "free")[];
            userId?: number;
            groupId?: number;
            password?: string;
        };
        thumbs?: {
            logo?: string;
        };
    }, false, true, true, true, false>>;
    parseUploadResponseData(creationData: Partial<UploadsModelInterfaces['fullModelShape']>): FileInputData;
    static getFinalFileStorragePath(originalFileSorragePath: string, thumb?: string): string;
    static storedFileExists(storredFilePath: string): Promise<boolean>;
    static isImgFile(fileType: string): boolean;
    static getFileUrl(fileName: string, fileType: string, thumbName?: string): string;
    static processImgFile(file: Express.Multer.File, body: UnSignedObject, fileType: string): Promise<ImageProcessingResult>;
    static processNonImgFile(file: Express.Multer.File, fileType: string): Promise<ImageProcessingResult>;
    static createThumb(originalFilePath: string, fileName: string, fileType: string, thumbSetName: ThumbSetsNames): ThumbPromiseResult;
    static isValidThumbSet(thumbSetName: string): boolean;
    static uploadMW(fieldName?: string): RequestMiddlewareFn;
    static svgUploadMW(fieldName?: string): RequestMiddlewareFn;
    static getFileTypeFromMulterFile(file: Express.Multer.File): any;
    static getFileTypeFromFileName(fileName: string): any;
    static getExtFromMimeType(mimetype?: string | false): string;
    protected _createTypesFolders(): void;
}
interface ImageProcessingResult {
    finalFilePath: string;
    thumbs?: {
        [key in ThumbSetsNames]?: string;
    };
}
declare type ThumbSetsNames = keyof ConfigData['fileUpload']['thumsSets'];
declare type ThumbPromiseResult = Promise<{
    [key in ThumbSetsNames]: string;
}>;
export {};
