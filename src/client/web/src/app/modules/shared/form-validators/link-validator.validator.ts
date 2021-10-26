import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';

class LinkValidatorValidator extends HandyNgSyncValidator {

  public static reg: RegExp = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm);

  // Return true if value is invalid
  public static isInValidIf(value: string): boolean {
    return !LinkValidatorValidator.reg.test(value);
  }

  public static validate(errMsg: string = 'This field is invalid'): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;

      if (LinkValidatorValidator.emptyValueIsValid && LinkValidatorValidator.isEmpty(value)) {
        return null;
      }

      let invalid: boolean = LinkValidatorValidator.isInValidIf(value);
      if (invalid) {
        return LinkValidatorValidator.returnError(errMsg);
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const linkValidator = LinkValidatorValidator.validate;

// import linkValidator from '@ng-shared/form-validators';