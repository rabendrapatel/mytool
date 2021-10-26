import { Service } from "@handy/core";
import { DefaultHandyFileUploadService } from "@handy/core/defaults/services/handy-file-upload/handy-file-upload.service";

@Service({
  singleton: true,
  routable: true,
})
export class HandyFileUploadService extends DefaultHandyFileUploadService {

  constructor () {

    super();

  }

}