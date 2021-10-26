"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaulthandySocketEmitterService = void 0;
const _services_1 = require("@services");
class DefaulthandySocketEmitterService extends _services_1.HandyService {
    constructor() {
        super();
        this.__hasIo = false;
        this.constructor.prototype.__isHandySocketEmitter = true;
        this.constructor.prototype.__attachIoInstance = (ioInstance) => {
            this._io = ioInstance;
            this.__hasIo = true;
        };
    }
    emit(eventName, data, namespaceName = '/', rooms = []) {
        if (!this.__hasIo) {
            return;
        }
        if (!namespaceName.startsWith('/')) {
            namespaceName = `/${namespaceName}`;
        }
        let rommsLen = rooms.length;
        let nsp = this._io.of(namespaceName);
        for (let i = 0; i < rommsLen; i++) {
            const singleRoom = rooms[i];
            nsp = nsp.to(singleRoom);
        }
        nsp.emit(eventName, data);
        return;
    }
    emitToAllClients(eventName, data) {
        this._io.emit(eventName, data);
    }
}
exports.DefaulthandySocketEmitterService = DefaulthandySocketEmitterService;
//# sourceMappingURL=default-handy-socket-emitter.service.js.map