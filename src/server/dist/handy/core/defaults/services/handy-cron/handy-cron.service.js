"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyCronService = void 0;
const _services_1 = require("@services");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const injector_1 = require("@handy/core/injector/injector");
class DefaultHandyCronService extends _services_1.HandyService {
    constructor() {
        super();
        this.__cronsList = [];
        this.__lastCheckedMoment = 0;
        this.__momentEmitter = new rxjs_1.Subject();
        this.__handyUtils = injector_1.Inject(_services_1.HandyUtilsService);
        this.constructor.prototype.__isCronHandler = true;
    }
    registerCron(cronSettings) {
        if (__isMasterCluster) {
            this.__cronsList.push(cronSettings);
        }
    }
    startCron() {
        if (this.__cronsList.length < 1) {
            return;
        }
        setInterval(() => {
            let dateObj = new Date();
            let thisSecond = Math.floor(dateObj.getTime() / 1000);
            if (this.__lastCheckedMoment === thisSecond) {
                return;
            }
            this.__lastCheckedMoment = thisSecond;
            this.__momentEmitter.next(dateObj);
        }, 750);
        let cronsLen = this.__cronsList.length;
        for (let i = 0; i < cronsLen; i++) {
            const singleCronJob = this.__cronsList[i];
            this.__listenToCrons(singleCronJob);
        }
    }
    __listenToCrons(singleCronSettings) {
        let { method, cronType } = singleCronSettings;
        this.__momentEmitter.pipe(operators_1.filter(this.__createPipe(singleCronSettings))).subscribe((executionMoment) => {
            method(executionMoment);
        });
    }
    __createPipe(singleCronSettings) {
        let { cronType, cronSettings } = singleCronSettings;
        if (cronType === 'interval') {
            let handyTimeObject = cronSettings.repeatEvery;
            let intervalInSeconds = this.__handyUtils.handyTimeObjectToSec(handyTimeObject);
            return (executionMoment) => {
                if (intervalInSeconds === 0) {
                    intervalInSeconds = 1;
                }
                return Math.floor(executionMoment.getTime() / 1000) % intervalInSeconds === 0;
            };
        }
        else {
            let { months, days, timesAt = { hour: 0, minute: 0, second: 0 } } = cronSettings.runAtEvery;
            return (executionMoment) => {
                if (!this.__isScheuledAtThisDayTime(executionMoment, timesAt)) {
                    return false;
                }
                if (isNotEmpty(months) && !this.__isScheduledThisMonth(executionMoment, months)) {
                    return false;
                }
                if (isNotEmpty(days) && !this.__isScheduledThisDay(executionMoment, days)) {
                    return false;
                }
                return true;
            };
        }
    }
    __isScheduledThisMonth(executionMoment, months) {
        let executionMonth = executionMoment.getMonth() + 1;
        let monthsToApply = [];
        if (isArray(months)) {
            monthsToApply = months;
        }
        else {
            monthsToApply = [months];
        }
        if (monthsToApply.length > 0) {
            if (!monthsToApply.includes(executionMonth)) {
                return false;
            }
        }
        return true;
    }
    __isScheduledThisDay(executionMoment, days) {
        let executionDaysToCheck = [this.__handyUtils.getDayName(executionMoment), this.__handyUtils.isWorkingDayOrWeekend(executionMoment), executionMoment.getDate()];
        if (this.__handyUtils.isLastDayOfAMonth(executionMoment)) {
            executionDaysToCheck.push('lastDayOfAMonth');
        }
        let daysToApply = [];
        if (isArray(days)) {
            daysToApply = days;
        }
        else {
            daysToApply = [days];
        }
        let daysToApplyLen = daysToApply.length;
        for (let i = 0; i < daysToApplyLen; i++) {
            if (executionDaysToCheck.includes(daysToApply[i])) {
                return true;
            }
        }
        return false;
    }
    __isScheuledAtThisDayTime(executionMoment, dayTimes) {
        let actualSecond = executionMoment.getSeconds();
        let actualMinute = executionMoment.getMinutes();
        let actualHour = executionMoment.getHours();
        let dayTimesToCheck = [];
        if (isArray(dayTimes)) {
            dayTimesToCheck = dayTimes;
        }
        else
            [
                dayTimesToCheck = [dayTimes]
            ];
        let dayTimesToCheckLen = dayTimesToCheck.length;
        for (let i = 0; i < dayTimesToCheckLen; i++) {
            const { minute = 0, hour = 0, second = 0 } = dayTimesToCheck[i];
            if ((second !== actualSecond) || (minute !== actualMinute) || (hour !== actualHour)) {
                continue;
            }
            return true;
        }
        return false;
    }
}
exports.DefaultHandyCronService = DefaultHandyCronService;
//# sourceMappingURL=handy-cron.service.js.map