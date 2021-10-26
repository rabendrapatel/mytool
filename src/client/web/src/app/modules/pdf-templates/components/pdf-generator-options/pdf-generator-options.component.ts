import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';
import { PdfTemplateHelperService, PdfPaperFormats } from '../../services/pdf-template-helper.service'

import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { required } from '@ng-shared/form-validators';

@Component({
  selector: 'pdf-generator-options-form',
  templateUrl: './pdf-generator-options.component.html',
  styleUrls: ['./pdf-generator-options.component.scss']
})
export class PdfGeneratorOptionsComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit {

  public form: FormGroup;
  public formName = 'pdfGeneratorOptions';
  public rememberFormState: boolean = true;

  public defaultFormStateVal: FormDataShape = {
    format: 'A4',
    landscape: false,
    margin: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 1
    },
    displayHeaderFooter: false
  }

  @Output('reflect') public emitChange: EventEmitter<FormDataShape> = new EventEmitter();

  public formatOptions: HandyNgSelectOptionsData<FormDataShape['format']> = [
    {
      value: 'A0',
      displayValue: 'A0'
    },
    {
      value: 'A1',
      displayValue: 'A1'
    },
    {
      value: 'A2',
      displayValue: 'A2'
    },
    {
      value: 'A3',
      displayValue: 'A3'
    },
    {
      value: 'A4',
      displayValue: 'A4'
    },
    {
      value: 'A5',
      displayValue: 'A5'
    },
    {
      value: 'A6',
      displayValue: 'A6'
    },
    {
      value: 'Ledger',
      displayValue: 'Ledger'
    },
    {
      value: 'Letter',
      displayValue: 'Letter'
    },
    {
      value: 'Legal',
      displayValue: 'Legal'
    },
    {
      value: 'Tabloid',
      displayValue: 'Tabloid'
    },
  ]

  constructor (
    @Optional() public dialogRef: MatDialogRef<PdfGeneratorOptionsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _handyNgUserService: HandyNgUserService, 
    public handyNgUtilsService: HandyNgUtilsService) {
    
    super(_handyNgUserService, handyNgUtilsService);
    
    this.initExtender();

  }

  ngOnInit(): void {

    this.emitOutputChange();

  }

  public onValidSubmit(formData: FormDataShape): void {
    // console
  }
  
  public onInvalidSubmit(formData: FormDataShape): void {
    // console.log(formData)
  }

  getFormInitData(): Partial<FormDataShape> {
    
    return {};

  }

  public emitOutputChange(): void {

    if (!this.form.valid) {
      return;
    }

    this.emitChange.emit(this.form.getRawValue());
  }
  
  createForm(formInitData: Partial<FormDataShape>): FormGroup {
    
    let fg: FormGroup = new FormGroup({
      format: new FormControl(formInitData.format, [required()]),
      landscape: new FormControl(formInitData.landscape),
      displayHeaderFooter: new FormControl(formInitData.displayHeaderFooter),
      margin: new FormGroup({
        left: new FormControl(formInitData.margin.left, [required()]),
        right: new FormControl(formInitData.margin.right, [required()]),
        top: new FormControl(formInitData.margin.top, [required()]),
        bottom: new FormControl(formInitData.margin.bottom, [required()]),
      })
    })  

    return fg;
  
  }

}

type FormDataShape = {

  format: PdfPaperFormats,
  landscape: boolean,
  margin: {
    left: number,
    right: number,
    top: number,
    bottom: number
  },
  displayHeaderFooter: boolean

}
type DialogData = {
  formData: Partial<FormDataShape>
}

export type PdfFormOptionsData = FormDataShape;
