import { HandyNgLayoutService } from '@handy-ng/services';
import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DefaultMdLayoutDirective } from '@handy-ng/core/defaults/directives/md-layout.directive';

@Directive({
  selector: '[md]'
})
export class MdLayoutDirective extends DefaultMdLayoutDirective implements OnInit, OnDestroy {

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {
    super(_handyNgLayout, templateRef, vCref);
   }

  ngOnInit() {

    super.ngOnInit();

  }

  ngOnDestroy() {

    super.ngOnDestroy();

  }

}
