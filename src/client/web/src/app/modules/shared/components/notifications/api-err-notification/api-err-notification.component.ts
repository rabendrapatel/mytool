import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { HandyNgNotificationComponent } from '@handy-ng/extenders/handy-notification-component';
import { HandyNgNotificationDuration } from '@handy-ng/types';

@Component({
  selector: 'app-api-err-notification',
  templateUrl: './api-err-notification.component.html',
  styleUrls: ['./api-err-notification.component.scss'],
})
export class ApiErrNotificationComponent extends HandyNgNotificationComponent<ApiErrNotificationComponent, ApiErrNotificationData> implements OnInit, OnDestroy {

  public dismissBtnLabel: string = 'Got it';

  public code: string;
  public refCode: string;
  public actionName: string;

  public msg: string;
  public headline: string;
  
  public duration: HandyNgNotificationDuration = 'keepOpen';

  constructor (
    protected _snackBarRef: MatSnackBarRef<ApiErrNotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: ApiErrNotificationData) {

    super(_snackBarRef, data);

    let { code, refCode, msg, headline, actionName } = this.data;

    this.code = code;
    this.refCode = refCode;
    this.actionName = actionName;
    this.msg = msg;
    this.headline = headline;

  }

  ngOnInit(): void {
    this._asignDuration();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}

interface ApiErrNotificationData {
  code: string,
  refCode: string,
  msg: string,
  headline: string,
  actionName: string
}