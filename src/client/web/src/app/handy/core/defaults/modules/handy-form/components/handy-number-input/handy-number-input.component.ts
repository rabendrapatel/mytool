import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService, HandyNgLayoutService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'handy-number-input',
  templateUrl: './handy-number-input.component.html',
  styleUrls: ['./handy-number-input.component.scss'],
  inputs: [
    'appearance', 'label', 'placeholder', 'disabled',
    'prefixText', 'sufixText', 'prefixIcon',
    'sufixIcon',  
    'debounceTime', 'startHint', 'endHint', 'fieldName',
    'pinningValue', 'disableFieldPin', 'autocomplete', 'simpleAutoCompleteFilter'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
  ]
})
export class HandyNumberInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  protected _sumKeys: string[] = ['+', 'ArrowUp', 'ArrowDown'];
  protected _digits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  protected _separatorkeys: string[] = [',', '.'];
  protected _numpadEvents: string[] = ['NumPadBackSpace', 'NumPadClose'];
  protected _keysToProcess: string[] = [...this._sumKeys, ...this._separatorkeys, ...this._digits, '-', ...this._numpadEvents];
  protected _ignoredFinalValues: string[] = ['-', '.', ''];

  protected _parsingDataHolder: _ParsedFieldValueData = {
    hasDecimal: false,
    decimalsLen: 0,
    hasVal: false,
    numVal: 0,
    inputFieldVal: null,
    strVal: '',
    valLen: 0,
    isNegativeNr: false
  };

  public mobileNumPad: boolean = false;

  @ViewChild('inputField', { static: true, read: ElementRef }) protected _inputFieldElm: ElementRef;

  public _numericInput: boolean = false;
  @Input() public set numericInput(set: boolean) {
    this._numericInput = set;
  }

  public _wholeNumber: boolean = false;
  @Input() public set wholeNumber(set: boolean) {
    this._wholeNumber = set;
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
    this._maxDecimalsLen = max;
  }

  public _step: number = 1;
  @Input() public set step(max: number) {
    this._step = max;
  }

  public _value: string | number;

  constructor (
    @Optional() @Self() public ngControl: NgControl,
    public _handyNgUserService: HandyNgUserService,
    @Optional() protected _parentFormComponent: HandyFormComponent,
    public handyNgLayoutService: HandyNgLayoutService) {

    super(ngControl, _handyNgUserService, _parentFormComponent);

  }

  public preventWrongKeys(event: KeyboardEvent): void {

    let key = event.key;

    if (!key || event.metaKey || event['ctrlKey']) {
      return;
    }

    let { hasDecimal, isNegativeNr, decimalsLen, numVal, strVal, valLen } = this._parsingDataHolder;

    let cursorPosition: number = (this.mobileNumPad) ? valLen : this._inputFieldElm.nativeElement.selectionStart;

    // ? blocking multiple decimal separators
    if (this._separatorkeys.includes(key) && (hasDecimal || this._wholeNumber || (isNegativeNr && cursorPosition == 0))) {

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

    if (this._digits.includes(key) && hasDecimal && decimalsLen >= this._maxDecimalsLen) {

      event.preventDefault();
      return;

    }

    if (this._sumKeys.includes(key)) {

      event.preventDefault();

      let modifiedValue: number = (key !== 'ArrowDown') ? parseFloat((numVal + this._step).toFixed(10)) : parseFloat((numVal - this._step).toFixed(10));
      this._value = modifiedValue.toString();
      this.updateChanges();

      return;

    }

    if (this.mobileNumPad) {
      
      if (key === 'Backspace') {
        this._value = (valLen) ? strVal.slice(0, -1) : '';
      } else {
        this._value = (valLen) ? `${strVal}${key}` : key;
      }
      
      this.updateChanges();

    }

  }

  public numPadKeyPress(event: KeyboardEvent): void {

    this._inputFieldElm.nativeElement.dispatchEvent(event);

  }

  public hideNumPad(): void {
    
    this.mobileNumPad = false;
    this.updateChanges(true);
    
  }

  protected _parseNumberFieldValue(source: 'controlValue' | 'inputFieldValue' = 'controlValue'): void {

    let inputFieldVal: string | number = this._value;
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
    if (hasVal) {

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
      numVal
    };

  }

  protected _initialNumberParse: boolean = false;

  updateChanges(onFocusOut: boolean = false): void {

    this._parseNumberFieldValue();
    let { strVal, hasVal, numVal } = this._parsingDataHolder;

    if (onFocusOut && this.mobileNumPad) {
      onFocusOut = false;
    }

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

    this._parseAutocompleteData();
    this.onTouched();

    if (this.handyNgLayoutService.isMobile) {
      this.mobileNumPad = true;
    }

  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
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
}