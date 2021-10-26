"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultFileRouteController = void 0;
const core_1 = require("@handy/core");
const _services_1 = require("@services");
const mime_types_1 = require("mime-types");
class DefaultFileRouteController {
    constructor(_uploadModel, _handyErrorService, _uploadService) {
        this._uploadModel = _uploadModel;
        this._handyErrorService = _handyErrorService;
        this._uploadService = _uploadService;
    }
    /* -------------------------------------------------------------------------- */
    /* Example requests */
    /* -------------------------------------------------------------------------- */
    /* ------------------------------- Get request ------------------------------ */
    serveFile(request, response, user, query) {
        let requestedName = request.params['name'];
        let { fileName, thumb } = this._getFileAndThumbName(requestedName);
        let { download = false, password = null } = query;
        let storragePath;
        let fileType;
        let originalFileName;
        let accessRules;
        this._uploadModel.findOne({ storrageFileName: fileName }, { selectType: 'select', fields: ['accessRules', 'storragePath', 'fileType', 'originalFileName'] })
            .then(fileQueryResult => {
            if (!fileQueryResult.foundRecord) {
                let notFoundErr = this._handyErrorService.register(null, 'low', 'Resource not found', undefined, undefined, request, response);
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
            let finalFileStorragePath = _services_1.HandyFileUploadService.getFinalFileStorragePath(storragePath, thumb);
            if ((_services_1.HandyFileUploadService.isImgFile(fileType) || fileType === 'pdf') && download === false) {
                this._addContentTypeHeaders(response, fileType, originalFileName, thumb);
                response.sendFile(finalFileStorragePath);
                return;
            }
            response.download(finalFileStorragePath, this._getFileNameWithThumb(originalFileName, thumb));
            return;
        })
            .catch(err => {
            let parsedErr = this._handyErrorService.register(err, 'medium', 'Server error', undefined, undefined, request, response);
            return response.errorResponse(parsedErr);
        });
    }
    _getFileAndThumbName(requestedFileName) {
        let extSplitted = requestedFileName.split('.');
        let ext = extSplitted[1];
        let nameSplitted = extSplitted[0].split('-');
        return {
            fileName: `${nameSplitted[0]}`,
            thumb: nameSplitted[1]
        };
    }
    _addContentTypeHeaders(response, fileType, originalFileName, thumb) {
        let finalType = mime_types_1.contentType(fileType);
        if (finalType === false) {
            return;
        }
        response.addHeader('Content-Type', finalType);
        response.addHeader('Content-Disposition', `filename="${this._getFileNameWithThumb(originalFileName, thumb)}"`);
    }
    _getFileNameWithThumb(originalFileName, thumb) {
        if (!thumb) {
            return originalFileName;
        }
        let splitted = originalFileName.split('.');
        let splittedLen = splitted.length;
        splitted[splittedLen - 2] = `${splitted[splittedLen - 2]}${(thumb) ? '-' + thumb : ''}`;
        return splitted.join('.');
    }
    _checkFileAccess(rules = {}, user, request, response, requestedName, providedPassword) {
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
        let err = this._handyErrorService.register(undefined, 'low', (user.loggedIn) ? 'Forbidden' : 'Unauthorized', undefined, undefined, request);
        response.redirectToClientErrPage(err);
        return false;
    }
}
__decorate([
    core_1.GetRequest({
        customUrlPath: '/get/:name',
        publicRoute: true
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultFileRouteController.prototype, "serveFile", null);
exports.DefaultFileRouteController = DefaultFileRouteController;
//# sourceMappingURL=file-serving.route.controller.js.map