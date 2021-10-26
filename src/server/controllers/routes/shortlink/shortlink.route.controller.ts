import { RouteController, GetRequest, PostRequest, PutRequest, DeleteRequest, GetApiRequest, PostApiRequest,
PutApiRequest, DeleteApiRequest } from "@handy/core";
import { ServerRequest, ServerResponse, ServerRequestUser, UnSignedObject } from "@handy/types";
import { HandyShortlinkService } from "@services";
import { ShortlinkUrlPrefix } from "@handy/core/defaults/services/handy-shortlink/handy-shotlink";
import { DefaultShortlinkRouteController } from "@handy/core/defaults/controllers/routes/shortlink/shortlink.route.controller";

@RouteController({ rootUrl: ShortlinkUrlPrefix })
export class ShortlinkRouteController extends DefaultShortlinkRouteController{

  constructor () {
    super();
  }

  /* -------------------------------------------------------------------------- */
  /* Example requests */
  /* -------------------------------------------------------------------------- */

  // /* ------------------------------- Get request ------------------------------ */
  // @GetRequest({ consolePath: true })
  // public sampleGetRoute(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject) {
  //  response.jsonResponse({});
  // }

  // /* ------------------------------ Post request ------------------------------ */
  // @PostRequest({ consolePath: true })
  // public samplePostRoute(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject) {
  //  response.jsonResponse({});
  // }

  // /* ------------------------------- Put request ------------------------------ */
  // @PutRequest({ consolePath: true })
  // public samplePutRoute(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject) {
  //  response.jsonResponse({});
  // }

  // /* ----------------------------- Delete request ----------------------------- */
  // @DeleteRequest({ consolePath: true })
  // public sampleDeleteRoute(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject) {
  //  response.jsonResponse({});
  // }

}