import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService, HandyNgConfigService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { UserNgModel } from '@handy-ng/models/user.ng-model';
import { UserModelInterfaces } from '@server-models/user/model.interface';
import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, ActivatedRoute } from '@angular/router';

import { required } from '@ng-shared/form-validators';

@Component({
  selector: 'user-crud-form-form',
  templateUrl: './user-crud-form.component.html',
  styleUrls: ['./user-crud-form.component.scss']
})
export class UserCrudFormComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit {

  public form: FormGroup;
  public formName = 'userCrudForm';
  public rememberFormState: boolean = false;
  public sample: any;

  public static fieldsToSelect: ModelFieldsFormWorksWith[] = ['email', 'name', 'roles', 'permissions', 'groups', 'banned'];

  /* -------------------------------------------------------------------------- */
  /*                          Options for select inputs                         */
  /* -------------------------------------------------------------------------- */

  public rolesSelectOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public permissionsSelectOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  


  /* -------------------------------------------------------------------------- */
  /*                          Radio groups btns                                 */
  /* -------------------------------------------------------------------------- */

  constructor (
    @Optional() protected route: ActivatedRoute,
    @Optional() public dialogRef: MatDialogRef<UserCrudFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _handyNgUserService: HandyNgUserService, 
    public handyNgUtilsService: HandyNgUtilsService, 
    private __handyNgConfig: HandyNgConfigService,
    protected _model: UserNgModel) {
    
    super(_handyNgUserService, handyNgUtilsService, dialogRef, dialogData, route);
    
    this.initExtender();

  }

  ngOnInit(): void {
  }

  public onValidSubmit(formData: FormDataShape): void {

    let promise: Promise<void> = (this.isUpdate) ? this._updateEntry(formData) : this._createEntry(formData);

    promise.then(() => {

      // TODO Redirect or whatever needs to be done after update;

      this.closeDialog({ ...formData, ...{ _id: this.updateEntryId }});

    })
    .catch(err => {
      this._handyNgUserService.redirectToErrPageWithApiErr(err);
    })

  }
  
  public onInvalidSubmit(formData: FormDataShape): void {
    // console.log(formData)
  }

  protected _createEntry(formData: FormDataShape): Promise<void> {

    return new Promise((resolve, reject) => {

      this._model.createOne({ ...formData, registeredViaInvitation: true }).subscribe(result => {

        this.updateEntryId = result.data._id;
        return resolve();

      }, err => {
        return reject(err);
      })

    })

  } 

  protected _updateEntry(formData: FormDataShape): Promise<void> {

    return new Promise((resolve, reject) => {

      this._model.updatedOne({ _id: this.updateEntryId }, formData, { skipUpdateHistory: false, updateName: 'LoginComponent form update' }).subscribe(result => {
        return resolve();
      }, err => {
        return reject(err);
      })

    })

  }

  protected getFormInitData(resolverData: Partial<FormDataShape>): Partial<FormDataShape> {

    return resolverData;

  }
  
  createForm(formInitData: Partial<FormDataShape>): FormGroup {

    let fg: FormGroup = new FormGroup({
      email: new FormControl(formInitData.email, [required('Email is required')], [this._model.uniqueValidator('email', 'This email is taken', formInitData.email, 'all')]),
      name: new FormControl(formInitData.name, [/* Sync validators */], [/* Async validators */]),
      roles: new FormControl(formInitData.roles, [/* Sync validators */], [/* Async validators */]),
      permissions: new FormControl(formInitData.permissions, [/* Sync validators */], [/* Async validators */]),
      groups: new FormArray([]),
      banned: new FormControl(formInitData.banned, [/* Sync validators */], [/* Async validators */]),
    })

  /* -------------------------------------------------------------------------- */
  /*                          Form arrays handling                              */
  /* -------------------------------------------------------------------------- */
  this.addBulkControlToFormArray(formInitData.groups, this.addGroupsControl.bind(this), fg);

  return fg;
  
  }


  /* -------------------------------------------------------------------------- */
  /*              Methods for adding controls to form arrays                    */
  /* -------------------------------------------------------------------------- */
  
  public addGroupsControl(value: any = null, fg?: FormGroup): void {

    let control: FormControl | FormArray | FormGroup = new FormControl(value, [/* Sync validators */], [/* Async validators */]);
    this.addControlToFormArray('groups', control, fg);

  }
  

}

/* -------------------------------------------------------------------------- */
/*                                Form resolver                               */
/* -------------------------------------------------------------------------- */

@Injectable({
  providedIn: 'root'
})
export class UserCrudFormComponentResolver implements Resolve<Partial<FormDataShape>>{

  constructor (protected _model: UserNgModel) {}

  // Can be used for modal integration
  public getItemData(id: UserModelInterfaces['idType']): Promise<Partial<FormDataShape>> {

    if (id === undefined) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {

      this._model.findById(id, { selectType: 'select', fields: UserCrudFormComponent.fieldsToSelect })
        .subscribe(result => {

          if (result.data.foundRecord) {
            return resolve(result.data.doc);
          } else {
            return resolve(null);
          }

        }, err => {
          return resolve(null);
        })

    })

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Partial<FormDataShape>> {

    return this.getItemData(+route.params['id']);

  }

}

/* -------------------------------------------------------------------------- */
/*                               Resolver usage                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Via route ------------------------------- */
/*
  ...
  import { UserCrudFormComponent, UserCrudFormComponentResolver } from 'path to this file..';
  ...

  ...
  {
    path: 'route-path/:id',
    component: UserCrudFormComponent,
    resolve: {
      formData: UserCrudFormComponentResolver
    }
  },
  ...

*/

/* ------------------------------- Via dialog ------------------------------- */

/* 

  ...
  import { UserCrudFormComponent, UserCrudFormComponentResolver } from 'path to this file..';
  import { MatDialog } from '@angular/material/dialog';
  ...

  ...
  constructor (public dialog: MatDialog, private formResolver: UserCrudFormComponentResolver) { }
  ...

  openDialog(id?: number) {

    this.formResolver.getItemData(id)
      .then(formData => {

      const dialogRef = this.dialog.open(UserCrudFormComponent, {
        data: { formData }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    })
    .catch(err => {
      // Handle error
    })

  }
*/

type ModelFieldsFormWorksWith = Extract<UserModelInterfaces['allFields'], 'email' | 'name' | 'roles' | 'permissions' | 'groups' | 'banned'>;
type FormDataShape = Pick<UserModelInterfaces['fullModelShape'], ModelFieldsFormWorksWith> & {
}
type DialogData = {
  formData: Partial<FormDataShape>
}
