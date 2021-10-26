import { HandyService } from "@services";

export class DefaulthandySocketEmitterService extends HandyService {

  private __hasIo: boolean = false;

  protected _io: SocketIO.Server;

  constructor () {
    super();

    this.constructor.prototype.__isHandySocketEmitter = true;
    this.constructor.prototype.__attachIoInstance = (ioInstance: SocketIO.Server) => {
      this._io = ioInstance;
      this.__hasIo = true;
    }

  }

  public emit(eventName: string, data?: any, namespaceName: string = '/', rooms: string[] = []): void {

    if (!this.__hasIo) {
      return;
    }

    if (!namespaceName.startsWith('/')) {
      namespaceName = `/${namespaceName}`;
    }

    let rommsLen: number = rooms.length;
    let nsp: SocketIO.Namespace = this._io.of(namespaceName);

    for (let i = 0; i < rommsLen; i++) {

      const singleRoom = rooms[i];
      nsp = nsp.to(singleRoom);

    }

    nsp.emit(eventName, data);
    return;

  }

  public emitToAllClients(eventName: string, data?: any): void {

    this._io.emit(eventName, data);

  }


}