import { HandyNgLayoutService } from '@handy-ng/services';
import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DefaultXsLayoutDirective } from '@handy-ng/core/defaults/directives/xs-layout.directive';

@Directive({
  selector: '[xs]'
})
export class XsLayoutDirective extends DefaultXsLayoutDirective implements OnInit, OnDestroy {

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