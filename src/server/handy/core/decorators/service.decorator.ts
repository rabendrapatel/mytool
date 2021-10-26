import { ServiceSettings, Type, InjectionType } from "@handy/types";

type GenericServiceClassDecorator<T> = (target: T) => void;

export const Service = (ServiceSettings: ServiceSettings = {}): GenericServiceClassDecorator<Type<any>> => {

  let { routable = false, singleton = true } = ServiceSettings;

  return (target: Type<any>) => {

    let InjectionType: InjectionType = {
      singleton,
      injectable: true,
      ClassType: 'service'
    }

    target.prototype.InjectionType = InjectionType;
    target.prototype.ServiceSettings = {
      routable,
      singleton
    };

  };

};