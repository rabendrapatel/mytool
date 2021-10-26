import { Type } from "@handy/types/injector";
declare type GenericInjectableClassDecorator<T> = (target: T) => void;
export declare const Injectable: (singleton: boolean) => GenericInjectableClassDecorator<Type<any>>;
export {};
