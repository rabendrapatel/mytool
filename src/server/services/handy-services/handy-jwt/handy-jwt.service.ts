import { DefaultHandyJwtService } from "@handy/core/defaults/services/handy-jwt/default-handy-jwt.service";
import { HandyConfigService, HandyErrorService } from '@services';
import { Service } from "@handy/core";

@Service({
  routable: false
})
export class HandyJwtService extends DefaultHandyJwtService {

  constructor(
    protected config: HandyConfigService,
    protected errorService: HandyErrorService) {
    super(config, errorService);
  }

}