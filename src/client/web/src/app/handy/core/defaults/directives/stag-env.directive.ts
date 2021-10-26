import { TemplateRef, ViewContainerRef } from '@angular/core';
import { HandyNgConfigService } from '@handy-ng/services';

export class DefaultStagEnvDirective {

  constructor (protected _handyNgConfig: HandyNgConfigService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {

    if (this._handyNgConfig.isEnv('stag')) {
      this.vCref.createEmbeddedView(this.templateRef);
    } else {
      this.vCref.clear();
    }

  }

}
