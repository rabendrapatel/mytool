import { Component, OnInit } from '@angular/core';
import { HandyNgUserNotificationService, HandyNgApiService } from '@handy-ng/services';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {

  constructor (protected _notify: HandyNgUserNotificationService, protected _api: HandyNgApiService) { }

  ngOnInit(): void {
  }

  public defaultNotification(): void {
    this._notify.simpleMsgNotification({
      hasDismissBtn: false,
      headline: 'Notification headline',
      msg: [
        'First message',
        'Second message'
      ]
    })
  }

  public errNotification(): void {
    this._notify.errNotification({
      headline: 'Err Notification headline',
      msg: [
        'First message',
        'Second message'
      ]
    })
  }

  public apiErrNotification(): void {

    this._api.getRequest('loremIpsumDolorSit')
      .subscribe(() => { }, err => {

        this._notify.apiErrNotification(err);

      })

  }

}
