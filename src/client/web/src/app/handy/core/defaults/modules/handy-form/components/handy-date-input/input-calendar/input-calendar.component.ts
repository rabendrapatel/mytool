import { Component, Inject, ViewChild } from '@angular/core';
import { DATE_INPUT_CALENDAR_DATA, DateInputCalendarData, DateInputCalendarSimpleFilterOptions } from './date-input-injection-token';
import { DateAdapter } from '@angular/material/core';
import { HandyDateInputAdapter } from './handy-date-input-date-adapter';
import { MatCalendar } from '@angular/material/datepicker';
import { HandyDateInputComponent } from '../handy-date-input.component';

import * as MomentTimezones from 'moment-timezone';
import { Moment } from 'moment-timezone';
import { HandyNgSelectOptionsData } from '@handy-ng/types';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrls: ['./input-calendar.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: HandyDateInputAdapter },
  ]
})
export class InputCalendarComponent {

  public selectedDate: string[] = [];
  public startingDate: Moment;
  public minDate: Moment = null;
  public maxDate: Moment = null;

  public time: number = 0;
  public getTime: boolean = false;
  public minTime: string = null;
  public maxTime: string = null;
  public multiSelect: boolean;

  public showTimeZone: boolean;
  public selectableTimezone: boolean;

  protected _simpleFilterOpts: DateInputCalendarSimpleFilterOptions[] = [];
  protected _finalSimpleFilterDays: DaysNumList[] = [];
  protected _customFilter: (date: string) => boolean;

  protected _customDateClass: (date: string) => string;

  protected _singleSelectedClass: string = 'calendar-single-select mat-calendar-body-selected';

  public parentInstance: HandyDateInputComponent;

  public timeZone: string;
  public timeZonesList: HandyNgSelectOptionsData = [];
  public continetsList: string[] = ['Europe', 'America', 'Africa', 'Asia'];

  protected _hasSetTime: boolean = false;

  @ViewChild('calendar', { static: true }) public calendar: MatCalendar<any>;

  constructor (@Inject(DATE_INPUT_CALENDAR_DATA) public initialData: DateInputCalendarData) {

    let {
      value = null,
      getTime = false,
      minTime = null,
      maxTime = null,
      minDate = null,
      maxDate = null,
      simpleFilter = [],
      customFilter = null,
      dateClass = null,
      timeZone = MomentTimezones.tz.guess(true),
      multiSelect = true,
      showTimeZone = false,
      selectableTimezone = false,
      startDate = null,
      setTime = null,
      parentInstance
    } = this.initialData;

    this.minTime = minTime;
    this.maxTime = maxTime;

    if (setTime) {

      let splittedSet: string[] = setTime.split(':');

      let hr: number = parseInt(splittedSet[0]);
      let min: number = parseInt(splittedSet[1]);

      this.time = (hr * 3600) + (min * 60);
      this._hasSetTime = true;

    }

    this.parentInstance = parentInstance;
    this.timeZone = timeZone;
    this.getTime = (!multiSelect) ? getTime : false;

    this.multiSelect = multiSelect;
    this.showTimeZone = showTimeZone;

    this.selectableTimezone = selectableTimezone;

    this._parseTimezonesList();

    if (minDate) {

      switch (typeof minDate) {

        case 'number':

          this.minDate = MomentTimezones.tz(minDate, this.timeZone);

          break;

        case 'string':

          this.minDate = MomentTimezones.tz(minDate, 'DD MMM YYYY', this.timeZone);

          break;

        default:

          this.minDate = minDate;

          break;
      }

    }

    if (maxDate) {

      switch (typeof maxDate) {

        case 'number':

          this.maxDate = MomentTimezones.tz(maxDate, this.timeZone);

          break;

        case 'string':

          this.maxDate = MomentTimezones.tz(maxDate, 'DD MMM YYYY', this.timeZone);

          break;

        default:

          this.maxDate = maxDate;

          break;
      }

    }

    if (startDate) {

      switch (typeof startDate) {

        case 'number':

          this.startingDate = MomentTimezones.tz(startDate, this.timeZone);

          break;

        case 'string':

          this.startingDate = MomentTimezones.tz(startDate, 'DD MMM YYYY', this.timeZone);

          break;

        default:

          this.startingDate = startDate;

          break;
      }

    }

    if (value) {

      if (Array.isArray(value)) {

        let valsLen: number = value.length;
        let firstDate: Moment = MomentTimezones.tz(value[0], this.timeZone);

        this.time = (firstDate.hours() * 3600) + (firstDate.minutes() * 60);

        for (let i = 0; i < valsLen; i++) {

          const singleValDate = MomentTimezones.tz(value[i], this.timeZone);
          this.selectedDate.push(this.getStringFormatedDate(singleValDate));

          if (!this.startingDate) {
            this.startingDate = singleValDate;
          }

        }

      } else {

        let valDate: Moment = MomentTimezones.tz(value, this.timeZone);
        this.time = (valDate.hours() * 3600) + (valDate.minutes() * 60);
        let stringDateVal = this.getStringFormatedDate(valDate);

        if (!this.startingDate) {
          this.startingDate = valDate;
        }

        this.selectedDate = [stringDateVal];

      }

    }

    this._simpleFilterOpts = simpleFilter;
    this._customFilter = customFilter;
    this._parseFilter();

    this._customDateClass = dateClass;
    this._parseClasses();

  }

  protected _parseTimezonesList(): void {

    if (!this.selectableTimezone) {
      return;
    }

    let zones: string[] = MomentTimezones.tz.names();
    let zonesLen: number = zones.length;

    let groups: any = {};

    let continentsLen: number = this.continetsList.length;
    for (let i = 0; i < continentsLen; i++) {
      const singleContinent = this.continetsList[i];

      groups[singleContinent] = {
        label: singleContinent,
        options: []
      }

    }

    for (let i = 0; i < zonesLen; i++) {
      const singleZone = zones[i];

      let splitted: string[] = singleZone.split('/');
      if (splitted.length < 2) {
        continue;
      }

      if (!this.continetsList.includes(splitted[0])) {
        continue;
      }

      groups[splitted[0]].options.push({
        value: singleZone,
        displayValue: splitted[1].split('_').join(' ')
      })

    }

    for (let i = 0; i < continentsLen; i++) {
      const singleContinent = this.continetsList[i];

      groups[singleContinent].options = groups[singleContinent].options.sort();
      this.timeZonesList.push(groups[singleContinent]);

    }

  }

  public selectedChange(date: Moment): void {

    let formattedDate = this.getStringFormatedDate(date);

    if (!this.multiSelect && !this.getTime) {
      this.selectedDate = [formattedDate];
      this.calendar.updateTodaysDate();
      this.closePicker();
      return;
    }

    if (this.multiSelect) {

      if (this.selectedDate.includes(formattedDate)) {
        this.selectedDate = this.selectedDate.filter(selectedDate => { return selectedDate !== formattedDate });
      } else {
        this.selectedDate.push(formattedDate);
      }


    } else {
      this.selectedDate = [formattedDate];
    }

    this.calendar.updateTodaysDate();
    return;

  }

  protected getStringFormatedDate(date: Moment): string {
    return date.format('DD MMM YYYY');
  }

  protected _parseFilter(): void {

    if (typeof this._customFilter === 'function') {

      this.dateFilter = (date: Moment) => {

        return this._customFilter(this.getStringFormatedDate(date));

      }

      return;

    }

    let simpleFilerOptsLen: number = this._simpleFilterOpts.length;

    if (simpleFilerOptsLen > 0) {

      for (let i = 0; i < simpleFilerOptsLen; i++) {
        let singleOption = this._simpleFilterOpts[i];

        switch (singleOption) {

          case 'mon-fri':

            this._finalSimpleFilterDays.push(1, 2, 3, 4, 5);

            break;

          case 'weekend':

            this._finalSimpleFilterDays.push(0, 6);

            break;

          case 'mon':

            this._finalSimpleFilterDays.push(1);

            break;

          case 'tue':

            this._finalSimpleFilterDays.push(2);

            break;

          case 'wed':

            this._finalSimpleFilterDays.push(3);

            break;

          case 'thu':

            this._finalSimpleFilterDays.push(4);

            break;

          case 'fri':

            this._finalSimpleFilterDays.push(5);

            break;

          case 'sat':

            this._finalSimpleFilterDays.push(6);

            break;

          case 'sun':

            this._finalSimpleFilterDays.push(0);

            break;

          default:
            break;

        }

      }

      this.dateFilter = (date: Moment) => {

        return this._finalSimpleFilterDays.includes(date.day() as DaysNumList);

      }

    }

  }

  dateFilter = (date: Moment): boolean => {
    return true;
  }

  protected _parseClasses(): void {

    this.dateClass = (date: Moment) => {

      let result = '';
      let dateString: string = this.getStringFormatedDate(date);
      if (typeof this._customDateClass === 'function') {

        result += ` ${this._customDateClass(dateString)}`;

      }

      result += ` ${this._selectClass(dateString)}`;

      return result;

    }

  }

  public dateClass(date: Moment): string {
    return '';
  }

  protected _selectClass(date: string): string {

    // ? no date selected
    if (!this.selectedDate) {
      return '';
    }

    return (this.selectedDate.includes(date)) ? this._singleSelectedClass : '';

  }

  public confirmClick(): void {

    this.closePicker();

  }

  public closePicker(): void {

    if (this._hasSetTime || (this.getTime && typeof this.time === 'number' && this.selectedDate[0])) {

      const formattedTime = moment.utc(this.time * 1000).format('H:mm');

      let date = MomentTimezones.tz(this.selectedDate[0] + ' ' + formattedTime, 'DD MMM YYYY H:mm', this.timeZone);
      this.parentInstance.closeOverlay([date.valueOf()], true, this.timeZone);

      return;

    }

    let finalDates: number[] = [];

    let selectedDatesLen: number = this.selectedDate.length;
    for (let i = 0; i < selectedDatesLen; i++) {
      const singleDateString = this.selectedDate[i];
      finalDates.push(MomentTimezones.tz(singleDateString, 'DD MMM YYYY', this.timeZone).valueOf());
    }

    this.parentInstance.closeOverlay(finalDates, true, this.timeZone);
    return;

  }

  public resetClick(): void {

    this.selectedDate = [];
    this.time = 0;
    this.calendar.updateTodaysDate();

  }

  public changeTimeZone(timeZone: string): void {
    this.timeZone = timeZone;
  }

}

type DaysNumList = 0 | 1 | 2 | 3 | 4 | 5 | 6;