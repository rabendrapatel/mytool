import { ServerMiddleware } from '@handy/types';
import { HandyErrorService } from '@services';
import { Application } from 'express';
export declare class DefaultHandyErrorMiddleware implements ServerMiddleware {
    protected errorService: HandyErrorService;
    constructor();
    middleware(app: Application): void;
}
