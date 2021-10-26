import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService, HandyNgLayoutService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { UserNgModel } from '@handy-ng/models/user.ng-model';
import { UserModelInterfaces } from '@server-models/user/model.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { required } from '@ng-shared/form-validators';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'complete-registration-form',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit {

  public form: FormGroup;
  public formName = 'completeRegistration';
  public rememberFormState: boolean = true;
  public defaultFormStateVal: FormDataShape = {
    preferences: {
      preferences: null
    },
    userProfile: {
      name: this._handyNgUserService.userData.name
    }
  }

  private _stepperStateName: string = 'completeRegistrationComponent_stepper_index';
  public stepIndex: number = this._handyNgUserService.getStateVal(this._stepperStateName, 0);

  constructor (
    @Optional() public dialogRef: MatDialogRef<CompleteRegistrationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _handyNgUserService: HandyNgUserService,
    public handyNgUtilsService: HandyNgUtilsService,
    public handyNgLayoutService: HandyNgLayoutService,
    protected _router: Router,
    protected _model: UserNgModel) {

    super(_handyNgUserService, handyNgUtilsService);

    this.initExtender();

  }

  ngOnInit(): void {
  }

  public onValidSubmit(formData: FormDataShape): void {

    // ? Preferrences are updated via HandyNgLayoutService...

    let { userProfile } = formData;

    let DTU: Partial<UserModelInterfaces['fullModelShape']> = {
      completeProfile: true,
      name: formData.userProfile.name,
    }

    this._model.updatedOne({ _id: this._handyNgUserService.userData._id }, DTU, { skipUpdateHistory: false, updateName: 'CompleteRegistration form update' })
      .subscribe(result => {

        this._handyNgUserService.refreshUserData(() => {

          this._handyNgUserService.resetStateVal(this._stepperStateName);

          this._router.navigate(['/dashboard']);        
          this.closeDialog({ ...formData, ...{ _id: this._handyNgUserService.userData._id } });
          this._handyNgUserService.notify.simpleMsgNotification({
            msg: 'Your registration was completed'
          })

        })

      }, err => {
        this._handyNgUserService.redirectToErrPageWithApiErr(err);
      })

  }

  getFormInitData(resolverData?: Partial<FormDataShape>): Partial<FormDataShape> {

    return {};

  }

  createForm(formInitData: Partial<FormDataShape>): FormGroup {

    let { userProfile } = formInitData;

    let fg: FormGroup = new FormGroup({
      // Just an placeholder, stepper needs control...
      preferences: new FormControl(null),
      userProfile: new FormGroup({
        name: new FormControl(userProfile.name, [required('Name is required')], [/* Async validators */]),
      })      
    })

    return fg;

  }

  public stepChange(event: StepperSelectionEvent): void {
    this._handyNgUserService.saveStateVal(this._stepperStateName, event.selectedIndex);
  }


}

type FormDataShape = {
  preferences: {
    preferences: any,
  },
  userProfile: {
    name: UserModelInterfaces['fullModelShape']['name']
  }
}
type DialogData = {
  formData: Partial<FormDataShape>
}
