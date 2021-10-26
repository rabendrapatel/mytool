import { HandyNgConfigService } from '@handy-ng/services';
import { TemplateRef, ViewContainerRef } from '@angular/core';

export class DefaultIsServerDirective {

  constructor (protected _handyNgConfig: HandyNgConfigService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {

    if (this._handyNgConfig.isPlatform('server')) {
      this.vCref.createEmbeddedView(this.templateRef);
    } else {
      this.vCref.clear();
    }

  }

}