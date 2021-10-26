import { MatDialog } from '@angular/material/dialog';
import { Directive, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { HandyNgTrackingService } from '@handy-ng/services';

@Directive({
  selector: '[conversionClick]',
})
export class ConversionClickDirective {

  private __conversionName: string = 'Unassigned conversion name';
  @Input('conversionClick') public set trackClick(conversionName: string) {
    this.__conversionName = conversionName;
  }

  private __disabled: boolean = false;
  @Input('disabled') public set disabled(set: boolean) {
    this.__disabled = set;
  }
  
  private __conversionValue: number = 0;
  @Input('conversionValue') public set conversionValue(value: number) {
    this.__conversionValue = value;
  }

  constructor (protected _trackingService: HandyNgTrackingService) {
  }

  @HostListener('click', ['$event.target'])
  onClick() {

    if (!this.__disabled) {
      this._trackingService.trackConversion('click', this.__conversionName, this.__conversionValue);
    }

  }

}
