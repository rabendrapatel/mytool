import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';

export const IrlZipRegex: RegExp = new RegExp(/(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ -]?[0-9AC-FHKNPRTV-Y]{4}$/);


class IrlZipCodeValidator extends HandyNgSyncValidator {

  // Return true if value is invalid
  public static isInValidIf(value: any): boolean {

    return !IrlZipRegex.test(value);

  }

  public static validate(errMsg: string = 'Invalid EIR Code'): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;

      if (IrlZipCodeValidator.emptyValueIsValid && IrlZipCodeValidator.isEmpty(value)) {
        return null;
      }

      if (typeof value === 'string') {

        let hasLC: boolean = (/[a-z]/.test(value));
        let changeBecauseOfSpace: boolean = false;

        if (hasLC) {
          value = value.toUpperCase();
        }

        value = value.replace(/O/, '0');

        if (value.length > 3 && value[3] !== ' ') {
          let rest = value.slice(3).replace(/\s/g, '');
          value = value.slice(0, 3) + ' ' + rest;
          changeBecauseOfSpace = true;
        }

        if (hasLC || changeBecauseOfSpace) {

          let originalCaretPos: number = control['caretPos'];
          control.setValue(value, { emitEvent: true, emitModelToViewChange: true, emitViewToModelChange: true });

          if (typeof originalCaretPos !== 'number') {
            return;
          }

          let spacingCase: boolean = false;
          let valLen: number = value.length;

          if (valLen > 1 && value[originalCaretPos - 1] === ' ') {
            spacingCase = true;
          }

          let newCaretPos: number = spacingCase ? originalCaretPos + 1 : originalCaretPos + 0;

          if (valLen > newCaretPos) {

            control['moveCaretTo'](newCaretPos);

          }

        }

      }

      let invalid: boolean = IrlZipCodeValidator.isInValidIf(value);

      if (invalid) {
        return IrlZipCodeValidator.returnError(errMsg);
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const eirCode = IrlZipCodeValidator.validate;

// import email from '@ng-shared/form-validators';