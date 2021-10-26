import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService, HandyNgConfigService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { required, email } from '@ng-shared/form-validators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit, OnDestroy {

  public form: FormGroup;
  public formName = 'login';
  public rememberFormState: boolean = false;

  public loginErrMsg: string;
  public requestEmail: false | 'unlock' | 'verifyEmail' = false;
  public unlockCountDown: number;
  public openRegistration: boolean;
  protected _coutDownSub: Subscription;


  constructor (
    @Optional() public dialogRef: MatDialogRef<LoginComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _ngConfig: HandyNgConfigService,
    protected _handyNgUserService: HandyNgUserService,
    protected _route: ActivatedRoute,
    public handyNgUtilsService: HandyNgUtilsService,) {

    super(_handyNgUserService, handyNgUtilsService);

    this.openRegistration = this._ngConfig.data.userRegistration.openRegistration;

    this.initExtender();

  }

  ngOnInit(): void {
  }

  public onValidSubmit(formData: FormDataShape): void {

    let { email, password } = formData;
    this._handyNgUserService.login(email, password)
      .then(loginResult => {

        let { failReason = null, lockTimeLeft } = loginResult;

        if (failReason) {

          switch (failReason) {

            case 'unverified':

              this.loginErrMsg = `This account has not been verified yet. Check your email or request verification email.`;
              this.requestEmail = 'verifyEmail';
              this.unlockCountDown = null;

              break;

            case 'locked':

              this.loginErrMsg = `This account is locked due too many failed login attempts.`;
              this.requestEmail = 'unlock';
              this._startCountDown(lockTimeLeft);

              break;

            case 'banned':

              this.loginErrMsg = `This account is banned.`;
              this.requestEmail = false;
              this.unlockCountDown = null;

              break;

            default:

              this.loginErrMsg = 'Invalid login credential.';
              this.requestEmail = false;
              this.unlockCountDown = null;

              break;
          }

          return;

        }

        this._handyNgUserService.redirectToDashboard();
        this.clearMessages();

      })
      .catch(err => {

        console.log(err);

        this._handyNgUserService.redirectToErrPageWithApiErr(err);

      })

  }

  public onInvalidSubmit(formData: FormDataShape): void {
    // console.log(formData)
  }

  protected _startCountDown(initial: number): void {

    this._coutDownSub = this.handyNgUtilsService.countDown(Math.floor(initial)).subscribe(step => {

      let { timeLeft, complete } = step;

      this.unlockCountDown = timeLeft;

      if (complete) {
        this.clearMessages();
      }

    })

  }

  public clearMessages(): void {

    this.unlockCountDown = null;
    this.loginErrMsg = null;
    this.requestEmail = false;

    if (this._coutDownSub) {
      this._coutDownSub.unsubscribe();
    }

  }

  getFormInitData(): Partial<FormDataShape> {

    return {
      email: this._route.snapshot.queryParams['email']
    };

  }

  createForm(formInitData: Partial<FormDataShape>): FormGroup {

    let fg: FormGroup = new FormGroup({
      email: new FormControl(formInitData.email, [email(), required('Email is required')]),
      password: new FormControl(null, [required('Password is required')])
    })

    return fg;

  }

  ngOnDestroy() {
    this.clearMessages();
  }

}

type FormDataShape = {

  email: string,
  password: string

}
type DialogData = {
  formData: Partial<FormDataShape>
}
