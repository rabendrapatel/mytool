import { ModelSettings, MongooseModelInterfaces, Type } from "@handy/types";
export declare const MongooseModel: <T extends MongooseModelInterfaces>(ModelSettings: ModelSettings<T>) => GenericModelClassDecorator<Type<any>>;
export declare const MongooseMW: (hook: MongooseMiddlewareHooks, type?: MongooseMiddlewareHooksType) => (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(middlewaresThis: any, restArgs: any[]) => Promise<any>>) => void;
export declare type MongooseMiddlewareHooks = 'count' | 'deleteMany' | 'deleteOne' | 'find' | 'findOne' | 'findOneAndDelete' | 'findOneAndRemove' | 'findOneAndUpdate' | 'remove' | 'update' | 'updateOne' | 'updateMany' | 'validate' | 'save' | 'remove' | 'updateOne' | 'deleteOne' | 'insertMany' | 'aggregate';
declare type GenericModelClassDecorator<T> = (target: T) => void;
declare type MongooseMiddlewareHooksType = 'pre' | 'post';
export declare type ModelMiddlewaresHolder = {
    type: MongooseMiddlewareHooksType;
    hook: MongooseMiddlewareHooks;
    method: string;
};
export {};
