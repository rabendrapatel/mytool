import { SocketConnectionAcessRules, HandySocket } from './../../../../types/socket-controller';
import { HandyErrorService, HandyJwtService, HandyConfigService } from '@services';
import { Inject } from '@handy/core';
import { SocketControllerSettings, SocketAcessRules, NextFn, HandySocketServerEventPayload } from "@handy/types";
import { __HandyCoreUtils } from '@handy/core/core-utils';
import * as cookieParser from 'socket.io-cookie-parser';

export class DefaultHandySocketController {

  private __nameSpaceName: string;
  private __namespaceConnectionRestrictions: SocketConnectionAcessRules;
  private __roomJoiningRestrictions: SocketAcessRules;
  private __defaultRoomsManagement: boolean;
  private __defaultConnectionManagement: boolean;

  protected _namespaceSettings: SocketControllerSettings = <SocketControllerSettings>this.constructor.prototype.SocketControllerSettings;
  protected _ioInstance: SocketIO.Server;
  protected _ioNsp: SocketIO.Namespace;
  protected _handyError: HandyErrorService = Inject(HandyErrorService);
  protected _handyJwtService: HandyJwtService = Inject(HandyJwtService);
  protected _handyConfig: HandyConfigService = Inject(HandyConfigService);
  private __coreUtils: __HandyCoreUtils = Inject(__HandyCoreUtils);

  constructor () {

    this.__parseNamespaceDecoratorSettings();

  }

  private __parseNamespaceDecoratorSettings(): void {

    let {
      namespace = '/',
      connectionRestrictions = {},
      defaultRommsManagement = true,
      roomJoiningRestrictions = {},
      defaultConnectionManagement = true,
    } = this._namespaceSettings;

    this.__nameSpaceName = (namespace.startsWith('/')) ? namespace : `/${namespace}`;
    this.__namespaceConnectionRestrictions = connectionRestrictions;
    this.__defaultRoomsManagement = defaultRommsManagement;
    this.__defaultConnectionManagement = defaultConnectionManagement;
    this.__roomJoiningRestrictions = roomJoiningRestrictions;

  }

  // ? Called from bootstrap...
  private __connectToServer(socketIo: SocketIO.Server): void {

    this._ioInstance = socketIo;
    this._ioNsp = this._ioInstance.of(this.__nameSpaceName);

    this._ioNsp.use(cookieParser.default(this._handyConfig.get().cookieSecret));

    this._ioNsp.on('connection', ((socket: HandySocket) => {
      this._rawSocketMiddleware(socket);

      this.__coreUtils.extendSocketEmitterAndClientListenrs(socketIo, socket, this.__nameSpaceName);
      this.__coreUtils.parseEventPayload(socket);

      this._checkConnectionAccess(socket)
        .then(() => {

          if (this.__defaultConnectionManagement) {
            this.__defaultOnConnectionHandler(socket);
          }


          if (this.__defaultRoomsManagement) {
            this.__roomsManagement(socket);
          }

          this._onConnectionHandler(socket);

        })
        .catch(err => {

          this._handyError.register(err, 'medium', 'Server error');
          this.__coreUtils.disconnectSocketFormNamespace(socket, this.__nameSpaceName);

        })

    }));

  }

  private __roomsManagement(socket: SocketIO.Socket): void {

    let isFnTypeValidator: boolean = this.__coreUtils.isSocketAccessFnTypeValidator(this.__roomJoiningRestrictions);

    if (isFnTypeValidator) {

      socket.use((packet: SocketIO.Packet, next: NextFn) => {

        if (packet[0] === 'joinRooms') {

          this.__roomJoiningRestrictions.accessValidationfn(socket, packet, next);

        } else {
          return next();
        }

      })

    }

    socket.on('joinRooms', (data: HandySocketServerEventPayload) => {

      if (!isFnTypeValidator && !this.__coreUtils.checkSocketAccessRules(socket, data.user, this.__roomJoiningRestrictions)) {
        return;
      }

      socket.join(data.eventData, (err: any) => {

        if (err) {
          this._handyError.register(err, 'medium', 'Server error', undefined, { private: { msg: 'Socket rooms joining error', data } });
        }

      })

    })

    socket.on('leaveRooms', data => {

      socket.leave(data.eventData, (err: any) => {

        if (err) {
          this._handyError.register(err, 'medium', 'Server error', undefined, { private: { msg: 'Socket rooms leaving error', data } });
        }

      })

    })

  }

  private __defaultOnConnectionHandler(socket: SocketIO.Socket): void {

  }

  protected _onConnectionHandler(socket: SocketIO.Socket): void {



  }

  protected _rawSocketMiddleware(socket: SocketIO.Socket): void {


  }

  protected _checkConnectionAccess(socket: SocketIO.Socket): Promise<void> {

    let { accessToken = null } = socket.handshake.query;
    return new Promise((resolve, reject) => {

      if (accessToken === 'undefined' || accessToken === 'null') {
        accessToken = null;
      }

      this._handyJwtService.extractUserDataFormToken(accessToken)
        .then(user => {

          let isFnTypeValidator: boolean = this.__coreUtils.isSocketAccessFnTypeValidator(this.__namespaceConnectionRestrictions);

          if (isFnTypeValidator) {

            this.__namespaceConnectionRestrictions.accessValidationfn(socket, user);

            return resolve();

          }

          if (!isFnTypeValidator && this.__coreUtils.checkSocketAccessRules(socket, user, this.__namespaceConnectionRestrictions)) {
            return resolve();
          }

          return reject(this._handyError.register(null, 'low', 'Forbidden'));

        })
        .catch(err => {

          return reject(this._handyError.register(err, 'medium', 'Server error', undefined, { private: `Error while checking socket connection access` }));

        })

    })

  }

}

