import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { NgValidationError } from '@handy-ng/modules/handy-form/validators/interfaces';
import { HandyNgSyncValidator } from '@handy-ng/core';

class IrlPhoneNrValidator extends HandyNgSyncValidator {

  // Return true if value is invalid
  public static isInValidIf(value: any, type: PhoneNrType): boolean {

    let valid: boolean = false;
    let prefix: string = value.split(' ')[0];

    let isMobile: boolean = IrlPhoneNrValidator.mobilePrefixes.includes(prefix);
    let isLandline: boolean = IrlPhoneNrValidator.landlinePrefixes.includes(prefix);

    let digitsOnly: string = value.replace(/\s/g, '');

    if (!digitsOnly.match(/^\d+$/)) {
      return true;
    }

    switch (type) {
      case 'mobile':

        if (isMobile && value.length === 12) {
          valid = true;
        }

        break;

      case 'landline':

        if (isLandline && IrlPhoneNrValidator.isValidLindline(value)) {
          valid = true;
        }

        break;

      default:

        if (isMobile && value.length === 12) {
          valid = true;
        }

        if (isLandline && IrlPhoneNrValidator.isValidLindline(value)) {
          valid = true;
        }

        break;
    }

    return !valid;

  }

  public static landlinePrefixesFirstDigit: string[] = ['1', '2', '4', '5', '6', '7', '9'];
  public static mobilePrefixes: string[] = ['083', '085', '086', '087', '089'];
  public static landlinePrefixes: string[] = [
    '01',
    '021', '022', '023', '024', '025', '026', '027', '028', '029',
    '0402', '0404', '041', '042', '043', '044', '045', '046', '047', '049',
    '0504', '0505', '051', '052', '053', '056', '057', '058', '059',
    '061', '062', '063', '064', '065', '066', '067', '068', '069',
    '071', '074',
    '090', '091', '093', '094', '095', '096', '097', '098', '099',
  ];

  public static landlinesPrefixesLen: number = IrlPhoneNrValidator.landlinePrefixes.length;

  public static validate(errMsg: string = 'Invalid Phone nr.', type: PhoneNrType = 'both'): ValidatorFn {

    return (control: FormControl | AbstractControl): NgValidationError => {

      let { value } = control;

      if (IrlPhoneNrValidator.emptyValueIsValid && IrlPhoneNrValidator.isEmpty(value)) {
        return null;
      }

      if (typeof value === 'string' && value !== '0') {

        let changeValue: boolean = false;
        let originalValue: string = value;

        value = value.replace(/\s/g, '');

        if (value.startsWith('+353')) {
          value = value.replace('+353', '0');
          changeValue = true;
        }

        if (value.startsWith('00353')) {
          value = value.replace('00353', '0');
          changeValue = true;
        }

        let valLen: number = value.length;

        if (valLen > 1 && value[0] === '0') {

          let isMobile: boolean = false;
          let isLandline: boolean = false;
          let startingDigit: string = value[1];

          // ? mobile phone number formatting
          if (startingDigit === '8') {
            isMobile = true;
          }

          if (isMobile && valLen > 3) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
          }

          if (isMobile && valLen > 6) {
            value = value.slice(0, 7) + ' ' + value.slice(7);
          }

          // ? landline phone number formatting
          if (IrlPhoneNrValidator.landlinePrefixesFirstDigit.includes(startingDigit)) {
            isLandline = true;
          }

          if (isLandline) {

            for (let i = 0; i < IrlPhoneNrValidator.landlinesPrefixesLen; i++) {
              const prefix = IrlPhoneNrValidator.landlinePrefixes[i];
              if (value.startsWith(prefix)) {

                let afterPrefixIndex: number = prefix.length;
                if (valLen > afterPrefixIndex) {
                  value = value.slice(0, afterPrefixIndex) + ' ' + value.slice(afterPrefixIndex);
                }

                let secondSpaceIndex = afterPrefixIndex + 4
                if (valLen >= secondSpaceIndex) {
                  value = value.slice(0, secondSpaceIndex) + ' ' + value.slice(secondSpaceIndex);
                }

                break;

              }

            }

          }

          if (originalValue !== value) {
            changeValue = true;
          }

        }

        if (changeValue) {

          let originalCaretPos: number = control['caretPos'];

          setTimeout(() => {

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

          })

        }

      }

      let invalid: boolean = IrlPhoneNrValidator.isInValidIf(value, type);

      if (invalid) {
        return IrlPhoneNrValidator.returnError(errMsg);
      }

      // ! has to return null if field is valid
      return null;

    }

  }



  public static isValidLindline(value: string): boolean {

    let splitted: string[] = value.split(' ');
    let splittedLen: number = splitted.length;

    if (splittedLen === 3 && (splitted[2].length > 1 && splitted[2].length < 5)) {
      return true;
    }

    return false;

  }

}

export const irlPhoneNr = IrlPhoneNrValidator.validate;

type PhoneNrType = 'mobile' | 'landline' | 'both';

// import email from '@ng-shared/form-validators';