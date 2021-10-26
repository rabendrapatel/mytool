import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultHandyNgTrackingService } from '../core/defaults/services/default-handy-ng-tracking.service';
import { HandyNgApiService } from './handy-ng-api.service';
import { HandyNgConfigService } from './handy-ng-config.service';
import { HandyNgUserService } from './handy-ng-user.service';

@Injectable({
  providedIn: 'root'
})
export class HandyNgTrackingService extends DefaultHandyNgTrackingService {

  constructor(
    @Inject(DOCUMENT) protected _document,
    protected _handyNgConfigService: HandyNgConfigService,
    protected _rendererFactory: RendererFactory2,
    protected _userService: HandyNgUserService,
    protected _apiService: HandyNgApiService,
    protected _router: Router
  ) {

    super(_document, _handyNgConfigService, _rendererFactory, _userService, _apiService, _router);
    
  }

}