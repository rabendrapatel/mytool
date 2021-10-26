import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';

class FutureDateValidator extends HandyNgSyncValidator {

  // Return true if value is invalid
  public static isInValidIf(value: any, secondsOffset: number = 0): boolean {

    if (typeof value !== 'number') {
      return false;
    }

    let thisMoment: number = new Date().getTime() + (secondsOffset * 1000);
    return thisMoment > value;

  }

  public static validate(errMsg: string = `This field can't be a passed date`, secondsOffset: number = 0): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;

      if (FutureDateValidator.emptyValueIsValid && FutureDateValidator.isEmpty(value)) {
        return null;
      }

      let invalid: boolean = FutureDateValidator.isInValidIf(value, secondsOffset);

      if (invalid) {
        return FutureDateValidator.returnError(errMsg);
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const futureDate = FutureDateValidator.validate;

// import futureDate from '@ng-shared/form-validators';