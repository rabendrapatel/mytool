import { Injectable, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser/';
import { HandyNgConfigService } from '@handy-ng/services';

@Injectable({
  providedIn: 'root'
})
export class DefaultKeepHtmlTagsPipe implements PipeTransform {
  constructor (public sanitizer: DomSanitizer, protected _config: HandyNgConfigService) {

  }

  transform(content: any) {

    if (this._config.isPlatform('browser')) {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }

    return '';

  }

}