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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyFileUploadService = void 0;
const core_1 = require("@handy/core");
const _services_1 = require("@services");
const _models_1 = require("@models");
const handy_config_serice_1 = require("@services/handy-services/handy-config/handy-config.serice");
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const dompurify_1 = __importDefault(require("dompurify"));
const jsdom_1 = require("jsdom");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const mime_types_1 = require("mime-types");
const handy_utils_service_1 = require("@services/handy-services/handy-utils/handy-utils.service");
class DefaultHandyFileUploadService extends _services_1.HandyService {
    constructor() {
        super();
        this._uploadsModel = core_1.Inject(_models_1.UploadsModel);
        this._handyUtilsService = core_1.Inject(handy_utils_service_1.HandyUtilsService);
        this._createTypesFolders();
    }
    static get uploadsDest() {
        return this._uploadsDest;
    }
    static get tmpUploadsDest() {
        return this._tmpUploadsDest;
    }
    static get maxFileSize() {
        if (this._maxFileSize) {
            return this._maxFileSize;
        }
        this._maxFileSize = this.handyConfigService.get().fileUpload.maxFileSizeInMB * 1024 * 1024;
        return this._maxFileSize;
    }
    static get allowedFileTypes() {
        if (this._allowedFileTypes) {
            return this._allowedFileTypes;
        }
        this._allowedFileTypes = this.handyConfigService.get().fileUpload.allowedFileTypes;
        return this._allowedFileTypes;
    }
    static get imgFileTypes() {
        if (this._imgFileTypes) {
            return this._imgFileTypes;
        }
        this._imgFileTypes = this.handyConfigService.get().fileUpload.imgFileTypes;
        return this._imgFileTypes;
    }
    static get separateUploadHandlersFileTypes() {
        if (this._separateUploadHandlersFileTypes) {
            return this._separateUploadHandlersFileTypes;
        }
        this._separateUploadHandlersFileTypes = this.handyConfigService.get().fileUpload.separateUploadHandlersFileTypes;
        return this._separateUploadHandlersFileTypes;
    }
    static get thumbSets() {
        if (this._thumbSets) {
            return this._thumbSets;
        }
        this._thumbSets = Object.keys(this.handyConfigService.get().fileUpload.thumsSets);
        return this._thumbSets;
    }
    upload(request, response, user, query, body) {
        let { file } = request;
        let fileType = DefaultHandyFileUploadService.getFileTypeFromMulterFile(file);
        let isImg = DefaultHandyFileUploadService.isImgFile(fileType);
        let savingPromise;
        if (isImg) {
            savingPromise = DefaultHandyFileUploadService.processImgFile(file, body, fileType);
        }
        else {
            savingPromise = DefaultHandyFileUploadService.processNonImgFile(file, fileType);
        }
        savingPromise
            .then(processingResult => {
            let { filename } = file;
            let { thumbs, finalFilePath } = processingResult;
            return this._saveFileDataToDb(file, fileType, finalFilePath, filename, thumbs, body, request);
        })
            .then(modelResult => {
            response.jsonResponse(this.parseUploadResponseData(modelResult));
            fs_extra_1.unlink(file.path, (err => {
                if (err) {
                    DefaultHandyFileUploadService.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: { msg: 'Error removing tmp file', file } });
                }
            }));
        })
            .catch(err => {
            let parsedErr = DefaultHandyFileUploadService.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while processing img' });
            return response.errorResponse(parsedErr);
        });
    }
    svgUpload(request, response, user, query, body) {
        let { file } = request;
        let storredFileName = this._handyUtilsService.generateHash({ specialChars: false, emptySpace: false }, true);
        let storredFilePath = path_1.join(DefaultHandyFileUploadService.uploadsDest, 'svg', storredFileName);
        let tempWindow = (new jsdom_1.JSDOM('')).window;
        let DOMPurify = dompurify_1.default(tempWindow);
        let sanitizedSvgContent = DOMPurify.sanitize(file.buffer.toString());
        fs_extra_1.writeFile(storredFilePath, sanitizedSvgContent, { encoding: 'utf-8' })
            .then(() => {
            return this._saveFileDataToDb(file, 'svg', storredFilePath, storredFileName, undefined, body, request);
        })
            .then(modelResult => {
            response.jsonResponse(this.parseUploadResponseData(modelResult));
            return;
        })
            .catch(err => {
            let parsedErr = DefaultHandyFileUploadService.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while processing img' });
            return response.errorResponse(parsedErr);
        });
    }
    _saveFileDataToDb(file, fileType, storredFilePath, storredFileName, thumbs, body, request) {
        let { accessRules } = body;
        if (typeof accessRules === 'string') {
            accessRules = JSON.parse(accessRules);
        }
        return this._uploadsModel.createOne({
            originalFileName: file.originalname,
            storragePath: storredFilePath,
            storrageFileName: storredFileName,
            url: DefaultHandyFileUploadService.getFileUrl(storredFileName, fileType),
            fileType,
            thumbs,
            accessRules
        }, request);
    }
    parseUploadResponseData(creationData) {
        let { _id, originalFileName, thumbs, url, fileType } = creationData;
        return { _id, originalFileName, thumbs, url, fileType };
    }
    static getFinalFileStorragePath(originalFileSorragePath, thumb) {
        return (!thumb) ? originalFileSorragePath : `${originalFileSorragePath}-${thumb}`;
    }
    static storedFileExists(storredFilePath) {
        return new Promise((resolve, reject) => {
            fs_extra_1.exists(storredFilePath, (fileExists) => {
                return resolve(fileExists);
            });
        });
    }
    static isImgFile(fileType) {
        return this.imgFileTypes.includes(fileType);
    }
    static getFileUrl(fileName, fileType, thumbName) {
        return `${this.handyConfigService.getClientUrl()}file/get/${fileName}${((thumbName) ? '-' + thumbName : '')}.${fileType}`;
    }
    static processImgFile(file, body, fileType) {
        return new Promise((resolve, reject) => {
            let { filename, path } = file;
            let { thumbs } = body;
            thumbs = (typeof thumbs === 'string') ? JSON.parse(thumbs) : [];
            if (typeof thumbs === 'string') {
                thumbs = [thumbs];
            }
            let thumbsLen = thumbs.length;
            let tmpFilePath = path;
            let finalPath = path_1.join(this.uploadsDest, fileType, filename);
            let isJpeg = (fileType === 'jpeg' || fileType == 'jpg');
            let sharpExecution = sharp_1.default(tmpFilePath).rotate();
            if (isJpeg) {
                sharpExecution.jpeg({ quality: 100, chromaSubsampling: '4:4:4' });
            }
            let thumbPromises = [];
            sharpExecution
                .toFile(finalPath)
                .then(result => {
                for (let i = 0; i < thumbsLen; i++) {
                    const thumbSetName = thumbs[i];
                    thumbPromises.push(this.createThumb(finalPath, filename, fileType, thumbSetName));
                }
                return Promise.all(thumbPromises);
            })
                .then(thumbsGenerationResult => {
                let generatedThumbsLen = thumbsGenerationResult.length;
                let result = {
                    finalFilePath: finalPath
                };
                if (generatedThumbsLen > 0) {
                    result.thumbs = {};
                    for (let i = 0; i < generatedThumbsLen; i++) {
                        let singleThumbResult = thumbsGenerationResult[i];
                        result.thumbs = Object.assign(Object.assign({}, result.thumbs), singleThumbResult);
                    }
                }
                resolve(result);
                return;
            })
                .catch(err => {
                let parsedErr = this.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while processing img' });
                return reject(parsedErr);
            });
        });
    }
    static processNonImgFile(file, fileType) {
        return new Promise((resolve, reject) => {
            let finalFilePath = path_1.join(this.uploadsDest, fileType, file.filename);
            fs_extra_1.copyFile(file.path, finalFilePath)
                .then(() => {
                return resolve({
                    finalFilePath
                });
            })
                .catch(err => {
                let parsedErr = this.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while making copy of temp file' });
                return reject(parsedErr);
            });
        });
    }
    static createThumb(originalFilePath, fileName, fileType, thumbSetName) {
        if (!this.isValidThumbSet(thumbSetName)) {
            let err = this.handyErrorService.register(null, 'medium', 'Bad request', undefined, { private: 'Unknown thumbset name' });
            return Promise.reject(err);
        }
        return new Promise((resolve, reject) => {
            // @ts-ignore
            let { width, height, position, fit, background } = this.handyConfigService.get().fileUpload.thumsSets[thumbSetName];
            let thumbPath = path_1.join(this.uploadsDest, fileType, `${fileName}-${thumbSetName}`);
            sharp_1.default(originalFilePath)
                .resize(width, height, {
                fit: fit,
                background,
                position
            })
                .toFile(thumbPath)
                .then(result => {
                resolve({
                    [thumbSetName]: this.getFileUrl(fileName, fileType, thumbSetName),
                });
                return;
            })
                .catch(err => {
                let parsedErr = this.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while processing img' });
                reject(parsedErr);
                return;
            });
        });
    }
    static isValidThumbSet(thumbSetName) {
        return this.thumbSets.includes(thumbSetName);
    }
    static uploadMW(fieldName = 'file') {
        const uploadProcessor = multer_1.default({
            dest: this.tmpUploadsDest,
            fileFilter: (request, file, cb) => {
                let fileType = this.getFileTypeFromMulterFile(file);
                if (this.allowedFileTypes.includes(fileType) && !this.separateUploadHandlersFileTypes.includes(fileType)) {
                    cb(null, true);
                    return;
                }
                let err = this.handyErrorService.register(null, 'low', 'Unsupported Media Type', undefined, { private: `Uploading ${fileType}`, public: `"${fileType}" file upload is not supported` });
                cb(err, false);
                return;
            },
            limits: {
                files: 1,
                fileSize: this.maxFileSize
            }
        });
        return uploadProcessor.single(fieldName);
    }
    static svgUploadMW(fieldName = 'file') {
        const uploadProcessor = multer_1.default({
            storage: multer_1.default.memoryStorage(),
            fileFilter: (request, file, cb) => {
                let fileType = this.getFileTypeFromMulterFile(file);
                if (fileType === 'svg') {
                    cb(null, true);
                    return;
                }
                let err = this.handyErrorService.register(null, 'low', 'Unsupported Media Type', undefined, { private: `Uploading ${fileType}`, public: `"${fileType}" files upload is not supported` });
                cb(err, false);
                return;
            },
            limits: {
                files: 1,
                fileSize: this.maxFileSize
            }
        });
        return uploadProcessor.single(fieldName);
    }
    static getFileTypeFromMulterFile(file) {
        let { mimetype = null, originalname = null } = file;
        let result = 'unknown';
        if (mimetype !== null) {
            return this.getExtFromMimeType(mimetype);
        }
        return this.getFileTypeFromFileName(originalname);
    }
    static getFileTypeFromFileName(fileName) {
        let mimetype = mime_types_1.lookup(fileName);
        return this.getExtFromMimeType(mimetype);
    }
    static getExtFromMimeType(mimetype = '') {
        let result = 'unknown';
        if (mimetype === false) {
            return result;
        }
        let ext = mime_types_1.extension(mimetype);
        result = (ext !== false) ? ext : result;
        return result;
    }
    _createTypesFolders() {
        let typesLen = DefaultHandyFileUploadService.allowedFileTypes.length;
        for (let i = 0; i < typesLen; i++) {
            const type = DefaultHandyFileUploadService.allowedFileTypes[i];
            fs_extra_1.ensureDir(path_1.join(DefaultHandyFileUploadService.uploadsDest, type));
        }
    }
}
DefaultHandyFileUploadService.handyConfigService = core_1.Inject(handy_config_serice_1.HandyConfigService);
DefaultHandyFileUploadService.handyErrorService = core_1.Inject(_services_1.HandyErrorService);
DefaultHandyFileUploadService._uploadsDest = path_1.join(__rootDir, './src/server/uploads');
DefaultHandyFileUploadService._tmpUploadsDest = path_1.join(__rootDir, './src/server/uploads/tmp');
__decorate([
    core_1.PostApiRequest({
        requestModifier: DefaultHandyFileUploadService.uploadMW(),
        publicRoute: false
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyFileUploadService.prototype, "upload", null);
__decorate([
    core_1.PostApiRequest({
        requestModifier: DefaultHandyFileUploadService.svgUploadMW(),
        publicRoute: false
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyFileUploadService.prototype, "svgUpload", null);
exports.DefaultHandyFileUploadService = DefaultHandyFileUploadService;
//# sourceMappingURL=handy-file-upload.service.js.map