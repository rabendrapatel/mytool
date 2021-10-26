import { HandyNgLayoutService } from '@handy-ng/services';
import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { DefaultLgLayoutDirective } from '@handy-ng/core/defaults/directives/lg-layout.directive';

@Directive({
  selector: '[lg]'
})
export class LgLayoutDirective extends DefaultLgLayoutDirective implements OnInit, OnDestroy {

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {
    super(_handyNgLayout, templateRef, vCref);
   }

  ngOnInit() {

    super.ngOnInit();
  
  }

  ngOnDestroy() {

    super.ngOnDestroy();

  }

}