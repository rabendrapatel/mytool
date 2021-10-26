import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService, HandyNgUtilsService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { PasswordStrengthResult } from '@handy-ng/types';

@Component({
  selector: 'handy-password-input',
  templateUrl: './handy-password-input.component.html',
  styleUrls: ['./handy-password-input.component.scss'],
  inputs: [
    'appearance', 'label', 'placeholder', 'disabled',
    'sufixIcon', 'debounceTime', 'startHint', 'endHint',
    'autofill'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'passwordStrength'
  ]
})
export class HandyPasswordInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  public visible: boolean = false;

  @Input('autofill') public autofill: boolean;
  @Output('passwordStrength') public passwordStrength: EventEmitter<PasswordStrengthResult> = new EventEmitter();

  constructor (@Optional() @Self() public ngControl: NgControl, public _handyNgUserService: HandyNgUserService, @Optional() protected _parentFormComponent: HandyFormComponent, protected _handyNgUtilsService: HandyNgUtilsService) {
    super(ngControl, _handyNgUserService, _parentFormComponent);

    this.disableFieldPin = true;
    this.disableFieldStateMemory = true;

  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  updateChanges(): void {

    super.updateChanges();
    this.passwordStrength.emit(this._handyNgUtilsService.getPasswordStrength(this._value));
    
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
