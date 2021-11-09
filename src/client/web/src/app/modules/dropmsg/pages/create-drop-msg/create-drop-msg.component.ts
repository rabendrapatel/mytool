import { Component, OnInit } from '@angular/core';
import { HandyNgApiService, HandyNgUserService } from '@handy-ng/services';

@Component({
  selector: 'create-drop-msg',
  templateUrl: './create-drop-msg.component.html',
  styleUrls: ['./create-drop-msg.component.scss']
})
export class CreateDropMsgComponent implements OnInit {

  public content: string;
  public expireAt: number = Date.now() + (1000 * 60 * 60 * 24 * 3);

  public minExpiryAt: number = Date.now() + (1000 * 60 * 60);

  public creating = true;
  public url: string;
  public password: string;

  constructor(
    private __api: HandyNgApiService,
    private __user: HandyNgUserService
  ) { }

  ngOnInit(): void {
  }

  public createDrop(): void {

    let { content, expireAt } = this;
    this.__api.postRequest('/service/mydrop/create', {
      content, expireAt
    }).subscribe(requestResult => {

      let { url, password } = requestResult.data;

      this.url = url;
      this.password = password;

      this.content = null;
      this.creating = false;

    }, err => {

      this.reset(true);
      this.__user.notify.apiErrNotification(err, 'Creating a drop');

    });

  }

  public reset(fialedAttempt: boolean = false): void {

    if (!fialedAttempt) {
      this.content = null;
    }

    this.url = null;
    this.password = null;

    this.creating = true;

  }
}
