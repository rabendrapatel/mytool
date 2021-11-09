import { HandyNgConfigService } from '@handy-ng/services/handy-ng-config.service';
import { HandyNgApiService } from '@handy-ng/services/handy-ng-api.service';
import { HandyNgModelMethods } from '@handy-ng/extenders/handy-ng-model-extender';
import { HandyNgModel } from '@handy-ng/decorators/handy-ng-model.decorator';

import { Injectable } from '@angular/core';

/* ----------------------------- Model interface ---------------------------- */
import { MydropModelInterfaces } from '@server-models/mydrop/model.interface';

@HandyNgModel({ name: 'mydrop' })
@Injectable({ providedIn: 'root' })
export class MydropNgModel extends HandyNgModelMethods<MydropModelInterfaces> {

  constructor (protected _handyApiService: HandyNgApiService,
    protected _handyNgConfigService: HandyNgConfigService) {

    super(_handyApiService, _handyNgConfigService);

  }

}
