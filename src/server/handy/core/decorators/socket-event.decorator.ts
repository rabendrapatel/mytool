import { ServerRequestUser, HandySocketEventListenerSettings, HandySocket } from "@handy/types";

const addSocketListenersHoldersToPrototype = (prototype: any): void => {

  if (prototype.__handySocketEventListeners === undefined) {

    let emptySocketListenersPrototypeHolder: HandySocketEventListenerSettings[] = [];
    prototype.__handySocketEventListeners = emptySocketListenersPrototypeHolder;
    prototype.__getSocketEventListeners = (): HandySocketEventListenerSettings[] => {
      return prototype.__handySocketEventListeners;
    }

  }

}

const addSocketEventListenerToPrototype = <T extends HandySocketEventListenerSettings>(method: string, settings: T, prototype: any, className: string): void => {

  addSocketListenersHoldersToPrototype(prototype);

  let automaticSettings: HandySocketEventListenerSettings & { method: string } = {
    eventName: method,
    method
  }

  // if (condition) {
    
  // }

  prototype.__handySocketEventListeners.push({ ...automaticSettings, ...settings});

}


/* ---------------------------- Socket event listeners --------------------------- */

export const OnSocketEvent = (socketEventListener: Omit<HandySocketEventListenerSettings, 'method'> = {}) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(eventData?: any, user?: ServerRequestUser, socket?: HandySocket, rawData?: any) => void>) => {

    addSocketEventListenerToPrototype(methodName, socketEventListener, target.constructor.prototype, target.constructor.name);

  }

} 