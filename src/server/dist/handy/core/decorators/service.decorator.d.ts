import { ServiceSettings, Type } from "@handy/types";
declare type GenericServiceClassDecorator<T> = (target: T) => void;
export declare const Service: (ServiceSettings?: ServiceSettings) => GenericServiceClassDecorator<Type<any>>;
export {};
