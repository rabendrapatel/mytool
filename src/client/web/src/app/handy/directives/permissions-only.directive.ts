import { HandyNgUserService } from '@handy-ng/services';
import { SingleOrArrayCombo } from '@server-types';
import { Directive, OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AdditionalAccessPermission } from '@handy-ng/types';
import { Subscription } from 'rxjs';
import { DefaultPermissionsOnlyDirective } from '@handy-ng/core/defaults/directives/permissions-only.directive';

@Directive({
  selector: '[userPermissions]',
  inputs: [
    'userPermissions'
  ]
})
export class PermissionsOnlyDirective extends DefaultPermissionsOnlyDirective implements OnInit, OnDestroy {

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