import { PostApiRequest, Service } from "@handy/core";
import { FileInputData, HandyError, ServerRequest, ServerRequestUser, ServerResponse } from "@handy/types";
import { UploadsModel, UploadsModelInterfaces } from "@models";
import { HandyService, HandyErrorService, HandyFileUploadService, HandyUtilsService, HandyConfigService } from "@services";
import { writeFile } from "fs-extra";

import { json2csv } from 'json-2-csv';
import { join } from "path";

export class DefaultHandyCsvService extends HandyService {

  constructor (
    protected _handyError: HandyErrorService,
    protected _uploadsModel: UploadsModel,
    protected _uploadsService: HandyFileUploadService,
    protected _utils: HandyUtilsService,
    protected _config: HandyConfigService
  ) {

    super();
    // @ts-ignore
    if (!this._config.get().fileUpload.allowedFileTypes.includes('csv')) {

      handyErrLog('CSV Service requires allowing "csv" uploads in "fileUpload.allowedFileTypes" handy.json settings');

    }


  }

  public generateCsvString(docs: any[], emptyFieldValue: string = '', expandArrayObjects: boolean = false, unwindArrays: boolean = false): Promise<string> {

    return new Promise((resolve, reject) => {

      json2csv(docs, (err: any, csv: string) => {

        if (err) {
          return reject(err);
        }

        return resolve(csv);

      }, {
        emptyFieldValue,
        expandArrayObjects,
        unwindArrays
      })

    })

  }

  public generateCsv(docs: any[], fileName: string, emptyFieldValue: string = '', expandArrayObjects: boolean = false, unwindArrays: boolean = false, accessRules?: UploadsModelInterfaces['fullModelShape']['accessRules']): Promise<FileInputData> {

    if (!fileName.endsWith('.csv')) {
      fileName += '.csv';
    }

    let storredFileName: string = `CSV_${this._utils.generateHash({ capitalsLetters: true, digits: true, emptySpace: false, specialChars: false, lowerCaseletters: true }, true)}`;
    let finalFilePath: string = join(HandyFileUploadService.uploadsDest, 'csv', storredFileName);

    return new Promise<FileInputData>((resolve, reject) => {

      this.generateCsvString(docs, emptyFieldValue, expandArrayObjects, unwindArrays)
        .then(csvString => {

          return writeFile(finalFilePath, csvString);

        })
        .then(() => {

          return this._uploadsModel.createOne({
            originalFileName: fileName,
            storragePath: finalFilePath,
            storrageFileName: storredFileName,
            url: HandyFileUploadService.getFileUrl(storredFileName, 'csv'),
            fileType: 'csv',
            accessRules
          })

        })
        .then(modelResult => {

          resolve(this._uploadsService.parseUploadResponseData(modelResult));
          return;

        })
        .catch(err => {

          let parsedErr: HandyError = this._handyError.register(err, 'high', 'Server error', undefined, { private: { msg: 'Csv generating failed' } });
          reject(parsedErr);

        })

    })

  }

}