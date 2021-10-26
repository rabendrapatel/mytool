import { HandyNgLayoutService } from '@handy-ng/services';
import { OnDestroy, TemplateRef, ViewContainerRef, OnInit, Directive } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export class DefaultSmLayoutDirective implements OnInit, OnDestroy {

  protected breakpointChange: Subscription;
  protected hasElement: boolean = false;

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) { }

  ngOnInit() {

    this.changeVisibility();
    this.breakpointChange = this._handyNgLayout.breakPointChange.subscribe(change => {
      this.changeVisibility();
    })

  }

  protected changeVisibility(): void {

    if (this._handyNgLayout.isSmall && !this.hasElement) {
      this.hasElement = true;
      this.vCref.createEmbeddedView(this.templateRef);
      return;
    } 
    
    if (!this._handyNgLayout.isSmall && this.hasElement) {
      this.hasElement = false;
      this.vCref.createEmbeddedView(this.templateRef);
      this.vCref.clear();
      return;
    } 

  }

  ngOnDestroy() {

    if (this.breakpointChange) {
      this.breakpointChange.unsubscribe()
    }

  }

}
