import {
  RouteController, GetRequest, PostRequest, PutRequest, DeleteRequest, GetApiRequest, PostApiRequest,
  PutApiRequest, DeleteApiRequest
} from "@handy/core";
import { UploadsModel } from "@models";
import { HandyErrorService, HandyFileUploadService } from "@services";
import { DefaultFileRouteController } from "@handy/core/defaults/controllers/routes/file/file-serving.route.controller";

@RouteController({ rootUrl: '/file' })
export class FileRouteController extends DefaultFileRouteController {

  constructor (protected _uploadModel: UploadsModel, protected _handyErrorService: HandyErrorService, protected _uploadService: HandyFileUploadService) {

    super(_uploadModel, _handyErrorService, _uploadService);

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