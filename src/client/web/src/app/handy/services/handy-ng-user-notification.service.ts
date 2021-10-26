import { Injectable, Inject } from '@angular/core';
import { DefaultHandyNgUserNotificationService } from '@handy-ng/core/defaults/services/default-handy-ng-user-notification.service';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HandyNgUtilsService } from './handy-ng-utils.service';
  

@Injectable({
  providedIn: 'root'
})
export class HandyNgUserNotificationService extends DefaultHandyNgUserNotificationService {

  constructor (
    protected _handyNgUtilsService: HandyNgUtilsService,
    protected _snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) protected _defaultSnackBarOptions: MatSnackBarConfig) {
    super(_handyNgUtilsService, _snackBar, _defaultSnackBarOptions)
  }

  // Example guide for making another notification method
  /* 

  public myCutomNotification(notificationData: NotificationData = {}) {

    let { duration, msg = [], headline, hasDismissBtn = true, dismissBtnLabel = 'Got it' } = notificationData;

    // Duration has to be asigned this way...
    let finalDuration: number = this._getFinalDuration(duration);

    if (finalDuration) {
      hasDismissBtn = true;
    }

    this._snackBar.openFromComponent(ApiErrNotificationComponent, {
      duration: undefined,
      data: {
        headline,
        msg,
        hasDismissBtn,
        dismissBtnLabel,
        finalDuration
      },
    });

  }

  */

}
