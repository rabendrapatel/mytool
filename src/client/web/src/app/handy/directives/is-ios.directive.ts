import { HandyNgLayoutService } from '@handy-ng/services';
import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DefaultIsIosDirective } from '@handy-ng/core/defaults/directives/is-ios.directive';

@Directive({
  selector: '[ios]'
})
export class IsIosDirective extends DefaultIsIosDirective implements OnInit {

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {
    super(_handyNgLayout, templateRef, vCref);
   }

  ngOnInit() {

    super.ngOnInit();

  }

}
