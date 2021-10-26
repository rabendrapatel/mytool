import { ServerRequest, ServerRequestUser, ServerResponse } from "@handy/types";
import { DropModel } from "@models";
import { HandyService, HandyErrorService, HandyUtilsService, HandyShortlinkService, HandyConfigService } from "@services";
export declare class DropService extends HandyService {
    private __handyError;
    private __model;
    private __utils;
    private __shortLink;
    private __config;
    constructor(__handyError: HandyErrorService, __model: DropModel, __utils: HandyUtilsService, __shortLink: HandyShortlinkService, __config: HandyConfigService);
    create(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: any, body: {
        content: string;
        expiryAt: number;
    }): void;
    authorize(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: any, body: {
        password: string;
        id: number;
    }): void;
    private __removeDrop;
}
