import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'handy-time-input',
  templateUrl: './handy-time-input.component.html',
  styleUrls: ['./handy-time-input.component.scss'],
  inputs: [
    'appearance', 'label', 'placeholder', 'disabled',
    'prefixText', 'sufixText', 'prefixIcon',
    'sufixIcon',  
    'debounceTime', 'startHint', 'endHint', 'fieldName',
    'pinningValue', 'disableFieldPin', 'min', 'max', 'valueType'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
  ]
})
export class HandyTimeInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  protected _minSecondsVal: number = 0;
  public _minVal: string;
  @Input() public set min(min: string) {
    this._minVal = min;
    this._minSecondsVal = (this._minVal) ? this.getSecondsValue(this._minVal) : 0;
  }
  
  protected _maxSecondsVal: number = 86400;
  public _maxVal: string;
  @Input() public set max(max: string) {
    this._maxVal = max;
    this._maxSecondsVal = (this._maxVal) ? this.getSecondsValue(this._maxVal) : 86400;
  }


  public _returnType: 'seconds' | 'string' = 'string';
  @Input() public set valueType(set: 'seconds' | 'string') {
    this._returnType = set;
  }

  public _value: string | number;

  constructor (
    @Optional() @Self() public ngControl: NgControl,
    public _handyNgUserService: HandyNgUserService,
    @Optional() protected _parentFormComponent: HandyFormComponent) {

    super(ngControl, _handyNgUserService, _parentFormComponent);

  }

  protected _parseInitialValue(): void {

    if (typeof this._value === 'string' && this._returnType === 'seconds' && this._value.length === 5) {
      this.updateChanges();
    }

    if (typeof this._value === 'number' && this._returnType === 'string') {
      this.updateChanges();
    }

    if (typeof this._value !== 'number') {
      return;
    }

    this._value = this.getStringTimeValue()

  }

  public updateChanges(focusOut: boolean = false) {

    if (focusOut && (this._maxVal || this._minVal) && this._hasValidTimeVal()) {
      
      let actualVal: number = this.getSecondsValue();

      if (actualVal) {
        
        if (actualVal < this._minSecondsVal) {

          this._value = this.getStringTimeValue(this._minSecondsVal);
          this._changeDisplayValueOnly();
        }
        
        if (actualVal > this._maxSecondsVal) {
          this._value = this.getStringTimeValue(this._maxSecondsVal);
          this._changeDisplayValueOnly();
        }

      }

    }

    if (typeof this._value === 'number') {
      this._value = this.getStringTimeValue(this._value);
      this._changeDisplayValueOnly();
    }

    super.updateChanges();
  }

  protected _hasValidTimeVal(): boolean {
    return (this._value !== null && this._value !== undefined && this._value !== '');
  }

  public preModelEmitHook(): any {

    // ? I know I could simply use just !this._value, but I want to return 0 as 
    // ? possible output value... 

    if (!this._hasValidTimeVal()) {
      return null;
    }

    if (this._returnType === 'string') {
      return this._value;
    }

    if (typeof this._value === 'number') {
      return this._value;
    }

    return this.getSecondsValue();

  }

  public getSecondsValue(val?: string | number): number {

    if (val === undefined && this._hasValidTimeVal()) {
      val = this._value;
    }

    if (val === undefined) {
      return null;
    }

    if (typeof val === 'number') {
      return val;
    }

    let splitted: string[] = val.split(':');
    let result: number = 0;

    result += parseInt(splitted[0]) * 3600;
    result += parseInt(splitted[1]) * 60;

    return result;

  }

  public getStringTimeValue(val?: number): string {

    if (val === undefined) {
      val = this._value as number;
    }

    if (val === undefined) {
      return null;
    }

    let hrNo: number = Math.floor((<unknown>val as number) / 3600);
    let secNo: number = Math.floor(((<unknown>val as number) % 3600) / 60);

    let result: string = `00:00`;

    if (hrNo < 24 && secNo < 60) {

      let hour: string = `00${hrNo}`;
      let min: string = `00${secNo}`;

      result = `${hour.slice(hour.length - 2)}:${min.slice(min.length - 2)}`;

    }

    return result;

  }

  public ngOnInit(): void {
    super.ngOnInit();
    this._parseInitialValue();

    this._internalEvents.subscribe(eventName => {

      switch (eventName) {
        case 'reset':

          setTimeout(() => {
            this._parseInitialValue();
          });

          break;

        default:
          break;
      }

    })

  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}