import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';

export const EmailRegex: RegExp = new RegExp(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

class EmailValidator extends HandyNgSyncValidator {

  // Return true if value is invalid
  public static isInValidIf(value: any): boolean {

    return !EmailRegex.test(value);

  }

  public static validate(errMsg: string = 'Invalid email'): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;

      if (EmailValidator.emptyValueIsValid && EmailValidator.isEmpty(value)) {
        return null;
      }

      if (typeof value === 'string') {

        let hasCapital: boolean = (/[A-Z]/.test(value));
        let hasEmptySPace: boolean = (/\s/g.test(value));
        
        if (hasCapital) {
          value = value.toLowerCase();
        }

        if (hasEmptySPace) {
          value = value.replace(/\s/g, '');
        }

        if (hasCapital || hasEmptySPace) {
          control.setValue(value, { emitEvent: true, emitModelToViewChange: true, emitViewToModelChange: true });
        }

      }

      let invalid: boolean = EmailValidator.isInValidIf(value);

      if (invalid) {
        return EmailValidator.returnError(errMsg);
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const email = EmailValidator.validate;

// import email from '@ng-shared/form-validators';