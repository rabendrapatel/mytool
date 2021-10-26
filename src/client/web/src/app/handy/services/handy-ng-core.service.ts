import { Injectable, Injector } from '@angular/core';
import { DefaultHandyNgCoreService } from '@handy-ng/core/defaults/services/default-handy-ng-core.service';
import { HandyNgConfigService } from './handy-ng-config.service';
import { HandyNgApiService } from './handy-ng-api.service';
import { HandyNgUserService } from './handy-ng-user.service';

@Injectable({ providedIn: 'root' })
export class HandyNgCoreService extends DefaultHandyNgCoreService {

  public static injector: Injector;

  constructor (
    protected _handyNgConfigService: HandyNgConfigService,
    protected _handyNgApiService: HandyNgApiService,
    protected _handyNgUserService: HandyNgUserService,
    protected injector: Injector
  ) {
    super(_handyNgConfigService, _handyNgApiService, _handyNgUserService);
    HandyNgCoreService.injector = injector;
  }
}