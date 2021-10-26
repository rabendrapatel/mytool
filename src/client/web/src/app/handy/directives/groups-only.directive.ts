import { HandyNgUserService } from '@handy-ng/services';
import { SingleOrArrayCombo } from '@server-types';
import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { UserGroup } from '@handy-ng/types';
import { DefaultGroupsOnlyDirective } from '@handy-ng/core/defaults/directives/groups-only.directive';

@Directive({
  selector: '[userGroup]',
  inputs: [
    'userGroup'
  ]
})
export class GroupsOnlyDirective extends DefaultGroupsOnlyDirective implements OnInit, OnDestroy {

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