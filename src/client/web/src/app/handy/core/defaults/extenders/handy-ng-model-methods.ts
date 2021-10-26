import { HandyNgApiService, HandyNgConfigService } from '@handy-ng/services';
import { Observable } from 'rxjs';
import {
  HandyApiCallResult, MongooseModelInterfaces,
  PublicConfigData, ArrayOrUnionToUnion, FilterQuery, HandyMongooseSelect,
  HandyMongooseModelPublicFindOpts, HandyMongooseFindResults, HandyMongooseModelPublicFindOneOpts,
  HandyMongooseFindOneResult, UnSignedObject, HandyMongooseModelUpdateOpts,
  HandyMongooseUpdateResult, HandyMongooseRemoveResult, HandyMongooseRestoreResult,
  MongooseIncludeDeletedOption, HandyMongooseDistinctManyResults,
  SingleOrArrayCombo, MognooseSearchRegexOptions, HandyNgModelDecoratorSettings,
} from '@handy-ng/types';
import { AsyncValidatorFn, FormControl, AbstractControl } from '@angular/forms';

export class DefaultHandyNgModelMethods<ModelInterface extends MongooseModelInterfaces> {

  protected _apiVersion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']>;
  private __modelName: string = (<HandyNgModelDecoratorSettings>this.constructor.prototype.__handyNgModelSettings).name;
  protected _modelApiEnpoint: string;

  constructor (
    protected _handyApiService: HandyNgApiService,
    protected _handyNgConfigService: HandyNgConfigService) {

    this._modelApiEnpoint = `model/${this.__modelName}/`;
    this._handyNgConfigService.onStateLoaded(() => {
      this._init();
    })

  }

  protected _init(): void {

    this._apiVersion = (this._apiVersion) ? this._apiVersion : this._handyNgConfigService.data.defaultApiVersions as ArrayOrUnionToUnion<PublicConfigData['apiVersions']>;

  }

  public createMany(docs: ModelInterface['createShape'][]): Observable<HandyApiCallResult<ModelInterface['fullModelShape'][]>> {

    return this._handyApiService.postRequest<ModelInterface['fullModelShape']>(this._modelApiEnpoint + 'createMany', docs, undefined, undefined, false, this._apiVersion);

  }

  public createOne(doc: ModelInterface['createShape']): Observable<HandyApiCallResult<ModelInterface['fullModelShape']>> {

    return this._handyApiService.postRequest<ModelInterface['fullModelShape']>(this._modelApiEnpoint + 'createOne', doc, undefined, undefined, false, this._apiVersion);

  }

  public find<T extends HandyMongooseSelect<ModelInterface["allFields"]> = ModelInterface['defaultSelect']>(
    where: FilterQuery<ModelInterface['fullModelShape']> = {},
    select?: T,
    findOptions: HandyMongooseModelPublicFindOpts<ModelInterface['allFields']> = {},
  ): Observable<HandyApiCallResult<HandyMongooseFindResults<ModelInterface, T>>> {

    return this._handyApiService.postRequest<HandyMongooseFindResults<ModelInterface, T>>(this._modelApiEnpoint + 'find', { where, select, findOptions }, undefined, undefined, false, this._apiVersion);

  }

  public findOne<T extends HandyMongooseSelect<ModelInterface["allFields"]> = ModelInterface['defaultSelect']>(
    where: FilterQuery<ModelInterface['fullModelShape']> = {},
    select?: T,
    findOptions: HandyMongooseModelPublicFindOneOpts<ModelInterface['allFields']> = {},
  ): Observable<HandyApiCallResult<HandyMongooseFindOneResult<ModelInterface, T>>> {

    return this._handyApiService.postRequest<HandyMongooseFindOneResult<ModelInterface, T>>(this._modelApiEnpoint + 'findOne', { where, select, findOptions }, undefined, undefined, false, this._apiVersion);

  }

  public findById<T extends HandyMongooseSelect<ModelInterface["allFields"]> = ModelInterface['defaultSelect']>(
    _id: ModelInterface['idType'],
    select?: T,
    findOptions: HandyMongooseModelPublicFindOneOpts<ModelInterface['allFields']> = {},
  ): Observable<HandyApiCallResult<HandyMongooseFindOneResult<ModelInterface, T>>> {

    return this._handyApiService.postRequest<HandyMongooseFindOneResult<ModelInterface, T>>(this._modelApiEnpoint + 'findById', { _id, select, findOptions }, undefined, undefined, false, this._apiVersion);

  }

  public updatedMany(
    where: FilterQuery<ModelInterface['fullModelShape']> = {},
    update: UnSignedObject,
    updateOptions: HandyMongooseModelUpdateOpts<ModelInterface['allFields']> = {},
  ): Observable<HandyApiCallResult<HandyMongooseUpdateResult>> {

    return this._handyApiService.putRequest<HandyMongooseUpdateResult>(this._modelApiEnpoint + 'updateMany', { where, update, updateOptions }, undefined, undefined, false, this._apiVersion);

  }

  public updatedOne(
    where: FilterQuery<ModelInterface['fullModelShape']> = {},
    update: UnSignedObject,
    updateOptions: HandyMongooseModelUpdateOpts<ModelInterface['allFields']> = {},
  ): Observable<HandyApiCallResult<HandyMongooseUpdateResult>> {

    return this._handyApiService.putRequest<HandyMongooseUpdateResult>(this._modelApiEnpoint + 'updateOne', { where, update, updateOptions }, undefined, undefined, false, this._apiVersion);

  }

  public deleteMany(
    where: FilterQuery<ModelInterface['fullModelShape']> = {}
  ): Observable<HandyApiCallResult<HandyMongooseRemoveResult>> {

    return this._handyApiService.postRequest<HandyMongooseRemoveResult>(this._modelApiEnpoint + 'deleteMany', { where }, undefined, undefined, false, this._apiVersion);

  }

  public deleteOne(
    where: FilterQuery<ModelInterface['fullModelShape']> = {}
  ): Observable<HandyApiCallResult<HandyMongooseRemoveResult>> {

    return this._handyApiService.postRequest<HandyMongooseRemoveResult>(this._modelApiEnpoint + 'deleteOne', { where }, undefined, undefined, false, this._apiVersion);

  }

  public deleteById(
    _id: ModelInterface['idType'],
  ): Observable<HandyApiCallResult<HandyMongooseRemoveResult>> {

    return this._handyApiService.deleteRequest<HandyMongooseRemoveResult>(this._modelApiEnpoint + 'deleteById', { _id }, undefined, undefined, this._apiVersion);

  }

  public restoreMany(
    where: FilterQuery<ModelInterface['fullModelShape']> = {}
  ): Observable<HandyApiCallResult<HandyMongooseRestoreResult>> {

    return this._handyApiService.putRequest<HandyMongooseRestoreResult>(this._modelApiEnpoint + 'restoreMany', { where }, undefined, undefined, false, this._apiVersion);

  }

  public restoreOne(
    where: FilterQuery<ModelInterface['fullModelShape']> = {}
  ): Observable<HandyApiCallResult<HandyMongooseRestoreResult>> {

    return this._handyApiService.putRequest<HandyMongooseRestoreResult>(this._modelApiEnpoint + 'restoreOne', { where }, undefined, undefined, false, this._apiVersion);

  }

  public restoreById(
    _id: ModelInterface['idType'],
  ): Observable<HandyApiCallResult<HandyMongooseRestoreResult>> {

    return this._handyApiService.putRequest<HandyMongooseRestoreResult>(this._modelApiEnpoint + 'restoreById', undefined, { _id }, undefined, false, this._apiVersion);

  }

  public countDocuments(
    where: FilterQuery<ModelInterface['fullModelShape']> = {},
    exact: boolean = true,
    deleted?: MongooseIncludeDeletedOption<ModelInterface["allFields"]>,
  ): Observable<HandyApiCallResult<number>> {

    return this._handyApiService.postRequest<number>(this._modelApiEnpoint + 'countDocuments', { where, exact, deleted }, undefined, undefined, false, this._apiVersion);

  }

  public distinct<T extends ModelInterface["allFields"] | ModelInterface["allFields"][]>(
    fieldNames: T,
    where: FilterQuery<ModelInterface['fullModelShape']> = {},
    deleted?: MongooseIncludeDeletedOption<ModelInterface["allFields"]>,
  ): Observable<HandyApiCallResult<HandyMongooseDistinctManyResults<ModelInterface, T>>> {

    return this._handyApiService.postRequest<HandyApiCallResult<HandyMongooseDistinctManyResults<ModelInterface, T>>>(this._modelApiEnpoint + 'distinct', { where, fieldNames, deleted }, undefined, undefined, false, this._apiVersion);

  }

  public search<T extends HandyMongooseSelect<ModelInterface["allFields"]> = ModelInterface['defaultSelect']>(
    searchValue: string | number,
    fields?: SingleOrArrayCombo<ModelInterface['searchableFields']>,
    select?: T,
    findOptions: HandyMongooseModelPublicFindOpts<ModelInterface['allFields']> & { regexOptions?: MognooseSearchRegexOptions } = {} = {},
    additionalSearchQueries: FilterQuery<ModelInterface['fullModelShape']>[] = [],
    additionalFilterQueries: FilterQuery<ModelInterface['fullModelShape']>[] = [],
  ): Observable<HandyApiCallResult<HandyMongooseFindResults<ModelInterface, T>>> {

    return this._handyApiService.postRequest<HandyMongooseFindResults<ModelInterface, T>>(this._modelApiEnpoint + 'search', { searchValue, select, findOptions, fields, additionalSearchQueries, additionalFilterQueries }, undefined, undefined, false, this._apiVersion);

  }

  public uniqueValidator(field: ModelInterface['allFields'], invalidMsg: string = 'This value is taken', ignoredVal?: any | any[], includeDeleted?: MongooseIncludeDeletedOption<ModelInterface['allFields']>): AsyncValidatorFn {

    return (control: FormControl | AbstractControl): Promise<any> => {

      let { value } = control;

      if (this.isEmpty(value) || value === ignoredVal || (Array.isArray(ignoredVal) && ignoredVal.includes(value))) {
        return Promise.resolve(null);
      }

      return new Promise((resolve, reject) => {

        if (typeof value === 'string') {
          value = value.trim();
        }

        this.countDocuments({ [field]: value }, true, includeDeleted).subscribe(result => {

          if (result.data > 0) {
            return resolve({ [`${field}_unique`]: invalidMsg });
          }

          return resolve(null);

        }, err => {
          return reject('Error while validating this field')
        })

      })

    }

  }
  
  public mustExistValidator(field: ModelInterface['allFields'], invalidMsg: string = 'This value does not exist', ignoredVal?: any | any[], includeDeleted?: MongooseIncludeDeletedOption<ModelInterface['allFields']>): AsyncValidatorFn {

    return (control: FormControl | AbstractControl): Promise<any> => {

      let { value } = control;

      if (this.isEmpty(value) || value === ignoredVal || (Array.isArray(ignoredVal) && ignoredVal.includes(value))) {
        return Promise.resolve(null);
      }

      return new Promise((resolve, reject) => {

        if (typeof value === 'string') {
          value = value.trim();
        }

        this.countDocuments({ [field]: value }, true, includeDeleted).subscribe(result => {

          if (result.data < 1) {
            return resolve({ [`${field}_must_exist`]: invalidMsg });
          }

          return resolve(null);

        }, err => {
          return reject('Error while validating this field')
        })

      })

    }

  }

  protected isEmpty(value: any): boolean {

  let result: boolean = false;

  switch (typeof value) {

    case 'object':
      result = this.isEmptyObject(value);
      break;

    case 'string':

      result = value.trim().length === 0;

      break;

    default:
      result = !(value);
      break;
  }


  return result;

}

  protected isEmptyObject(obj: Object): boolean {

  if (obj === null || obj === undefined) {
    return true;
  }

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});

}

}