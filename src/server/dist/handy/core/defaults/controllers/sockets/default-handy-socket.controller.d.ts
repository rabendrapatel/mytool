/// <reference types="socket.io" />
import { HandyErrorService, HandyJwtService, HandyConfigService } from '@services';
import { SocketControllerSettings } from "@handy/types";
export declare class DefaultHandySocketController {
    private __nameSpaceName;
    private __namespaceConnectionRestrictions;
    private __roomJoiningRestrictions;
    private __defaultRoomsManagement;
    private __defaultConnectionManagement;
    protected _namespaceSettings: SocketControllerSettings;
    protected _ioInstance: SocketIO.Server;
    protected _ioNsp: SocketIO.Namespace;
    protected _handyError: HandyErrorService;
    protected _handyJwtService: HandyJwtService;
    protected _handyConfig: HandyConfigService;
    private __coreUtils;
    constructor();
    private __parseNamespaceDecoratorSettings;
    private __connectToServer;
    private __roomsManagement;
    private __defaultOnConnectionHandler;
    protected _onConnectionHandler(socket: SocketIO.Socket): void;
    protected _rawSocketMiddleware(socket: SocketIO.Socket): void;
    protected _checkConnectionAccess(socket: SocketIO.Socket): Promise<void>;
}
