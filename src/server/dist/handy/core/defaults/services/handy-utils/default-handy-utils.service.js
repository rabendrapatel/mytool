"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyUtilsService = void 0;
class DefaultHandyUtilsService {
    constructor(errorService) {
        this.errorService = errorService;
        this._daysNamesList = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday'
        ];
        this._workingDayOrWeekendDictionary = [
            'weekend',
            'workingDay',
            'workingDay',
            'workingDay',
            'workingDay',
            'workingDay',
            'weekend'
        ];
        this._UCLettersList = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.split('');
        this._LCLettersList = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.toLocaleLowerCase().split('');
        this._digitsList = `0123456789`.toLocaleLowerCase().split('');
        this._specialCharsList = `_~()'!*:@,;`.toLocaleLowerCase().split('');
    }
    randomNumber(max = 1000, min = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    handyTimeUnitToMs(length, unit = 'ms') {
        return this.handyTimeUnitToSec(length, unit) * 1000;
    }
    handyTimeUnitToSec(length, unit = 'ms') {
        let result = 0;
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
    handyTimeObjectToSec(handyTimeObject = {}) {
        let result = 0;
        let units = Object.keys(handyTimeObject);
        let unitsLen = units.length;
        for (let i = 0; i < unitsLen; i++) {
            const singleUnitName = units[i];
            const singleUnitLen = handyTimeObject[singleUnitName];
            result += this.handyTimeUnitToSec(singleUnitLen, singleUnitName);
        }
        return result;
    }
    handyTimeObjectToMs(handyTimeObject = {}) {
        return this.handyTimeObjectToSec(handyTimeObject) * 1000;
    }
    msToHandyTimeObject(miliseconds) {
        let msInSec = Math.floor(miliseconds / 1000);
        let d = Math.floor(msInSec / 86400);
        let hr = Math.floor((msInSec % 86400) / 3600);
        let min = Math.floor((msInSec % 3600) / 60);
        return {
            d,
            hr,
            min,
            sec: Math.floor(miliseconds / 1000),
            ms: miliseconds
        };
    }
    createCallableConstructor(type) {
        function createInstance(...args) {
            return new type(...args);
        }
        createInstance.prototype = type.prototype;
        return createInstance;
    }
    sliceFromEndOfString(str, length) {
        let strLen = str.length;
        return (strLen <= length) ? '' : str.substring(0, strLen - length);
    }
    removeFunctionsFromObject(object) {
        let result = {};
        let keys = Object.keys(object);
        let keysLen = keys.length;
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
    isLastDayOfAMonth(date) {
        return new Date(date.getTime() + 86400000).getDate() === 1;
    }
    getDayName(date) {
        return this._daysNamesList[date.getDay()];
    }
    isWorkingDayOrWeekend(date) {
        return this._workingDayOrWeekendDictionary[date.getDay()];
    }
    shuffleArray(arr) {
        let arrlen = arr.length;
        for (let i = 0; i < arrlen; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    generateHash(options = {}, unique) {
        unique = (isNotNullOrUndefined(unique)) ? unique : false;
        let { length = 10, digits = false, capitalsLetters = true, lowerCaseletters = true, specialChars = false, emptySpace = false } = options;
        let result = '';
        let characters = (emptySpace) ? [' '] : [];
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
        let charsLen = characters.length;
        if (!unique) {
            characters = this.shuffleArray(characters);
            for (let i = 0; i < length; i++) {
                let charIndex = this.randomNumber(charsLen - 1, 0);
                result += characters[charIndex];
            }
            return result;
        }
        if (charsLen < 10) {
            handyErrLog('Too narrow characters selection fro unique hash generator. Add some more characters types');
        }
        let thisMomentDigits = new Date().getTime().toString().split('');
        let thisMomentDigitsLen = thisMomentDigits.length;
        let allowedMultiplier = Math.floor(charsLen / 10);
        for (let i = 0; i < thisMomentDigitsLen; i++) {
            let nr = +thisMomentDigits[i];
            let charIndex = nr * this.randomNumber(allowedMultiplier, 1);
            result += characters[charIndex];
        }
        return result;
    }
    generateStrongPassword() {
        let i = 1;
        let pass = this.generateHash({ length: 15, digits: true, specialChars: true, emptySpace: true, capitalsLetters: true, lowerCaseletters: true });
        while (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{14,15})/) || !pass.includes(' ') || pass.startsWith(' ') || pass.endsWith(' ')) {
            pass = this.generateHash({ length: 15, digits: true, specialChars: true, emptySpace: true, capitalsLetters: true, lowerCaseletters: true });
            i++;
        }
        return pass;
    }
}
exports.DefaultHandyUtilsService = DefaultHandyUtilsService;
//# sourceMappingURL=default-handy-utils.service.js.map