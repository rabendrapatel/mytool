import { HandyNgLayoutService } from '@handy-ng/services';
import { Directive, OnDestroy, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { DefaultSmLayoutDirective } from '@handy-ng/core/defaults/directives/sm-layout.directive';

@Directive({
  selector: '[sm]'
})
export class SmLayoutDirective extends DefaultSmLayoutDirective implements OnInit, OnDestroy {

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
