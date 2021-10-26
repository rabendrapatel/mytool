//! leave here theese only
declare type EnvType = 'dev' | 'stag' | 'prod';

type HandyGlobalEventObserverFn = (eventData: { eventName: string, data?: any, triggerWorker: number }) => void;

declare module NodeJS {
  interface Global {
    handyErrLog: (msg: any) => void,
    handyWarnLog: (msg: any) => void,
    handySuccessLog: (msg: any) => void,
    isArray(value: any): boolean,
    isUndefined(value: any): boolean,
    isNotUndefined(value: any): boolean,
    isNull(value: any): boolean,
    isNotNull(value: any): boolean,
    isNullOrUndefined(val: any): boolean,
    isNotNullOrUndefined(val: any): boolean,
    isEmptyObject(val: Object): boolean,
    isNotEmptyObject(val: Object): boolean,
    isEmpty(value: any): boolean,
    isNotEmpty(val: any): boolean,
    __env: EnvType,
    __behaviorEventPrefix: string,
    __isDev: boolean,
    __isProd: boolean,
    __isStag: boolean,
    __isMasterCluster: boolean,
    __coresCount: number,
    __rootDir: string,
    __distDir: string,
    __handyWorkerId: number,
    triggerGlobalServerEvent(name: string, includeThisCluster: boolean, data?: any): void,
    gLobalServerEvent: {
      subscribe(globalEvent: (eventData: { eventName: string, data?: any, triggerWorker: number }) => void): {
        unsubscribe(): void
      }
    }
  }
}

declare function handyErrLog(msg: any): void;
declare function handyWarnLog(msg: any): void;
declare function handySuccessLog(msg: any): void;
declare function isArray(value: any): boolean;

declare function isUndefined(value: any): boolean;
declare function isNotUndefined(value: any): boolean;

declare function isNull(value: any): boolean;
declare function isNotNull(value: any): boolean;

declare function isNullOrUndefined(value: any): boolean;
declare function isNotNullOrUndefined(value: any): boolean;

declare function isEmptyObject(value: Object): boolean;
declare function isNotEmptyObject(value: Object): boolean;

declare function triggerGlobalServerEvent(name: string, includeThisCluster: boolean, data?: any): void

/**
 * isEmpty
 * @param value @type any
 * 
 * @returns true if value is NULL, UNDEFINED, EMPTY STRING - '', EMPTY ARRAY - [] or EMPTY OBJECT - {}  
 */
declare function isEmpty(value: any): boolean;

/**
 * isNotEmpty
 * @param value @type any
 *
 * @returns false if value is NULL, UNDEFINED, EMPTY STRING - '', EMPTY ARRAY - [] or EMPTY OBJECT - {}
 */
declare function isNotEmpty(value: any): boolean;

declare var __behaviorEventPrefix: string;
declare var __env: EnvType;
declare var __isDev: boolean;
declare var __isProd: boolean;
declare var __isStag: boolean;
declare var __isMasterCluster: boolean;
declare var __coresCount: number;
declare var __rootDir: string;
declare var __distDir: string;
declare var __handyWorkerId: number;
declare var gLobalServerEvent: {
  subscribe(globalEvent: (eventData: { eventName: string, data?: any, triggerWorker: number }) => void): {
    unsubscribe(): void
  }
}


interface String {
  UcFirst(): string,
  LcFirst(): string,
  // startsWith(prefix: string): boolean,
  // endsWith(sufix: string): boolean,
}

