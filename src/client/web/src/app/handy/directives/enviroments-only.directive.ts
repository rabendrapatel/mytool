import { HandyNgConfigService } from '@handy-ng/services';
import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { DefaultEnviromentsOnlyDirective } from '@handy-ng/core/defaults/directives/enviroments-only.directive';

@Directive({
  selector: '[handyEnv]',
  inputs: [
    'handyEnv'
  ]
})
export class EnviromentsOnlyDirective extends DefaultEnviromentsOnlyDirective {

  constructor (protected _handyNgConfig: HandyNgConfigService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {
    super(_handyNgConfig, templateRef, vCref);
  }

}
