import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { HandyNgTrackingService } from '@handy-ng/services';

@Directive({
  selector: '[abVersionA]'
})
export class AbVersionADirective {

  constructor (protected _trackingService: HandyNgTrackingService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {

    if (this._trackingService.abVersion === 'A') {
      this.vCref.createEmbeddedView(this.templateRef);
    } else {
      this.vCref.clear();
    }

  }

}
