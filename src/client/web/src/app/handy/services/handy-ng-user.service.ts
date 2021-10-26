import { HandyNgSocketService } from './handy-ng-socket.service';
import { Injectable } from '@angular/core';
import { DefaultHandyNgUserService } from '@handy-ng/core/defaults/services/default-handy-ng-user.service';
import { HandyNgConfigService } from './handy-ng-config.service';
import { HandyNgApiService } from './handy-ng-api.service';
import { UserNgModel } from '@handy-ng/models/user.ng-model';
import { Router } from '@angular/router';
import { HandyNgUserNotificationService } from './handy-ng-user-notification.service';
import { HandyNgUtilsService } from './handy-ng-utils.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HandyNgUserService extends DefaultHandyNgUserService {

  constructor (
    protected _handyNgConfigService: HandyNgConfigService,
    protected _handyngApiService: HandyNgApiService,
    protected _userModel: UserNgModel,
    protected _handyNgSocketService: HandyNgSocketService,
    protected _handyNgUtilsService: HandyNgUtilsService,
    public notify: HandyNgUserNotificationService,
    protected _router: Router) {

    super(_handyNgConfigService, _handyngApiService, _userModel, _handyNgSocketService, _handyNgUtilsService, notify, _router);

  }


}
