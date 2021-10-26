import { Pipe, PipeTransform } from '@angular/core';

export class DefaultHandyEurPipe implements PipeTransform {

  transform(value: string | number, emptyVal: string = '€0.00', thousandSeparator: string = ','): string {

    let numVal: number = 0;
    let result: string = emptyVal;

    if (typeof value === 'number') {
      result = `€${value.toFixed(2)}`;
    }

    if (typeof value === 'string') {

      let parsedFloat: number = parseFloat(value);

      if (typeof parsedFloat === 'number') {
        result = `€${parsedFloat.toFixed(2)}`;
      }

    }

    return result.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

  }

}
