import { Service } from "@handy/core";
import { DefaultShortlinkService } from "@handy/core/defaults/services/handy-shortlink/handy-shotlink";

@Service({
  singleton: true,
  routable: true,
})
export class HandyShortlinkService extends DefaultShortlinkService {

  constructor () {

    super();

  }

}