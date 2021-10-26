import { HandyNgConfigService } from '@handy-ng/services';

import { HandyNgSocketTree, HandyNgSocket } from '@handy-ng/types';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { io as IO, Socket } from "socket.io-client";

export class DefaultHandyNgSocketService {

  protected _namespacesTree: HandyNgSocketTree = {};
  protected _nameSpacesList: string[] = [];
  protected _severUrl: string;
  protected _isServer: boolean = this._handyNgConfigService.isPlatform('server');

  protected _ACCESS_TOKEN: string;

  constructor (protected _handyNgConfigService: HandyNgConfigService) {

    this._handyNgConfigService.onStateLoaded(() => {

      this._severUrl = this._handyNgConfigService.getProjectDomain();
      this._ACCESS_TOKEN = this._handyNgConfigService.getHANDY_USER_ACCESS_TOKEN();

      this._handyNgConfigService.onConfigChange(() => {
        this._ACCESS_TOKEN = this._handyNgConfigService.getHANDY_USER_ACCESS_TOKEN();
      })

      // Save 

    })

  }

  public getSocket(nameSpace: string = ''): HandyNgSocket {

    if (this._isServer) {

      return this._getEmptySocket();

    } else {

      const connectionName: string = (nameSpace == '' || nameSpace == 'global') ? 'global' : nameSpace;
      nameSpace = (nameSpace == 'global') ? '' : nameSpace;

      if (this._nameSpacesList.includes(connectionName)) {

        return this._namespacesTree[connectionName].socket;

      } else {

        this._nameSpacesList.push(connectionName);
        const socketInstance: Socket = IO(`${this._severUrl}${nameSpace}`,
          {
            query: { accessToken: this._getAccessToken() },
            transports: this._handyNgConfigService.data.socketConnectionType,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
          }
        );

        socketInstance.on('reconnect_attempt', () => {

          socketInstance.io.opts.query = {
            accessToken: this._getAccessToken(),
          }

        });

        let socket: HandyNgSocket = {

          joinRooms: (rooms: string | string[]) => {
            if (typeof rooms == 'string') {
              rooms = [rooms]
            }

            const roomsLen: number = rooms.length;
            for (let i = 0; i < roomsLen; i++) {
              const room: string = rooms[i];

              if (!this._namespacesTree[connectionName].rooms.includes(room)) {
                this._namespacesTree[connectionName].rooms.push(room);
              }
            }

            let event = {
              accessToken: this._getAccessToken(),
              eventData: rooms
            };

            socketInstance.emit('joinRooms', event);

          },

          leaveRooms: (rooms: string | string[]) => {

            if (typeof rooms == 'string') {
              rooms = [rooms]
            }

            let roomsToKeep: string[] = [];

            const connectedRoomsLen: number = this._namespacesTree[connectionName].rooms.length;
            for (let i = 0; i < connectedRoomsLen; i++) {
              const room: string = this._namespacesTree[connectionName].rooms[i];
              if (!rooms.includes(room)) {
                roomsToKeep.push(room)
              }
            }

            this._namespacesTree[connectionName].rooms = roomsToKeep;

            let event = {
              accessToken: this._getAccessToken(),
              eventData: rooms
            };

            socketInstance.emit('leaveRooms', event);

          },

          // 
          leaveNamespace: () => {

            if (connectionName !== 'global') {

              let nspsLen: number = this._nameSpacesList.length;

              for (let i = 0; i < nspsLen; i++) {
                const checked: string = this._nameSpacesList[i];

                if (checked === connectionName) {
                  this._nameSpacesList.splice(i, 1);
                  break;
                }

              }

              socketInstance.emit('leaveNamespace');

              delete this._namespacesTree[connectionName];

            }

          },

          emit: (eventName: string, payLoad?: any) => {

            let event = {
              accessToken: this._getAccessToken(),
              eventData: payLoad
            };

            socketInstance.emit(eventName, event);

          },

          on: <T = any>(eventName: string, debounceTimeMs: number = 0): Observable<T> => {

            let OBS: Observable<T> = Observable.create(observer => {

              socketInstance.on(eventName, socketPayload => {
                observer.next(socketPayload);
              })

            })

            return OBS.pipe(debounceTime(debounceTimeMs));

          },

          once: <T = any>(eventName: string): Observable<T> => {

            return Observable.create(observer => {

              socketInstance.once(eventName, socketPayload => {

                observer.next(socketPayload);
                observer.complete();

              })

            }) as Observable<T>

          }

        };

        this._namespacesTree[connectionName] = {
          socket,
          rooms: [],
          connected: false
        }

        this.handleConnectionStatus(connectionName, this._namespacesTree[connectionName].socket);

        return socket;

      }

    }

  }

  protected handleConnectionStatus(connectionName: string, socket: HandyNgSocket): void {

    socket.on('disconnect').subscribe(() => {
      this._namespacesTree[connectionName].connected = false;
    })

    socket.on('connect').subscribe(() => {

      this._namespacesTree[connectionName].connected = true;

      if (this._namespacesTree[connectionName].rooms.length > 0) {
        socket.joinRooms(this._namespacesTree[connectionName].rooms);
      }

    })

  }

  protected _getAccessToken(): string {
    return this._ACCESS_TOKEN;
  }

  protected _getEmptySocket(): HandyNgSocket {

    let socket: HandyNgSocket = {

      joinRooms: (rooms: string | string[]) => {
        return;
      },

      leaveRooms: (rooms: string | string[]) => {
        return;
      },

      leaveNamespace: () => {
        return;
      },

      emit: (eventName: string, data: any) => {
        return;
      },

      on: (eventName: string) => {

        return Observable.create(observer => {

          observer.complete();

        })

      },

      once: (eventName: string) => {

        return Observable.create(observer => {

          observer.complete();

        })

      }

    };

    return socket;

  }

}