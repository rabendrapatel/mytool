import { ServerMiddlewareSettings, Type, InjectionType } from "@handy/types";

type GenericServiceClassDecorator<T> = (target: T) => void;

export const Middleware = (middlewareSettings: ServerMiddlewareSettings = {}): GenericServiceClassDecorator<Type<any>> => {

  let { errorMiddleware = false, clientServingMiddleware = false } = middlewareSettings;

  return (target: Type<any>) => {

    let InjectionType: InjectionType = {
      singleton: true,
      injectable: true,
      ClassType: 'middleware'
    }

    target.prototype.InjectionType = InjectionType;
    target.prototype.middlewareSettings = { 
      errorMiddleware,
      clientServingMiddleware
    };

  };

};

