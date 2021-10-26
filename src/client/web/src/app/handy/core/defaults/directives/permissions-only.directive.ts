import { HandyNgUserService } from '@handy-ng/services';
import { SingleOrArrayCombo } from '@server-types';
import { OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef, Directive } from '@angular/core';
import { AdditionalAccessPermission } from '@handy-ng/types';
import { Subscription } from 'rxjs';

@Directive()
export class DefaultPermissionsOnlyDirective implements OnInit, OnDestroy {

  protected hasElement: boolean = false;
  protected requiredPermissions: SingleOrArrayCombo<AdditionalAccessPermission> = [];
  protected userChangeSub: Subscription;

  @Input() set userPermissions(requiredPermissionsToCheck: SingleOrArrayCombo<AdditionalAccessPermission>) {

    this.requiredPermissions = requiredPermissionsToCheck;
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

    let hasPermission: boolean = this._handyNgUserService.hasPermission(this.requiredPermissions);

    if (hasPermission && !this.hasElement) {
      this.vCref.createEmbeddedView(this.templateRef);
      this.hasElement = true;
      return;
    }

    if (!hasPermission && this.hasElement) {
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