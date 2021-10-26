import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService, HandyNgLayoutService, HandyNgUtilsService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer2, Injector, Output, EventEmitter } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'handy-number-input',
  templateUrl: './handy-number-input.component.html',
  styleUrls: ['./handy-number-input.component.scss'],
  inputs: [
    'appearance', 'label', 'placeholder', 'disabled',
    'prefixText', 'sufixText', 'prefixIcon',
    'sufixIcon',
    'debounceTime', 'startHint', 'endHint', 'fieldName',
    'pinningValue', 'disableFieldPin', 'autocomplete', 'simpleAutoCompleteFilter',
    'blur', 'color'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
  ]
})
export class HandyNumberInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  @Output('blur') public blurEvent: EventEmitter<void> = new EventEmitter();
  @Output('focusEvent') public focusEvent: EventEmitter<void> = new EventEmitter();

  protected _sumKeys: string[] = ['ArrowUp', 'ArrowDown'];
  protected _digits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  protected _separatorkeys: string[] = [',', '.'];
  protected _numpadEvents: string[] = ['NumPadBackSpace', 'NumPadClose'];
  protected _keysToProcess: string[] = [...this._sumKeys, ...this._separatorkeys, ...this._digits, '-', ...this._numpadEvents];
  protected _ignoredFinalValues: string[] = ['-', '.', ''];

  public _parsingDataHolder: _ParsedFieldValueData = {
    hasDecimal: false,
    decimalsLen: 0,
    hasVal: false,
    numVal: 0,
    inputFieldVal: null,
    strVal: '',
    valLen: 0,
    isNegativeNr: false,
    raw: null
  };

  @ViewChild('inputField', { static: true, read: ElementRef }) protected _inputFieldElm: ElementRef;

  public _numericInput: boolean = false;
  @Input() public set numericInput(set: boolean) {
    this._numericInput = set;
  }

  public _wholeNumber: boolean = false;
  @Input() public set wholeNumber(set: boolean) {

    if (this._wholeNumber !== set) {
      this._wholeNumber = set;
      this.updateChanges();
    }

  }

  public _minVal: number;
  @Input() public set min(min: number) {
    this._minVal = min;
  }

  public _maxVal: number;
  @Input() public set max(max: number) {
    this._maxVal = max;
  }

  public _maxDecimalsLen: number = 4;
  @Input() public set maxDecimalsLen(max: number) {

    if (this._maxDecimalsLen !== max) {

      this._maxDecimalsLen = max;
      this.updateChanges();

    }

  }

  public _step: number = 1;
  @Input() public set step(max: number) {

    if (typeof max === 'number') {
      this._step = max;
    } else {
      this._step = 1;
    }

  }

  public _stepBtns: boolean = false;
  @Input() public set stepBtns(set: boolean) {
    this._stepBtns = set;
  }

  public _stepBtnsAlign: 'end' | 'start' | 'split' = 'end';
  @Input() public set stepBtnsAlign(set: 'end' | 'start' | 'split') {
    this._stepBtnsAlign = set;
  }

  public _minusBtnColor: 'warn' | 'accent' | 'primary' = null;
  @Input() public set minusBtnColor(set: 'warn' | 'accent' | 'primary') {
    this._minusBtnColor = set;
  }

  public _plusBtnColor: 'warn' | 'accent' | 'primary' = null;
  @Input() public set plusBtnColor(set: 'warn' | 'accent' | 'primary') {
    this._plusBtnColor = set;
  }

  private __selected: boolean = false;
  private __focused: boolean = false;

  public _value: string | number;

  public randInputId = this.__utilsService.generateHash({ specialChars: false, emptySpace: false }, true);
  public backDropClick: Subscription;

  constructor (
    @Optional() @Self() public ngControl: NgControl,
    public _handyNgUserService: HandyNgUserService,
    @Optional() protected _parentFormComponent: HandyFormComponent,
    public handyNgLayoutService: HandyNgLayoutService,
    private __utilsService: HandyNgUtilsService,
    private __renderer: Renderer2,
    protected _injector: Injector,) {

    super(ngControl, _handyNgUserService, _parentFormComponent);

  }

  public stepClick(add: boolean = true): void {

    this.stepAction(add ? 'up' : 'down');

  }

  public markAsFocused(): void {
    this.__focused = true;
  }


  public preventWrongKeys(event: KeyboardEvent): void {

    let key = event.key;

    if (key === 'Enter') {
      this._inputFieldElm.nativeElement.blur();
      return;
    }

    if (!key || event.metaKey || event['ctrlKey']) {
      return;
    }

    // if (key === ',') {
    //   alert('Use "." period as the decimal separator');
    //   event.preventDefault();
    //   return;
    // }

    let { hasDecimal, isNegativeNr, decimalsLen, numVal, strVal, valLen } = this._parsingDataHolder;

    let cursorPosition: number = this._inputFieldElm.nativeElement.selectionStart;
    // ? blocking multiple decimal separators
    if (!this.__selected && this._separatorkeys.includes(key) && (hasDecimal || this._wholeNumber || (isNegativeNr && cursorPosition == 0))) {

      event.preventDefault();
      return;
      
    }
    
    // ? blocking adding minus elswhere than at the beginnign of a number
    if (key === '-' && (cursorPosition !== 0 || isNegativeNr)) {

      event.preventDefault();
      return;
      
    }
    
    // ? blocking any other characters than digits
    if (key.length === 1 && !this._keysToProcess.includes(key)) {
      
      event.preventDefault();
      return;
      
    }
    
    if (!this.__selected && this._digits.includes(key) && hasDecimal && decimalsLen >= this._maxDecimalsLen) {
      
      event.preventDefault();
      return;
      
    }
    
    if (this._sumKeys.includes(key)) {
      
      this.stepAction(key === 'ArrowDown' ? 'down' : 'up');
      event.preventDefault();
      
      // let modifiedValue: number = (key !== 'ArrowDown') ? parseFloat((numVal + this._step).toFixed(10)) : parseFloat((numVal - this._step).toFixed(10));
      // this._value = modifiedValue.toString();
      // this.updateChanges();
      
      return;
      
    }
    
  }

  public stepAction(action: 'up' | 'down'): void {

    let { numVal } = this._parsingDataHolder;
    let modifiedValue: number = action === 'up' ? parseFloat((numVal + this._step).toFixed(10)) : parseFloat((numVal - this._step).toFixed(10));
    this._value = modifiedValue.toString();
    this.updateChanges();

  }

  protected _parseNumberFieldValue(source: 'controlValue' | 'inputFieldValue' = 'controlValue', focusOut: boolean = false): void {

    let inputFieldVal: string | number = this._value;
    let raw: any = this._value;
    let strVal: string = (typeof inputFieldVal === 'string') ? inputFieldVal : '';

    if (typeof inputFieldVal === 'number') {
      strVal = inputFieldVal.toString();
    }

    let valLen: number = strVal.length;
    let hasVal: boolean = valLen > 0;
    let isNegativeNr: boolean = strVal.startsWith('-');

    let numVal: number = 0;

    if (hasVal) {

      strVal = strVal.replace('-.', '-0.');

      if (strVal.startsWith('.')) {
        strVal = `0${strVal}`;
      }

      if (strVal !== '.' && strVal !== '-') {
        numVal = (this._wholeNumber) ? parseInt(strVal) : parseFloat(parseFloat(strVal).toFixed((typeof this._maxDecimalsLen === 'number') ? this._maxDecimalsLen : 10));
      } else {
        hasVal = false;
      }

    }

    // ? repeats because it might change it's value in previous block
    if (hasVal && !this.__focused) {

      if (typeof this._maxVal === 'number' && numVal > this._maxVal) {
        numVal = this._maxVal;
        strVal = numVal.toString();
      }

      if (typeof this._minVal === 'number' && numVal < this._minVal) {
        numVal = this._minVal;
        strVal = numVal.toString();
      }

    }

    strVal = strVal.replace(',', '.');
    let hasDecimal: boolean = strVal.includes('.');

    let decimalsLen = 0;

    if (hasDecimal && !strVal.endsWith('.')) {
      decimalsLen = strVal.split('.')[1].length;
    }

    inputFieldVal = (hasVal) ? strVal : null;
    this._parsingDataHolder = {
      inputFieldVal,
      decimalsLen,
      strVal,
      valLen,
      hasVal,
      hasDecimal,
      isNegativeNr,
      numVal,
      raw
      // numVal: parseFloat(strVal)
    };


  }

  protected _initialNumberParse: boolean = false;

  updateChanges(onFocusOut: boolean = false): void {

    if (onFocusOut) {
      this.__focused = false;
    }

    this._parseNumberFieldValue(undefined, onFocusOut);
    let { strVal, hasVal, numVal } = this._parsingDataHolder;

    // if (onFocusOut && this.mobileNumPad) {
    //   onFocusOut = false;
    // }

    if (!this._initialNumberParse) {
      onFocusOut = true;
      this._initialNumberParse = true;
    }

    this._value = (!onFocusOut) ? strVal : (hasVal) ? numVal : null;
    super.updateChanges();

  }

  public registerOnChange(fn: any): void {

    this.onChange = (value: any) => {

      let { hasVal, numVal } = this._parsingDataHolder;
      fn((hasVal) ? numVal : null);

    };

  }

  public onFocus(event: FocusEvent): void {

    this.__focused = true;
    this._parseAutocompleteData();
    this.onTouched();

  }

  public selectChange(val: boolean = false): void {
    this.__selected = val;
  }

  public triggerFocus(): void {
    this._inputFieldElm.nativeElement.focus();
  }

  public preWriteValueHook(value: any): void {

    if (typeof value === 'string') {

      let tempval = value.replace(',', '.');
      if (!isNaN(tempval as any)) {

        setTimeout(() => {
          this.updateChanges(true);
        });

      }

    }

  }

  public preModelEmitHook(): any {

    let tempVal: any = this._value;
    if (typeof tempVal === 'string') {

      tempVal = tempVal.replace(',', '.');
      if (!isNaN(tempVal as any)) {
        tempVal = parseFloat(tempVal);
      }

    }

    return tempVal;
  }

  protected _pressing: boolean = false;
  protected _pressInterval: NodeJS.Timeout;

  public stepPressEvent(add: boolean = true): void {

    this._pressing = true;

    setTimeout(() => {

      if (this._pressInterval) {
        clearInterval(this._pressInterval)
      }

      this._pressInterval = setInterval(() => {

        if (this._pressing) {
          this.stepAction(add ? 'up' : 'down');
        } else {
          clearInterval(this._pressInterval);
        }

      }, 75);

    }, 500)

  }

  public stepPressRelease(): void {
    this._pressing = false;
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {

    if (this.backDropClick) {
      this.backDropClick.unsubscribe();
    }
    super.ngOnDestroy();
  }

}

interface _ParsedFieldValueData {
  inputFieldVal: string | number,
  strVal: string,
  numVal: number,
  valLen: number,
  hasVal: boolean,
  hasDecimal: boolean,
  decimalsLen: number,
  isNegativeNr: boolean,
  raw: any
}