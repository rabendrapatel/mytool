import { HandyNgUserService } from '@handy-ng/services';
import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { DefaultLoggedInOnlyDirective } from '@handy-ng/core/defaults/directives/logged-in-only.directive';

@Directive({
  selector: '[loggedIn]'
})
export class LoggedInOnlyDirective extends DefaultLoggedInOnlyDirective implements OnInit, OnDestroy {

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

