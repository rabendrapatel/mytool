import { DefaultHandyNgConfigService } from './../core/defaults/services/default-handy-ng-config.service';
import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';
import { HandyNgUtilsService } from './handy-ng-utils.service';

@Injectable({ providedIn: 'root' })
export class HandyNgConfigService extends DefaultHandyNgConfigService {

  constructor (
    protected _handyNgUtilsService: HandyNgUtilsService,
    protected _transferState: TransferState,
    protected _injector: Injector,
    @Inject(PLATFORM_ID) _platformId: string,
    protected _httpClient: HttpClient) {

    super(_handyNgUtilsService, _transferState, _injector, _platformId, _httpClient);

  }


}

