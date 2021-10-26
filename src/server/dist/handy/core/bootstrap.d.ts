import { Type } from "@handy/types";
declare class HandyBootstrapClass {
    private preboot;
    private prebootLen;
    constructor();
    loadRootModule(RootModule: Type<any>): void;
    private extractModuleImports;
    private extractClassTypeFromDeclarationOrInstance;
}
export declare const HandyBootstrap: HandyBootstrapClass;
export {};
