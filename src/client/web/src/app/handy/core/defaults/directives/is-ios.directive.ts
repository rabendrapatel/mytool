import { HandyNgLayoutService } from '@handy-ng/services';
import { OnInit, TemplateRef, ViewContainerRef, Directive } from '@angular/core';

@Directive()
export class DefaultIsIosDirective implements OnInit {

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) { }

  ngOnInit() {

    if (this._handyNgLayout.isiOS) {
      this.vCref.createEmbeddedView(this.templateRef);
    } else {
      this.vCref.clear();
    }

  }

}
