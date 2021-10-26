import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';


class MaxLenValidator extends HandyNgSyncValidator {

  // Return true if value is invalid
  public static isInValidIf(value: any, maxLen: number): boolean {

    return typeof value !== 'string' ? false : value.length > maxLen; 

  }

  public static validate(maxLen: number, errMsg: string = 'Max. field length is ${maxLen} characters'): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;

      if (MaxLenValidator.emptyValueIsValid && MaxLenValidator.isEmpty(value)) {
        return null;
      }

      let invalid: boolean = MaxLenValidator.isInValidIf(value, maxLen);

      if (invalid) {
        return MaxLenValidator.returnError(errMsg.replace('${maxLen}', maxLen.toString()));
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const maxLength = MaxLenValidator.validate;
