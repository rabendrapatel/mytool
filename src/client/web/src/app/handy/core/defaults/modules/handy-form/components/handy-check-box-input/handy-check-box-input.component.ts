import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'handy-check-box',
  templateUrl: './handy-check-box-input.component.html',
  styleUrls: ['./handy-check-box-input.component.scss'],
  inputs: [
    'disabled', 'extraClass',
    'debounceTime', 'fieldName',
    'pinningValue', 'disableFieldPin', 'color', 'labelPosition'
  ],
  outputs: [
    'valueChange', 'statusChange',
  ]
})
export class HandyCheckBoxInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  public _labelPosition: 'before' | 'after' = 'after';
  @Input() public set labelPosition (position: 'before' | 'after') {

    this._labelPosition = position;

  }
  
  public _extraClass: string;
  @Input() public set extraClass (className: string) {

    this._extraClass = className;

  }
  
  public _color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() public set color (color: 'primary' | 'accent' | 'warn') {

    this._color = color;

  }

  constructor (@Optional() @Self() public ngControl: NgControl, public _handyNgUserService: HandyNgUserService, @Optional() protected _parentFormComponent: HandyFormComponent) {
    super(ngControl, _handyNgUserService, _parentFormComponent);

  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
