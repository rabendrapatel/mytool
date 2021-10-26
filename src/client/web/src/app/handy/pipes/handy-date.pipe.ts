import { Pipe, PipeTransform } from '@angular/core';
import * as MomentTimezones from 'moment-timezone';
import { DefaultHandyDatePipe } from '@handy-ng/core/defaults/pipes/handy-date.pipe';

@Pipe({
  name: 'handyDate'
})
export class HandyDatePipe extends DefaultHandyDatePipe implements PipeTransform {}
