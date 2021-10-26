import { ServerRequest, ServerResponse, ServerRequestUser } from "@handy/types";
import { HandyShortlinkService } from "@services";
export declare class DefaultShortlinkRouteController {
    protected _handyShortlinkService: HandyShortlinkService;
    constructor();
    redirectToFinalPath(req: ServerRequest, res: ServerResponse, requestUser: ServerRequestUser): void;
}
