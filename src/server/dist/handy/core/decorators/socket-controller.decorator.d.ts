import { Type, SocketControllerSettings } from "@handy/types";
declare type GenericServiceClassDecorator<T> = (target: T) => void;
export declare const SocketNamespaceController: (socketControllerSettings?: SocketControllerSettings) => GenericServiceClassDecorator<Type<any>>;
export {};
