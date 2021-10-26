import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions, PasswordStrengthResult } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService, HandyNgLayoutService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { UserNgModel } from '@handy-ng/models/user.ng-model';
import { UserModelInterfaces } from '@server-models/user/model.interface';
import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { required, email, password } from '@ng-shared/form-validators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-profile-form',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends HandyMemoryStateForm<FormDataShape> implements OnDestroy {

  public form: FormGroup;
  public formName = 'userProfile';
  public rememberFormState: boolean = false;

  public newEmail: string;
  public passwordStrengthHelp: PasswordStrengthResult;

  public updateEntryId: number;

  protected _userChangeSub: Subscription;

  constructor (
    @Optional() public dialogRef: MatDialogRef<UserProfileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _router: Router,
    protected _route: ActivatedRoute,
    protected _handyNgUserService: HandyNgUserService,
    public handyNgUtilsService: HandyNgUtilsService,
    protected _model: UserNgModel) {

    super(_handyNgUserService, handyNgUtilsService);

    this.initExtender();

    this._userChangeSub = this._handyNgUserService.userChange().subscribe(() => {
      this._refreshFormData();
    })

  }

  protected _refreshFormData(): void {
    this.form.setValue(this.getFormInitData());
  }

  public onValidSubmit(formData: FormDataShape): void {

    let { email, password = null, name } = formData;

    let DTO: Partial<UserModelInterfaces['fullModelShape']> = {
      email,
      name
    }

    if (password) {
      DTO.password = password;
    }

    this._model.updatedOne({ _id: this.updateEntryId }, DTO, { skipUpdateHistory: false, updateName: 'UserProfile form update' })
      .subscribe(result => {

        this._handyNgUserService.refreshUserData(() => {

          if (!this.inDialog) {
            this._refreshFormData();
            this._handyNgUserService.notify.simpleMsgNotification({ headline: 'Your profile was updated'});
          }

          this.closeDialog({ ...formData, ...{ _id: this.updateEntryId } });

        })

      }, err => {

        this._handyNgUserService.notify.apiErrNotification(err, 'Profile upload');

      })

  }

  getFormInitData(): Partial<FormDataShape> {

    let { email, name, newEmail, _id } = this._handyNgUserService.userData;
    this.updateEntryId = _id;

    this.newEmail = newEmail;

    return {
      email,
      name,
      password: null
    };

  }

  createForm(formInitData: Partial<FormDataShape>): FormGroup {

    let fg: FormGroup = new FormGroup({
      email: new FormControl(formInitData.email, [required('Email is required'), email()], [this._model.uniqueValidator('email', 'This email is taken', formInitData.email, 'all')]),
      password: new FormControl(null, [password(this.handyNgUtilsService)], [/* Async validators */]),
      name: new FormControl(formInitData.name, [required('Name is required')], [/* Async validators */]),
    })

    return fg;

  }

  public asignGeneratedPassword(newPassword: string): void {
    this.form.get('password').setValue(newPassword);
  }

  public sendVerificationEmail(): void {

    this._handyNgUserService.requestAuthEmail(this.newEmail, 'verify')
      .then(() => {

        this._handyNgUserService.notify.simpleMsgNotification({
          headline: 'Verification email sent',
          msg: `Check ${this.newEmail} inbox to verify your new account email`
        })

      })
      .catch(err => {
        this._handyNgUserService.notify.apiErrNotification(err, 'Verification email');
      })

  }

  public cancelEmailChange(): void {

    this._model.updatedOne({ _id: this.updateEntryId }, { newEmail: null, emailVerificationHash: null }, { skipUpdateHistory: false, updateName: 'Email change cancelation' })
      .subscribe(result => {

        this._handyNgUserService.refreshUserData(() => {

          if (!this.inDialog) {
            this._refreshFormData();
            this._handyNgUserService.notify.simpleMsgNotification({ headline: 'Email change was canceled' });
          }

        })

      }, err => {

        this._handyNgUserService.notify.apiErrNotification(err, 'Canceling email change');

      })

  }

  ngOnDestroy() {

    this.handyNgUtilsService.unsubscribeAll([
      this._userChangeSub
    ])

  }
}

type ModelFieldsFormWorksWith = Extract<UserModelInterfaces['allFields'], 'email' | 'name' | 'password'>;
type FormDataShape = Pick<UserModelInterfaces['fullModelShape'], ModelFieldsFormWorksWith> & {

}
type DialogData = {
  formData: Partial<FormDataShape>
}
