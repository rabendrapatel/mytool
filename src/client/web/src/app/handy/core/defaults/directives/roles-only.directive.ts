import { SingleOrArrayCombo } from '@server-types';
import { HandyNgUserService } from '@handy-ng/services';
import { TemplateRef, ViewContainerRef, Input, OnInit, OnDestroy, Directive } from '@angular/core';
import { UserRole } from '@handy-ng/types';
import { Subscription } from 'rxjs';

@Directive()
export class DefaultRolesOnlyDirective implements OnInit, OnDestroy {

  protected hasElement: boolean = false;
  protected requiredRoles: SingleOrArrayCombo<UserRole> = [];
  protected userChangeSub: Subscription;

  @Input() set userRoles(requiredRolesToCheck: SingleOrArrayCombo<UserRole>) {

    this.requiredRoles = requiredRolesToCheck;
    this.checkIfHasRoles(); 

  }

  constructor (protected _handyNgUserService: HandyNgUserService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {}

  ngOnInit() {

    this.checkIfHasRoles();

    this.userChangeSub = this._handyNgUserService.userChange().subscribe(() => {

      this.checkIfHasRoles();

    })

  }

  protected checkIfHasRoles(): void {

    let hasRoles: boolean = this._handyNgUserService.hasRole(this.requiredRoles);

    if (hasRoles && !this.hasElement) {
      this.vCref.createEmbeddedView(this.templateRef);
      this.hasElement = true;
      return;
    }

    if (!hasRoles && this.hasElement) {
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