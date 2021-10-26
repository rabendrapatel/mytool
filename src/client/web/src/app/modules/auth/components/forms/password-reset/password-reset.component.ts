import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions, PasswordStrengthResult, UnSignedObject } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { required, password } from '@ng-shared/form-validators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'password-reset-form',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit {

  public form: FormGroup;
  public formName = 'passwordReset';
  public rememberFormState: boolean = false;

  public email: string;
  protected _hash: string;

  public passwordStrengthHelp: PasswordStrengthResult;
  public isInvitation: boolean = false;

  constructor (
    @Optional() public dialogRef: MatDialogRef<PasswordResetComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _handyNgUserService: HandyNgUserService, 
    protected _route: ActivatedRoute,
    protected _router: Router,
    public handyNgUtilsService: HandyNgUtilsService, ) {
    
    super(_handyNgUserService, handyNgUtilsService);
    
    this.initExtender();

    this.isInvitation = this._router.url.includes('invitation-password-set');
    
    let { email, hash } = this._route.snapshot.params;
    this.email = email;
    this._hash = hash;

  }

  ngOnInit(): void {
  }

  public onValidSubmit(formData: FormDataShape): void {

    let { newPassword } = formData;
    this._handyNgUserService.resetPassword(this.email, newPassword, this._hash)
    .then(result => {

      if (result.success) {
        
        let redirectTo: string = '/auth-msg';
        let queryParams: UnSignedObject = { email: this.email, action: 'afterPasswordReset' };
  
        this._router.navigate([redirectTo], { queryParams });
        return;

      } else {
        this._handyNgUserService.redirectToErrPage('500');
      }


    })
    .catch(err => {
      this._handyNgUserService.redirectToErrPageWithApiErr(err);
    })

  }
  
  public onInvalidSubmit(formData: FormDataShape): void {
    // console.log(formData)
  }

  getFormInitData(): Partial<FormDataShape> {
    
    return {};

  }
  
  createForm(formInitData: Partial<FormDataShape>): FormGroup {

    let fg: FormGroup = new FormGroup({
      newPassword: new FormControl(null, [required('New password is required'), password(this.handyNgUtilsService)])
    })  

    return fg;
  
  }

  public asignGeneratedPassword(newPassword: string): void {
    this.form.get('newPassword').setValue(newPassword);
  }

}

type FormDataShape = {

  newPassword: string

}
type DialogData = {
  formData: Partial<FormDataShape>
}
