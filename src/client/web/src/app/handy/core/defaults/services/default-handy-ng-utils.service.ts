import { UnSignedObject, ClientErrBodyByCode } from '@handy-ng/types';
import { HandyTimeObject, HandyTimeUnit, HashGeneratorOptions, PasswordStrengthResult } from '@server-types';
import { Observable, Subscription, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

export class DefaultHandyNgUtilsService {

  protected _UCLettersList: string[] = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.split('');
  protected _LCLettersList: string[] = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.toLocaleLowerCase().split('');
  protected _digitsList: string[] = `0123456789`.toLocaleLowerCase().split('');
  public specialCharsList: string[] = `_~()'!*:@,;`.toLocaleLowerCase().split('');

  protected _speacialCharsRegexPattern: string = `[${this.specialCharsList}]`;
  protected _passwordGuidesRegs: { [usage: string]: RegExp } = {
    upperCase: new RegExp('[A-Z]'),
    lowerCase: new RegExp('[a-z]'),
    digit: new RegExp('[0-9]'),
    specialChar: new RegExp(this._speacialCharsRegexPattern),
    space: new RegExp('\s', 'g')
  }

  protected clientErrBodyByCodeContent: { [key: string]: ClientErrBodyByCode } = {
    '500': {
      headline: 'Server error',
      msg: `Something went wrong on our server. We've been notified about this error and we are working on fixing it.`,
    },
    '400': {
      headline: 'Bad request',
      msg: `This request is invalid.`,
    },
    '401': {
      headline: 'Unauthorized',
      msg: `You are not authorised to perform this request.`,
    },
    '403': {
      headline: 'Forbidden',
      msg: `You are forbidden to perform this request.`,
    },
    '404': {
      headline: 'Resource not found',
      msg: `We could't find the resource You are looking for.`,
    },
    '410': {
      headline: 'Gone',
      msg: `This resource was removed.`,
    },
    '415': {
      headline: 'Unsupported media type',
      msg: `This media type is not supported.`,
    },
    '0': {
      headline: 'Unknown Error',
      msg: 'Something went wrong, check your internet connection'
    }
  }  

  public workersCores: number = 1;

  public tabWakeUpEvent: Subject<void> = new Subject();
  public tabFocusChangeEvent: Subject<'tabLeave' | 'tabEnter'> = new Subject();

  public startSleepDetector(): void {

    window.addEventListener('focus', () => {
      this.tabFocusChangeEvent.next('tabEnter');
    })

    window.addEventListener('blur', () => {
      this.tabFocusChangeEvent.next('tabLeave');
    })

    let worker = new Worker('/assets/sleep-detector.js');
    worker.onmessage = (event: any) => {
      this.tabWakeUpEvent.next();
    }

  }

  public runInWorker<T = any, P = any>(fn: (fnParam?: P) => T, param?: P): WorkerPromiseResult<T> {

    // @ts-ignore
    return new Promise<WorkerPromiseType<T>>((resolve, reject) => {

      if (this.workersCores < 2) {

        let result = fn(param) as any;
        if (typeof result === 'object' && typeof result.then === 'object') {

          result.then(finalResult => {
            resolve(finalResult);
          })
            .catch(err => {
              reject(err);
            })

          return;
        }

        resolve(result);
        return;
      }

      let worker = new Worker('/assets/handy-worker.js');
      let fnEventName: string = 'fn_' + Date.now() + '_' + this.randomNumber(5000, 1);

      worker.postMessage({
        fn: fn.toString(),
        fnEventName,
        param
      });

      worker.onmessage = (msg: any) => {

        if (msg?.data?.fnEventName === fnEventName) {

          if (msg.data.error) {
            reject(msg.data.error);
            return;
          }

          resolve(msg.data.result);
          return;

        }

      }

      worker.onerror = (err) => {
        reject(err);
      }

      worker.onmessageerror = (err) => {
        reject(err);
      }

    })

  }

  public handyTimeUnitToMs(length: number, unit: HandyTimeUnit = 'ms'): number {

    return this.handyTimeUnitToSec(length, unit) * 1000;

  }

  public handyTimeUnitToSec(length: number, unit: HandyTimeUnit = 'ms'): number {

    let result: number = 0;

    switch (unit) {

      case 'sec':
        result = length;
        break;

      case 'min':
        result = length * 60;
        break;

      case 'hr':
        result = length * 60 * 60;
        break;

      case 'd':
        result = length * 60 * 60 * 24;
        break;

      default:
        result = Math.round(((length / 1000) + Number.EPSILON) * 100) / 100;
        break;
    }

    return result;

  }

  public handyTimeObjectToSec(handyTimeObject: HandyTimeObject = {}): number {

    let result: number = 0;

    let units: HandyTimeUnit[] = Object.keys(handyTimeObject) as HandyTimeUnit[];
    let unitsLen: number = units.length;
    for (let i = 0; i < unitsLen; i++) {
      const singleUnitName: HandyTimeUnit = units[i];
      const singleUnitLen: number = handyTimeObject[singleUnitName];
      result += this.handyTimeUnitToSec(singleUnitLen, singleUnitName)
    }

    return result;
  }

  public handyTimeObjectToMs(handyTimeObject: HandyTimeObject = {}): number {

    return this.handyTimeObjectToSec(handyTimeObject) * 1000;
  }

  public msToHandyTimeObject(miliseconds: number): HandyTimeObject {

    let msInSec = Math.floor(miliseconds / 1000);
    let d: number = Math.floor(msInSec / 86400);
    let hr: number = Math.floor((msInSec % 86400) / 3600);
    let min: number = Math.floor((msInSec % 3600) / 60);

    return {
      d,
      hr,
      min,
      sec: Math.floor(miliseconds / 1000),
      ms: miliseconds
    };

  }

  public randomNumber(max: number = 1000, min: number = 0): number {

    return Math.floor(Math.random() * (max - min + 1)) + min;

  }

  public generateHash<T extends boolean = false>(options: HashGeneratorOptions<T> = {}, unique?: T): string {

    let { length = 10, digits = false, capitalsLetters = true, lowerCaseletters = true, specialChars = false, emptySpace = false } = options;

    let result = '';
    let characters: string[] = (emptySpace) ? [' '] : [];

    if (digits) {
      characters = [...characters, ...this._digitsList];
    }

    if (capitalsLetters) {
      characters = [...characters, ...this._UCLettersList];
    }

    if (lowerCaseletters) {
      characters = [...characters, ...this._LCLettersList];
    }

    if (specialChars) {
      characters = [...characters, ...this.specialCharsList];
    }

    let charsLen: number = characters.length;

    if (!unique) {

      characters = this.shuffleArray(characters);

      for (let i = 0; i < length; i++) {
        let charIndex: number = this.randomNumber(charsLen - 1, 0);
        result += characters[charIndex];
      }

      return result;

    }

    if (charsLen < 10) {
      console.log('Too narrow characters selection fro unique hash generator. Add some more characters types');
    }

    let thisMomentDigits: string[] = new Date().getTime().toString().split('');
    let thisMomentDigitsLen: number = thisMomentDigits.length;
    let allowedMultiplier = Math.floor(charsLen / 10);

    for (let i = 0; i < thisMomentDigitsLen; i++) {
      let nr: number = +thisMomentDigits[i];
      let charIndex: number = nr * this.randomNumber(allowedMultiplier, 1);
      result += characters[charIndex];
    }

    return result;

  }

  public generateStrongPassword(): string {

    let i: number = 1;
    let pass: string = this.generateHash({ length: 15, digits: true, specialChars: true, emptySpace: true, capitalsLetters: true, lowerCaseletters: true });
    while (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{14,15})/) || !pass.includes(' ') || pass.startsWith(' ') || pass.endsWith(' ')) {
      pass = this.generateHash({ length: 15, digits: true, specialChars: true, emptySpace: true, capitalsLetters: true, lowerCaseletters: true });
      i++;
    }

    return pass;

  }

  public getPasswordStrength(value: string): PasswordStrengthResult {

    let data: PasswordStrengthResult = {
      points: 0,
      guides: {
        length: false,
        upperCase: false,
        lowerCase: false,
        specialChar: false,
        digit: false,
        space: false
      }
    };

    if (typeof value === 'string') {

      if (value.length > 7) {
        data.guides.length = true;
        data.points += 5;
      }

      let upperCase: boolean = this._passwordGuidesRegs.upperCase.test(value);
      let lowerCase: boolean = this._passwordGuidesRegs.lowerCase.test(value);

      if (upperCase) {
        data.guides.upperCase = true;
        data.points += 5;
      }

      if (lowerCase) {
        data.guides.lowerCase = true;
        data.points += 5;
      }

      if (lowerCase && upperCase) {
        data.points += 20;
      }

      if (this._passwordGuidesRegs.digit.test(value)) {
        data.guides.digit = true;
        data.points += 15;
      }

      if (this._passwordGuidesRegs.specialChar.test(value)) {
        data.guides.specialChar = true;
        data.points += 25;
      }

      if (value.includes(' ')) {
        data.guides.space = true;
        data.points += 25;
      }

    }

    return data;

  }

  public shuffleArray<T>(arr: T[]): T[] {

    let arrlen: number = arr.length;
    for (let i = 0; i < arrlen; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];

    }

    return arr;

  }

  public isEmptyObject(obj: UnSignedObject): boolean {

    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});

  }

  public countDown(startingTimeinMs: number, stepPeriodInMs: number = 1000): Observable<{timeLeft: number, complete: boolean}> {
    
    return new Observable<{ timeLeft: number, complete: boolean }>(observer => {

      let time: number = startingTimeinMs;
      observer.next({ timeLeft: time, complete: false });

      let interval: NodeJS.Timeout = setInterval(() => {

        time = time - stepPeriodInMs;

        if (time <= 0) {

          time = 0;
          observer.next({ timeLeft: time, complete: true });
          observer.complete();
          clearInterval(interval);
          return;

        }

        observer.next({ timeLeft: time, complete: false });

        observer

      }, stepPeriodInMs)

    })

  }

  public getErrStringsFromCode(errCode: string = '0'): ClientErrBodyByCode {

    if (!this.clientErrBodyByCodeContent[errCode]) {
      errCode = '0';
    }

    return this.clientErrBodyByCodeContent[errCode];

  }

  public getErrDataFromAPiErr(err: any = {}): { code: string, refCode: string }{

    let code: string = '0';
    let errRefCode: string;

    if (err.error && err.error.data && typeof err.error.data === 'object') {

      let { errorCode = '0', refCode } = err.error.data;
      code = errorCode;
      errRefCode = refCode;

    }

    return {
      code,
      refCode: errRefCode
    }    

  }

  public unsubscribeAll(subcriptions: Subscription[] = []): void {

    let subcriptionsLen: number = subcriptions.length;
    for (let i = 0; i < subcriptionsLen; i++) {
      const singleSubscription = subcriptions[i];

      if (singleSubscription !== undefined) {
        singleSubscription.unsubscribe();
      }
      
    }

  }

  public completeAllSubjects(sub: Subject<any>[] = []): void {

    let subLen: number = sub.length;
    for (let i = 0; i < subLen; i++) {
      const singleSub = sub[i];

      if (singleSub !== undefined) {
        singleSub.complete();
      }
      
    }

  }

  public deepCompare(firstValue: any, secondValue: any): boolean {

    if (typeof firstValue !== typeof secondValue) {
      return false;
    }

    if (typeof firstValue === 'object') {
      return (JSON.stringify(firstValue) === JSON.stringify(secondValue));
    }

    return firstValue === secondValue;

  }

  public replaceLastCharOfString(value: string, replaceWith: string = ''): string {
    return value.replace(/.$/, replaceWith);
  }

  public UcFirst(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  public getTimezonedDate(timeZone: string = 'Europe/Dublin') {

    let date: Date = new Date();
    let invDate = new Date(date.toLocaleString('en-US', {
      timeZone: timeZone
    }));

    let diff = date.getTime() - invDate.getTime();
    return new Date(date.getTime() - diff);

  }

}


type WorkerPromiseType<T> = T extends PromiseLike<infer U> ? U : T;
type WorkerPromiseResult<T> = T extends PromiseLike<infer U> ? Promise<U> : Promise<T>;