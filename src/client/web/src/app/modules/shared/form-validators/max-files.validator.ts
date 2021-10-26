import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';

class MaxFilesValidator extends HandyNgSyncValidator {

  // Return true if value is invalid
  public static isInValidIf(value: any, maxFiles: number): boolean {
    
    if (Array.isArray(value)) {
      return value.length > maxFiles;  
    }

    return false;

  }

  public static validate(maxFiles: number): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;

      if (MaxFilesValidator.emptyValueIsValid && MaxFilesValidator.isEmpty(value)) {
        return null;
      }

      let invalid: boolean = MaxFilesValidator.isInValidIf(value, maxFiles);

      if (invalid) {
        return MaxFilesValidator.returnError(`Max ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`);
      }

      // ! has to return null if field is valid
      return null;

    }

  }

}

export const maxFiles = MaxFilesValidator.validate;

// import maxFiles from '@ng-shared/form-validators';