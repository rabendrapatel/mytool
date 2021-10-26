import { DefaultHandyNotificationComponent } from '@handy-ng/core/defaults/extenders/handy-notification-component';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';

export class HandyNgNotificationComponent<ComponentDeclaration = any, NotificationData = any> extends DefaultHandyNotificationComponent<ComponentDeclaration, NotificationData> {

  constructor (
    protected _snackBarRef: MatSnackBarRef<ComponentDeclaration>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData) {

      super(_snackBarRef, data)

  }

}