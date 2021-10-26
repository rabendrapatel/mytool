import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService, HandyNgConfigService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { GeneralUploadEvent } from '../../directives/file-upload.directive';
import { Subject } from 'rxjs';
import { SingleOrArrayCombo, FileInputData } from '@handy-ng/types'
import { ServerAllowedExt, FileAccessRules } from '@handy-ng/core'

@Component({
  selector: 'handy-file-input',
  templateUrl: './handy-file-input.component.html',
  styleUrls: ['./handy-file-input.component.scss'],
  inputs: [
    'disabled', 'debounceTime', 'fieldName',
    'pinningValue', 'disableFieldPin',
    'maxFiles', 'allowedFileTypes', 'thumbs', 'accessRules'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
  ]
})
export class HandyFileInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  protected _uploading: boolean = false;
  protected _hasAsignedValidator: boolean = false;
  protected _internalUploadEventsSub: Subject<GeneralUploadEvent> = new Subject();

  @Input('allowedFileTypes') public allowedFileTypes: SingleOrArrayCombo<ServerAllowedExt> = this._handyNgConfigService.data.fileUpload.allowedFileTypes;
  @Input('thumbs') public thumbs: string | string[];
  @Input('accessRules') public accessRules: Omit<FileAccessRules, 'password'>;

  public _maxFiles: number = 1;
  @Input('maxFiles') public set maxFiles(maxFiles: number) {
    this._maxFiles = maxFiles;
  }

  constructor (@Optional() @Self() public ngControl: NgControl, public _handyNgUserService: HandyNgUserService, @Optional() protected _parentFormComponent: HandyFormComponent, protected _handyNgConfigService: HandyNgConfigService) {
    super(ngControl, _handyNgUserService, _parentFormComponent);

  }
  
  public ngOnInit(): void {
    
    super.ngOnInit();
    // this._addFileUploadValidator();

  }

  protected _addFileUploadValidator(): void {

    if (this._hasAsignedValidator) {
      return;
    }

    this._hasAsignedValidator = true;

    this.ngControl.control.setAsyncValidators([
      (control: FormControl) => {

        if (!this._uploading) {
          return Promise.resolve(null);
        }

        return new Promise((resolve, reject) => {

          this._internalUploadEventsSub.subscribe(event => {
            
            if (event.type === 'finish') {
              resolve(null);
            }

          })

        })

      }
    ])

  }

  protected _addFilesToValue(files: FileInputData[]): void {

    if (!this._value) {
      this._value = [];
    }

    let filesLen: number = files.length;
    for (let i = 0; i < filesLen; i++) {

      const singleFile = files[i];
      this._value.push(singleFile);

    }

  }

  public handleUpload(uploadEvent: GeneralUploadEvent): void {

    this._internalUploadEventsSub.next(uploadEvent)

    let { type, files } = uploadEvent;

    switch (type) {
      case 'start':

        this._addFileUploadValidator();

        this._uploading = true;
        this.onTouched();
        this._addFilesToValue(files);

        break;

      case 'finish': 

        this._uploading = false;

        break;

      default:
        break;
    }

    this.updateChanges();

  }

  public removeFile(id: number): void {

    if (!this._value) {
      return;
    }

    let tempVal = <FileInputData[]>(this._value).filter(value => {

      return value._id !== id;

    })

    this._value = tempVal;

    this.updateChanges();

  }

  public ngOnDestroy(): void {

    super.ngOnDestroy();
    this._internalUploadEventsSub.complete();

  }

}

