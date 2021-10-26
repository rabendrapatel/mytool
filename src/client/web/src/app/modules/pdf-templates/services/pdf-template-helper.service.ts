import { Injectable } from '@angular/core';
import { PdfFormOptionsData } from '../components/pdf-generator-options/pdf-generator-options.component';
import { HandyNgApiService } from '@handy-ng/services';
import { PdfUrlGeneratingData } from '@handy-ng/types';

@Injectable({
  providedIn: 'root'
})
export class PdfTemplateHelperService {

  public paperSizes: { [key in PdfPaperFormats]: { width: number, height: number } } = {
    A0: {
      width: 841,
      height: 1189
    },
    A1: {
      width: 594,
      height: 841
    },
    A2: {
      width: 420,
      height: 594
    },
    A3: {
      width: 297,
      height: 420
    },
    A4: {
      width: 210,
      height: 297
    },
    A5: {
      width: 148,
      height: 210
    },
    A6: {
      width: 105,
      height: 148
    },
    Ledger: {
      width: 432,
      height: 279
    },
    Legal: {
      width: 216,
      height: 356
    },
    Letter: {
      width: 216,
      height: 279
    },
    Tabloid: {
      width: 279,
      height: 432
    },

  }

  constructor(protected _handyNgApiService: HandyNgApiService) {}

  public getPaperDimensionsInMM(format: PdfPaperFormats, landscape: boolean = false): { width: number, height: number } {

    if (!landscape) {
      return this.paperSizes[format];
    }

    let { width, height } = this.paperSizes[format];

    // ? switched because of landscape
    return {
      width: height,
      height: width
    }

  }

  public generateTestingPdf(pdfData: PdfUrlGeneratingData) {

    return this._handyNgApiService.postRequest('service/handyPdf/testPdf', pdfData);

  }


}

export type PdfPaperFormats = 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'Ledger' | 'Legal' | 'Letter' | 'Tabloid';