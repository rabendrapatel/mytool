import { Component, OnInit, OnDestroy } from '@angular/core';
import { HandyNgConfigService, HandyNgUserService, HandyNgLayoutService } from '@handy-ng/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'handy-nav-layout',
  templateUrl: './handy-nav-layout.component.html',
  styleUrls: ['./handy-nav-layout.component.scss'],
})
export class HandyNavLayoutComponent implements OnInit, OnDestroy {

  dateFooter = new Date().getFullYear();
  // // ion
  // private screenWasChanged: Subscription;
  // public fullscreen: boolean;
  // //

  constructor(
    protected _handyNgConfigService: HandyNgConfigService,
    public handyNgUserService: HandyNgUserService,
    public handyNgLayoutService: HandyNgLayoutService
  ) {}

  ngOnInit(): void {
    // // ion
    // this.screenWasChanged = this.handyNgUserService.fullScreenChanged.subscribe(
    //   (value) => {
    //     this.fullscreen = value;
    //   }
    // );
    // //
  }
  ngOnDestroy(): void {

    // //ion
    // if (this.screenWasChanged) {
    //   this.screenWasChanged.unsubscribe();
      
    // }
    // //
  }
}
