import * as express from 'express';
import { ServerMiddleware, _PrivateRequest, _PrivateResponse } from "@handy/types";
import { HandyConfigService, HandyErrorService, HandyUtilsService, HandyUserService } from '@services';
export declare class DefaultClientServingMiddleware implements ServerMiddleware {
    protected _handyConfigService: HandyConfigService;
    protected _handyError: HandyErrorService;
    protected _handyUtilsService: HandyUtilsService;
    protected _handyUserService: HandyUserService;
    protected _clientRootPath: string;
    protected _clientDistPath: string;
    protected _clientBrowserPath: string;
    protected _clientServerPath: string;
    protected _clientServerTemplatingEnginePath: string;
    protected _clientIndexFilePath: string;
    protected _assetsPath: string;
    protected _angSsr: any;
    constructor();
    middleware(app: express.Application): void;
    protected _nonSsrServing(app: express.Application): void;
    protected _ssrServing(app: express.Application): void;
    registerTemplatingEngine(app: express.Application): void;
    protected _attachClientCookies(request: _PrivateRequest, response: _PrivateResponse): string;
    protected _attachXSRF(request: _PrivateRequest, response: _PrivateResponse): string;
    protected _attachDeviceCookie(request: _PrivateRequest, response: _PrivateResponse): void;
}
