/// <reference types="socket.io" />
import { SocketConnectionAcessRules, HandySocketEventListenerSettings, HandySocket } from './../types/socket-controller';
import { SocketAcessRules, ServerRequestUser } from "@handy/types";
import { HandyConfigService, HandyJwtService, HandyErrorService } from "@services";
export declare class __HandyCoreUtils {
    private config;
    private handyJwtService;
    private handyError;
    constructor(config: HandyConfigService, handyJwtService: HandyJwtService, handyError: HandyErrorService);
    checkSocketAccessRules(socket: SocketIO.Socket, userData: ServerRequestUser, rules?: SocketAcessRules | SocketConnectionAcessRules): boolean;
    checkSocketPublicAccess(socket: SocketIO.Socket, publicAccess?: boolean): boolean;
    isSocketAccessFnTypeValidator(rules?: SocketAcessRules | SocketConnectionAcessRules): boolean;
    attachSocketEventListener(socketInstance: SocketIO.Server, eventListeneSettings: HandySocketEventListenerSettings): void;
    parseEventPayload(socket: SocketIO.Socket): void;
    extendSocketEmitterAndClientListenrs(socketInstance: SocketIO.Server, socket: HandySocket, eventNamespace: string): void;
    disconnectSocketFormNamespace(socket: SocketIO.Socket, nameSpaceName: string): void;
}
