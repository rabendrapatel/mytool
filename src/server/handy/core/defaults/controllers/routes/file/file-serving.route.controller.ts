import {
  RouteController, GetRequest, PostRequest, PutRequest, DeleteRequest, GetApiRequest, PostApiRequest,
  PutApiRequest, DeleteApiRequest
} from "@handy/core";
import { ServerRequest, ServerResponse, ServerRequestUser, UnSignedObject, HandyError } from "@handy/types";
import { UploadsModel, UploadsModelInterfaces } from "@models";
import { HandyErrorService, HandyFileUploadService } from "@services";
import { contentType } from "mime-types";

export class DefaultFileRouteController {

  constructor (protected _uploadModel: UploadsModel, protected _handyErrorService: HandyErrorService, protected _uploadService: HandyFileUploadService) {
  }

  /* -------------------------------------------------------------------------- */
  /* Example requests */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Get request ------------------------------ */
  @GetRequest({
    customUrlPath: '/get/:name',
    publicRoute: true
  })
  public serveFile(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject) {

    let requestedName: string = request.params['name'];
    let { fileName, thumb } = this._getFileAndThumbName(requestedName);
    let { download = false, password = null } = query;

    let storragePath: string;
    let fileType: string;
    let originalFileName: string;
    let accessRules: UploadsModelInterfaces['fullModelShape']['accessRules'];

    this._uploadModel.findOne({ storrageFileName: fileName }, { selectType: 'select', fields: ['accessRules', 'storragePath', 'fileType', 'originalFileName'] })
      .then(fileQueryResult => {

        if (!fileQueryResult.foundRecord) {
          let notFoundErr: HandyError = this._handyErrorService.register(null, 'low', 'Resource not found', undefined, undefined, request, response);
          return Promise.reject(notFoundErr);
        }

        let fileDbData = fileQueryResult.doc;

        storragePath = fileDbData.storragePath;
        fileType = fileDbData.fileType;
        originalFileName = fileDbData.originalFileName;
        accessRules = fileDbData.accessRules;

        if (!this._checkFileAccess(accessRules, user, request, response, requestedName, password)) {
          return;
        }

        let finalFileStorragePath: string = HandyFileUploadService.getFinalFileStorragePath(storragePath, thumb);

        if ((HandyFileUploadService.isImgFile(fileType) || fileType === 'pdf') && download === false) {

          this._addContentTypeHeaders(response, fileType, originalFileName, thumb);
          response.sendFile(finalFileStorragePath);

          return;

        }

        response.download(finalFileStorragePath, this._getFileNameWithThumb(originalFileName, thumb));
        return;

      })
      .catch(err => {

        let parsedErr: HandyError = this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request, response);
        return response.errorResponse(parsedErr);

      })

  }

  protected _getFileAndThumbName(requestedFileName: string): { fileName: string, thumb: string } {

    let extSplitted: string[] = requestedFileName.split('.');
    let ext = extSplitted[1];
    let nameSplitted: string[] = extSplitted[0].split('-');

    return {
      fileName: `${nameSplitted[0]}`,
      thumb: nameSplitted[1]
    }


  }

  protected _addContentTypeHeaders(response: ServerResponse, fileType: string, originalFileName: string, thumb?: string): void {

    let finalType: string | false = contentType(fileType);

    if (finalType === false) {
      return;
    }

    response.addHeader('Content-Type', finalType);
    response.addHeader('Content-Disposition', `filename="${this._getFileNameWithThumb(originalFileName, thumb)}"`);

  }

  protected _getFileNameWithThumb(originalFileName: string, thumb?: string): string {

    if (!thumb) {
      return originalFileName;
    }

    let splitted: string[] = originalFileName.split('.');
    let splittedLen: number = splitted.length;

    splitted[splittedLen - 2] = `${splitted[splittedLen - 2]}${(thumb) ? '-' + thumb : ''}`;
    return splitted.join('.');

  }

  protected _checkFileAccess(rules: UploadsModelInterfaces['fullModelShape']['accessRules'] = {}, user: ServerRequestUser, request: ServerRequest, response: ServerResponse, requestedName: string, providedPassword?: string): boolean {

    if (isEmpty(rules)) {
      return true;
    }

    let { publicAccess, roles = null, password = null, permissions = null, groupId = null, groupTypes = null, userId = null } = rules;

    if (publicAccess) {
      return true;
    }

    if (roles && user.hasRoles(roles)) {
      return true;
    }

    if (permissions && user.hasPermissions(permissions)) {
      return true;
    }

    if (groupId && user.isMemberOfGroupId(groupId)) {
      return true;
    }

    if (groupTypes && user.isMemberOfGroupTypes(groupTypes)) {
      return true;
    }

    if (userId && userId === user._id) {
      return true;
    }

    if (password && password === providedPassword) {
      return true;
    }

    if (password && !providedPassword) {

      response.redirectToClient('file-password-request', { fileName: requestedName });
      return false;

    }

    let err: HandyError = this._handyErrorService.register(undefined, 'low', (user.loggedIn) ? 'Forbidden' : 'Unauthorized', undefined, undefined, request);
    response.redirectToClientErrPage(err);
    return false;

  }

}