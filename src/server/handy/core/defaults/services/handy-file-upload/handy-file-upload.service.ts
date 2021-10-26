import { PostApiRequest, Inject } from "@handy/core";
import { HandyService, HandyErrorService } from "@services";
import { UploadsModel, UploadsModelInterfaces } from "@models";
import { ServerRequest, ServerResponse, ServerRequestUser, UnSignedObject, RequestMiddlewareFn, ConfigData, HandyError, FileInputData } from "@handy/types";
import { HandyConfigService } from "@services/handy-services/handy-config/handy-config.serice";

import multer from 'multer';
import sharp from 'sharp';
import { ResizeOptions } from 'sharp';
import dompurify, { DOMPurifyI } from 'dompurify';
import { JSDOM, DOMWindow } from 'jsdom';
import { join } from 'path';
import { ensureDir, unlink, exists, writeFile, copyFile } from 'fs-extra';
import { extension, lookup } from 'mime-types';

import { HandyUtilsService } from "@services/handy-services/handy-utils/handy-utils.service";

export class DefaultHandyFileUploadService extends HandyService {

  public static handyConfigService: HandyConfigService = Inject(HandyConfigService);
  public static handyErrorService: HandyErrorService = Inject(HandyErrorService);

  protected static _uploadsDest: string = join(__rootDir, './src/server/uploads');
  public static get uploadsDest(): string {
    return this._uploadsDest;
  }

  protected static _tmpUploadsDest: string = join(__rootDir, './src/server/uploads/tmp');
  public static get tmpUploadsDest(): string {
    return this._tmpUploadsDest;
  }

  protected static _maxFileSize: number;
  public static get maxFileSize(): number {

    if (this._maxFileSize) {
      return this._maxFileSize;
    }

    this._maxFileSize = this.handyConfigService.get().fileUpload.maxFileSizeInMB * 1024 * 1024;
    return this._maxFileSize;
  }

  protected static _allowedFileTypes: string[];
  public static get allowedFileTypes(): string[] {

    if (this._allowedFileTypes) {
      return this._allowedFileTypes;
    }

    this._allowedFileTypes = this.handyConfigService.get().fileUpload.allowedFileTypes;
    return this._allowedFileTypes;
  }

  protected static _imgFileTypes: string[];
  public static get imgFileTypes(): string[] {

    if (this._imgFileTypes) {
      return this._imgFileTypes;
    }

    this._imgFileTypes = this.handyConfigService.get().fileUpload.imgFileTypes;
    return this._imgFileTypes;
  }

  protected static _separateUploadHandlersFileTypes: string[];
  public static get separateUploadHandlersFileTypes(): string[] {

    if (this._separateUploadHandlersFileTypes) {
      return this._separateUploadHandlersFileTypes;
    }

    this._separateUploadHandlersFileTypes = this.handyConfigService.get().fileUpload.separateUploadHandlersFileTypes;
    return this._separateUploadHandlersFileTypes;
  }

  protected static _thumbSets: string[];
  public static get thumbSets(): string[] {

    if (this._thumbSets) {
      return this._thumbSets;
    }

    this._thumbSets = Object.keys(this.handyConfigService.get().fileUpload.thumsSets);
    return this._thumbSets;
  }

  protected _uploadsModel: UploadsModel = Inject(UploadsModel);
  protected _handyUtilsService: HandyUtilsService = Inject(HandyUtilsService);

  constructor () {

    super();
    this._createTypesFolders();

  }

  @PostApiRequest({
    requestModifier: DefaultHandyFileUploadService.uploadMW(),
    publicRoute: false
  })
  public upload(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void {

    let { file } = request;

    let fileType: string = DefaultHandyFileUploadService.getFileTypeFromMulterFile(file);
    let isImg: boolean = DefaultHandyFileUploadService.isImgFile(fileType);

    let savingPromise: Promise<ImageProcessingResult>;

    if (isImg) {
      savingPromise = DefaultHandyFileUploadService.processImgFile(file, body, fileType);
    } else {
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

        unlink(file.path, (err => {

          if (err) {
            DefaultHandyFileUploadService.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: { msg: 'Error removing tmp file', file } });
          }

        }))

      })
      .catch(err => {

        let parsedErr: HandyError = DefaultHandyFileUploadService.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while processing img' });
        return response.errorResponse(parsedErr);

      })

  }

  @PostApiRequest({
    requestModifier: DefaultHandyFileUploadService.svgUploadMW(),
    publicRoute: false
  })
  public svgUpload(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void {

    let { file } = request;

    let storredFileName: string = this._handyUtilsService.generateHash({ specialChars: false, emptySpace: false }, true);
    let storredFilePath: string = join(DefaultHandyFileUploadService.uploadsDest, 'svg', storredFileName);

    let tempWindow: DOMWindow = (new JSDOM('')).window;
    let DOMPurify: DOMPurifyI = dompurify(<unknown>tempWindow as Window);
    let sanitizedSvgContent: string = DOMPurify.sanitize(file.buffer.toString());

    writeFile(storredFilePath, sanitizedSvgContent, { encoding: 'utf-8' })
      .then(() => {

        return this._saveFileDataToDb(file, 'svg', storredFilePath, storredFileName, undefined, body, request);

      })
      .then(modelResult => {

        response.jsonResponse(this.parseUploadResponseData(modelResult));
        return;

      })
      .catch(err => {

        let parsedErr: HandyError = DefaultHandyFileUploadService.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while processing img' });
        return response.errorResponse(parsedErr);

      })

  }

  protected _saveFileDataToDb(file: Express.Multer.File, fileType: string, storredFilePath: string, storredFileName: string, thumbs: { [key in ThumbSetsNames]?: string }, body: UnSignedObject, request: ServerRequest) {

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

    }, request)

  }

  public parseUploadResponseData(creationData: Partial<UploadsModelInterfaces['fullModelShape']>): FileInputData {

    let { _id, originalFileName, thumbs, url, fileType } = creationData;

    return { _id, originalFileName, thumbs, url, fileType };

  }

  public static getFinalFileStorragePath(originalFileSorragePath: string, thumb?: string): string {

    return (!thumb) ? originalFileSorragePath : `${originalFileSorragePath}-${thumb}`;

  }

  public static storedFileExists(storredFilePath: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

      exists(storredFilePath, (fileExists: boolean) => {
        return resolve(fileExists);
      })

    })

  }

  public static isImgFile(fileType: string): boolean {
    return this.imgFileTypes.includes(fileType);
  }

  public static getFileUrl(fileName: string, fileType: string, thumbName?: string): string {

    return `${this.handyConfigService.getClientUrl()}file/get/${fileName}${((thumbName) ? '-' + thumbName : '')}.${fileType}`;

  }

  public static processImgFile(file: Express.Multer.File, body: UnSignedObject, fileType: string): Promise<ImageProcessingResult> {

    return new Promise((resolve, reject) => {

      let { filename, path } = file;
      let { thumbs } = body;

      thumbs = (typeof thumbs === 'string') ? JSON.parse(thumbs) : [];

      if (typeof thumbs === 'string') {

        thumbs = [thumbs];
      }

      let thumbsLen: number = thumbs.length;

      let tmpFilePath: string = path;
      let finalPath: string = join(this.uploadsDest, fileType, filename);

      let isJpeg: boolean = (fileType === 'jpeg' || fileType == 'jpg');
      let sharpExecution = sharp(tmpFilePath).rotate();

      if (isJpeg) {
        sharpExecution.jpeg({ quality: 100, chromaSubsampling: '4:4:4' });
      }

      let thumbPromises: ThumbPromiseResult[] = [];

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

          let generatedThumbsLen: number = thumbsGenerationResult.length;

          let result: ImageProcessingResult = {
            finalFilePath: finalPath
          }

          if (generatedThumbsLen > 0) {

            result.thumbs = {};

            for (let i = 0; i < generatedThumbsLen; i++) {

              let singleThumbResult = thumbsGenerationResult[i];
              result.thumbs = { ...result.thumbs, ...singleThumbResult };

            }

          }

          resolve(result);
          return;

        })
        .catch(err => {

          let parsedErr: HandyError = this.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while processing img' });
          return reject(parsedErr);

        })

    })

  }

  public static processNonImgFile(file: Express.Multer.File, fileType: string): Promise<ImageProcessingResult> {

    return new Promise((resolve, reject) => {

      let finalFilePath: string = join(this.uploadsDest, fileType, file.filename);
      copyFile(file.path, finalFilePath)
        .then(() => {

          return resolve({
            finalFilePath
          })

        })
        .catch(err => {

          let parsedErr: HandyError = this.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while making copy of temp file' });
          return reject(parsedErr);

        })

    })

  }

  public static createThumb(originalFilePath: string, fileName: string, fileType: string, thumbSetName: ThumbSetsNames): ThumbPromiseResult {

    if (!this.isValidThumbSet(thumbSetName)) {

      let err: HandyError = this.handyErrorService.register(null, 'medium', 'Bad request', undefined, { private: 'Unknown thumbset name' });
      return Promise.reject(err);

    }

    return new Promise<any>((resolve, reject) => {

      // @ts-ignore
      let { width, height, position, fit, background } = this.handyConfigService.get().fileUpload.thumsSets[thumbSetName];

      let thumbPath: string = join(this.uploadsDest, fileType, `${fileName}-${thumbSetName}`);

      sharp(originalFilePath)
        .resize(width, height, {
          fit: fit as ResizeOptions['fit'],
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

          let parsedErr: HandyError = this.handyErrorService.register(err, 'medium', 'Server error', undefined, { private: 'Error while processing img' });
          reject(parsedErr);
          return;

        })


    })


  }

  public static isValidThumbSet(thumbSetName: string): boolean {

    return this.thumbSets.includes(thumbSetName);

  }

  public static uploadMW(fieldName: string = 'file'): RequestMiddlewareFn {

    const uploadProcessor = multer(
      {
        dest: this.tmpUploadsDest,
        fileFilter: (request: ServerRequest, file: Express.Multer.File, cb: any) => {

          let fileType = this.getFileTypeFromMulterFile(file)
          if (this.allowedFileTypes.includes(fileType) && !this.separateUploadHandlersFileTypes.includes(fileType)) {

            cb(null, true);
            return;

          }

          let err = this.handyErrorService.register(null, 'low', 'Unsupported Media Type', undefined, { private: `Uploading ${fileType}`, public: `"${fileType}" file upload is not supported` })
          cb(err, false);
          return;


        },
        limits: {
          files: 1,
          fileSize: this.maxFileSize
        }
      }
    );

    return uploadProcessor.single(fieldName) as RequestMiddlewareFn;

  }

  public static svgUploadMW(fieldName: string = 'file'): RequestMiddlewareFn {

    const uploadProcessor = multer(
      {
        storage: multer.memoryStorage(),
        fileFilter: (request: ServerRequest, file: Express.Multer.File, cb: any) => {

          let fileType = this.getFileTypeFromMulterFile(file)

          if (fileType === 'svg') {

            cb(null, true);
            return;

          }

          let err = this.handyErrorService.register(null, 'low', 'Unsupported Media Type', undefined, { private: `Uploading ${fileType}`, public: `"${fileType}" files upload is not supported` })
          cb(err, false);
          return;


        },
        limits: {
          files: 1,
          fileSize: this.maxFileSize
        }
      }
    );

    return uploadProcessor.single(fieldName) as RequestMiddlewareFn;

  }

  public static getFileTypeFromMulterFile(file: Express.Multer.File): any {

    let { mimetype = null, originalname = null } = file;
    let result: string = 'unknown';

    if (mimetype !== null) {

      return this.getExtFromMimeType(mimetype);

    }

    return this.getFileTypeFromFileName(originalname);

  }

  public static getFileTypeFromFileName(fileName: string): any {

    let mimetype = lookup(fileName);
    return this.getExtFromMimeType(mimetype);

  }

  public static getExtFromMimeType(mimetype: string | false = ''): string {

    let result: string = 'unknown';

    if (mimetype === false) {
      return result;
    }

    let ext: string | false = extension(mimetype);
    result = (ext !== false) ? ext : result;

    return result;

  }

  protected _createTypesFolders(): void {

    let typesLen: number = DefaultHandyFileUploadService.allowedFileTypes.length;

    for (let i = 0; i < typesLen; i++) {
      const type = DefaultHandyFileUploadService.allowedFileTypes[i];

      ensureDir(join(DefaultHandyFileUploadService.uploadsDest, type));

    }

  }

}

interface ImageProcessingResult {
  finalFilePath: string
  thumbs?: {
    [key in ThumbSetsNames]?: string
  }
}

type ThumbSetsNames = keyof ConfigData['fileUpload']['thumsSets'];
type ThumbPromiseResult = Promise<{ [key in ThumbSetsNames]: string }>;