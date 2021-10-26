import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService, HandyNgLayoutService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input, ViewChild, ElementRef, Injector } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Overlay, OverlayRef, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { InputCalendarComponent } from './input-calendar/input-calendar.component';
import { DATE_INPUT_CALENDAR_DATA, DateInputCalendarSimpleFilterOptions } from './input-calendar/date-input-injection-token';
import * as MomentTimezones from 'moment-timezone';
import { HandyDatePipe } from '@handy-ng/pipes/handy-date.pipe';

@Component({
  selector: 'handy-date-input',
  templateUrl: './handy-date-input.component.html',
  styleUrls: ['./handy-date-input.component.scss'],
  inputs: [
    'appearance', 'label', 'placeholder', 'disabled',
    'prefixText', 'sufixText', 'prefixIcon',
    'sufixIcon',  
    'debounceTime', 'startHint', 'endHint', 'fieldName',
    'pinningValue', 'disableFieldPin', 'disableFieldStateMemory',
    'showTimeZone', 'selectableTimezone', 'getTime', 'multiSelect',
    'minDate', 'maxDate', 'startDate', 'minTime', 'maxTime',
    'simpleFilter', 'timeZone', 'customFilter', 'dateClass', 'setTime'
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
  ],
  providers: [
    HandyDatePipe,
  ]
})
export class HandyDateInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  public _displayVal: string;
  protected _pipeSetting: string = 'd MMM y';
  protected _pipeWithTimeSetting: string = 'd MMM y, HH:mm';
  protected _finalPipeSetting: string = this._pipeSetting;

  public _sufixIcon: string = 'today';

  @ViewChild('inputField', { static: true, read: ElementRef }) protected _inputFieldElm: ElementRef;

  public _showTimeZone: boolean = true;
  @Input() public set showTimeZone(set: boolean) {
    this._showTimeZone = set;
  }

  public _selectableTimezone: boolean = false;
  @Input() public set selectableTimezone(set: boolean) {
    this._selectableTimezone = set;
  }

  public _getTime: boolean = false;
  @Input() public set getTime(set: boolean) {

    this._getTime = set;

    this._finalPipeSetting = (set) ? this._pipeWithTimeSetting : this._pipeSetting;
    this._showDate();

  }

  public _multiSelect: boolean = false;
  @Input() public set multiSelect(set: boolean) {

    this._multiSelect = set;

    if (set) {
      this.getTime = false;
    }

  }

  public _minDate: MomentTimezones.Moment | number | string;
  @Input() public set minDate(min: MomentTimezones.Moment | number | string) {
    this._minDate = min;
  }

  public _maxDate: MomentTimezones.Moment | number | string;
  @Input() public set maxDate(max: MomentTimezones.Moment | number | string) {
    this._maxDate = max;
  }

  public _startDate: MomentTimezones.Moment | number | string;
  @Input() public set startDate(start: MomentTimezones.Moment | number | string) {
    this._startDate = start;
  }

  public _setTime: string;
  @Input() public set setTime(set: string) {
    this._setTime = set;
  }

  public _minTime: string;
  @Input() public set minTime(min: string) {
    this._minTime = min;
  }

  public _maxTime: string;
  @Input() public set maxTime(max: string) {
    this._maxTime = max;
  }

  public _simpleFilter: DateInputCalendarSimpleFilterOptions[] = [];
  @Input() public set simpleFilter(filter: DateInputCalendarSimpleFilterOptions[]) {
    this._simpleFilter = filter;
  }

  public _timeZone: string = MomentTimezones.tz.guess();
  @Input() public set timeZone(zone: string) {
    this._timeZone = zone;
  }

  public _customFilter: (date: string) => boolean;
  @Input() public set customFilter(filter: (date: string) => boolean) {
    this._customFilter = filter;
  }

  public _dateClass: (date: string) => string;
  @Input() public set dateClass(classFilter: (date: string) => string) {
    this._dateClass = classFilter;
  }

  protected _portal: ComponentPortal<InputCalendarComponent>;
  protected _overLayRef: OverlayRef;

  constructor (
    @Optional() @Self() public ngControl: NgControl,
    public _handyNgUserService: HandyNgUserService,
    @Optional() protected _parentFormComponent: HandyFormComponent,
    public handyNgLayoutService: HandyNgLayoutService,
    protected _injector: Injector,
    protected _overlay: Overlay,
    protected _datePipe: HandyDatePipe) {

    super(ngControl, _handyNgUserService, _parentFormComponent);

  }

  public preventKeyInput(event: KeyboardEvent): void {

    event.preventDefault();

  }

  public onFocus(event: FocusEvent): void {

    // Returns an OverlayRef (which is a PortalHost)
    if (!this._overLayRef) {

      this._overLayRef = this._overlay.create({
        width: '300px',
        positionStrategy: this._getPositionStrategy(),
        hasBackdrop: true,
        backdropClass: 'transparent',
        panelClass: 'mat-app-background',
        scrollStrategy: this._overlay.scrollStrategies.block()
      });


    }

    if (!this._overLayRef.hasAttached()) {

      this._portal = new ComponentPortal(InputCalendarComponent, null, this._getPortalInjector());

      // Attach ComponentPortal to PortalHost
      this._overLayRef.attach<InputCalendarComponent>(this._portal);

      this._overLayRef.backdropClick().subscribe(() => {
        this.closeOverlay(undefined, false);
      })

    }

  }

  public updateChanges(): void {

    this._showDate();
    super.updateChanges();

  }

  public closeOverlay(selected: number[] = [], fromOverLay: boolean = true, timeZone?: string): void {

    if (fromOverLay) {
      this._value = selected.sort();
    }

    if (this._overLayRef.hasAttached()) {
      this._overLayRef.detach();
    }

    if (timeZone) {
      this._timeZone = timeZone;
    }

    this.updateChanges();
    this._showDate();

  }

  protected _getPortalInjector(): PortalInjector {

    const injectorTokens = new WeakMap();
    injectorTokens.set(DATE_INPUT_CALENDAR_DATA, {
      value: this._value,
      multiSelect: this._multiSelect,
      getTime: this._getTime,
      minDate: this._minDate,
      maxDate: this._maxDate,
      minTime: this._minTime,
      maxTime: this._maxTime,
      simpleFilter: this._simpleFilter,
      timeZone: this._timeZone,
      dateClass: this._dateClass,
      customFilter: this._customFilter,
      showTimeZone: this._showTimeZone,
      selectableTimezone: this._selectableTimezone,
      startDate: this._startDate,
      setTime: this._setTime,
      parentInstance: this
    });

    return new PortalInjector(this._injector, injectorTokens);

  }

  protected _getPositionStrategy(): PositionStrategy {
    
    if (this.handyNgLayoutService.isDesktop) {
      
      return this._overlay.position()
        .flexibleConnectedTo(this._inputFieldElm)
        .withPositions([{
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }, {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        }]);

    }

    return this._overlay.position().global().centerHorizontally().centerVertically();

  }
  
  protected _getScrollStrategy(): ScrollStrategy {
    
    if (this.handyNgLayoutService.isDesktop) {
      
      return this._overlay.scrollStrategies.block();

    }

    return this._overlay.scrollStrategies.noop();

  }

  protected _showDate(): void {

    if (!this._value || this._value.length === 0) {
      this._displayVal = null;
      return;
    }

    if (Array.isArray(this._value)) {

      let datesLen: number = this._value.length;

      if (datesLen > 1) {

        this._displayVal = `${datesLen} dates selected`;
        return;

      }

      this._displayVal = this._datePipe.transform(this._value[0], this._timeZone, this._getTime);
      return;

    }

    this._displayVal = this._datePipe.transform(this._value, this._timeZone, this._getTime);

    return;

  }

  public preModelEmitHook(): any {

    if (!this._value) {
      return null;
    }

    if (Array.isArray(this._value)) {

      let hasValues: boolean = this._value.length > 0;

      if (!hasValues) {
        return null;
      }

      if (!this._multiSelect) {
        return this._value[0];
      }

      return this._value;

    }

    return (this._multiSelect) ? [this._value] : this._value;

  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}