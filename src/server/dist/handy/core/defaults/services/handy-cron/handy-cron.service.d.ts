import { HandyService } from "@services";
import { ExtendedCronsHolderSetting } from "@handy/types";
export declare class DefaultHandyCronService extends HandyService {
    private __cronsList;
    private __lastCheckedMoment;
    private __momentEmitter;
    private __handyUtils;
    constructor();
    registerCron(cronSettings: ExtendedCronsHolderSetting): void;
    startCron(): void;
    private __listenToCrons;
    private __createPipe;
    private __isScheduledThisMonth;
    private __isScheduledThisDay;
    private __isScheuledAtThisDayTime;
}
