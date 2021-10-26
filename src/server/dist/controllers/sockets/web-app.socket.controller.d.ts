/// <reference types="socket.io" />
import { DefaultWebAppSocketController } from "@handy/core/defaults/controllers/sockets/default-web-app-socket.controller";
export declare class WebAppSocketController extends DefaultWebAppSocketController {
    constructor();
    _rawSocketMiddleware(socket: SocketIO.Socket): void;
}
