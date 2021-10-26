import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HandyNgConfigService, HandyNgUserService } from '@handy-ng/services';
import { Element } from '@angular/compiler';
import { PdfTemplateHelperService, PdfPaperFormats } from './services/pdf-template-helper.service';
import { PdfFormOptionsData } from './components/pdf-generator-options/pdf-generator-options.component';

@Component({
  selector: 'app-pdf-templates',
  templateUrl: './pdf-templates.component.html',
  styleUrls: ['./pdf-templates.component.scss']
})
export class PdfTemplatesComponent implements OnInit {

  public format: PdfPaperFormats = 'A4';
  public printId: string;
  protected _defaultMargin: number = 1;

  public generatedFile: string;

  public margin: PdfFormOptionsData['margin'] = {
    left: this._defaultMargin,
    right: this._defaultMargin,
    top: this._defaultMargin,
    bottom: this._defaultMargin,
  }

  public landscape: boolean = false;
  public paperWidth: number;
  public paperHeight: number;

  public rulerPages: any[] = new Array(10);
  public displayHeaderFooter: boolean = false;

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _handyNgConfigService: HandyNgConfigService,
    private _handyNgUserService: HandyNgUserService,
    private _pdfHelper: PdfTemplateHelperService) {

    let { format = 'A4', landscape, marginLeft = this._defaultMargin, marginRight = this._defaultMargin, marginBottom = this._defaultMargin, marginTop = this._defaultMargin } = this._route.snapshot.queryParams;

    this.format = format;
    this.landscape = (landscape === 'true') ? true : false;

    this._parseMargins(marginLeft, marginRight, marginTop, marginBottom);
    this._asignPaperSize();

  }

  ngOnInit(): void {

    this._createLoadedIndicator();

  }

  public generateTestPdf(): void {

    this._pdfHelper.generateTestingPdf({
      url: this._router.url,
      originalFileName: 'Testing.pdf',
      margin: this.margin,
      format: this.format,
      landscape: !!this.landscape,
      displayHeaderFooter: this.displayHeaderFooter
    }).subscribe(result => {

      this.generatedFile = result.data.url;

      this._handyNgUserService.notify.simpleMsgNotification({
        headline: 'Testing file was generated',
        msg: [
          result.data.url
        ]
      })

    }, err => {
      this._handyNgUserService.notify.apiErrNotification(err);
    })

  }

  public reflectPaperChanges(data: PdfFormOptionsData): void {

    let { format, landscape = false, margin, displayHeaderFooter = false } = {...data};

    this.format = format;
    this.landscape = landscape;
    this.displayHeaderFooter = displayHeaderFooter;

    let { left, right, top, bottom } = margin;

    this._parseMargins(left, right, top, bottom);
    this._asignPaperSize();

  }

  protected _asignPaperSize(): void {

    let { width, height } = this._pdfHelper.getPaperDimensionsInMM(this.format, !!this.landscape);
    this.paperHeight = height;
    this.paperWidth = width;

  }

  protected _parseMargins(marginLeft: string | number, marginRight: string | number, marginTop: string | number, marginBottom: string | number,): void {

    this.margin = {
      left: (typeof marginLeft === 'string') ? parseFloat(marginLeft) : marginLeft,
      right: (typeof marginRight === 'string') ? parseFloat(marginRight) : marginRight,
      top: (typeof marginTop === 'string') ? parseFloat(marginTop) : marginTop,
      bottom: (typeof marginBottom === 'string') ? parseFloat(marginBottom) : marginBottom,
    }

  }

  private _createLoadedIndicator(): void {

    if (this._handyNgConfigService.isPlatform('server')) {
      return;
    }

    let { printId } = this._route.snapshot.queryParams;

    if (!printId) {

      if (!this._handyNgUserService.hasRole('superAdmin')) {
        this._handyNgUserService.redirectToErrPage('404');
      }
      
    }

    this.printId = printId;

  }

}
