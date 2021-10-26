import { HandyTimeObject, SingleOrArrayCombo, CronType, CronIntervalSettings, CronSchedulerSettings, CronsHolderSetting } from "@handy/types"

const addCronToPrototype = (cronType: CronType, cronSettings: CronIntervalSettings | CronSchedulerSettings, methodName: string, classDescriptor: any): void => {

  if (isEmpty(classDescriptor.constructor.prototype.__cronsHolder)) {
    classDescriptor.constructor.prototype.__cronsHolder = [];
  }

  let cronHolderSetting: CronsHolderSetting = {
    methodName,
    cronType,
    cronSettings 
  }

  classDescriptor.constructor.prototype.__cronsHolder.push(cronHolderSetting);
  classDescriptor.constructor.prototype.__getDecoratedCrons = (): CronsHolderSetting[] => {

    return classDescriptor.constructor.prototype.__cronsHolder;

  }

}

export const CronInterval = (intervalSettings: CronIntervalSettings) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(executionMoment: Date) => void>) => {
    addCronToPrototype('interval', intervalSettings, methodName, target);
  }

}

export const CronScheduler = (schedulerSettings: CronSchedulerSettings) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(executionMoment: Date) => void>) => {
    addCronToPrototype('schedule', schedulerSettings, methodName, target);
  }
  
}

