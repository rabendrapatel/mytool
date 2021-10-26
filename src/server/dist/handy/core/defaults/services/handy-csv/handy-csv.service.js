"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyCsvService = void 0;
const _services_1 = require("@services");
const fs_extra_1 = require("fs-extra");
const json_2_csv_1 = require("json-2-csv");
const path_1 = require("path");
class DefaultHandyCsvService extends _services_1.HandyService {
    constructor(_handyError, _uploadsModel, _uploadsService, _utils, _config) {
        super();
        this._handyError = _handyError;
        this._uploadsModel = _uploadsModel;
        this._uploadsService = _uploadsService;
        this._utils = _utils;
        this._config = _config;
        // @ts-ignore
        if (!this._config.get().fileUpload.allowedFileTypes.includes('csv')) {
            handyErrLog('CSV Service requires allowing "csv" uploads in "fileUpload.allowedFileTypes" handy.json settings');
        }
    }
    generateCsvString(docs, emptyFieldValue = '', expandArrayObjects = false, unwindArrays = false) {
        return new Promise((resolve, reject) => {
            json_2_csv_1.json2csv(docs, (err, csv) => {
                if (err) {
                    return reject(err);
                }
                return resolve(csv);
            }, {
                emptyFieldValue,
                expandArrayObjects,
                unwindArrays
            });
        });
    }
    generateCsv(docs, fileName, emptyFieldValue = '', expandArrayObjects = false, unwindArrays = false, accessRules) {
        if (!fileName.endsWith('.csv')) {
            fileName += '.csv';
        }
        let storredFileName = `CSV_${this._utils.generateHash({ capitalsLetters: true, digits: true, emptySpace: false, specialChars: false, lowerCaseletters: true }, true)}`;
        let finalFilePath = path_1.join(_services_1.HandyFileUploadService.uploadsDest, 'csv', storredFileName);
        return new Promise((resolve, reject) => {
            this.generateCsvString(docs, emptyFieldValue, expandArrayObjects, unwindArrays)
                .then(csvString => {
                return fs_extra_1.writeFile(finalFilePath, csvString);
            })
                .then(() => {
                return this._uploadsModel.createOne({
                    originalFileName: fileName,
                    storragePath: finalFilePath,
                    storrageFileName: storredFileName,
                    url: _services_1.HandyFileUploadService.getFileUrl(storredFileName, 'csv'),
                    fileType: 'csv',
                    accessRules
                });
            })
                .then(modelResult => {
                resolve(this._uploadsService.parseUploadResponseData(modelResult));
                return;
            })
                .catch(err => {
                let parsedErr = this._handyError.register(err, 'high', 'Server error', undefined, { private: { msg: 'Csv generating failed' } });
                reject(parsedErr);
            });
        });
    }
}
exports.DefaultHandyCsvService = DefaultHandyCsvService;
//# sourceMappingURL=handy-csv.service.js.map