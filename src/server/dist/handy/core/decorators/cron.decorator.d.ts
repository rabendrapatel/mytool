import { CronIntervalSettings, CronSchedulerSettings } from "@handy/types";
export declare const CronInterval: (intervalSettings: CronIntervalSettings) => (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(executionMoment: Date) => void>) => void;
export declare const CronScheduler: (schedulerSettings: CronSchedulerSettings) => (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(executionMoment: Date) => void>) => void;
