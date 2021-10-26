import { Service } from "@handy/core";
import { DefaultHandyPdfService } from "@handy/core/defaults/services/handy-pdf/pdf.service";

@Service({
  singleton: true,
  routable: true,
})
export class HandyPdfService extends DefaultHandyPdfService {

  constructor () {

    super();

  }

}

