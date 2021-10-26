import { Service, PostApiRequest } from "@handy/core";
import { HandyService, HandyErrorService, HandyFileUploadService, HandyUtilsService, HandyConfigService } from "@services";
import { launch, Browser, Page, PDFFormat } from 'puppeteer';
import { join } from 'path';
import { parse, stringify } from 'querystring';
import { UnSignedObject, ServerRequest, ServerResponse, ServerRequestUser, HandyError, PdfUrlGeneratingData, FileInputData } from "@handy/types";
import { UploadsModel } from "@models";
import { Inject } from "@handy/core/injector/injector";

export class DefaultHandyPdfService extends HandyService {

  protected _handyError: HandyErrorService = Inject(HandyErrorService);
  protected _handyUtilsService: HandyUtilsService = Inject(HandyUtilsService);
  protected _handyConfigService: HandyConfigService = Inject(HandyConfigService);
  protected _handyFileUploadService: HandyFileUploadService = Inject(HandyFileUploadService);
  protected _uploadsModel: UploadsModel = Inject(UploadsModel);

  protected _browser: Browser;
  public initialized: boolean = false;

  protected _defaultFooter: string = `<div style="padding-top: 5px; font-size: 8px; font-family: Arial, Helvetica, sans-serif; color: grey; padding-right: 1cm; text-align: right; width: 100%;">
          Page <span class="pageNumber"></span><span>/</span><span class="totalPages"></span>
        </div>`

  protected _defaultHeader: string = `<div style="display: none;"></div>`;

  constructor () {

    super();

  }

  public getBrowser(): Promise<Browser> {

    return new Promise((resolve, reject) => {

      if (this._browser && this._browser.isConnected()) {
        return resolve(this._browser);
      }

      launch({ headless: true }).then((br: Browser) => {

        this._browser = br;
        return resolve(this._browser);

      })
        .catch(err => {

          reject(this._handyError.register(err, 'high', 'Server error'));

        })

    })

  }

  public generatePdfFromClientUrl(pdfData: PdfUrlGeneratingData): Promise<FileInputData> {

    return new Promise((resolve, reject) => {

      let { format, margin, landscape, displayHeaderFooter = false, originalFileName = null, url } = pdfData;
      let { left, right, top, bottom } = margin;

      url = `${this._handyConfigService.getClientUrl()}${(url.startsWith('/')) ? url.replace('/', '') : url}`;

      let urlData: URL = new URL(url);

      let { origin, pathname, searchParams } = urlData;

      let printId = this._handyUtilsService.generateHash({ emptySpace: false, specialChars: false, capitalsLetters: false }, true)
      let queryParams: UnSignedObject = {
        format,
        printId,
        landscape,
        marginLeft: left,
        marginRight: right,
        marginBottom: bottom,
        marginTop: top,
      };

      searchParams.forEach((value: string, key: string) => {
        queryParams[key] = value;
      })

      let finalUrl: string = `${origin}${pathname}?${stringify(queryParams)}`;
      let storredFileName: string = `HANDYPDF${printId}`;
      let finalFilePath: string = join(HandyFileUploadService.uploadsDest, 'pdf', storredFileName);

      let page: Page;
      this.getBrowser()
        .then(browser => {

          return browser.newPage();
          
        })
        .then((pg: Page) => {

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
          finalFilePath = join(HandyFileUploadService.uploadsDest, 'pdf', storredFileName);

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
            url: HandyFileUploadService.getFileUrl(storredFileName, 'pdf'),
            fileType: 'pdf',

          })

        })
        .then(modelResult => {

          resolve(this._handyFileUploadService.parseUploadResponseData(modelResult));
          return;

        })
        .catch(err => {

          let parsedErr: HandyError = this._handyError.register(err, 'high', 'Server error');
          reject(parsedErr);

        })

    })

  }

  @PostApiRequest({
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
  })
  public testPdf(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject, body: UnSignedObject): void {

    this.generatePdfFromClientUrl(body as PdfUrlGeneratingData)
      .then(result => {
        return response.jsonResponse(result);
      })
      .catch(err => {

        let parsedErr: HandyError = this._handyError.register(err, 'high', 'Server error');
        return response.errorResponse(parsedErr);

      })

  }

}

