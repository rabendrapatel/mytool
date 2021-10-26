import { Service } from "@handy/core";
import { DefaultHandyTrackingService } from "@handy/core/defaults/services/handy-tracking/default-handy-tracking.service";
import { HandyConfigService } from "../handy-config/handy-config.serice";
import { HandyErrorService } from "../handy-error/handy-error.service";
import { HandyExternalApiService } from "../handy-external-api/handy-external-api.service";

@Service({
  routable: true,
  singleton: true
})
export class HandyTrackingService extends DefaultHandyTrackingService {

  constructor (protected _config: HandyConfigService, protected _externalApi: HandyExternalApiService, protected _handyErrorService: HandyErrorService) {
    super(_config, _externalApi, _handyErrorService);    
  }
  
}