import { TemplateRef, ViewContainerRef, OnInit, Directive } from '@angular/core';
import { HandyNgLayoutService } from '@handy-ng/services';

@Directive()
export class DefaultIsAndroidDirective implements OnInit {

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {}

  ngOnInit() {

    if (this._handyNgLayout.isAndroid) {
      this.vCref.createEmbeddedView(this.templateRef);
    } else {
      this.vCref.clear();
    }

  }

}
