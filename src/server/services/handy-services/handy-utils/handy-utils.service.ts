import { HandyErrorService } from '@services';
import { DefaultHandyUtilsService } from "@handy/core/defaults/services/handy-utils/default-handy-utils.service";
import { Service } from '@handy/core';

@Service({
  routable: false,
})
export class HandyUtilsService extends DefaultHandyUtilsService {

  constructor (protected errorService: HandyErrorService) {
    super(errorService);
  }

}