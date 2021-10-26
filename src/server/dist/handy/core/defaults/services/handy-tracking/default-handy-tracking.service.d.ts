import { ServerRequest, ServerRequestUser, ServerResponse, UnSignedObject } from "@handy/types";
import { HandyConfigService, HandyErrorService, HandyExternalApiService, HandyService } from "@services";
export declare class DefaultHandyTrackingService extends HandyService {
    protected _config: HandyConfigService;
    protected _externalApi: HandyExternalApiService;
    protected _handyErrorService: HandyErrorService;
    protected _matomoId: number;
    protected _domain: string;
    constructor(_config: HandyConfigService, _externalApi: HandyExternalApiService, _handyErrorService: HandyErrorService);
    _matomoCheck(moment: Date): void;
    protected _getTrackingIdFromHub(): void;
    getAnalyticsId(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject): void;
}
