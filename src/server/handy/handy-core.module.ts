import { HandyModule } from "./core";
import { HandyMiddleware, HandyErrorMiddleware, ClientServingMiddleware } from "@middlewares";
import { HandyMailerService, HandyUtilsService, HandyJwtService, HandySocketEmitter, HandyCronService, HandyUserService, HandyShortlinkService, HandyFileUploadService, HandyCsvService } from "@services";
import { WebAppSocketController } from "@socketControllers/web-app.socket.controller";
import { ShortlinkModel, UploadsModel } from "@models";
import { FileRouteController, ShortlinkRouteController } from "@routeControllers";
import { HandyPdfService } from "@services/handy-services/handy-pdf/pdf.service";
import { HandyTrackingService } from "@services/handy-services/handy-tracking/handy-tracking.service";

@HandyModule({
  imports: [
    HandyMiddleware,
    HandyErrorMiddleware,
    ClientServingMiddleware,
    HandyMailerService,
    HandyUtilsService,
    HandyJwtService,
    WebAppSocketController,
    HandySocketEmitter,
    HandyCronService,
    HandyUserService,
    ShortlinkModel,
    HandyShortlinkService,
    ShortlinkRouteController,
    HandyFileUploadService,
    UploadsModel,
    FileRouteController,
    HandyPdfService,
    HandyTrackingService,
    HandyCsvService
  ]
})
export class HandyCoreModule {}