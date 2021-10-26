import { ValidatorFn, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';
import { UnSignedObject } from '@handy-ng/types';

class RequiredOneOfValidator extends HandyNgSyncValidator {

  // Return true if value is invalid
  public static isInValidIf(value: UnSignedObject = {}, fields: string[]): boolean {

    let fieldsLen: number = fields.length;
    for (let i = 0; i < fieldsLen; i++) {
      const fieldName = fields[i];
      
      let isEMpty: boolean = RequiredOneOfValidator.isEmpty(value[fieldName]);
      if (!isEMpty) {
        return false;  
      }

    }

    return true;

  }

  public static emptyValueIsValid: boolean = false;

  public static validate(fields: string[] = [], errMsg: string): ValidatorFn {

    return (control: FormGroup): NgValidationError => {

      let { value } = control;

      if (RequiredOneOfValidator.emptyValueIsValid && RequiredOneOfValidator.isEmpty(value)) {
        return null;
      }

      let invalid: boolean = RequiredOneOfValidator.isInValidIf(value, fields);

      if (invalid) {
        return RequiredOneOfValidator.returnError(errMsg);
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const requiredOneOf = RequiredOneOfValidator.validate;

// import requiredOnOf from '@ng-shared/form-validators';