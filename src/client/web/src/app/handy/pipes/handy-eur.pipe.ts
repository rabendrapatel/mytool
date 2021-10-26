import { Pipe, PipeTransform } from '@angular/core';
import { DefaultHandyEurPipe } from '@handy-ng/core/defaults/pipes/handy-eur.pipe';

@Pipe({
  name: 'eur'
})
export class HandyEurPipe extends DefaultHandyEurPipe implements PipeTransform { }
