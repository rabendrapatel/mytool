import { HandyConfigService, HandyErrorService } from '@services';
import { DefaultHandyMailerService } from "@handy/core/defaults/services/handy-mailer/default-handy-mailer.service";
import { Service } from "@handy/core";

@Service({
  routable: false
})
export class HandyMailerService extends DefaultHandyMailerService {

  constructor(protected config: HandyConfigService, protected errorService: HandyErrorService) {
    super(config, errorService);
  }

}