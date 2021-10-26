import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HandyNgApiService, HandyNgUserService } from '@handy-ng/services';

@Component({
  selector: 'show-drop',
  templateUrl: './show-drop.component.html',
  styleUrls: ['./show-drop.component.scss']
})
export class ShowDropComponent implements OnInit {

  private __dropId: number;

  public authorized: boolean = false; 
  public password: string;

  public content: string;

  constructor(
    private __route: ActivatedRoute,
    private __api: HandyNgApiService,
    private __user: HandyNgUserService) { 

    this.__dropId = +this.__route.snapshot.params['id'];

  }

  ngOnInit(): void {
  }

  public authorize(): void {

    let { __dropId, password } = this;
    this.__api.postRequest('/service/drop/authorize', {
      password,
      id: __dropId
    }).subscribe(response => {

      console.log(response);
      this.content = response.data;
      this.authorized = true;
      this.password = null;
      
    }, err => {

      this.password = null;
      this.__user.notify.apiErrNotification(err, 'Getting frop data');

    })

  }

}
