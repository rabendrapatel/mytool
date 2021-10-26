import { ServerMiddlewareSettings, Type } from "@handy/types";
declare type GenericServiceClassDecorator<T> = (target: T) => void;
export declare const Middleware: (middlewareSettings?: ServerMiddlewareSettings) => GenericServiceClassDecorator<Type<any>>;
export {};
