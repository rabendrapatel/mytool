import { DefaultHandyErrorService } from "@handy/core/defaults/services/handy-error/default-handy-error.service";
import { Service } from "@handy/core";

@Service()
export class HandyErrorService extends DefaultHandyErrorService {

  constructor() {
    super();
  }

}