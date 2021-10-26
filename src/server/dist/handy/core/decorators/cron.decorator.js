"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronScheduler = exports.CronInterval = void 0;
const addCronToPrototype = (cronType, cronSettings, methodName, classDescriptor) => {
    if (isEmpty(classDescriptor.constructor.prototype.__cronsHolder)) {
        classDescriptor.constructor.prototype.__cronsHolder = [];
    }
    let cronHolderSetting = {
        methodName,
        cronType,
        cronSettings
    };
    classDescriptor.constructor.prototype.__cronsHolder.push(cronHolderSetting);
    classDescriptor.constructor.prototype.__getDecoratedCrons = () => {
        return classDescriptor.constructor.prototype.__cronsHolder;
    };
};
const CronInterval = (intervalSettings) => {
    return (target, methodName, descriptor) => {
        addCronToPrototype('interval', intervalSettings, methodName, target);
    };
};
exports.CronInterval = CronInterval;
const CronScheduler = (schedulerSettings) => {
    return (target, methodName, descriptor) => {
        addCronToPrototype('schedule', schedulerSettings, methodName, target);
    };
};
exports.CronScheduler = CronScheduler;
//# sourceMappingURL=cron.decorator.js.map