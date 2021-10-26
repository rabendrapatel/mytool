import { Type } from "@handy/types/injector";
export interface handyModuleSettings {
    preBoot?: Type<any>[];
    imports?: Type<any>[];
}
declare type GenericHandyModuleClassDecorator<T> = (target: T) => void;
export declare const HandyModule: (handyModuleSettings?: handyModuleSettings) => GenericHandyModuleClassDecorator<Type<any>>;
export {};
