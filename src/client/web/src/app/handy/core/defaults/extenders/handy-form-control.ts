import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { ControlValueAccessor, NgControl, NgModel } from '@angular/forms';
import { Optional, Self, Input, OnDestroy, Output, EventEmitter, OnInit, ViewChild, Directive } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { HandyNgUserService } from '@handy-ng/services';
import { HandyAutoCompleteData, CombinedAutocompleteFormData, GroupAutocompleteFormData, SimpleAutocompleteFormData } from '@handy-ng/types';
import { HandyFormComponent } from '@handy-ng/modules/handy-form/components/handy-form/handy-form.component';

@Directive()
export class DefultHandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  public _value: any;
  public _isDisabled: boolean = false;
  public _fieldStatus: string;

  public _fieldName: string;
  public _disableFieldPin: boolean = false;
  public _disableFieldStateMemory: boolean = false;

  public _appearance: FieldAppearance = 'legacy';
  public _prefixAndSufixIconSize: number = 16;
  public _label: string;
  public _placeholder: string;

  public _prefixText: string;
  public _sufixText: string;
  public _prefixIcon: string;
  public _sufixIcon: string;

  public _startHint: string;
  public _endHint: string;

  public _fieldErr: string;
  protected _hasErr: boolean = false;

  public _valueChangesSubject: Subject<void> = new Subject();
  public _reactiveValueChangesSubscription: Subscription;
  public _reactiveStatusChangesSubscription: Subscription;

  public _rootEventsSubscription: Subscription;

  public _pinningState: boolean = false;
  public _hasPinnedVal: boolean = false;

  protected _debounceTime: number = 0;

  protected _lastKnownPinnedVal: any;

  public _simpleAutocomplete: BehaviorSubject<CombinedAutocompleteFormData> = new BehaviorSubject([]);
  public _groupAutocomplete: BehaviorSubject<GroupAutocompleteFormData> = new BehaviorSubject([]);
  public _autocompleteType: 'simple' | 'group' = 'simple';
  public _hasAutocomplete: boolean = false;
  public _simpleAutoCompleteFilter: boolean = true;
  protected _autocompleteVal: HandyAutoCompleteData = [];

  protected _inputField: NgModel;

  protected _internalEvents: Subject<HandyFormControlInternalEvents> = new Subject();

  protected _isDestroyed: boolean = false;

  protected _selectionElm: any;
  private set __caretPos(pos: number) {

    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control['caretPos'] = pos;
      this.ngControl.control['moveCaretTo'] = this.moveCaretAfterUpdateChanges.bind(this);
    }

  }

  @ViewChild('inputField', { static: false }) set element(elm: NgModel) {

    if (elm) {
      this._inputField = elm;
    }

  }

  @Input() public set appearance(appearance: FieldAppearance) {

    this._appearance = appearance;

    if (this._appearance === 'outline') {
      this._prefixAndSufixIconSize = 19;
    }

  }

  @Input() public set label(label: string) {
    this._label = label;
  }

  @Input() public set placeholder(placeholder: FieldAppearance) {
    this._placeholder = placeholder;
  }

  @Input() public set prefixText(prefix: string) {
    this._prefixText = prefix;
  }

  @Input() public set sufixText(sufix: string) {
    this._sufixText = sufix;
  }

  @Input() public set prefixIcon(icon: string) {
    this._prefixIcon = icon;
  }

  @Input() public set sufixIcon(icon: string) {
    this._sufixIcon = icon;
  }

  @Input() public set debounceTime(delay: number) {
    this._debounceTime = delay;
  }

  @Input() public set startHint(hint: string) {
    this._startHint = hint;
  }

  @Input() public set endHint(hint: string) {
    this._endHint = hint;
  }

  @Input() public set fieldName(name: string) {
    this._fieldName = name;
  }

  @Input() public set disabled(disable: boolean) {
    this.setDisabledState(disable);
  }

  @Input() public set disableFieldPin(disable: boolean) {
    this._disableFieldPin = disable;
  }

  @Input() public set disableFieldStateMemory(disable: boolean) {
    this._disableFieldStateMemory = disable;
  }

  @Input() public set pinningValue(pinning: boolean) {

    if (!this._fieldName || this._disableFieldPin) {
      return;
    }

    this._pinningState = pinning;

  }

  @Input() public set simpleAutoCompleteFilter(use: boolean) {

    this._simpleAutoCompleteFilter = use;

  }

  @Input() public set autocomplete(autocompleteVal: HandyAutoCompleteData) {

    this._autocompleteVal = autocompleteVal;

    this._parseAutocompleteData();

  }

  @Output() public valueChange: EventEmitter<any> = new EventEmitter();
  @Output() public statusChange: EventEmitter<any> = new EventEmitter();
  @Output() public prefixClick: EventEmitter<any> = new EventEmitter();
  @Output() public sufixClick: EventEmitter<any> = new EventEmitter();
  @Output() public autocompleteSelected: EventEmitter<any> = new EventEmitter();

  constructor (
    @Optional() @Self() public ngControl: NgControl,
    public _handyNgUserService: HandyNgUserService,
    @Optional() protected _parentFormComponent: HandyFormComponent) {

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this._onConstruct();

  }

  protected _onConstruct(): void {

  }

  public asignCaretPos(pos?: number): void {

    if (!this._selectionElm) {
      return;
    }

    if (typeof pos !== 'number') {

      if (typeof this._selectionElm.selectionStart === 'number' && this._selectionElm.selectionStart === this._selectionElm.selectionEnd) {
        this.__caretPos = this._selectionElm.selectionStart;
        return;
      }

      this.__caretPos = undefined;
      return;

    }

    this._selectionElm.setSelectionRange(pos, pos);
    this.__caretPos = pos;

  }

  public moveCaretAfterUpdateChanges(pos: number): void {

    setTimeout(() => {
      this.asignCaretPos(pos);
    })

  }

  public asignInputElm(elm: any): void {

    if (this._selectionElm) {
      return;
    }

    this._selectionElm = elm;
    this.asignCaretPos();

  }

  protected _parseSingleAutocompleteValues(values: SimpleAutocompleteFormData, length?: number): CombinedAutocompleteFormData {

    if (length === undefined) {
      length = values.length;
    }

    let result: CombinedAutocompleteFormData = [];

    for (let i = 0; i < length; i++) {

      const singleSimpleVal = values[i];
      result.push({ fieldValue: singleSimpleVal, displayValue: singleSimpleVal, emitVal: singleSimpleVal });

    }

    return result;

  }

  public _parseAutocompleteData(): void {

    if (Array.isArray(this._autocompleteVal)) {

      let autocompleteLen: number = this._autocompleteVal.length;
      if (autocompleteLen > 0) {

        let firstVal = this._autocompleteVal[0];

        switch (typeof firstVal) {
          case 'string':
          case 'number':

            let parsedVals = this._parseSingleAutocompleteValues(this._autocompleteVal as SimpleAutocompleteFormData, autocompleteLen);
            this._simpleAutocomplete.next(this._getFilteredSimpleAutoComplete(parsedVals));

            this._groupAutocomplete.next([]);
            this._autocompleteType = 'simple';
            this._hasAutocomplete = true;

            return;

          case 'object':

            if ((<GroupAutocompleteFormData[number]>firstVal).groupName === undefined) {

              this._simpleAutocomplete.next(this._getFilteredSimpleAutoComplete(this._autocompleteVal as CombinedAutocompleteFormData))
              this._groupAutocomplete.next([])
              this._autocompleteType = 'simple';
              this._hasAutocomplete = true;

              return;
            }

            this._simpleAutocomplete.next([]);
            this._autocompleteType = 'group';
            let finalGroupsData: GroupAutocompleteFormData = [];
            let groupValuesType = typeof (<GroupAutocompleteFormData[number]>firstVal).groupOptions[0];

            if (groupValuesType === 'string' || groupValuesType === 'number') {

              for (let i = 0; i < autocompleteLen; i++) {
                let { groupName, groupOptions = [] } = this._autocompleteVal[i] as GroupAutocompleteFormData[number];

                let filteredGroupOptions: CombinedAutocompleteFormData = this._getFilteredSimpleAutoComplete(this._parseSingleAutocompleteValues(groupOptions as SimpleAutocompleteFormData));

                if (filteredGroupOptions.length > 0) {

                  finalGroupsData.push({ groupName, groupOptions: filteredGroupOptions });

                }

              }

              this._groupAutocomplete.next(finalGroupsData);
              this._hasAutocomplete = true;

              return;

            }

            for (let i = 0; i < autocompleteLen; i++) {

              let { groupName, groupOptions = [] } = this._autocompleteVal[i] as GroupAutocompleteFormData[number];

              let filteredGroupOptions: CombinedAutocompleteFormData = this._getFilteredSimpleAutoComplete(groupOptions as CombinedAutocompleteFormData);

              if (filteredGroupOptions.length > 0) {

                finalGroupsData.push({ groupName, groupOptions: filteredGroupOptions });

              }

            }

            this._groupAutocomplete.next(finalGroupsData);
            this._hasAutocomplete = true;

            return;

          default:
            break;
        }

      }

    }

    this._hasAutocomplete = false;
    this._simpleAutocomplete.next([]);
    this._groupAutocomplete.next([]);

  }

  protected _getFilteredSimpleAutoComplete(data: CombinedAutocompleteFormData): CombinedAutocompleteFormData {

    if (!this._simpleAutoCompleteFilter || !this._value) {
      return data;
    }


    let stringFieldVal: string = this._value.toString().toLowerCase();

    return data.filter(val => {

      return val.displayValue.toString().toLowerCase().includes(stringFieldVal) || val.fieldValue.toString().toLowerCase().includes(stringFieldVal);

    })

  }

  protected _isGroupMember: boolean = false;

  ngOnInit(): void {

    if (this.ngControl.control.asyncValidator && this._debounceTime < 400) {
      this._debounceTime = 400;
    }

    this._isGroupMember = this._checkIfIsGroupMember();
    this._handleEvents();

  }

  protected _checkIfIsGroupMember(): boolean {

    if (this._parentFormComponent) {

      this._disableFieldStateMemory = true;
      return true;

    }

    return false;

  }

  protected _emittedInitial: boolean = false;

  protected _handleEvents(): void {

    this._handleRootEvents();

    this._valueChangesSubject.pipe(debounceTime(this._debounceTime)).subscribe(() => {

      if (!this._emittedInitial) {

        if (!this._value && this._initVal) {
          this._value = this._initVal;
        }

        if (this._value) {
          this._parseError();
        }

        this.onChange(this.preModelEmitHook());
        this._emittedInitial = true;
        return;

      }

      if (this._hasAutocomplete && this._simpleAutoCompleteFilter) {
        this._parseAutocompleteData();
      }

      this.setMemoryStateVal();

      this.onChange(this.preModelEmitHook());

      if (this._pinningState) {

        if (this._hasPinnedVal) {
          this.setPinnedVal();
        } else {
          this.setPinnedVal(null);
        }

      }

    })

    if (this.ngControl) {

      if (this.ngControl.valueChanges) {

        this._reactiveValueChangesSubscription = this.ngControl.valueChanges.pipe(debounceTime(this._debounceTime)).subscribe(() => {

          this.valueChange.emit(this.preModelEmitHook());

        })

      }

      if (this.ngControl.statusChanges) {

        this._reactiveStatusChangesSubscription = this.ngControl.statusChanges.pipe(debounceTime(this._debounceTime)).subscribe(() => {

          this._fieldStatus = this.ngControl.status;

          this._parseError();

          this.statusChange.emit(this.ngControl.status);

        })

      }


    }

  }

  protected _parseError(): void {

    if (this.ngControl.touched && this.ngControl.errors) {

      let firstErrKey: string = Object.keys(this.ngControl.errors)[0];

      this._fieldErr = this.ngControl.errors[firstErrKey];
      this._inputField.control.setErrors({ hasErr: 'has' });
      this._inputField.control.markAsTouched();
      this._hasErr = true;

    } else {

      this._inputField.control.setErrors(null);

      this._hasErr = false;
      this._fieldErr = null;

    }

  }

  protected _handleRootEvents(): void {

    if (!this._isGroupMember) {
      return;
    }

    if (!this._value && this._initVal) {
      this._value = this._initVal;
    }

    this.ngControl.control.patchValue(this._value);
    this._emittedInitial = true;

    this._rootEventsSubscription = this._parentFormComponent.internalEvents.subscribe(eventName => {

      switch (eventName) {

        case 'pinningState':

          this._pinningState = this._parentFormComponent.pinningState;

          break;

        case 'valueReset':

          if (this._hasPinnedVal) {

            this._value = this._lastKnownPinnedVal;
            this.ngControl.control.patchValue(this._value);

          }

          this.onResetHook();

          this.ngControl.control.markAsUntouched();
          this._inputField.control.markAsUntouched();
          this._parseError();

          this._internalEvents.next('reset');

          break;

        case 'submit':

          this.ngControl.control.markAsTouched();
          this._inputField.control.markAsTouched();
          this._parseError();

          break;

        case 'showFieldsErrors':

          this.ngControl.control.markAsTouched();
          this._parseError();

          break;

        default:
          break;
      }

    })

  }
  /* -------------------------------------------------------------------------- */
  /*                    Required custom form control methods                    */
  /* -------------------------------------------------------------------------- */

  public updateChanges() {

    this.asignCaretPos();
    this._valueChangesSubject.next();

  }

  protected _hasAsignedInitialVal: boolean = false;
  protected _initVal: any;

  public writeValue(value: any): void {

    if (!this._hasAsignedInitialVal) {

      this._initVal = this._getFieldSavedVal();

      if (!this._value) {
        this._value = this._initVal;
      }

      this._hasAsignedInitialVal = true;

    }

    if (!this._emittedInitial && (value === null || value === undefined)) {
      value = this._initVal;
    }

    this._value = value;
    this.preWriteValueHook(value);

    this.updateChanges();

  }

  public preWriteValueHook(value: any): void {

  }

  protected _getFieldSavedVal(defaultValue: any = null): any {

    let memoryStateVal: any = this.getMemoryStateVal(null);
    let pinnedVal: any = this.getPinnedVal(null);

    if (pinnedVal) {
      this._hasPinnedVal = true;
    }

    return (memoryStateVal) ? memoryStateVal : pinnedVal;

  }

  protected getPinnedVal(defaultVal: any = null): any {

    if (this._disableFieldPin || !this._fieldName) {
      return defaultVal;
    }

    this._lastKnownPinnedVal = this._handyNgUserService.getFormFieldPinVal(this._fieldName, defaultVal);
    if (this._lastKnownPinnedVal) {
      this._hasPinnedVal = true;
    }

    return this._lastKnownPinnedVal;

  }

  protected setPinnedVal(val?: any): any {

    if (this._disableFieldPin || !this._fieldName) {
      return;
    }

    let valToSave = this.preModelEmitHook();

    if (val !== undefined) {
      valToSave = val;
    }

    this._lastKnownPinnedVal = valToSave;
    this._hasPinnedVal = this._handyNgUserService.pinFormFieldVal(this._fieldName, valToSave);


  }

  public handlePinClick(): void {

    this._hasPinnedVal = !this._hasPinnedVal;

    if (this._hasPinnedVal) {
      this.setPinnedVal();
    } else {
      this.setPinnedVal(null);
    }

  }

  protected getMemoryStateVal(defaultVal: any = null): any {

    if (this._disableFieldStateMemory || !this._fieldName) {
      return defaultVal;
    }

    return this._handyNgUserService.getFormFieldStateVal(this._fieldName, defaultVal);

  }

  protected setMemoryStateVal(): any {

    if (this._disableFieldStateMemory || !this._fieldName) {
      return;
    }

    this._handyNgUserService.saveFormFieldStateVal(this._fieldName, this.preModelEmitHook());

  }

  public preModelEmitHook(): any {
    return this._value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {

    if (this._inputField) {

      this._inputField.control.markAsTouched();
      this._inputField.control.markAsDirty();

    }

    this.onTouched = () => {

      fn();
      this._parseError();

    }


  }

  public setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  public triggerPrefixClick(): void {

    if (this._isDisabled) {
      return;
    }

    this.prefixClick.emit();
  }

  public triggerSufixClick(): void {

    if (this._isDisabled) {
      return;
    }

    this.sufixClick.emit();
  }

  protected _changeDisplayValueOnly(value?: any): void {

    if (value === undefined) {
      value = this._value;
    }

    if (this._inputField) {
      this._inputField.control.setValue(value, { emitViewToModelChange: false, emitModelToViewChange: true, emitEvent: false });
    }

  }

  public onChange: (val: any) => void = (val: any) => { };

  public onTouched: () => void = () => { };

  protected onResetHook(): void { };

  public addOnFormResetHoook(functionToExecute: Function): void {

    const previousHook = this.onResetHook;

    this.onResetHook = () => {

      previousHook();
      functionToExecute();

    }

  }

  ngOnDestroy(): void {

    if (this._valueChangesSubject) {
      this._valueChangesSubject.unsubscribe();
    }

    if (this._rootEventsSubscription) {
      this._rootEventsSubscription.unsubscribe();
    }

    if (this._reactiveValueChangesSubscription) {
      this._reactiveValueChangesSubscription.unsubscribe();
    }

    if (this._reactiveStatusChangesSubscription) {
      this._reactiveStatusChangesSubscription.unsubscribe();
    }

    if (this._simpleAutocomplete) {
      this._simpleAutocomplete.unsubscribe();
    }

    if (this._groupAutocomplete) {
      this._groupAutocomplete.unsubscribe();
    }

    this._internalEvents.complete();
    this._isDestroyed = true;

  }

}

export type FieldAppearance = 'legacy' | 'standard' | 'fill' | 'outline';
type HandyFormControlInternalEvents = 'reset';
