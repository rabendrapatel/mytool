/// <reference types="socket.io" />
import { HandyService } from "@services";
export declare class DefaulthandySocketEmitterService extends HandyService {
    private __hasIo;
    protected _io: SocketIO.Server;
    constructor();
    emit(eventName: string, data?: any, namespaceName?: string, rooms?: string[]): void;
    emitToAllClients(eventName: string, data?: any): void;
}
