import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService, HandyNgLayoutService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl, NgModel } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'handy-chip-input',
  templateUrl: './handy-chip-input.component.html',
  styleUrls: ['./handy-chip-input.component.scss'],
  inputs: [
    'appearance', 'label', 'placeholder', 'disabled',
    'prefixText', 'sufixText', 'prefixIcon',
    'sufixIcon', 'disableFieldStateMemory',
    'debounceTime', 'startHint', 'endHint', 'fieldName',
    'pinningValue', 'disableFieldPin', 'autocomplete', 'simpleAutoCompleteFilter',
    'removable', 'addOnBlur'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick', 'autocompleteSelected'
  ]
})
export class HandyChipInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  constructor (@Optional() @Self() public ngControl: NgControl, public _handyNgUserService: HandyNgUserService, @Optional() protected _parentFormComponent: HandyFormComponent) {
    super(ngControl, _handyNgUserService, _parentFormComponent);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public _removable: boolean = true;
  @Input('removable') public set removable(val: boolean) {
    this._removable = val;
  }

  public _addOnBlur: boolean = true;
  @Input('addOnBlur') public set addOnBlur(val: boolean) {
    this._addOnBlur = val;
  }

  readonly separatorKeysCodes: number[] = [ENTER];

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (typeof value === 'string' && value.trim()) {

      let originalValue: any[] = this._value;
      if (!Array.isArray(originalValue)) {
        originalValue = [];
      }

      originalValue.push(value.trim());
      this._value = originalValue;

    }

    this.updateChanges();
    this.onTouched();

    // Reset the input value
    if (input) {
      input.value = null;
    }
  }

  public remove(index: number): void {

    let originalValue: any[] = this._value;
    if (!Array.isArray(originalValue)) {
      originalValue = [];
    }


    if (index >= 0) {
      originalValue.splice(index, 1);
      this._value = originalValue;
    }

    this.updateChanges();
    this.onTouched();

  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
