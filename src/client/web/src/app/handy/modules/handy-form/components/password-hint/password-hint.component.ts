import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PasswordStrengthResult, PasswordIndicatorName, PasswordStrenghtDictionary } from '@handy-ng/types';
import { HandyNgUtilsService } from '@handy-ng/services';

@Component({
  selector: 'password-hint',
  templateUrl: './password-hint.component.html',
  styleUrls: ['./password-hint.component.scss']
})
export class PasswordHintComponent implements OnInit {

  public parsedPasswordStrengt: PasswordStrengthResult = this.handyNgUtilsService.getPasswordStrength(null);
  public passwordIndicatorsList: PasswordIndicatorName[] = Object.keys(this.parsedPasswordStrengt.guides) as (keyof PasswordStrengthResult['guides'])[];
  protected _passwordIndicatorsLen: number = this.passwordIndicatorsList.length;

  public passwordHintsDictionary: PasswordStrenghtDictionary = {
    length: '8+ charactes long',
    digit: 'Digit',
    upperCase: 'Upper case letter',
    lowerCase: 'Lower case letter',
    specialChar: `Special character from "${this.handyNgUtilsService.specialCharsList.join('')}"`,
    space: 'Empty space'
  };

  @Input('passwordStrengt') public set passwordStrengthHelp(strength: PasswordStrengthResult) {

    if (!strength) {
      this.parsedPasswordStrengt = this.handyNgUtilsService.getPasswordStrength(null);
    }

    this.parsedPasswordStrengt = strength;

    let newPasswordIndicatorsOrder: PasswordIndicatorName[] = [];

    for (let i = 0; i < this._passwordIndicatorsLen; i++) {
      const singleIndicatorName: PasswordIndicatorName = this.passwordIndicatorsList[i];

      if (this.parsedPasswordStrengt.guides[singleIndicatorName]) {
        newPasswordIndicatorsOrder.push(singleIndicatorName);
        continue;
      } 

      newPasswordIndicatorsOrder.unshift(singleIndicatorName);

    }

    this.passwordIndicatorsList = newPasswordIndicatorsOrder;

  }

  public _showPasswordHelp: boolean = false;
  @Input('showHelp') public set showPasswordHelp(show: boolean) {

    this._showPasswordHelp = show;

  }
  
  public _disablePasswordGenerator: boolean = false;
  @Input('disablePasswordGenerator') public set disablePasswordGenerator(show: boolean) {

    this._disablePasswordGenerator = show;

  }

  @Output('generatedPassword') public generatedPasswordEvent: EventEmitter<string> = new EventEmitter();

  constructor (public handyNgUtilsService: HandyNgUtilsService) { }

  public generatePassword(): void {
    this.generatedPasswordEvent.emit(this.handyNgUtilsService.generateStrongPassword());
  }

  ngOnInit(): void {
  }

}