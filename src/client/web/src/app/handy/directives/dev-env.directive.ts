import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { HandyNgConfigService } from '@handy-ng/services';
import { DefaultDevEnvDirective } from '@handy-ng/core/defaults/directives/dev-env.directive';

@Directive({
  selector: '[dev]'
})
export class DevEnvDirective extends DefaultDevEnvDirective {

  constructor(protected _handyNgConfig: HandyNgConfigService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {

    super(_handyNgConfig, templateRef, vCref);

   }

}
