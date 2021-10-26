import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService, HandyNgLayoutService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { required } from '@ng-shared/form-validators';
import { UserModelInterfaces } from '@server/models/user/model.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-preferences-form',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss']
})
export class UserPreferencesComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit, OnDestroy {

  public form: FormGroup;
  public formName = 'userPreferences';
  public rememberFormState: boolean = false;

  @Input() public isInCompleteRegistrationsSteps: boolean = false;

  public sidenavPositionRadioBtns: HandyNgRadioGroupOptionsData<UserModelInterfaces['fullModelShape']['preferences']['webSidenavPosition']> = {
    buttons: [
      // ? I know the are swapped, my bad, will be fixed later...
      {
        value: 'over',
        label: 'Side'
      },
      {
        value: 'side',
        label: 'Below'
      }
    ]
  };

  public notificationVerticalPositionRadioBtns: HandyNgRadioGroupOptionsData<UserModelInterfaces['fullModelShape']['preferences']['webNotificationPosition']['vertical']> = {
    buttons: [
      // ? I know the are swapped, my bad, will be fixed later...
      {
        value: 'top',
        label: 'Top'
      },
      {
        value: 'bottom',
        label: 'Bottom'
      }
    ]
  };

  public notificationHozizontalPositionRadioBtns: HandyNgRadioGroupOptionsData<UserModelInterfaces['fullModelShape']['preferences']['webNotificationPosition']['horizontal']> = {
    buttons: [
      // ? I know the are swapped, my bad, will be fixed later...
      {
        value: 'center',
        label: 'Center'
      },
      {
        value: 'left',
        label: 'Left'
      },
      {
        value: 'right',
        label: 'Right'
      }
    ]
  };

  protected _userChangeSub: Subscription;

  constructor (
    @Optional() public dialogRef: MatDialogRef<UserPreferencesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _handyNgUserService: HandyNgUserService,
    public handyNgLayoutService: HandyNgLayoutService,
    public handyNgUtilsService: HandyNgUtilsService,) {

    super(_handyNgUserService, handyNgUtilsService);

    this.initExtender();

    this._userChangeSub = this._handyNgUserService.userChange().subscribe(() => {
      this.form.setValue(this.getFormInitData(), { emitEvent: false, onlySelf: true });
    })

  }

  ngOnInit(): void {
  }

  getFormInitData(): Partial<FormDataShape> {

    return {
      webDarkTheme: this.handyNgLayoutService.darkTheme,
      webSidenavPosition: this.handyNgLayoutService.sidenavPosition,
      notificationVerticalPosition: this.handyNgLayoutService.notificationPosition.vertical,
      notificationHorizontalPosition: this.handyNgLayoutService.notificationPosition.horizontal,
      notificationDuration: this.handyNgLayoutService.notificationDuration,
    };

  }

  createForm(formInitData: Partial<FormDataShape>): FormGroup {

    let fg: FormGroup = new FormGroup({
      webDarkTheme: new FormControl(formInitData.webDarkTheme),
      webSidenavPosition: new FormControl(formInitData.webSidenavPosition),
      notificationVerticalPosition: new FormControl(formInitData.notificationVerticalPosition),
      notificationHorizontalPosition: new FormControl(formInitData.notificationHorizontalPosition),
      notificationDuration: new FormControl(formInitData.notificationDuration),
    })

    return fg;

  }

  public notificationPositionPreferenceChange(): void {

    let { notificationDuration, notificationHorizontalPosition, notificationVerticalPosition } = this.form.value as FormDataShape;

    let hasDiffer: boolean = false;

    if (this.handyNgLayoutService.notificationPosition.vertical !== notificationVerticalPosition) {
      hasDiffer = true;
    }

    if (this.handyNgLayoutService.notificationPosition.horizontal !== notificationHorizontalPosition) {
      hasDiffer = true;
    }

    if (this.handyNgLayoutService.notificationDuration !== notificationDuration) {
      hasDiffer = true;
    }

    if (!hasDiffer) {
      return;
    }

    this.handyNgLayoutService.setNotificationPosition({
      vertical: notificationVerticalPosition,
      horizontal: notificationHorizontalPosition
    }, true);

    this.handyNgLayoutService.setNotificationDuration(notificationDuration, true);
    this._handyNgUserService.notify.simpleMsgNotification({ headline: 'Example notification' });

  }

  // (value: number) => string | number
  public notificationDurationInputLabel(value: number): string | number {
    return `${value} s`;
  }

  ngOnDestroy() {

    if (this._userChangeSub) {
      this._userChangeSub.unsubscribe()
    }

  }

}

type FormDataShape = {

  webDarkTheme: UserModelInterfaces['fullModelShape']['preferences']['webDarkTheme'],
  webSidenavPosition: UserModelInterfaces['fullModelShape']['preferences']['webSidenavPosition'],
  notificationVerticalPosition: UserModelInterfaces['fullModelShape']['preferences']['webNotificationPosition']['vertical'],
  notificationHorizontalPosition: UserModelInterfaces['fullModelShape']['preferences']['webNotificationPosition']['horizontal'],
  notificationDuration: UserModelInterfaces['fullModelShape']['preferences']['webNotificationDurationInSeconds'],

}
type DialogData = {
  formData: Partial<FormDataShape>
}
