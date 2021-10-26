import { HandyBootstrap } from '@handy/core';
import { HandyModule } from "@handy/core";
import { HandyErrorService, HandyConfigService, DropService } from "@services";

import { HandyCoreModule } from '@handy/handy-core.module';
import { UserModel } from '@models/user';
import { DropModel } from '@models';

@HandyModule({
  // Basically prebuild services that are essential to run first...
  preBoot: [
    HandyConfigService, // Has to be first
    HandyErrorService,
  ],
  imports: [
    HandyCoreModule,
    UserModel,
    DropModel,
    DropService
  ]
})
export class HandyServer {}

HandyBootstrap.loadRootModule(HandyServer);