import { DefaultHandyCsvService } from "@handy/core/defaults/services/handy-csv/handy-csv.service";
import { Service } from "@handy/core";
import { HandyConfigService, HandyErrorService, HandyFileUploadService, HandyUtilsService } from "@services";
import { UploadsModel } from "@models";

@Service()
export class HandyCsvService extends DefaultHandyCsvService {

  constructor (
    protected _handyError: HandyErrorService,
    protected _uploadsModel: UploadsModel,
    protected _uploadsService: HandyFileUploadService,
    protected _utils: HandyUtilsService,
    protected _config: HandyConfigService) {

    super(_handyError, _uploadsModel, _uploadsService, _utils, _config);

  }

}