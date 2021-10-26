import { MatDialog } from '@angular/material/dialog';
import { Directive, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { HandyNgTrackingService } from '@handy-ng/services';

@Directive({
  selector: '[trackClick]',
})
export class TrackClickDirective {

  private __clickName: string = 'Unassigned click name';
  @Input('trackClick') public set trackClick(clickName: string) {
    this.__clickName = clickName;
  }

  private __disabled: boolean = false;
  @Input('disabled') public set disabled(set: boolean) {
    this.__disabled = set;
  }

  constructor (protected _trackingService: HandyNgTrackingService) {


  }

  @HostListener('click', ['$event.target'])
  onClick() {

    if (!this.__disabled) {
      this._trackingService.trackClick(this.__clickName);
    }

  }

}
