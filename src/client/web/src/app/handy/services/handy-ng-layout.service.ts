import { DOCUMENT } from '@angular/common';
import { Injectable, Inject, RendererFactory2 } from '@angular/core';
import { DefaultHandyNgLayoutService } from '@handy-ng/core/defaults/services/default-handy-ng-layout.service';
import { HandyNgConfigService } from './handy-ng-config.service';
import { HandyNgUserService } from './handy-ng-user.service';
import { HandyNgTrackingService } from './handy-ng-tracking.service';
import { Platform } from '@angular/cdk/platform';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HandyNgLayoutService extends DefaultHandyNgLayoutService {

  constructor (
    protected _titleService: Title,
    protected _metaService: Meta,
    protected _handyNgConfigService: HandyNgConfigService, 
    protected _handyNgUserService: HandyNgUserService, 
    @Inject(DOCUMENT) protected _document, 
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) protected _defaultSnackBarOptions: MatSnackBarConfig,
    protected _rendererFactory: RendererFactory2,
    protected _devicePlatform: Platform,
    protected _breakpointObserver: BreakpointObserver,
    protected _trackingService: HandyNgTrackingService,
    protected _router: Router) {

    super(_titleService, _metaService, _handyNgConfigService, _handyNgUserService, _document, _defaultSnackBarOptions, _rendererFactory, _devicePlatform, _breakpointObserver, _trackingService, _router);

  }

}

export { setRouteTitle, RouteTitleData } from '@handy-ng/core/defaults/services/default-handy-ng-layout.service';