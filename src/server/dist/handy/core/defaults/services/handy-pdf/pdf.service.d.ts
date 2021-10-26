import { HandyService, HandyErrorService, HandyFileUploadService, HandyUtilsService, HandyConfigService } from "@services";
import { Browser } from 'puppeteer';
import { UnSignedObject, ServerRequest, ServerResponse, ServerRequestUser, PdfUrlGeneratingData, FileInputData } from "@handy/types";
import { UploadsModel } from "@models";
export declare class DefaultHandyPdfService extends HandyService {
    protected _handyError: HandyErrorService;
    protected _handyUtilsService: HandyUtilsService;
    protected _handyConfigService: HandyConfigService;
    protected _handyFileUploadService: HandyFileUploadService;
    protected _uploadsModel: UploadsModel;
    protected _browser: Browser;
    initialized: boolean;
    protected _defaultFooter: string;
    protected _defaultHeader: string;
    constructor();
    getBrowser(): Promise<Browser>;
    generatePdfFromClientUrl(pdfData: PdfUrlGeneratingData): Promise<FileInputData>;
    testPdf(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void;
}
