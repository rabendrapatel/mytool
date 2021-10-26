import { HandyConfigService, HandyErrorService } from '@services';
import { DefaultHandyMailerService } from "@handy/core/defaults/services/handy-mailer/default-handy-mailer.service";
export declare class HandyMailerService extends DefaultHandyMailerService {
    protected config: HandyConfigService;
    protected errorService: HandyErrorService;
    constructor(config: HandyConfigService, errorService: HandyErrorService);
}
