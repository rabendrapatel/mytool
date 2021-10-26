import { NgValidationError } from '../../../modules/handy-form/validators/interfaces';

export class HandyNgAsyncValidator {

  public static emptyValueIsValid: boolean = true;

  protected static isEmpty(value: any): boolean {

    let result: boolean = false;

    switch (typeof value) {

      case 'object':
        result = this.isEmptyObject(value);
        break;

      case 'boolean':

        result = false;

        break;

      case 'number':

        result = false;

        break;

      case 'string':

        result = value.trim().length === 0;

        break;

      default:
        result = !(value);
        break;
    }


    return result;

  }

  protected static isFileInputArr(obj: any): boolean {

    let isFileInputArr: boolean = true;

    if (obj[0].progress === undefined) {
      return false;
    }

    if (obj[0].finished === undefined) {
      return false;
    }

    return isFileInputArr;

  }

  protected static isEmptyObject(obj: Object): boolean {

    if (Array.isArray(obj)) {

      if (obj.length === 0) {
        return true;
      }

      if (this.isFileInputArr(obj)) {

        let filesLen: number = obj.length;
        for (let i = 0; i < filesLen; i++) {
          const singleFile = obj[i];

          if (singleFile.finished === true) {
            return false;
          }
          
        }

      }

      return false;

    }

    if (obj === null || obj === undefined) {
      return true;
    }

    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});

  }

  protected static returnError(errMsg: string): NgValidationError {

    return { [this.name.toLowerCase()]: errMsg };

  }

}