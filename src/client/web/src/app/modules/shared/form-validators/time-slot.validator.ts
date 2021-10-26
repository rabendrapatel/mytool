import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';

class TimeSlotValidator extends HandyNgSyncValidator {

  // Return true if value is invalid
  public static isInValidIf(value: number, pairControl: FormControl | AbstractControl, thisFieldIs: 'from' | 'to'): boolean {


    let otherValue: number = pairControl.value;
    let result: boolean = true;

    switch (thisFieldIs) {
      case 'from':

        result = (value + 1) > otherValue;

        break;

      default:

        result = (value - 1) < otherValue;

        break;
    }

    if (!pairControl.valid) {
      pairControl.updateValueAndValidity();
    }

    return result;

  }

  public static validate(pairControl: FormControl | AbstractControl, thisFieldIs: 'from' | 'to', errMsg: string = 'This field is invalid'): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;
      let otherValue = pairControl.value;

      if (TimeSlotValidator.emptyValueIsValid && (TimeSlotValidator.isEmpty(value) || TimeSlotValidator.isEmpty(otherValue))) {
        return null;
      }

      let invalid: boolean = TimeSlotValidator.isInValidIf(value, pairControl, thisFieldIs);

      if (invalid) {
        return TimeSlotValidator.returnError(errMsg);
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const timeSlot = TimeSlotValidator.validate;

// import timeSlot from '@ng-shared/form-validators';