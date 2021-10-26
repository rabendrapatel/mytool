import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions, EmailRequestAction } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { required, email } from '@ng-shared/form-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserNgModel } from '@handy-ng/models/user.ng-model';

@Component({
  selector: 'email-request-form',
  templateUrl: './email-request.component.html',
  styleUrls: ['./email-request.component.scss']
})
export class EmailRequestComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit {

  public form: FormGroup;
  public formName = 'emailRequest';
  public rememberFormState: boolean = false;

  public action: EmailRequestAction;
  public actionsList: EmailRequestAction[] = [
    'passwordReset', 'unlock', 'verify'
  ];

  public headline: EmailRequestActionStrings = {
    passwordReset: 'Password reset link',
    unlock: 'Unlock account link',
    verify: 'Verify email link'
  };

  constructor (
    @Optional() public dialogRef: MatDialogRef<EmailRequestComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _route: ActivatedRoute,
    protected _router: Router,
    protected _userModel: UserNgModel,
    protected _handyNgUserService: HandyNgUserService,
    public handyNgUtilsService: HandyNgUtilsService,) {

    super(_handyNgUserService, handyNgUtilsService);

    this.initExtender();

    let action: EmailRequestAction = this._route.snapshot.params['action'];
    if (!this.actionsList.includes(action)) {
      this._handyNgUserService.redirectToErrPage('404');
    }

    this.action = action;

  }

  ngOnInit(): void {

    if (this.form.get('accountEmail').value) {

      setTimeout(() => {
        this.showErrs();
      }, 1500);

    }

  }

  public onValidSubmit(formData: FormDataShape): void {

    let { accountEmail } = formData;
    this._handyNgUserService.requestAuthEmail(accountEmail, this.action)
    .then(() => {

      this._router.navigate(['auth-msg'], { queryParams: { email: accountEmail, action: this.action } });

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
      accountEmail: this._route.snapshot.queryParams['email']
    };

  }

  createForm(formInitData: Partial<FormDataShape>): FormGroup {

    let fg: FormGroup = new FormGroup({
      accountEmail: new FormControl(formInitData.accountEmail, [email(), required('Email is required')], [this._userModel.mustExistValidator('email', 'Unknown account')])
    })

    return fg;

  }

}

type FormDataShape = {

  accountEmail: string

}
type DialogData = {
  formData: Partial<FormDataShape>
}

type EmailRequestActionStrings = { [key in EmailRequestAction]: string };
