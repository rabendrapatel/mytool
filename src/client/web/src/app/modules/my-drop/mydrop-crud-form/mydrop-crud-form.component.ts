import { HandyAutoCompleteData, HandyNgSelectOptionsData, HandyNgRadioGroupOptionsData, HandyNgSelectOptions, HandyFileInputData } from '@handy-ng/types';
import { HandyNgUserService, HandyNgUtilsService } from '@handy-ng/services';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HandyMemoryStateForm } from '@handy-ng/extenders/handy-memory-state-form';

import { MydropNgModel } from '@handy-ng/models/mydrop.ng-model';
import { MydropModelInterfaces } from '@server-models/mydrop/model.interface';
import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, ActivatedRoute } from '@angular/router';

import { required } from '@ng-shared/form-validators';

@Component({
  selector: 'mydrop-crud-form-form',
  templateUrl: './mydrop-crud-form.component.html',
  styleUrls: ['./mydrop-crud-form.component.scss']
})
export class MydropCrudFormComponent extends HandyMemoryStateForm<FormDataShape> implements OnInit {

  public form: FormGroup;
  public formName = 'mydropCrudForm';
  public rememberFormState: boolean = true;

  public static fieldsToSelect: ModelFieldsFormWorksWith[] = ['content', 'password', 'expireAt'];



  constructor (
    @Optional() protected route: ActivatedRoute,
    @Optional() public dialogRef: MatDialogRef<MydropCrudFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    protected _handyNgUserService: HandyNgUserService, 
    public handyNgUtilsService: HandyNgUtilsService, 
    protected _model: MydropNgModel) {
    
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

      this._model.createOne(formData).subscribe(result => {

        this.updateEntryId = result.data._id;
        return resolve();

      }, err => {
        return reject(err);
      })

    })

  } 

  protected _updateEntry(formData: FormDataShape): Promise<void> {

    return new Promise((resolve, reject) => {

      this._model.updatedOne({ _id: this.updateEntryId }, formData, { skipUpdateHistory: false, updateName: 'MydropCrudFormComponent form update' }).subscribe(result => {
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
      content: new FormControl(formInitData.content, [required('Content is required')], [/* Async validators */]),
      password: new FormControl(formInitData.password, [required('Password is required')], [/* Async validators */]),
      expireAt: new FormControl(formInitData.expireAt, [required('Expiration is required')], [/* Async validators */]),
    })


  return fg;
  
  }


}

/* -------------------------------------------------------------------------- */
/*                                Form resolver                               */
/* -------------------------------------------------------------------------- */

@Injectable({
  providedIn: 'root'
})
export class MydropCrudFormComponentResolver implements Resolve<Partial<FormDataShape>>{

  constructor (protected _model: MydropNgModel) {}

  // Can be used for modal integration
  public getItemData(id: MydropModelInterfaces['idType']): Promise<Partial<FormDataShape>> {

    if (id === undefined) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {

      this._model.findById(id, { selectType: 'select', fields: MydropCrudFormComponent.fieldsToSelect })
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
  import { MydropCrudFormComponent, MydropCrudFormComponentResolver } from 'path to this file..';
  ...

  ...
  {
    path: 'route-path/:id',
    component: MydropCrudFormComponent,
    resolve: {
      formData: MydropCrudFormComponentResolver
    }
  },
  ...

*/

/* ------------------------------- Via dialog ------------------------------- */

/* 

  ...
  import { MydropCrudFormComponent, MydropCrudFormComponentResolver } from 'path to this file..';
  import { MatDialog } from '@angular/material/dialog';
  ...

  ...
  constructor (public dialog: MatDialog, private formResolver: MydropCrudFormComponentResolver) { }
  ...

  openDialog(id?: number) {

    this.formResolver.getItemData(id)
      .then(formData => {

      const dialogRef = this.dialog.open(MydropCrudFormComponent, {
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

type ModelFieldsFormWorksWith = Extract<MydropModelInterfaces['allFields'], 'content' | 'password' | 'expireAt'>;
type FormDataShape = Pick<MydropModelInterfaces['fullModelShape'], ModelFieldsFormWorksWith> & {
}
type DialogData = {
  formData: Partial<FormDataShape>
}
