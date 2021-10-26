import { Type, InjectionType, SocketControllerSettings } from "@handy/types";

type GenericServiceClassDecorator<T> = (target: T) => void;

export const SocketNamespaceController = (socketControllerSettings: SocketControllerSettings = {}): GenericServiceClassDecorator<Type<any>> => {

  return (target: Type<any>) => {

    let InjectionType: InjectionType = {
      singleton: true,
      injectable: true,
      ClassType: 'socketController'
    }

    if (isNullOrUndefined(socketControllerSettings.namespace)) {
      socketControllerSettings.namespace = '/';
    }
    
    if (isNullOrUndefined(socketControllerSettings.routable)) {
      socketControllerSettings.routable = false;
    }

    target.prototype.InjectionType = InjectionType;
    target.prototype.SocketControllerSettings = socketControllerSettings;

  }; 

};