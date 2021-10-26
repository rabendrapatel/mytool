import { HandyNgLayoutService } from '@handy-ng/services';
import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DefaultXlLayoutDirective } from '@handy-ng/core/defaults/directives/xl-layout.directive';

@Directive({
  selector: '[xl]'
})
export class XlLayoutDirective extends DefaultXlLayoutDirective implements OnInit, OnDestroy {

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
