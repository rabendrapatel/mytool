import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { HandyNgLayoutService } from '@handy-ng/services';
import { DefaultIsAndroidDirective } from '@handy-ng/core/defaults/directives/is-android.directive';

@Directive({
  selector: '[android]'
})
export class IsAndroidDirective extends DefaultIsAndroidDirective implements OnInit {

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {
    super(_handyNgLayout, templateRef, vCref);
  }

  ngOnInit() {

    super.ngOnInit();

  }

}
