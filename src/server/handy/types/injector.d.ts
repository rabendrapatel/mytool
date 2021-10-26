export type ClassType = 'service' | 'model' | 'routeController' | 'socketController' | 'module' | 'plain' | 'middleware';

export interface InjectionType {
  singleton: boolean,
  injectable: boolean,
  ClassType: ClassType
}

export interface Type<T> {
  new(...args: any[]): T
}