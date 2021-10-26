import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService, HandyNgLayoutService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl, NgModel } from '@angular/forms';
import { HandyNgSelectOptions, HandyNgSelectGroupOptions, HandyNgSelectOptionsData } from '@handy-ng/types';

@Component({
  selector: 'handy-select-input',
  templateUrl: './handy-select-input.component.html',
  styleUrls: ['./handy-select-input.component.scss'],
  inputs: [
    'appearance', 'label', 'disabled',
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
    this._hasEmptyOption = set;
  }

  public _emptyOptionLabel: string = 'None';
  @Input() set emptyOptionLabel(set: string) {
    this._emptyOptionLabel = set;
  }

  public _options: HandyNgSelectOptionsData = [];
  @Input() set options(set: (HandyNgSelectOptionsData | string | number)[]) {
    this._options = this._parseSelectOptions(set);
  }

  protected _stringifyPrefix: string = '_hngso_';

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
        singleOption['value'] = (typeof value === 'string') ? value : `${this._stringifyPrefix}${JSON.stringify(value)}`;

      }

      result.push(singleOption);
      
    }

    return result;

  }

  protected _unstringifySelectValue(value: any): any {

    if (typeof value === 'string' && value.startsWith(this._stringifyPrefix)) {
      return JSON.parse(value.replace(this._stringifyPrefix, ''));
    }

    return value;

  }

  public registerOnChange(fn: any): void {

    if (!this._handyNgLayoutService.isMobile) {
      this.onChange = fn;
      return;
    }

    this.onChange = (value: any) => {

      value = this._unstringifySelectValue(this._value);
      return fn(value);

    };

  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
