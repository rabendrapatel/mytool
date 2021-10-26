import { HandyNgUserService } from '@handy-ng/services';
import { TemplateRef, ViewContainerRef, OnInit, OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export class DefaultLoggedInOnlyDirective implements OnInit, OnDestroy {

  protected hasElement: boolean = false;
  protected userChangeSub: Subscription;

  constructor (protected _handyNgUserService: HandyNgUserService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) { }

  public checkIfLoggedIn(): void {

    if (this._handyNgUserService.loggedInStatus && !this.hasElement) {
      this.vCref.createEmbeddedView(this.templateRef);
      this.hasElement = true;
      return;
    }

    if (!this._handyNgUserService.loggedInStatus && this.hasElement) {
      this.hasElement = false;
      this.vCref.clear();
    }

  }

  ngOnInit() {

    this.checkIfLoggedIn();

    this.userChangeSub = this._handyNgUserService.userChange().subscribe(() => {

      this.checkIfLoggedIn();

    })

  }

  ngOnDestroy() {

    if (this.userChangeSub) {
      this.userChangeSub.unsubscribe();
    }

  }

}

