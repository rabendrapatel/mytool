import { HandyNgModelDecoratorSettings } from '@handy-ng/types';

export type Constructor<T = object> = new (...args: any[]) => T;

export const DefaultHandyNgModel = <C extends Constructor>(settings: HandyNgModelDecoratorSettings) => {

  return (target: C) => {

    target.prototype.__handyNgModelSettings = settings;

  };

}