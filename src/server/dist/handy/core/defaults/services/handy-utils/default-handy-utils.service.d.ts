import { HandyErrorService } from '@services';
import { HandyTimeUnit, Constructor, CallableConstructor, HandyTimeObject, UnSignedObject, DaysList, WorkingDayOrWeekend, HashGeneratorOptions } from '@handy/types';
export declare class DefaultHandyUtilsService {
    protected errorService: HandyErrorService;
    protected _daysNamesList: DaysList[];
    protected _workingDayOrWeekendDictionary: WorkingDayOrWeekend[];
    protected _UCLettersList: string[];
    protected _LCLettersList: string[];
    protected _digitsList: string[];
    protected _specialCharsList: string[];
    constructor(errorService: HandyErrorService);
    randomNumber(max?: number, min?: number): number;
    handyTimeUnitToMs(length: number, unit?: HandyTimeUnit): number;
    handyTimeUnitToSec(length: number, unit?: HandyTimeUnit): number;
    handyTimeObjectToSec(handyTimeObject?: HandyTimeObject): number;
    handyTimeObjectToMs(handyTimeObject?: HandyTimeObject): number;
    msToHandyTimeObject(miliseconds: number): HandyTimeObject;
    createCallableConstructor<TConstructor extends Constructor>(type: TConstructor): CallableConstructor<TConstructor>;
    sliceFromEndOfString(str: string, length: number): string;
    removeFunctionsFromObject(object: UnSignedObject): UnSignedObject;
    isLastDayOfAMonth(date: Date): boolean;
    getDayName(date: Date): DaysList;
    isWorkingDayOrWeekend(date: Date): WorkingDayOrWeekend;
    shuffleArray<T>(arr: T[]): T[];
    generateHash<T extends boolean = false>(options?: HashGeneratorOptions<T>, unique?: T): string;
    generateStrongPassword(): string;
}
