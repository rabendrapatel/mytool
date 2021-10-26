import { HandyErrorService } from '@services';
import { DefaultHandyUtilsService } from "@handy/core/defaults/services/handy-utils/default-handy-utils.service";
export declare class HandyUtilsService extends DefaultHandyUtilsService {
    protected errorService: HandyErrorService;
    constructor(errorService: HandyErrorService);
}
