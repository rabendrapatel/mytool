import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SimpleNotificationComponent } from '@ng-shared/components/notifications/simple-notification/simple-notification.component';
import { Inject } from '@angular/core';
import { SimpleNgMsgNotification } from '../types';
import { ApiErrNotificationComponent } from '@ng-shared/components/notifications/api-err-notification/api-err-notification.component';
import { HandyNgUtilsService } from '@handy-ng/services/handy-ng-utils.service';

export class DefaultHandyNgUserNotificationService {

  constructor (
    protected _handyNgUtilsService: HandyNgUtilsService,
    protected _snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) protected _defaultSnackBarOptions: MatSnackBarConfig,
  ) { }

  public simpleMsgNotification(notificationData: SimpleNgMsgNotification = {}, isErr: boolean = false) {

    let { duration, msg = [], headline, hasDismissBtn = true, dismissBtnLabel = 'Hide' } = notificationData;

    let finalDuration: number = this._getFinalDuration(duration);

    if (!finalDuration) {
      hasDismissBtn = true;
    }

    let panelClass: string = (isErr) ? 'error-notification' : undefined;

    this._snackBar.openFromComponent(SimpleNotificationComponent, {
      duration: undefined,
      data: {
        headline,
        msg,
        hasDismissBtn,
        dismissBtnLabel,
        duration: finalDuration,
      },
      panelClass
    });

  }
  
  public errNotification(notificationData: SimpleNgMsgNotification = {}) {

    let { duration = 'keepOpen', dismissBtnLabel = 'Got it' } = notificationData;

    notificationData.duration = duration;
    notificationData.dismissBtnLabel = dismissBtnLabel;

    return this.simpleMsgNotification(notificationData, true);

  }

  public apiErrNotification(err: any = {}, actionName: string = 'Server call error') {

    let { code, refCode } = this._handyNgUtilsService.getErrDataFromAPiErr(err);
    let { msg, headline } = this._handyNgUtilsService.getErrStringsFromCode(code);

    this._snackBar.openFromComponent(ApiErrNotificationComponent, {
      duration: undefined,
      data: {
        code,
        refCode,
        msg,
        headline,
        actionName
      },
      panelClass: 'error-notification'
    });

  }

  protected _getFinalDuration(requestedDuration: SimpleNgMsgNotification['duration']): number {

    if (requestedDuration) {

      if (requestedDuration === 'keepOpen') {
        requestedDuration = undefined;
      }

    } else {
      requestedDuration = this._defaultSnackBarOptions.duration;
    }

    return requestedDuration as number;

  }

}