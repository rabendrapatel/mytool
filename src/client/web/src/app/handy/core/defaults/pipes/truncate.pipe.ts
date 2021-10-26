import { PipeTransform } from '@angular/core';

export class DefaultTruncatePipe implements PipeTransform {

  transform(value: string, limit = 40, completeWords = true, ellipsis = '...') {
    
    if (typeof value !== 'string' || value === null || value === undefined || value.length <= limit) {
      return value;
    }

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }


    return value.length > limit ? value.substr(0, limit) + ellipsis : value;

  }

}