import { HandyTimeObject } from "./handy";
import { SingleOrArrayCombo } from "./modifiers";
import { MinutesOrSecondsList, HoursOfADayList, MonthDatesListWithLastDay, DaysListWithWorkingdayAndWeekend, MonthsOfAyearList } from '@handy/types'

export interface CronIntervalSettings {
  repeatEvery: HandyTimeObject
}

export interface CronSchedulerSettings {
  runAtEvery: {
    months?: SingleOrArrayCombo<MonthsOfAyearList>,
    days?: SingleOrArrayCombo<CronDays>,
    timesAt?: SingleOrArrayCombo<CronTimeAt>
  }
}

export type CronsHolderSetting = {
  methodName: string,
  cronType: CronType,
  cronSettings: CronIntervalSettings | CronSchedulerSettings
}

export interface ExtendedCronsHolderSetting extends CronsHolderSetting {
  method(executionMoment: Date): void
}

export interface CronTimeAt {
  hour?: HoursOfADayList,
  minute?: MinutesOrSecondsList,
  second?: MinutesOrSecondsList
}

export type CronType = 'schedule' | 'interval';
export type CronDays = DaysListWithWorkingdayAndWeekend | MonthDatesListWithLastDay;

