import { Type, InjectionType, RouteControllerSettings } from "@handy/types";

type GenericServiceClassDecorator<T> = (target: T) => void;

export const RouteController = (RouteControllerSettings: RouteControllerSettings): GenericServiceClassDecorator<Type<any>> => {

  return (target: Type<any>) => {

    let InjectionType: InjectionType = {
      singleton: true,
      injectable: true,
      ClassType: 'routeController'
    }

    target.prototype.InjectionType = InjectionType;
    target.prototype.RouteControllerSettings = RouteControllerSettings;

  };

};