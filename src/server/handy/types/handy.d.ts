import { EmailTemplatePath, HandyError, EmailProvider, ConfigJwtInterface, ConfigData, ArrayOrUnionToUnion } from "@handy/types";
import { Attachment } from "nodemailer/lib/mailer";
import { PDFFormat } from "puppeteer";

export type HandyTimeUnit = 'ms' | 'sec' | 'min' | 'hr' | 'd';
export type HandyTimeObject = { [key in HandyTimeUnit]?: number };

export type DaysList = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type WorkingDayOrWeekend = 'workingDay' | 'weekend';
export type DaysListWithWorkingdayAndWeekend = DaysList | WorkingDayOrWeekend;

export type MinutesOrSecondsList = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;
export type HoursOfADayList = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;

export type MonthDatesList = | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
export type MonthDatesListWithLastDay = MonthDatesList | 'lastDayOfAMonth';

export type MonthsOfAyearList = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type NextFn = (err?: HandyError) => void;

export interface EmailData {
  to: string,
  subject: string,
  template: EmailTemplatePath,
  data?: Object,
  text?: string,
  attachments?: Attachment[],
  provider?: EmailProvider,
  account?: string
  replyTo?: string,
}

export type JwtType = keyof ConfigJwtInterface['types'];

export interface TokenData {
  token: string,
  expiryMoment: number,
  lifeSpan: number,
  expiresIn: number,
  lifeSpanUnit: HandyTimeUnit
}

export type RefreshTokenKeyPairCheck = {
  checkSet?: {
    type: 'cookie' | 'header'
    name: string | ArrayOrUnionToUnion<ConfigData['usedRequestHeaders']>,
    value: string
  }
}

export interface HashGeneratorOptions<T extends boolean> {
  length?: T extends false ? number : never,
  digits?: boolean,
  capitalsLetters?: boolean,
  lowerCaseletters?: boolean,
  specialChars?: boolean,
  emptySpace?: boolean
}

export interface PasswordStrengthResult {
  points: number,
  guides: {
    length: boolean,
    upperCase: boolean,
    lowerCase: boolean,
    digit: boolean,
    specialChar: boolean,
    space: boolean
  }
}

export type PasswordIndicatorName = keyof PasswordStrengthResult['guides'];

export type PasswordStrenghtDictionary = {
  [key in PasswordIndicatorName]: string;
};

interface PdfUrlGeneratingData {
  url: string,
  format: PDFFormat,
  landscape: boolean,
  margin: {
    left: number,
    right: number,
    top: number,
    bottom: number
  },
  displayHeaderFooter?: boolean,
  originalFileName?: string
}