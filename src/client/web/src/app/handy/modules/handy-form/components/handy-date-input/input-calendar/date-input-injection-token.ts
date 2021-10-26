import { InjectionToken } from '@angular/core';
import { HandyDateInputComponent } from '../handy-date-input.component';
import { Moment } from 'moment';

export const DATE_INPUT_CALENDAR_DATA = new InjectionToken<DateInputCalendarData>('DATE_INPUT_CALENDAR_DATA');

export interface DateInputCalendarData {

  value?: number,
  minDate?: number | string | Moment,
  maxDate?: number | string | Moment,
  startDate?: number | string | Moment,
  
  getTime?: boolean,
  minTime?: string,
  maxTime?: string,
  setTime?: string,

  simpleFilter?: DateInputCalendarSimpleFilterOptions[],
  customFilter?: (date: string) => boolean,
  dateClass?: (date: string) => string,
  timeZone?: string,
  showTimeZone?: boolean,
  selectableTimezone?: boolean,

  multiSelect?: boolean,
  parentInstance: HandyDateInputComponent

}

export type DateInputCalendarSimpleFilterOptions = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'mon-fri' | 'weekend';