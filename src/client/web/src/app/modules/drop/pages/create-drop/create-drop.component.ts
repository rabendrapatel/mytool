import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { HandyNgApiService, HandyNgUserService } from '@handy-ng/services';

@Component({
  selector: 'create-drop',
  templateUrl: './create-drop.component.html',
  styleUrls: ['./create-drop.component.scss']
})
export class CreateDropComponent implements OnInit {

  public content: string;
  public expiryAt: number = Date.now() + (1000 * 60 * 60 * 24 * 3);

  public minExpiryAt: number = Date.now() + (1000 * 60 * 60);

  public creating: boolean = true;
  public url: string;
  public password: string;

  constructor (
    private __api: HandyNgApiService,
    private __user: HandyNgUserService) { }

  ngOnInit(): void {
  }

  public createDrop(): void {

    let { content, expiryAt } = this;
    this.__api.postRequest('/service/drop/create', {
      content, expiryAt
    }).subscribe(requestResult => {

      let { url, password } = requestResult.data;

      this.url = url;
      this.password = password;

      this.content = null;
      this.creating = false;

    }, err => {

      this.reset(true);
      this.__user.notify.apiErrNotification(err, 'Creating a drop');

    })

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
