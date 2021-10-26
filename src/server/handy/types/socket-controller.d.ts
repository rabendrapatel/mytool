import { SingleOrArrayCombo, UserGroup, AdditionalAccessPermission, ServerRequestUser } from '@handy/types';
import { NextFn } from './handy';
import { UserRole } from './client-shared-types';
import '@types/socket.io';

export type SocketMiddlewareFn = (socket: SocketIO.Socket, packet: SocketIO.Packet, next: NextFn) => void;
export type SocketConnectionFn = (socket: SocketIO.Socket, user: ServerRequestUser) => void;

export type SocketAcessRules = {
  roles?: SingleOrArrayCombo<UserRole>,
  groups?: SingleOrArrayCombo<UserGroup>,
  permissions?: SingleOrArrayCombo<AdditionalAccessPermission>,
  accessValidationfn?: SocketMiddlewareFn,
  publicAccess?: boolean,
};

export type SocketConnectionAcessRules = {
  roles?: SingleOrArrayCombo<UserRole>,
  groups?: SingleOrArrayCombo<UserGroup>,
  permissions?: SingleOrArrayCombo<AdditionalAccessPermission>,
  accessValidationfn?: SocketConnectionFn,
  publicAccess?: boolean
};

export interface SocketControllerSettings {
  namespace?: string,
  connectionRestrictions?: SocketConnectionAcessRules,
  roomJoiningRestrictions?: SocketAcessRules,
  defaultRommsManagement?: boolean,
  defaultConnectionManagement?: boolean,
  routable?: boolean,
  env?: SingleOrArrayCombo<EnvType>
}

export interface HandySocketServerEventPayload {

  eventData: any,
  rawData: any,
  user: ServerRequestUser

}

export interface HandySocketClientEventPayload {

  eventData?: any,
  accessToken?: string

}

export interface HandySocketEventListenerSettings {
  eventName?: string,
  namespace?: string,
  accessRules?: SocketAcessRules,
  method?: any,
  env?: SingleOrArrayCombo<EnvType>
}

export interface HandySocket extends SocketIO.Socket {

  isHandyExtended: boolean;
  emitBackToSender(eventName: string, data?: any): void,
  emitToEveryoneExcludingSender(eventName: string, rooms?: string[], data?: any): void,
  emitToEveryoneIncludingSender(eventName: string, rooms?: string[], data?: any): void,
  emitToExternalNamespace(namespace: string, eventName: string, rooms?: string[], data?: any): void,
  emitToAllConnectedClients(eventName: string, data?: any): void

}