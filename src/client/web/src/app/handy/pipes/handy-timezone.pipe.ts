import { Pipe, PipeTransform } from '@angular/core';
import { DefaultHandyTimeZonePipe } from '@handy-ng/core/defaults/pipes/handy-timezone.pipe';

@Pipe({
  name: 'handyTimezone'
})
export class HandyTimeZonePipe extends DefaultHandyTimeZonePipe implements PipeTransform {}
