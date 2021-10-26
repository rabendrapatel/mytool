import { HandyNgUserService } from '@handy-ng/services';
import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { DefaultNotLoggedInOnlyDirective } from '@handy-ng/core/defaults/directives/not-logged-in-only.directive';

@Directive({
  selector: '[notLoggedIn]'
})
export class NotLoggedInOnlyDirective extends DefaultNotLoggedInOnlyDirective implements OnInit, OnDestroy {

  constructor (protected _handyNgUserService: HandyNgUserService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) { 
    super(_handyNgUserService, templateRef, vCref);
  }

  ngOnInit() {

    super.ngOnInit();

  }

  ngOnDestroy() {

    super.ngOnDestroy();

  }

}

