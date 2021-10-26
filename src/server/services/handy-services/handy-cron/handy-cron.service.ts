import { DefaultHandyCronService } from "@handy/core/defaults/services/handy-cron/handy-cron.service";
import { Service } from "@handy/core";

@Service({
  singleton: true,
  routable: false,
})
export class HandyCronService extends DefaultHandyCronService {

  constructor() {
    
    super();

  }

}