import { Type, RouteControllerSettings } from "@handy/types";
declare type GenericServiceClassDecorator<T> = (target: T) => void;
export declare const RouteController: (RouteControllerSettings: RouteControllerSettings) => GenericServiceClassDecorator<Type<any>>;
export {};
