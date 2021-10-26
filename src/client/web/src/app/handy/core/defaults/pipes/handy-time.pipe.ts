import { PipeTransform } from '@angular/core';
import * as MomentTimezones from 'moment-timezone';

export class DefaultHandyTimePipe implements PipeTransform {

  transform(value: number, inputType: 'ms' | 'second' = 'ms', format?: string): string {

    if (!value) {
      return '';
    }

    if (!format) {
      
      let actualSecVal: number = (inputType === 'second') ? value : Math.floor(value / 1000);
      
      if (actualSecVal <= 3600) {
        format = 'mm:ss';
      }
      
      if (actualSecVal > 3600) {
        format = 'hh:mm:ss';
      }      

    }

    return MomentTimezones.utc(MomentTimezones.duration(value, inputType).as('milliseconds')).format(format);

  }

}