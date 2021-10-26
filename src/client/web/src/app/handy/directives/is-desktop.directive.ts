import { HandyNgLayoutService } from '@handy-ng/services';
import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DefaultIsDesktopDirective } from '@handy-ng/core/defaults/directives/is-desktop.directive';

@Directive({
  selector: '[desktop]'
})
export class IsDesktopDirective extends DefaultIsDesktopDirective implements OnInit {

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {
    super(_handyNgLayout, templateRef, vCref)
   }

  ngOnInit() {

    super.ngOnInit();

  }

}