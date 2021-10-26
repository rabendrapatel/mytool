import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from './interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';

class RequiredValidator extends HandyNgSyncValidator {

  public static emptyValueIsValid: boolean = false;

  // Return true if value is invalid
  public static isInValidIf(value: any): boolean {
    return RequiredValidator.isEmpty(value);

  }

  public static validate(errMsg: string = 'This field is invalid'): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;

      if (RequiredValidator.emptyValueIsValid && RequiredValidator.isEmpty(value)) {
        return null;
      }

      let invalid: boolean = RequiredValidator.isInValidIf(value);

      if (invalid) {
        return RequiredValidator.returnError(errMsg);
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const required = RequiredValidator.validate;