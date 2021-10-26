import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandyNgConfigService, HandyNgUserService } from '@handy-ng/services';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  constructor(protected _router: Router, protected _handyNgConfig: HandyNgConfigService, protected _handyNgUser: HandyNgUserService) {

    // if (!this._handyNgConfig.isEnv('dev')) {
    //   this._handyNgUser.redirectToErrPage('403');
    // }

   }

  ngOnInit(): void {
  }

}
