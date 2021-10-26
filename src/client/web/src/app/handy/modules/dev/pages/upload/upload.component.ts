import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions, HandyFileInputData } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { required } from '@ng-shared/form-validators';

@Component({
  selector: 'upload-form',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit {

  public form: FormGroup;
  public formName = 'upload';
  public rememberFormState: boolean = true;

  public maxFiles: number = 3;
  public userId: number = this._handyNgUserService.userData._id;

  constructor (
    @Optional() public dialogRef: MatDialogRef<UploadComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _handyNgUserService: HandyNgUserService,
    public handyNgUtilsService: HandyNgUtilsService,) {

    super(_handyNgUserService, handyNgUtilsService);

    this.initExtender();

  }

  ngOnInit(): void {



  }

  public onValidSubmit(formData: FormDataShape): void {

    console.log(formData)

  }

  public onInvalidSubmit(formData: FormDataShape): void {
    // console.log(formData)
  }

  getFormInitData(): Partial<FormDataShape> {

    return {};

  }

  createForm(formInitData: Partial<FormDataShape>): FormGroup {

    let fg: FormGroup = new FormGroup({
      files: new FormControl(formInitData.files, [required('At last one file is required')])
    })

    return fg;

  }

  public log(value): void {
    console.log(value)
  }

}

type FormDataShape = {

  files: HandyFileInputData
  // Form data interface

}
type DialogData = {
  formData: Partial<FormDataShape>
}
