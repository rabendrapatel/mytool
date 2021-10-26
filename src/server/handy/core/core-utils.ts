import { SocketConnectionAcessRules, HandySocketEventListenerSettings, HandySocketServerEventPayload, HandySocketClientEventPayload, HandySocket } from './../types/socket-controller';
import { Injectable } from "./decorators";
import { SocketAcessRules, ServerRequestUser, NextFn } from "@handy/types";
import { HandyConfigService, HandyJwtService, HandyErrorService } from "@services";


@Injectable(true)
export class __HandyCoreUtils {

  constructor (private config: HandyConfigService, private handyJwtService: HandyJwtService, private handyError: HandyErrorService) {

  }

  public checkSocketAccessRules(socket: SocketIO.Socket, userData: ServerRequestUser, rules: SocketAcessRules | SocketConnectionAcessRules = {}): boolean {

    if (this.isSocketAccessFnTypeValidator(rules)) {
      return true;
    }

    if (isEmpty(rules)) {
      return true;
    }

    let { groups = [], permissions = [], publicAccess, roles = [] } = rules;

    let groupsLen: number = groups.length;
    let permissionsLen: number = permissions.length;
    let rolesLen: number = roles.length;

    if (!this.checkSocketPublicAccess(socket, publicAccess)) {
      return false;
    }

    let hasGroupsOrpermissionsRules: boolean = groupsLen > 0 || permissionsLen > 0 || rolesLen > 0;

    if (!userData.loggedIn && hasGroupsOrpermissionsRules) {
      return false;
    }

    if (!hasGroupsOrpermissionsRules) {
      return true;
    }

    if (groupsLen > 0 && userData.isMemberOfGroupTypes(groups)) {
      return true;
    }

    if (permissionsLen > 0 && userData.hasPermissions(permissions)) {
      return true;
    }

    if (rolesLen > 0 && userData.hasRoles(roles)) {
      return true;
    }

    return false;

  }

  public checkSocketPublicAccess(socket: SocketIO.Socket, publicAccess: boolean = this.config.get().publicRoutingByDefault): boolean {

    if (publicAccess) {
      return true;
    }

    // !Check if this one works correctly
    return socket.handshake.headers.host === this.config.get().domain;

  }

  public isSocketAccessFnTypeValidator(rules: SocketAcessRules | SocketConnectionAcessRules = {}): boolean {
    return isNotNullOrUndefined(rules.accessValidationfn);
  }

  public attachSocketEventListener(socketInstance: SocketIO.Server, eventListeneSettings: HandySocketEventListenerSettings) {

    let { eventName, namespace, accessRules, method, env = __env } = eventListeneSettings;

    if (!env.includes(__env)) {
      return;
    }

    socketInstance.of(namespace).on('connection', (socket: HandySocket) => {

      this.extendSocketEmitterAndClientListenrs(socketInstance, socket, namespace);
      this.parseEventPayload(socket);

      let hasFunctionTypeAccessvalidator: boolean = this.isSocketAccessFnTypeValidator(accessRules);

      if (hasFunctionTypeAccessvalidator) {

        socket.use((packet, next) => {

          if (packet[0] === eventName) {

            accessRules.accessValidationfn(socket, packet, next);

          } else {
            return next();
          }

        })

      }

      socket.on(eventName, (data: HandySocketServerEventPayload) => {

        if (!hasFunctionTypeAccessvalidator && !this.checkSocketAccessRules(socket, data.user, accessRules)) {
          return;
        }

        method(data.eventData, data.user, socket, data.rawData);
        return;

      })

    })

  }

  public parseEventPayload(socket: SocketIO.Socket): void {

    socket.use((packet: SocketIO.Packet, next: NextFn) => {

      let originalPacaketData: HandySocketClientEventPayload = packet[1];
      let packetdataKeys: string[] = Object.keys(originalPacaketData);

      if (packetdataKeys.includes('rawData') && packetdataKeys.includes('user')) {
        return next();
      }

      this.handyJwtService.extractUserDataFormToken(originalPacaketData.accessToken)
        .then(user => {

          // ! Parse user data from token
          let newSocketpayload: HandySocketServerEventPayload = {
            eventData: originalPacaketData.eventData,
            rawData: originalPacaketData,
            user
          }

          packet[1] = newSocketpayload;

          return next();

        })
        .catch(err => {

          return next(this.handyError.register(err, 'medium', 'Server error', undefined, { private: 'Error while parsing user data' }));

        })

    })

  }

  public extendSocketEmitterAndClientListenrs(socketInstance: SocketIO.Server, socket: HandySocket, eventNamespace: string): void {

    if (socket.isHandyExtended === true) {
      return;
    }

    socket.on('leaveNamespace', () => {

      this.disconnectSocketFormNamespace(socket, eventNamespace);

    })

    socket.emitBackToSender = (eventName: string, data: any) => {
      socket.emit(eventName, data);
    }

    socket.emitToEveryoneExcludingSender = (eventName: string, rooms: string[] = [], data?: any) => {

      let rommsLen: number = rooms.length;
      if (rommsLen === 0) {
        socket.broadcast.emit(eventName, data);
        return;
      }

      // for (let i = 0; i < rommsLen; i++) {
      //   const singleRoom = rooms[i];
      //   socket = socket.to(singleRoom) as any;
      //   todo original socket.to(singleRoom) as any;
      // }

      // todo check if not working, 

      socket.to(rooms as any).emit(eventName, data);
      return;

    }

    socket.emitToEveryoneIncludingSender = (eventName: string, rooms: string[] = [], data?: any) => {

      let rommsLen: number = rooms.length;
      let nsp: SocketIO.Namespace = socketInstance.of(eventNamespace);

      for (let i = 0; i < rommsLen; i++) {
        const singleRoom = rooms[i];
        nsp = nsp.to(singleRoom);
      }

      nsp.emit(eventName, data);
      return;

    }

    socket.emitToExternalNamespace = (namespaceName: string, eventName: string, rooms: string[] = [], data?: any) => {

      let rommsLen: number = rooms.length;
      let nsp: SocketIO.Namespace = socketInstance.of(namespaceName);

      for (let i = 0; i < rommsLen; i++) {
        const singleRoom = rooms[i];
        nsp = nsp.to(singleRoom);
      }

      nsp.emit(eventName, data);
      return;

    }

    socket.emitToAllConnectedClients = (eventName: string, data?: any) => {

      socketInstance.emit(eventName, data);

    }

    socket.isHandyExtended = true;

  }

  public disconnectSocketFormNamespace(socket: SocketIO.Socket, nameSpaceName: string): void {

    if (nameSpaceName !== '/') {
      socket.disconnect(false);
    }

    return;

  }

}

