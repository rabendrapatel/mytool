import { HandyNgUserService } from '@handy-ng/services';
import { Directive, TemplateRef, ViewContainerRef, Input, OnInit, OnDestroy } from '@angular/core';
import { DefaultRolesOnlyDirective } from '@handy-ng/core/defaults/directives/roles-only.directive';

@Directive({
  selector: '[userRoles]',
  inputs: [
    'userRoles'
  ]
})
export class RolesOnlyDirective extends DefaultRolesOnlyDirective implements OnInit, OnDestroy {

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