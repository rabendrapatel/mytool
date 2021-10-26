import { HandyErrorService, HandyUtilsService, HandyConfigService } from '@services';
import { OnInit, ServerRequest, ServerResponse } from '@handy/types';
import { ShortlinkModel } from '@models';
export declare const ShortlinkUrlPrefix: string;
export declare class DefaultShortlinkService implements OnInit {
    protected _handyErrorService: HandyErrorService;
    protected _handyUtilsService: HandyUtilsService;
    protected _handyConfigService: HandyConfigService;
    protected _model: ShortlinkModel;
    protected _clientUrl: string;
    constructor();
    onInit(): void;
    generateShortlink(finalUrl: string, oneTime?: boolean): Promise<string>;
    redirectToFinalPath(req: ServerRequest, res: ServerResponse): void;
    protected _deactivateOneTimeLink(_id: number): void;
}
