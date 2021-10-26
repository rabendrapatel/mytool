import { DefaultWebAppSocketController } from "@handy/core/defaults/controllers/sockets/default-web-app-socket.controller";
import { SocketNamespaceController } from "@handy/core";
import { NextFn, HandySocket } from "@handy/types";
import { DefaultWebAppRoomsJoiningAccessValidator } from "@handy/core/defaults/validators/socket/default-web-app-rooms-joining.validator";

@SocketNamespaceController({
  namespace: 'web-app',
  connectionRestrictions: {
    publicAccess: true
  },
  roomJoiningRestrictions: {
    accessValidationfn: DefaultWebAppRoomsJoiningAccessValidator
  },
})
export class WebAppSocketController extends DefaultWebAppSocketController {

  constructor () {
    super();
  }

  _rawSocketMiddleware(socket: SocketIO.Socket): void {

    socket.use((packet: SocketIO.Packet, next: NextFn) => {

      socket.request.deviceIdCookie = socket.request.signedCookies[this._handyConfig.get().deviceIdCookieHash];
      return next();

    })

  }

}