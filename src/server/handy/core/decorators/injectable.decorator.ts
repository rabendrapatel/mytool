import { Type, InjectionType } from "@handy/types/injector";

type GenericInjectableClassDecorator<T> = (target: T) => void;

export const Injectable = (singleton: boolean): GenericInjectableClassDecorator<Type<any>> => {

  let InjectionType: InjectionType = {
    singleton,
    injectable: true,
    ClassType: 'plain'
  };

  return (target: Type<any>) => {

    target.prototype.InjectionType = InjectionType;

  };

};