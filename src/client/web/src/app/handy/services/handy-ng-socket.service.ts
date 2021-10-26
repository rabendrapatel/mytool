import { DefaultHandyNgSocketService } from '@handy-ng/core/defaults/services/default-handy-ng-socket.service';
import { HandyNgConfigService } from './handy-ng-config.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HandyNgSocketService extends DefaultHandyNgSocketService {

  constructor(protected _handyNgConfigService: HandyNgConfigService) {
    super(_handyNgConfigService);
  }

}