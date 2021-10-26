import { HandyNgConfigService } from '@handy-ng/services';
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { DefaultIsServerDirective } from '@handy-ng/core/defaults/directives/is-server.directive';

@Directive({
  selector: '[server]'
})
export class IsServerDirective extends DefaultIsServerDirective {

  constructor (protected _handyNgConfig: HandyNgConfigService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {

    super(_handyNgConfig, templateRef, vCref);

  }

}