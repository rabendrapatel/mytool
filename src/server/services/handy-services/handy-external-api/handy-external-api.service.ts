import { DefaultHandyExternalApiService } from "@handy/core/defaults/services/external-api/default-handy-extenrat-api.service";
import { Service } from "@handy/core";

@Service({
  singleton: false,
  routable: false
})
export class HandyExternalApiService extends DefaultHandyExternalApiService {

  constructor() {
    super();
  }

} 