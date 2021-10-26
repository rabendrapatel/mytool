import { HandyService, HandyUtilsService } from "@services";
import { CronsHolderSetting, ExtendedCronsHolderSetting, HandyTimeObject, CronIntervalSettings, CronSchedulerSettings, CronDays, MonthsOfAyearList, MonthDatesList, MinutesOrSecondsList, HoursOfADayList, SingleOrArrayCombo, CronTimeAt } from "@handy/types";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { Inject } from "@handy/core/injector/injector";

export class DefaultHandyCronService extends HandyService {

  private __cronsList: ExtendedCronsHolderSetting[] = [];

  private __lastCheckedMoment: number = 0;

  private __momentEmitter: Subject<Date> = new Subject();
  private __handyUtils: HandyUtilsService = Inject(HandyUtilsService);

  constructor () {

    super();
    this.constructor.prototype.__isCronHandler = true;

  }

  public registerCron(cronSettings: ExtendedCronsHolderSetting): void {

    if (__isMasterCluster) {
      this.__cronsList.push(cronSettings);
    }

  }

  public startCron(): void {

    if (this.__cronsList.length < 1) {
      return;
    }

    setInterval(() => {

      let dateObj: Date = new Date();
      let thisSecond: number = Math.floor(dateObj.getTime() / 1000);

      if (this.__lastCheckedMoment === thisSecond) {
        return;
      }

      this.__lastCheckedMoment = thisSecond;
      this.__momentEmitter.next(dateObj);

    }, 750);

    let cronsLen: number = this.__cronsList.length;
    for (let i = 0; i < cronsLen; i++) {
      const singleCronJob: ExtendedCronsHolderSetting = this.__cronsList[i];

      this.__listenToCrons(singleCronJob);

    }

  }

  private __listenToCrons(singleCronSettings: ExtendedCronsHolderSetting): void {

    let { method, cronType } = singleCronSettings;

    this.__momentEmitter.pipe(filter(this.__createPipe(singleCronSettings))).subscribe((executionMoment: Date) => {

      method(executionMoment);

    })

  }

  private __createPipe(singleCronSettings: CronsHolderSetting): (executionMoment: Date) => boolean {

    let { cronType, cronSettings } = singleCronSettings;

    if (cronType === 'interval') {

      let handyTimeObject: HandyTimeObject = (<CronIntervalSettings>cronSettings).repeatEvery;
      let intervalInSeconds: number = this.__handyUtils.handyTimeObjectToSec(handyTimeObject);
      return (executionMoment: Date) => {

        if (intervalInSeconds === 0) {
          intervalInSeconds = 1;
        }

        return Math.floor(executionMoment.getTime() / 1000) % intervalInSeconds === 0;

      }

    } else {

      let { months, days, timesAt = { hour: 0, minute: 0, second: 0 } } = (<CronSchedulerSettings>cronSettings).runAtEvery;

      return (executionMoment: Date) => {

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

      }

    }

  }

  private __isScheduledThisMonth(executionMoment: Date, months: CronSchedulerSettings['runAtEvery']['months']): boolean {

    let executionMonth: MonthsOfAyearList = executionMoment.getMonth() + 1 as MonthsOfAyearList;
    let monthsToApply: MonthsOfAyearList[] = [];

    if (isArray(months)) {
      monthsToApply = months as MonthsOfAyearList[];
    } else {
      monthsToApply = [months as MonthsOfAyearList];
    }

    if (monthsToApply.length > 0) {
      if (!monthsToApply.includes(executionMonth)) {
        return false;
      }
    }

    return true;

  }

  private __isScheduledThisDay(executionMoment: Date, days: CronSchedulerSettings['runAtEvery']['days']): boolean {

    let executionDaysToCheck: CronDays[] = [this.__handyUtils.getDayName(executionMoment), this.__handyUtils.isWorkingDayOrWeekend(executionMoment), <unknown>executionMoment.getDate() as MonthDatesList];

    if (this.__handyUtils.isLastDayOfAMonth(executionMoment)) {
      executionDaysToCheck.push('lastDayOfAMonth')
    }

    let daysToApply: CronDays[] = [];

    if (isArray(days)) {
      daysToApply = days as CronDays[];
    } else {
      daysToApply = [days as CronDays];
    }

    let daysToApplyLen: number = daysToApply.length;
    for (let i = 0; i < daysToApplyLen; i++) {

      if (executionDaysToCheck.includes(daysToApply[i])) {
        return true;
      }

    }

    return false;

  }

  private __isScheuledAtThisDayTime(executionMoment: Date, dayTimes: SingleOrArrayCombo<CronTimeAt>): boolean {

    let actualSecond: MinutesOrSecondsList = executionMoment.getSeconds() as MinutesOrSecondsList;
    let actualMinute: MinutesOrSecondsList = executionMoment.getMinutes() as MinutesOrSecondsList;
    let actualHour: HoursOfADayList = executionMoment.getHours() as HoursOfADayList;

    let dayTimesToCheck: CronTimeAt[] = [];
    if (isArray(dayTimes)) {
      dayTimesToCheck = dayTimes as CronTimeAt[];
    } else[
      dayTimesToCheck = [dayTimes as CronTimeAt]
    ]

    let dayTimesToCheckLen: number = dayTimesToCheck.length;
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