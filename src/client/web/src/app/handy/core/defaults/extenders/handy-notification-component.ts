import { Inject, HostListener, OnDestroy, Directive } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { HandyNgNotificationDuration } from '@handy-ng/types';

@Directive()
export class DefaultHandyNotificationComponent<ComponentDeclaration = any, NotificationData = any> implements OnDestroy {

  // ? little delay, so you can catch the notification with hover
  // ? on last moment...
  protected _counter: number = 0;
  protected _closed: boolean = false;
  public duration: HandyNgNotificationDuration = 'keepOpen';
  protected _countDownInterval: NodeJS.Timeout;

  public hover: boolean = false;

  public timeLeftValue: number = 100;
  public hasTimeLeftIndicator: boolean = true;
  protected _timeLeftFraction: number;
  protected _timeLeftInterval: NodeJS.Timeout;
  public timeLeftSpinnerColor: 'primary' | 'accent' | 'warn' = 'primary';

  constructor (
    protected _snackBarRef: MatSnackBarRef<ComponentDeclaration>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData) {

  }

  protected _asignDuration(): void {

    this.hasTimeLeftIndicator = (typeof this.duration === 'number');

    if (this.hasTimeLeftIndicator) {
      this._startCountDown();
    }

  }

  public closeSnackbar(): void {

    // ? To avoid double closing...
    if (this._closed) {
      return;
    }

    this._closed = true;
    this._clearCountDowns();
    this._snackBarRef.dismiss();

  }

  protected _startCountDown(): void {

    if (typeof this.duration !== 'number') {
      return;
    }

    this._countDownInterval = setInterval(() => {

      if (this.hover) {
        return;
      }

      if (this._counter >= this.duration) {
        this.closeSnackbar();
      }

      this._counter += 100;

    }, 100);

    this._timeLeftFraction = 100 / Math.floor(this.duration / 100);

    this._timeLeftInterval = setInterval(() => {

      if (this.hover) {
        return;
      }

      this.timeLeftValue -= this._timeLeftFraction;

      if (this.timeLeftValue < 51 && this.timeLeftValue > 25) {
        this.timeLeftSpinnerColor = 'accent';
      }

      if (this.timeLeftValue < 26) {
        this.timeLeftSpinnerColor = 'warn';
      }

    }, 100);

  }

  protected _clearCountDowns(): void {

    if (this._countDownInterval) {
      clearInterval(this._countDownInterval);
    }

    if (this._timeLeftInterval) {
      clearInterval(this._timeLeftInterval);
    }

  }

  @HostListener('mouseenter', ['$event']) onEnter(e: MouseEvent) {
    this.hover = true;
  }
  
  @HostListener('mouseleave', ['$event']) onLeave(e: MouseEvent) {
    this.hover = false
  }

  ngOnDestroy(): void {
    this._clearCountDowns();
  }

}
