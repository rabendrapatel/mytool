import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SimpleNgMsgNotification } from '@handy-ng/types';
import { HandyNgNotificationComponent } from '@handy-ng/extenders/handy-notification-component';

@Component({
  selector: 'app-simple-notification',
  templateUrl: './simple-notification.component.html',
  styleUrls: ['./simple-notification.component.scss']
})
export class SimpleNotificationComponent extends HandyNgNotificationComponent<SimpleNotificationComponent, SimpleNgMsgNotification> implements OnInit, OnDestroy {

  public headline: string;

  public msg: string[];

  public dismissBtnLabel: string;
  public hasDismissBtn: boolean;
  public isErr: boolean;

  constructor (
    protected _snackBarRef: MatSnackBarRef<SimpleNotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SimpleNgMsgNotification & { isErr: boolean }) {

      super(_snackBarRef, data);

    let { msg, headline, hasDismissBtn, dismissBtnLabel, duration, isErr = false } = this.data;

    this.duration = duration;
    this.headline = headline;
    this.hasDismissBtn = hasDismissBtn;
    this.dismissBtnLabel = dismissBtnLabel;
    this.isErr = isErr;

    if (msg) {
      this.msg = (Array.isArray(msg)) ? msg : [msg];
    }

  }

  ngOnInit(): void {
    this._asignDuration();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
