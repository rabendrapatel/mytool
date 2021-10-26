import { PipeTransform } from '@angular/core';
import * as MomentTimezones from 'moment-timezone';

export class DefaultHandyDatePipe implements PipeTransform {

  transform(value: number, timeZone: string = MomentTimezones.tz.guess(), includeTime: boolean = false): string {

    if (!value) {
      return '';
    }

    let format = (includeTime) ? 'DD MMM YYYY, HH:mm' : 'DD MMM YYYY';
    return MomentTimezones.tz(value, timeZone).format(format);

  }

}
