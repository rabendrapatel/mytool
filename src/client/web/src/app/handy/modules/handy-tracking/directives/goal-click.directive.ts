import { MatDialog } from '@angular/material/dialog';
import { Directive, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { HandyNgTrackingService } from '@handy-ng/services';

@Directive({
  selector: '[goalClick]',
})
export class GoalClickDirective {

  private __goalName: string = 'Unassigned goal name';
  @Input('goalClick') public set trackClick(goalName: string) {
    this.__goalName = goalName;
  }

  private __disabled: boolean = false;
  @Input('disabled') public set disabled(set: boolean) {
    this.__disabled = set;
  }

  private __goalValue: number = 0;
  @Input('goalValue') public set goalValue(value: number) {
    this.__goalValue = value;
  }

  constructor (protected _trackingService: HandyNgTrackingService) {
  }

  @HostListener('click', ['$event.target'])
  onClick() {

    if (!this.__disabled) {
      this._trackingService.trackGoal('click', this.__goalName, this.__goalValue);
    }

  }

}
