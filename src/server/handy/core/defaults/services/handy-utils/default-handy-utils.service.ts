import { HandyErrorService } from '@services';
import { HandyTimeUnit, Constructor, CallableConstructor, ConstructorArgs, ConstructorClass, HandyTimeObject, UnSignedObject, DaysList, WorkingDayOrWeekend, UserRole, AdditionalAccessPermission, HashGeneratorOptions } from '@handy/types';

export class DefaultHandyUtilsService {

  protected _daysNamesList: DaysList[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];

  protected _workingDayOrWeekendDictionary: WorkingDayOrWeekend[] = [
    'weekend',
    'workingDay',
    'workingDay',
    'workingDay',
    'workingDay',
    'workingDay',
    'weekend'
  ];

  protected _UCLettersList: string[] = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.split('');
  protected _LCLettersList: string[] = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.toLocaleLowerCase().split('');
  protected _digitsList: string[] = `0123456789`.toLocaleLowerCase().split('');
  protected _specialCharsList: string[] = `_~()'!*:@,;`.toLocaleLowerCase().split('');


  constructor (protected errorService: HandyErrorService) {}

  public randomNumber(max: number = 1000, min: number = 0): number {

    return Math.floor(Math.random() * (max - min + 1)) + min;

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

  public createCallableConstructor<TConstructor extends Constructor>(type: TConstructor): CallableConstructor<TConstructor> {

    function createInstance(...args: ConstructorArgs<TConstructor>): ConstructorClass<TConstructor> {
      return new type(...args);
    }

    createInstance.prototype = type.prototype;
    return createInstance as CallableConstructor<TConstructor>;

  }

  public sliceFromEndOfString(str: string, length: number): string {

    let strLen: number = str.length;
    return (strLen <= length) ? '' : str.substring(0, strLen - length);

  }

  public removeFunctionsFromObject(object: UnSignedObject): UnSignedObject {

    let result: UnSignedObject = {};
    let keys: string[] = Object.keys(object);
    let keysLen: number = keys.length;

    for (let i = 0; i < keysLen; i++) {
      const singleKey = keys[i];
      if (typeof object[singleKey] === 'function') {
        result[singleKey] = `Function ${object[singleKey].name}`;
        continue;
      }

      if (typeof object[singleKey] === 'object' && isNotNullOrUndefined(object[singleKey])) {
        result[singleKey] = this.removeFunctionsFromObject(object[singleKey]);
        continue;
      }

      result[singleKey] = object[singleKey];

    }

    return result;

  }

  public isLastDayOfAMonth(date: Date): boolean {

    return new Date(date.getTime() + 86400000).getDate() === 1;

  }

  public getDayName(date: Date): DaysList {
    return this._daysNamesList[date.getDay()];
  }

  public isWorkingDayOrWeekend(date: Date): WorkingDayOrWeekend {
    return this._workingDayOrWeekendDictionary[date.getDay()];
  }

  public shuffleArray<T>(arr: T[]): T[] {

    let arrlen: number = arr.length;
    for (let i = 0; i < arrlen; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      
    }
    return arr;

  }

  public generateHash<T extends boolean = false>(options: HashGeneratorOptions<T> = {}, unique?: T): string {

    unique = (isNotNullOrUndefined(unique)) ? unique : false as T;

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
      characters = [...characters, ...this._specialCharsList];
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
      handyErrLog('Too narrow characters selection fro unique hash generator. Add some more characters types');
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

}

