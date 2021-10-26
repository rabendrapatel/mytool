import { HandyNgUserService } from '@handy-ng/services';
import { SingleOrArrayCombo } from '@server-types';
import { OnInit, OnDestroy, TemplateRef, ViewContainerRef, Input, Directive } from '@angular/core';
import { UserGroup } from '@handy-ng/types';
import { Subscription } from 'rxjs';

@Directive()
export class DefaultGroupsOnlyDirective implements OnInit, OnDestroy {

  protected hasElement: boolean = false;
  protected requiredGroupTypes: SingleOrArrayCombo<UserGroup> = [];
  protected userChangeSub: Subscription;

  @Input() set userGroup(requiredGroupTypesToCheck: SingleOrArrayCombo<UserGroup>) {

    this.requiredGroupTypes = requiredGroupTypesToCheck;
    this.checkIfHasRoles();

  }

  constructor (protected _handyNgUserService: HandyNgUserService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) { }

  ngOnInit() {

    this.checkIfHasRoles();

    this.userChangeSub = this._handyNgUserService.userChange().subscribe(() => {

      this.checkIfHasRoles();

    })

  }

  protected checkIfHasRoles(): void {

    let isMemberOfGroup: boolean = this._handyNgUserService.isMemberOfGrouptType(this.requiredGroupTypes);

    if (isMemberOfGroup && !this.hasElement) {
      this.vCref.createEmbeddedView(this.templateRef);
      this.hasElement = true;
      return;
    }

    if (!isMemberOfGroup && this.hasElement) {
      this.hasElement = false;
      this.vCref.clear();
    }

  }

  ngOnDestroy() {

    if (this.userChangeSub) {
      this.userChangeSub.unsubscribe();
    }

  }

}