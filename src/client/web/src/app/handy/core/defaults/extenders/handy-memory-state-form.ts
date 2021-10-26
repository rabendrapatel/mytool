import { HandyNgUserService, HandyNgUtilsService } from '@handy-ng/services';
import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Optional, Inject, ViewChild, Directive } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HandyFormComponent } from 'src/app/handy/modules/handy-form/components/handy-form/handy-form.component';

@Directive()
export abstract class DefaultHandyMemoryStateForm<FormDataType = any, DialogData extends DefaultDialogData<FormDataType> = any> {

  abstract formName: string;
  abstract rememberFormState: boolean;
  abstract form: FormGroup;

  public resolverData: Partial<FormDataType>;
  public isUpdate: boolean = false;
  public inDialog: boolean = false;
  public updateEntryId: any;
  public submitDisabled: boolean = false;
  public defaultFormStateVal: any = {};

  @ViewChild(HandyFormComponent, { static: false }) public formComponent: HandyFormComponent;

  constructor (
    protected _handyNgUserService: HandyNgUserService,
    public handyNgUtilsService: HandyNgUtilsService,
    @Optional() public dialogRef?: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData?: DialogData,    
    @Optional() protected route?: ActivatedRoute) {

  }

  protected _loadResolverData(): Partial<FormDataType> {

    let result: Partial<FormDataType> = {};

    let hasResolverData: boolean = false;

    if (this.dialogRef) {
      this.inDialog = true;
    }

    if (this.inDialog && this.dialogData && this.dialogData.formData) {
      result = this.dialogData.formData;
      hasResolverData = true;
    }

    if (!this.inDialog && this.route && this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.formData) {
      result = this.route.snapshot.data.formData;
      hasResolverData = true;
    }

    if (hasResolverData) {

      this.updateEntryId = (<any>result)._id;

      if (this.updateEntryId) {
        this.isUpdate = true;
        this.rememberFormState = false;        
      }
      
      this.resolverData = result;

    }

    return result;

  }

  protected abstract getFormInitData(resolverData?: Partial<FormDataType>): Partial<FormDataType>;

  protected abstract createForm(initialFormData: Partial<FormDataType>): FormGroup;

  protected initExtender(): void {

    this._loadResolverData();

    let initialFormData: Partial<FormDataType> = this.getFormInitData(this.resolverData);

    if (this.rememberFormState && (this.handyNgUtilsService.isEmptyObject(initialFormData) || !initialFormData)) {
      initialFormData = this._handyNgUserService.getFormStateVal(this.formName, this.defaultFormStateVal);
    }

    if (!initialFormData) {
      initialFormData = {};
    }

    this.form = this.createForm(initialFormData);

  }

  public onValidSubmit(formData: FormDataType): void {

  }

  public onInvalidSubmit(formData: FormDataType): void {

  }

  public closeDialog(data?: any): void {

    if (!this.inDialog) {
      return;
    }

    this.dialogRef.close(data);

  }

  public removeControlFromArray(arrayName: string, index: number): void {

    (<FormArray>this.form.get(arrayName)).removeAt(index);

  }

  public addControlToFormArray(arrayName: string, control: FormControl | AbstractControl | FormGroup | FormArray, fg?: FormGroup): void {

    if (!fg) {
      fg = this.form;
    }

    (<FormArray>fg.get(arrayName)).push(control);

  }

  public getArrayControls(arrayName: string): FormControl[] {

    return this.form.get(arrayName)['controls'];

  }

  public addBulkControlToFormArray(values: any[], method: Function, fg?: FormGroup): void {

    if (!values) {
      return;
    }

    if (!fg) {
      fg = this.form;
    }

    let valuesLen: number = values.length;
    for (let i = 0; i < valuesLen; i++) {
      const singelVal = values[i];
      method(singelVal, fg);
    }

  }

  public triggerSubmit(): void {

    if (this.formComponent) {
      this.formComponent.triggerSubmit();
    }

  }
  
  public showErrs(): void {

    if (this.formComponent) {
      this.formComponent.showAllErrors();
    }

  }

  public submitDisabledChange(disabled: boolean): void {

    this.submitDisabled = disabled;

  }

}

export type DefaultDialogData<T = any> = {
  formData: Partial<T>
}