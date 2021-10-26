import { RouteController, GetRequest, PostRequest, PutRequest, DeleteRequest, GetApiRequest, PostApiRequest,
PutApiRequest, DeleteApiRequest } from "@handy/core";
import { ServerRequest, ServerResponse, ServerRequestUser, UnSignedObject } from "@handy/types";
import { HandyShortlinkService } from "@services";
import { Inject } from "@handy/core/injector/injector";

export class DefaultShortlinkRouteController {

  protected _handyShortlinkService: HandyShortlinkService = Inject(HandyShortlinkService)
  constructor () {
  }

  @GetRequest({
    customUrlPath: ':shortlinkHash',
    publicRoute: true,
  })
  public redirectToFinalPath(req: ServerRequest, res: ServerResponse, requestUser: ServerRequestUser): void {

    this._handyShortlinkService.redirectToFinalPath(req, res);

  }

}