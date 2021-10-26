import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'handy-textarea-input',
  templateUrl: './handy-textarea-input.component.html',
  styleUrls: ['./handy-textarea-input.component.scss'],
  inputs: [
    'appearance', 'label', 'placeholder', 'disabled',
    'prefixText', 'sufixText', 'prefixIcon',
    'sufixIcon',
    'debounceTime', 'startHint', 'endHint', 'fieldName',
    'pinningValue', 'disableFieldPin', 'autocomplete', 'simpleAutoCompleteFilter',
    'rows'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
  ]
})
export class HandyTextAreaInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  private __handleEnterSubmitting: boolean = false;

  constructor (@Optional() @Self() public ngControl: NgControl, public _handyNgUserService: HandyNgUserService, @Optional() protected _parentFormComponent: HandyFormComponent) {
    super(ngControl, _handyNgUserService, _parentFormComponent);
  }

  public _rows: number = 2;
  @Input() set rows(set: number) {
    this._rows = set;
  }

  public ngOnInit(): void {

    if (this._parentFormComponent && !this._parentFormComponent.disableEnterSubmit) {
      this.__handleEnterSubmitting = true;
    }

    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public disableEnterSubmit(): void {

    if (this.__handleEnterSubmitting) {
      this._parentFormComponent.disableEnterSubmit = true;
    }

  }

  public enableEnterSubmit(): void {

    if (this.__handleEnterSubmitting) {
      this._parentFormComponent.disableEnterSubmit = false;
    }

  }

}
