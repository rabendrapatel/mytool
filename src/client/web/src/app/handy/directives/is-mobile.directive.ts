import { HandyNgLayoutService } from '@handy-ng/services';
import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DefaultIsMobileDirective } from '@handy-ng/core/defaults/directives/is-mobile.directive';

@Directive({
  selector: '[mobile]'
})
export class IsMobileDirective extends DefaultIsMobileDirective implements OnInit {

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) { 
    super(_handyNgLayout, templateRef, vCref)
  }

  ngOnInit() {

    super.ngOnInit();

  }

}