import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { HandyNgConfigService } from '@handy-ng/services';
import { DefaultStagEnvDirective } from '@handy-ng/core/defaults/directives/stag-env.directive';

@Directive({
  selector: '[stag]'
})
export class StagEnvDirective extends DefaultStagEnvDirective {

  constructor (protected _handyNgConfig: HandyNgConfigService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {

    super(_handyNgConfig, templateRef, vCref);

  }

}
