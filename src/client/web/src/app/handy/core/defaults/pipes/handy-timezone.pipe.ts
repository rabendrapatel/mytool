import { PipeTransform } from '@angular/core';

export class DefaultHandyTimeZonePipe implements PipeTransform {

  transform(value: string): string {

    if (!value) {
      return '';
    }

    let splitted: string[] = value.split('/');

    if (splitted.length < 2) {
      return '';
    }

    return splitted[1].split('_').join(' ');

  }

}
