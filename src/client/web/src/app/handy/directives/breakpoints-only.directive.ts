import { HandyNgLayoutService } from '@handy-ng/services';
import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { DefaultBreakpointsOnlyDirective } from '@handy-ng/core/defaults/directives/breakpoints-only.directive';

@Directive({
  selector: '[viewPorts]',
  inputs: [
    'viewPorts'
  ]
})
export class BreakpointsOnlyDirective extends DefaultBreakpointsOnlyDirective implements OnInit, OnDestroy {

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
