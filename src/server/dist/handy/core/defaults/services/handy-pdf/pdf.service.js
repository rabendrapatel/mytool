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
exports.DefaultHandyPdfService = void 0;
const core_1 = require("@handy/core");
const _services_1 = require("@services");
const puppeteer_1 = require("puppeteer");
const path_1 = require("path");
const querystring_1 = require("querystring");
const _models_1 = require("@models");
const injector_1 = require("@handy/core/injector/injector");
class DefaultHandyPdfService extends _services_1.HandyService {
    constructor() {
        super();
        this._handyError = injector_1.Inject(_services_1.HandyErrorService);
        this._handyUtilsService = injector_1.Inject(_services_1.HandyUtilsService);
        this._handyConfigService = injector_1.Inject(_services_1.HandyConfigService);
        this._handyFileUploadService = injector_1.Inject(_services_1.HandyFileUploadService);
        this._uploadsModel = injector_1.Inject(_models_1.UploadsModel);
        this.initialized = false;
        this._defaultFooter = `<div style="padding-top: 5px; font-size: 8px; font-family: Arial, Helvetica, sans-serif; color: grey; padding-right: 1cm; text-align: right; width: 100%;">
          Page <span class="pageNumber"></span><span>/</span><span class="totalPages"></span>
        </div>`;
        this._defaultHeader = `<div style="display: none;"></div>`;
    }
    getBrowser() {
        return new Promise((resolve, reject) => {
            if (this._browser && this._browser.isConnected()) {
                return resolve(this._browser);
            }
            puppeteer_1.launch({ headless: true }).then((br) => {
                this._browser = br;
                return resolve(this._browser);
            })
                .catch(err => {
                reject(this._handyError.register(err, 'high', 'Server error'));
            });
        });
    }
    generatePdfFromClientUrl(pdfData) {
        return new Promise((resolve, reject) => {
            let { format, margin, landscape, displayHeaderFooter = false, originalFileName = null, url } = pdfData;
            let { left, right, top, bottom } = margin;
            url = `${this._handyConfigService.getClientUrl()}${(url.startsWith('/')) ? url.replace('/', '') : url}`;
            let urlData = new URL(url);
            let { origin, pathname, searchParams } = urlData;
            let printId = this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false, capitalsLetters: false }, true);
            let queryParams = {
                format,
                printId,
                landscape,
                marginLeft: left,
                marginRight: right,
                marginBottom: bottom,
                marginTop: top,
            };
            searchParams.forEach((value, key) => {
                queryParams[key] = value;
            });
            let finalUrl = `${origin}${pathname}?${querystring_1.stringify(queryParams)}`;
            let storredFileName = `HANDYPDF${printId}`;
            let finalFilePath = path_1.join(_services_1.HandyFileUploadService.uploadsDest, 'pdf', storredFileName);
            let page;
            this.getBrowser()
                .then(browser => {
                return browser.newPage();
            })
                .then((pg) => {
                page = pg;
                return page.goto(finalUrl, { waitUntil: 'networkidle2' });
            })
                .then(() => {
                return page.waitForSelector(`#${printId}`, { visible: true, timeout: 5000 });
            })
                .then(() => {
                return page.emulateMediaType('print');
            })
                .then(() => {
                storredFileName = `HANDYPDF${printId}`;
                finalFilePath = path_1.join(_services_1.HandyFileUploadService.uploadsDest, 'pdf', storredFileName);
                return page.pdf({
                    path: finalFilePath,
                    format,
                    margin: {
                        left: `${left}cm`,
                        right: `${right}cm`,
                        top: `${top}cm`,
                        bottom: `${bottom}cm`,
                    },
                    landscape,
                    footerTemplate: this._defaultFooter,
                    headerTemplate: this._defaultHeader,
                    displayHeaderFooter
                });
            })
                .then(() => {
                return page.close();
            })
                .then(() => {
                return this._uploadsModel.createOne({
                    originalFileName: (originalFileName) ? originalFileName : `HANDYPDF${printId}.pdf`,
                    storragePath: finalFilePath,
                    storrageFileName: storredFileName,
                    url: _services_1.HandyFileUploadService.getFileUrl(storredFileName, 'pdf'),
                    fileType: 'pdf',
                });
            })
                .then(modelResult => {
                resolve(this._handyFileUploadService.parseUploadResponseData(modelResult));
                return;
            })
                .catch(err => {
                let parsedErr = this._handyError.register(err, 'high', 'Server error');
                reject(parsedErr);
            });
        });
    }
    testPdf(request, response, user, query, body) {
        this.generatePdfFromClientUrl(body)
            .then(result => {
            return response.jsonResponse(result);
        })
            .catch(err => {
            let parsedErr = this._handyError.register(err, 'high', 'Server error');
            return response.errorResponse(parsedErr);
        });
    }
}
__decorate([
    core_1.PostApiRequest({
        env: ['dev', 'stag'],
        requiredParams: {
            body: [
                'url',
                'format',
                'landscape',
                'margin',
                'displayHeaderFooter',
            ]
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyPdfService.prototype, "testPdf", null);
exports.DefaultHandyPdfService = DefaultHandyPdfService;
//# sourceMappingURL=pdf.service.js.map