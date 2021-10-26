import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService, HandyNgLayoutService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl, NgModel } from '@angular/forms';
import { HandyNgSelectOptions, HandyNgSelectGroupOptions, HandyNgSelectOptionsData } from '@handy-ng/types';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'handy-select-input',
  templateUrl: './handy-select-input.component.html',
  styleUrls: ['./handy-select-input.component.scss'],
  inputs: [
    'appearance', 'label', 'disabled', 'placeholder',
    'prefixText', 'sufixText', 'prefixIcon',
    'sufixIcon',
    'debounceTime', 'startHint', 'endHint', 'fieldName',
    'pinningValue', 'disableFieldPin',
    'hasEmptyOption', 'emptyOptionLabel', 'options'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
  ]
})
export class HandySelectInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  @ViewChild('inputField', { static: false }) protected _inputField: NgModel;

  public _hasEmptyOption: boolean = true;
  @Input() set hasEmptyOption(set: boolean) {
    this._hasEmptyOption = this._handyNgLayoutService.isMobile ? true : set;
  }

  public _emptyOptionLabel: string = 'None';
  @Input() set emptyOptionLabel(set: string) {
    this._emptyOptionLabel = set;
  }

  public _options: HandyNgSelectOptionsData = [];
  @Input() set options(set: (HandyNgSelectOptionsData | string | number)[]) {
    this._options = this._parseSelectOptions(JSON.parse(JSON.stringify(set)));
  }

  protected _stringifyPrefix: string = '_hngso_';
  protected _stringifyValKey: string = '_hngso_value_';

  public _mobileValPlaceholder: any;

  constructor (
    @Optional() @Self() public ngControl: NgControl,
    public _handyNgUserService: HandyNgUserService,
    @Optional() protected _parentFormComponent: HandyFormComponent,
    public _handyNgLayoutService: HandyNgLayoutService) {
    super(ngControl, _handyNgUserService, _parentFormComponent);

  }

  protected _parseSelectOptions(inputData: (HandyNgSelectOptionsData | string | number)[]): HandyNgSelectOptionsData {

    let result: HandyNgSelectOptionsData = [];

    if (!Array.isArray(inputData)) {
      return result;
    }

    let optionsLen: number = inputData.length;

    if (optionsLen === 0) {
      return result;
    }

    let isSimple: boolean = (typeof inputData[0] === 'string' || typeof inputData[0] === 'number');

    if (isSimple) {

      for (let i = 0; i < optionsLen; i++) {

        const singleOption = inputData[i] as string;

        result.push({
          value: singleOption,
          displayValue: singleOption as string,
        })

      }

    } else {

      // result = <unknown>inputData as HandyNgSelectOptionsData;
      result = <unknown>inputData as HandyNgSelectOptionsData;

    }

    if (this._hasEmptyOption) {

      result.unshift({
        value: null,
        displayValue: this._emptyOptionLabel
      })

    }

    return this._stringifySelectOptions(result);

  }

  protected _stringifySelectOptions(data: HandyNgSelectOptionsData = []): HandyNgSelectOptionsData {

    if (!this._handyNgLayoutService.isMobile) {
      return data;
    }

    let result: HandyNgSelectOptionsData = [];
    let optionsLen: number = data.length;

    for (let i = 0; i < optionsLen; i++) {
      const singleOption = data[i];

      if (singleOption['label']) {
        singleOption['options'] = this._stringifySelectOptions(singleOption['options']);
      } else {

        let value: any = singleOption['value'];
        singleOption['value'] = this._convertValToMobileString(value);
      }

      result.push(singleOption);

    }

    return result;

  }

  public _emptyReplacement: string = '_hnd_select_undefined_orNull_';
  protected _convertValToMobileString(value: any): string {

    if (value === null || value === undefined) {
      return this._emptyReplacement;
    }

    let result = (typeof value === 'string' || !value) ? value : `${this._stringifyPrefix}${JSON.stringify({ [this._stringifyValKey]: value })}`;

    return result;

  }

  protected _unstringifySelectValue(value: any): any {

    if (value === this._emptyReplacement) {
      this._mobileValPlaceholder = undefined;
      return null;
    }

    if (typeof value === 'string' && value.startsWith(this._stringifyPrefix)) {
      value = JSON.parse(value.replace(this._stringifyPrefix, ''))[this._stringifyValKey];
    }

    return value;

  }

  public mobileChange(): void {

    this._value = this._unstringifySelectValue(this._mobileValPlaceholder);
    this.updateChanges();

  }

  public preWriteValueHook(value: any): void {

    if (!this._handyNgLayoutService.isMobile) {
      return;
    }

    this._mobileValPlaceholder = this._convertValToMobileString(value);
    if (this._mobileValPlaceholder === this._emptyReplacement) {
      this._mobileValPlaceholder = undefined;
    }

  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
