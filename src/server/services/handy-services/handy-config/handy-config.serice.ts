import { Service } from "@handy/core";
import { DefaultHandyConfigService } from "@handy/core/defaults/services/handy-config/default-handy-config.service";

@Service({ routable: true })
export class HandyConfigService extends DefaultHandyConfigService {

  constructor () {
    super();
  }

}