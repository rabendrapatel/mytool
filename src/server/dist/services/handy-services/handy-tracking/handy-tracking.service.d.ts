import { DefaultHandyTrackingService } from "@handy/core/defaults/services/handy-tracking/default-handy-tracking.service";
import { HandyConfigService } from "../handy-config/handy-config.serice";
import { HandyErrorService } from "../handy-error/handy-error.service";
import { HandyExternalApiService } from "../handy-external-api/handy-external-api.service";
export declare class HandyTrackingService extends DefaultHandyTrackingService {
    protected _config: HandyConfigService;
    protected _externalApi: HandyExternalApiService;
    protected _handyErrorService: HandyErrorService;
    constructor(_config: HandyConfigService, _externalApi: HandyExternalApiService, _handyErrorService: HandyErrorService);
}
