import { DefaultHandyJwtService } from "@handy/core/defaults/services/handy-jwt/default-handy-jwt.service";
import { HandyConfigService, HandyErrorService } from '@services';
export declare class HandyJwtService extends DefaultHandyJwtService {
    protected config: HandyConfigService;
    protected errorService: HandyErrorService;
    constructor(config: HandyConfigService, errorService: HandyErrorService);
}
