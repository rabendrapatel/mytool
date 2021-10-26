import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { HandyNgRadioGroupOptionsData } from '@handy-ng/types';

@Component({
  selector: 'handy-radio-group-input',
  templateUrl: './handy-radio-group-input.component.html',
  styleUrls: ['./handy-radio-group-input.component.scss'],
  inputs: [
    'label', 'groupOptions',
    'debounceTime', 'fieldName', 'disabled',
    'pinningValue', 'disableFieldPin', 
    'groupClass',
  ],
  outputs: [
    'valueChange', 'statusChange',
  ]
})
export class HandyRadioGroupInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  constructor (@Optional() @Self() public ngControl: NgControl, public _handyNgUserService: HandyNgUserService, @Optional() protected _parentFormComponent: HandyFormComponent) {
    super(ngControl, _handyNgUserService, _parentFormComponent);

  }

  public _options: HandyNgRadioGroupOptionsData = {
    buttons: []
  };

  @Input() public set groupOptions(opts: HandyNgRadioGroupOptionsData) {
    this._options = opts;
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
