import { Pipe, PipeTransform } from '@angular/core';
import * as MomentTimezones from 'moment-timezone';
import { DefaultHandyTimePipe } from '@handy-ng/core/defaults/pipes/handy-time.pipe';

@Pipe({
  name: 'handyTime'
})
export class HandyTimePipe extends DefaultHandyTimePipe implements PipeTransform { }
