import { HandyNgUserService, HandyNgConfigService, HandyNgTrackingService } from '@handy-ng/services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public user: HandyNgUserService, public config: HandyNgConfigService, private _router: Router, public tracking: HandyNgTrackingService) {

    if (this.user.loggedInStatus) {
      this._router.navigate(['/dashboard']);
    }

   }

  public test: any[] = Array.apply(null, Array(500)).map(function (x, i) { return i; })

  ngOnInit(): void {


  }

}
