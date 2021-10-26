import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';
import { HandyNgUtilsService } from '@handy-ng/services';
import { PasswordStrengthResult } from '@handy-ng/types';

export class PasswordValidator extends HandyNgSyncValidator {

  // Return true if value is invalid
  public static isInValidIf(value: any, handyNgUtilsService: HandyNgUtilsService, minLen: number = 8, minPoints: number = 70): boolean {

    if (typeof value === 'string' && value.length < minLen) {
      return true;
    }

    let result: PasswordStrengthResult = handyNgUtilsService.getPasswordStrength(value);

    return (result.points < minPoints);
    
  }

  public static validate(handyNgUtilsService: HandyNgUtilsService, minLen: number = 8, minPoints: number = 70, errMsg: string = 'Password is too weak'): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;

      if (PasswordValidator.emptyValueIsValid && PasswordValidator.isEmpty(value)) {
        return null;
      }

      let invalid: boolean = PasswordValidator.isInValidIf(value, handyNgUtilsService, minLen, minPoints);

      if (invalid) {
        return PasswordValidator.returnError(errMsg);
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const password = PasswordValidator.validate;

// import password from '@ng-shared/form-validators';