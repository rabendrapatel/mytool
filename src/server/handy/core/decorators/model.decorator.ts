import { ModelSettings, MongooseModelInterfaces, Type, InjectionType } from "@handy/types";

const addMiddlewaresHoldersToPrototype = (prototype: any): void => {
  
  if (prototype.middlewares === undefined) {
    
    let emptyMiddlewaresHolder: ModelMiddlewaresHolder[] = [];
    prototype.middlewares = emptyMiddlewaresHolder;

  }

}

const addMiddlewareToPrototype = (method: string, hook: MongooseMiddlewareHooks, type: MongooseMiddlewareHooksType, prototype: any, className: string): void => {

  addMiddlewaresHoldersToPrototype(prototype);
  
  let mwHolder: ModelMiddlewaresHolder = {
    type,
    hook,
    method: `__${className}__${method}`
  }

  prototype.middlewares.push(mwHolder);

}

export const MongooseModel = <T extends MongooseModelInterfaces>(ModelSettings: ModelSettings<T>): GenericModelClassDecorator<Type<any>> => {
  
  return (target: Type<any>) => {
    
    let InjectionType: InjectionType = {
      singleton: true,
      injectable: true,
      ClassType: 'model'
    }

    target.prototype.InjectionType = InjectionType;
    target.prototype.ModelSettings = ModelSettings;

    addMiddlewaresHoldersToPrototype(target.prototype);

  };

};

export const MongooseMW = (hook: MongooseMiddlewareHooks, type: MongooseMiddlewareHooksType = 'pre') => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(middlewaresThis: any, restArgs: any[]) => Promise<any>>) => {

    addMiddlewareToPrototype(methodName, hook, type, target.constructor.prototype, target.constructor.name);

  }

}

export type MongooseMiddlewareHooks = 'count' | 'deleteMany' | 'deleteOne' | 'find' | 'findOne' | 'findOneAndDelete' | 'findOneAndRemove' | 'findOneAndUpdate' | 'remove' | 'update' | 'updateOne' | 'updateMany' | 'validate' | 'save' | 'remove' | 'updateOne' | 'deleteOne' | 'insertMany' | 'aggregate';

type GenericModelClassDecorator<T> = (target: T) => void;
type MongooseMiddlewareHooksType = 'pre' | 'post';

// todo move to db interfaces...
export type ModelMiddlewaresHolder = {
  type: MongooseMiddlewareHooksType,
  hook: MongooseMiddlewareHooks,
  method: string
}