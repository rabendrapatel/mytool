import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions, PasswordStrengthResult, UnSignedObject } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService, HandyNgConfigService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { required, email, password } from '@ng-shared/form-validators';
import { UserNgModel } from '@handy-ng/models/user.ng-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit {

  public form: FormGroup;
  public formName = 'register';
  public rememberFormState: boolean = false;
  public passwordStrengthHelp: PasswordStrengthResult;

  constructor (
    @Optional() public dialogRef: MatDialogRef<RegisterComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _handyNgUserService: HandyNgUserService, 
    protected _handyNgConfigService: HandyNgConfigService,
    protected _route: ActivatedRoute,
    protected _router: Router,
    protected _userModel: UserNgModel, 
    public handyNgUtilsService: HandyNgUtilsService, ) {
    
    super(_handyNgUserService, handyNgUtilsService);
    
    this.initExtender();
  }

  ngOnInit(): void {

    
  }

  public onValidSubmit(formData: FormDataShape): void {

    let { registrationEmail, password } = formData;
    let redirectTo: string = '/auth-msg';
    let queryParams: UnSignedObject = { email: registrationEmail, action: 'afterRegister' };

    this._handyNgUserService.register(registrationEmail, password)
    .then(result => {

      if (result.success && !this._handyNgConfigService.data.userRegistration.verifyEmail) {

        redirectTo = '/dashboard';
        queryParams = null;
        return this._handyNgUserService.login(registrationEmail, password) as any;

      }

      return Promise.resolve();

    })
    .then(() => {

      this._router.navigate([redirectTo], { queryParams });

    })
    .catch(err => {

      this._handyNgUserService.redirectToErrPageWithApiErr(err);

    })

  }
  
  public onInvalidSubmit(formData: FormDataShape): void {
    // console.log(formData)
  }

  getFormInitData(): Partial<FormDataShape> {
    
    return {
      registrationEmail: (this._route.snapshot.queryParams.email) ? this._route.snapshot.queryParams.email : null
    };

  }
  
  createForm(formInitData: Partial<FormDataShape>): FormGroup {

    let fg: FormGroup = new FormGroup({
      registrationEmail: new FormControl(formInitData.registrationEmail, [email(), required('Email is required')], [this._userModel.uniqueValidator('email', 'This email is already taken')]),
      password: new FormControl(null, [required('Password is required'), password(this.handyNgUtilsService)])
    })  

    return fg;
  
  }

  public asignGeneratedPassword(newPassword: string): void {
    this.form.get('password').setValue(newPassword);
  }

}

type FormDataShape = {

  registrationEmail: string,
  password: string

}
type DialogData = {
  formData: Partial<FormDataShape>
}
