import { HandyNgConfigService } from '@handy-ng/services';
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { DefaultProdEnvDirective } from '@handy-ng/core/defaults/directives/prod-env.directive';

@Directive({
  selector: '[prod]'
})
export class ProdEnvDirective extends DefaultProdEnvDirective {

  constructor (protected _handyNgConfig: HandyNgConfigService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {

    super(_handyNgConfig, templateRef, vCref);

  }

}
