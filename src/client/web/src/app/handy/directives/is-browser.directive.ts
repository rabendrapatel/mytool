import { HandyNgConfigService } from '@handy-ng/services';
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { DefaultIsBrowserDirective } from '@handy-ng/core/defaults/directives/is-browser.directive';

@Directive({
  selector: '[browser]'
})
export class IsBrowserDirective extends DefaultIsBrowserDirective {

  constructor (protected _handyNgConfig: HandyNgConfigService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {

    super(_handyNgConfig, templateRef, vCref);

  }

}