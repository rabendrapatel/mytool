import { Component, OnInit, OnDestroy } from '@angular/core';
import { HandyNgLayoutService, HandyNgUserService, HandyNgConfigService } from '@handy-ng/services';
import { MatDialog } from '@angular/material/dialog';
import { UserPreferencesComponent } from 'src/app/modules/user/components/user-preferences/user-preferences.component';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'handy-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  // /user/preferences
  public disablePreferencesBtn: boolean = false;
  protected _routerSubscription: Subscription;
//   // ion
//   private screenWasChanged: Subscription;
//   fullscreen: boolean;
//  //
  constructor (
    public handyNgLayoutService: HandyNgLayoutService,
    public handyNgUserService: HandyNgUserService,
    protected _dialog: MatDialog,
    protected _router: Router,
    public handyNgConfigService: HandyNgConfigService) {

    this._setDisablePreferencesBtn(this._router.url);

    this._routerSubscription = this._router.events.subscribe(event => {

      if (event instanceof NavigationStart) {

        this._setDisablePreferencesBtn(event.url);

      }

    })

  }

  ngOnInit(): void {
  //   // ion
  //  this.screenWasChanged =  this.handyNgUserService.fullScreenChanged
  //   .subscribe( value =>{
  //     this.fullscreen = value;
  //   });
  //   //
  }

  public openPreferencesDialog(): void {

    this._dialog.open(UserPreferencesComponent, { autoFocus: false });

  }

  protected _setDisablePreferencesBtn(url: string): void {
    this.disablePreferencesBtn = url.includes('/user/preferences');
  }

  ngOnDestroy(): void {
    // //ion
    // this.screenWasChanged.unsubscribe();
    // //
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }

  }

}
