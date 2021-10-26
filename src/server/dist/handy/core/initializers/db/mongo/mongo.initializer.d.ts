import { HandyConfigService, HandyErrorService } from '@services';
export declare class HandyMongoDbInitializer {
    private configService;
    private errorService;
    private connectionUri;
    constructor(configService: HandyConfigService, errorService: HandyErrorService);
    connect(): Promise<boolean>;
}
