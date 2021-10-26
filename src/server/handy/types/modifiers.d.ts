import { Constructor } from '@handy/types';

/* ------------------- Just an object with any properties ------------------- */
export type SingleOrArrayCombo<UnionType> = UnionType | UnionType[];

/* -------------------- Restricts array to certain length ------------------- */
export interface FixedLengthArray<T extends any, L extends number> extends Array<T> {
  0: T;
  length: L;
}

/* ---------------------- Filtering based on condition ---------------------- */
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]:
  Base[Key] extends Condition ? Key : never
};

export type AllowedPropsNames<T, Condition> = FilterFlags<T, Condition>[keyof T];

/* --------------- Filtering based on optional/required props --------------- */
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];
export type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];

/* -------- Making class callable without the need to use new keyword ------- */
type ConstructorArgs<TConstructor extends Constructor> =
  TConstructor extends new (...args: infer TArgs) => any ? TArgs : never;

type ConstructorClass<TConstructor extends Constructor> =
  TConstructor extends new (...args: Array<any>) => infer TClass ? TClass : never;

  type CallableConstructor<TConstructor extends Constructor> =
  TConstructor & ((...args: ConstructorArgs<TConstructor>) => ConstructorClass<TConstructor>);

export type ArrayOrUnionToUnion<T> = T extends Array<infer U> ? U : T;