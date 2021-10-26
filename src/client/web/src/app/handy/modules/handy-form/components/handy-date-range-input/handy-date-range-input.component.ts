import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import * as MomentTimezones from 'moment-timezone';
import { DateInputCalendarSimpleFilterOptions } from '../handy-date-input/input-calendar/date-input-injection-token';
import { HandyDateInputComponent } from '../handy-date-input/handy-date-input.component';

@Component({
  selector: 'handy-date-range-input',
  templateUrl: './handy-date-range-input.component.html',
  styleUrls: ['./handy-date-range-input.component.scss'],
  inputs: [
    'appearance', 'disabled',
    'debounceTime', 'fieldName',
    'pinningValue', 'disableFieldPin',

    'fromStartHint', 'toStartHint', 'fromEndHint', 'toEndHint',
    'fromLabel', 'toLabel', 'fromPlaceholder', 'toPlaceholder',
    'showTimeZone', 'selectableTimezone', 'getTime', 'getFullToDay',
    'fromMinDate', 'fromMaxDate', 'toMinDate', 'toMaxDate',
    'fromStartDate', 'toStartDate', 'minDaysRange', 'maxDaysRange',
    'fromMinTime', 'fromMaxTime', 'toMinTime', 'toMaxTime', 
    'setToTime', 'setFromTime', 'fromSimpleFilter', 'toSimpleFilter', 
    'fromTimeZone', 'toTimeZone', 'fromCustomilter', 'toCustomFilter',
    'fromDateClass', 'toDateClass',
  ],
  outputs: [
    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
  ]
})
export class HandyDateRangeInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {

  public _value: any = null;

  public _fromStartHint: string;
  @Input() public set fromStartHint(set: string) {
    this._fromStartHint = set;
  }

  public _toStartHint: string;
  @Input() public set toStartHint(set: string) {
    this._toStartHint = set;
  }

  public _fromEndHint: string;
  @Input() public set fromEndHint(set: string) {
    this._fromEndHint = set;
  }

  public _toEndHint: string;
  @Input() public set toEndHint(set: string) {
    this._toEndHint = set;
  }

  public _fromLabel: string = 'From';
  @Input() public set fromLabel(set: string) {
    this._fromLabel = set;
  }

  public _toLabel: string = 'To';
  @Input() public set toLabel(set: string) {
    this._toLabel = set;
  }

  public _fromPlaceholder: string = 'From';
  @Input() public set fromPlaceholder(set: string) {
    this._fromPlaceholder = set;
  }

  public _toPlaceholder: string = 'To';
  @Input() public set toPlaceholder(set: string) {
    this._toPlaceholder = set;
  }

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
  }

  public _getFullToDay: boolean = true;
  @Input() public set getFullToDay(set: boolean) {
    this._getFullToDay = set;
  }

  protected _explicitMinFromDate: number;
  protected _hasExplicitMinFromDate: boolean = false;
  public _minFromDate: MomentTimezones.Moment | number | string;
  @Input() public set fromMinDate(min: MomentTimezones.Moment | number | string) {

    this._minFromDate = min;

    switch (typeof min) {

      case 'number':

        this._explicitMinFromDate = min;

        break;

      case 'string':

        this._explicitMinFromDate = MomentTimezones.tz(min, 'DD MMM YYYY', this._toTimeZone).valueOf();

        break;

      default:

        this._explicitMinFromDate = (<MomentTimezones.Moment>min).valueOf();

        break;
    }

    this._hasExplicitMinFromDate = true;

  }

  protected _explicitMaxFromDate: number;
  protected _hasExplicitMaxFromDate: boolean = false;
  public _maxFromDate: MomentTimezones.Moment | number | string;
  @Input() public set fromMaxDate(max: MomentTimezones.Moment | number | string) {

    this._maxFromDate = max;

    switch (typeof max) {

      case 'number':

        this._explicitMaxFromDate = max;

        break;

      case 'string':

        this._explicitMaxFromDate = MomentTimezones.tz(max, 'DD MMM YYYY', this._toTimeZone).valueOf();

        break;

      default:

        this._explicitMaxFromDate = (<MomentTimezones.Moment>max).valueOf();

        break;
    }

    this._hasExplicitMaxFromDate = true;

  }

  protected _explicitMinToDate: number;
  protected _hasExplicitMinToDate: boolean = false;
  public _minToDate: MomentTimezones.Moment | number | string;
  @Input() public set toMinDate(min: MomentTimezones.Moment | number | string) {

    this._minToDate = min;

    switch (typeof min) {

      case 'number':

        this._explicitMinToDate = min;

        break;

      case 'string':

        this._explicitMinToDate = MomentTimezones.tz(min, 'DD MMM YYYY', this._toTimeZone).valueOf();

        break;

      default:

        this._explicitMinToDate = (<MomentTimezones.Moment>min).valueOf();

        break;
    }

    this._hasExplicitMinToDate = true;

  }

  protected _explicitMaxToDate: number;
  protected _hasExplicitMaxToDate: boolean = false;
  public _maxToDate: MomentTimezones.Moment | number | string;
  @Input() public set toMaxDate(max: MomentTimezones.Moment | number | string) {

    this._maxToDate = max;

    switch (typeof max) {

      case 'number':

        this._explicitMaxToDate = max;

        break;

      case 'string':

        this._explicitMaxToDate = MomentTimezones.tz(max, 'DD MMM YYYY', this._toTimeZone).valueOf();

        break;

      default:

        this._explicitMaxToDate = (<MomentTimezones.Moment>max).valueOf();

        break;
    }

    this._hasExplicitMaxToDate = true;

  }

  public _fromStartDate: MomentTimezones.Moment | number | string;
  @Input() public set fromStartDate(start: MomentTimezones.Moment | number | string) {
    this._fromStartDate = start;
  }

  public _toStartDate: MomentTimezones.Moment | number | string;
  @Input() public set toStartDate(start: MomentTimezones.Moment | number | string) {
    this._toStartDate = start;
  }

  public _minDaysRange: number;
  @Input() public set minDaysRange(min: number) {
    this._minDaysRange = min;
  }

  public _maxDaysRange: number;
  @Input() public set maxDaysRange(max: number) {
    this._maxDaysRange = max;
  }

  public _minFromTime: string;
  @Input() public set fromMinTime(min: string) {
    this._minFromTime = min;
  }

  public _maxFromTime: string;
  @Input() public set fromMaxTime(max: string) {
    this._maxFromTime = max;
  }

  public _minToTime: string;
  @Input() public set toMinTime(min: string) {
    this._minToTime = min;
  }

  public _maxToTime: string;
  @Input() public set toMaxTime(max: string) {
    this._maxToTime = max;
  }

  public _setToTime: string;
  @Input() public set setToTime(set: string) {
    this._setToTime = set;
  }

  public _setFromTime: string;
  @Input() public set setFromTime(set: string) {
    this._setFromTime = set;
  }

  public _simpleFromFilter: DateInputCalendarSimpleFilterOptions[] = [];
  @Input() public set fromSimpleFilter(filter: DateInputCalendarSimpleFilterOptions[]) {
    this._simpleFromFilter = filter;
  }

  public _simpleToFilter: DateInputCalendarSimpleFilterOptions[] = [];
  @Input() public set toSimpleFilter(filter: DateInputCalendarSimpleFilterOptions[]) {
    this._simpleToFilter = filter;
  }

  public _fromTimeZone: string = MomentTimezones.tz.guess();
  @Input() public set fromTimeZone(zone: string) {
    this._fromTimeZone = zone;
  }

  public _toTimeZone: string = MomentTimezones.tz.guess();
  @Input() public set toTimeZone(zone: string) {
    this._toTimeZone = zone;
  }

  public _customFromFilter: (date: string) => boolean;
  @Input() public set fromCustomilter(filter: (date: string) => boolean) {
    this._customFromFilter = filter;
  }

  public _customToFilter: (date: string) => boolean;
  @Input() public set toCustomFilter(filter: (date: string) => boolean) {
    this._customToFilter = filter;
  }

  public _dateFromClass: (date: string) => string;
  @Input() public set fromDateClass(classFilter: (date: string) => string) {
    this._dateFromClass = classFilter;
  }

  public _dateToClass: (date: string) => string;
  @Input() public set toDateClass(classFilter: (date: string) => string) {
    this._dateToClass = classFilter;
  }

  public from: number = null;
  public to: number = null;
  protected _dayMs: number = 24 * 60 * 60 * 1000;

  @ViewChild('fromInput', { static: false, read: HandyDateInputComponent }) public fromInput: HandyDateInputComponent;
  @ViewChild('toInput', { static: false, read: HandyDateInputComponent }) public toInput: HandyDateInputComponent;

  constructor (@Optional() @Self() public ngControl: NgControl, public _handyNgUserService: HandyNgUserService, @Optional() protected _parentFormComponent: HandyFormComponent) {
    super(ngControl, _handyNgUserService, _parentFormComponent);

    this.addOnFormResetHoook(() => {

      if (this._hasPinnedVal) {

        this._value = this._lastKnownPinnedVal;
        return;

      } 

      this.from = null;
      this.to = null;
      this._value = null;

    })
  }

  public ngAfterViewInit(): void {
    this.preWriteValueHook(this._value);
  }

  public ngOnInit(): void {

    super.ngOnInit();

  }

  protected _parseMinAndMaxToDate(): void {

    // ? min date
    if (!this.from) {

      this._minToDate = this._explicitMinToDate;
      this._maxToDate = this._explicitMaxToDate;
      return;

    }

    let minToDateToApply: number = this.from;

    if (this._minDaysRange) {
      minToDateToApply = minToDateToApply + (this._minDaysRange * this._dayMs);
    }

    if (this._hasExplicitMinToDate) {

      if (minToDateToApply < this._explicitMinToDate) {
        minToDateToApply = this._explicitMinToDate;
      }

    }

    this._minToDate = minToDateToApply;

    // ? max date
    let maxToDateToApply: number = this._explicitMaxToDate;

    if (this._maxDaysRange) {
      maxToDateToApply = this.from + (this._maxDaysRange * this._dayMs);
    }

    if (this._hasExplicitMaxToDate) {

      if (maxToDateToApply > this._explicitMaxToDate) {
        maxToDateToApply = this._explicitMaxToDate;
      }

    }

    this._maxToDate = maxToDateToApply;

    if (this.to && (this.to < minToDateToApply || this.to > maxToDateToApply)) {
      this.to = null;
    }

  }

  protected _parseMinAndMaxFromDate(): void {

    // ? max date
    if (!this.to) {

      this._minFromDate = this._explicitMinFromDate;
      this._maxFromDate = this._explicitMaxFromDate;
      return;

    }

    let maxFromDateToApply: number = this.to;

    if (this._minDaysRange) {
      maxFromDateToApply = maxFromDateToApply - (this._minDaysRange * this._dayMs);
    }

    if (this._hasExplicitMaxFromDate) {

      if (maxFromDateToApply > this._explicitMaxFromDate) {
        maxFromDateToApply = this._explicitMaxFromDate;
      }

    }

    this._maxFromDate = maxFromDateToApply;

    // ? min date
    let minFromDateToApply: number = this._explicitMinFromDate;

    if (this._maxDaysRange) {
      minFromDateToApply = this.to - (this._maxDaysRange * this._dayMs);
    }

    if (this._hasExplicitMinFromDate) {

      if (minFromDateToApply < this._explicitMinFromDate) {
        minFromDateToApply = this._explicitMinFromDate;
      }

    }

    this._minFromDate = minFromDateToApply;

    if (this.from && (this.from < minFromDateToApply || this.from > maxFromDateToApply)) {
      this.from = null;
    }

  }

  public fromValueChange(): void {

    if (this.from && (this._value !== null && this._value !== undefined)) {
      this._value.from = this.from;
    }

    this._parseMinAndMaxToDate();

    setTimeout(() => {

      if (this.ngControl.touched && this.from && !this.to) {
        this.toInput.onFocus(null)
      }

      this.updateChanges();

    });

  }

  public toValueChange(): void {

    if (this.to && (this._value !== null && this._value !== undefined)) {
      this._value.to = this.to;
    }

    this._parseMinAndMaxFromDate();

    setTimeout(() => {

      if (this.ngControl.touched && this.to && !this.from) {
        this.fromInput.onFocus(null)
      }

      this.updateChanges();

    });

  }

  public updateChanges(): void {

    this.preWriteValueHook(this._value);
    super.updateChanges();

  }

  public preWriteValueHook(value): void {
    
    if (value) {

      let { to, from } = value;

      if (this.to !== to) {
        this.to = to;
      }

      if (this.from !== from) {
        this.from = from;
      }
      
    }

  }

  public preModelEmitHook() {

    if (!this.from && !this.to) {
      return null;
    }

    let to: number = this.to;

    if (this._getFullToDay && to) {

      let date = MomentTimezones.tz(to, this._toTimeZone);
      to = date.set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).valueOf();

    }

    return { from: this.from, to };

  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
