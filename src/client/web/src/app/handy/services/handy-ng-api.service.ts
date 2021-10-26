import { HandyNgConfigService } from './handy-ng-config.service';
import { Injectable } from '@angular/core';
import { DefaultHandyNgApiService } from '@handy-ng/core/defaults/services/default-handy-ng-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HandyNgApiService extends DefaultHandyNgApiService {

  constructor (
    protected _handyNgConfigService: HandyNgConfigService,
    protected _httpClient: HttpClient
    ) { 

    super(_handyNgConfigService, _httpClient);

  }
  
}
