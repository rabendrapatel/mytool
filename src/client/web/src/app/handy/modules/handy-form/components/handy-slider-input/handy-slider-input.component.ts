import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'handy-slider-input',
  templateUrl: './handy-slider-input.component.html',
  styleUrls: ['./handy-slider-input.component.scss'],
  inputs: [
    'disabled', 'debounceTime', 'fieldName',
    'pinningValue', 'disableFieldPin',
    'step', 'min', 'max', 'tickInterval', 'invert',
    'thumbLabel', 'vertical', 'color', 'displayWith'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
  ]
})
export class HandySliderInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  public _step: number = 1;
  @Input() public set step(step: number) {
    this._step = step;
  }
  
  public _min: number = 0;
  @Input() public set min(min: number) {
    this._min = min;
  }
  
  public _max: number = 100;
  @Input() public set max(max: number) {
    this._max = max;
  }
  
  public _tickInterval: number;
  @Input() public set tickInterval(tickInterval: number) {
    this._tickInterval = tickInterval;
  }
  
  public _invert: boolean = false;
  @Input() public set invert(invert: boolean) {
    this._invert = invert;
  }
  
  public _thumbLabel: boolean = true;
  @Input() public set thumbLabel(thumbLabel: boolean) {
    this._thumbLabel = thumbLabel;
  }
  
  public _vertical: boolean = false;
  @Input() public set vertical(vertical: boolean) {
    this._vertical = vertical;
  }
  
  public _color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() public set color(color: 'primary' | 'accent' | 'warn') {
    this._color = color;
  }
 
  public _extraClass: string;
  @Input() public set extraClass(extraClass: string) {
    this._extraClass = extraClass;
  }
  
  public _displayWith: (value: number) => string | number;
  @Input() public set displayWith(displayWith: (value: number) => string | number) {
    this._displayWith = displayWith;
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
