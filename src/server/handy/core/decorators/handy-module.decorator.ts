import { Type, InjectionType } from "@handy/types/injector";

export interface handyModuleSettings {
  preBoot?: Type<any>[],
  imports?: Type<any>[],
}

type GenericHandyModuleClassDecorator<T> = (target: T) => void;

export const HandyModule = (handyModuleSettings: handyModuleSettings = {}): GenericHandyModuleClassDecorator<Type<any>> => {

  let { imports = [], preBoot = [] } = handyModuleSettings;

  return (target: Type<any>) => {

    let InjectionType: InjectionType = {
      singleton: true,
      injectable: true,
      ClassType: 'module'
    }

    target.prototype.InjectionType = InjectionType;
    target.prototype.handyModuleSettings = {
      imports,
      preBoot,
    };

    target.prototype.getImports = (): Type<any>[] => {

      return target.prototype.handyModuleSettings.imports;

    }
    
    target.prototype.getPreboot = (): Type<any>[] => {

      return target.prototype.handyModuleSettings.preBoot;

    }

  };

};

