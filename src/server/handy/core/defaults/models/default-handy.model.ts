import { Schema, model, Model, Document, SchemaTypes, FilterQuery } from 'mongoose';
import * as autoIncrement from 'mongoose-plugin-autoinc';

import { HandyJwtService, HandyConfigService, HandyErrorService } from '@services';
import {
  ConfigMongoDBInterface, DefaultMongoRoutingAccessRule, ModelSettings, MongooseModelInterfaces,
  HandyModelDeclaration, MongooseFieldType, MongoModelLevelAccesRules, MongoFieldAccess,
  MongooseModelFieldValidator, HandyMongooseSystemFields, HandyMongooseModelFindOpts,
  MongooseSortingOptions, SingleOrArrayCombo, MognooseSearchRegexOptions, HandyMongooseSelect,
  HandyError, ErrorPriority, ErrorReasons, ServerRequest, ServerResponse, UnSignedObject,
  HandyMongooseModelPublicFindOpts, MongooseIncludeDeletedOption, MongoChangesHistoryData,
  HandyMongooseFindResults, HandyMongooseModelPublicFindOneOpts, HandyMongooseFindOneResult,
  HandyMongooseModelUpdateOpts, HandyMongooseUpdateResult, HandyMongooseRemoveResult, DbActionType,
  HandyMongooseRestoreResult, HandyMongooseDeletedWhere, HandyMongooseDistinctManyResults,
  HandyMongoosePopulateOptions, HandyMongooseDistinctOneResults, MongoFielLeveldAcessRules,
  OriginalMongoosePopulateOptions, MongooseSortingDirection, HandyMongooseResultsPagination,
  CombinedUserMongoAccessValidator, MongooseModelService, ServerRequestUser, MongooseDefaultPublicMethods,
  ApiRequestListenerSettings, ModelCliData
} from '@handy/types';
import { Inject } from '@handy/core';
import { ModelMiddlewaresHolder, MongooseMW } from '@handy/core/decorators';
import { defaultModelsMethodsRoutingRestrinctions } from '@models/default-models-access.validator';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

let { String, Number, Buffer, Boolean, Mixed, ObjectId } = SchemaTypes;
let mongooseDate = SchemaTypes.Date;

type mongooseModelInterface<modelInterface> = modelInterface & Document;

export class DefaultHandyModelClass<definedModelInterfaces extends MongooseModelInterfaces> implements MongooseModelService {

  /* --------------------------------- Classes -------------------------------- */

  protected _handyConfig: HandyConfigService = Inject(HandyConfigService);
  protected _handyJwtService: HandyJwtService = Inject(HandyJwtService);
  protected _handyError: HandyErrorService = Inject(HandyErrorService);

  /* --------------------------------- Holders -------------------------------- */

  private __mongoSettings: ConfigMongoDBInterface = this._handyConfig.get().mongoDB;
  private __shape: any = {};

  protected _ModelSettings: ModelSettings<definedModelInterfaces> = <ModelSettings<definedModelInterfaces>>this.constructor.prototype.ModelSettings;
  protected _modelDeclaration: HandyModelDeclaration<definedModelInterfaces['allFields']> = <HandyModelDeclaration<definedModelInterfaces['allFields']>>this._ModelSettings.modelDeclaration;
  protected _modelName: string = this._ModelSettings.name;
  protected _modelFields: definedModelInterfaces['allFields'][] = <definedModelInterfaces['allFields'][]>Object.keys(this._modelDeclaration);
  protected _modelFieldsLen: number = this._modelFields.length;

  protected _searchableFields: any[] = [];
  protected _searchableFieldsLen: number = this._searchableFields.length;
  protected _stringSearchableFieldTypes: MongooseFieldType[] = ['ShortString', 'Text', '[Text]', '[ShortString]'];
  protected _numberSearchableFieldTypes: MongooseFieldType[] = ['Number', '[Number]'];

  protected _modelLevelAccessRules: MongoModelLevelAccesRules<definedModelInterfaces['allFields']> = this._ModelSettings.accessRules;
  protected _fieldLevelAccessRules: { [key: string]: MongoFieldAccess<definedModelInterfaces['allFields']> } = {};
  protected _validators: { [key in definedModelInterfaces['allFields']]?: MongooseModelFieldValidator[] } = {};

  protected _middlewares: ModelMiddlewaresHolder[] = <ModelMiddlewaresHolder[]>this.constructor.prototype.middlewares;

  protected _Schema: Schema;
  protected _Model: Model<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>;

  protected _systemFieldsList: ReadonlyArray<HandyMongooseSystemFields> = [
    'deleted',
    'restored',
    'deletedAt',
    'restoredAt',
    'deletedBy',
    'restoredBy',
    'createdAt',
    'createdBy',
    'changesHistory'
  ];

  protected _systemReffrenceAbleFieldsList: ReadonlyArray<HandyMongooseSystemFields> = [
    'deletedBy',
    'restoredBy',
    'createdBy',
  ];

  protected _possibleNumberRegex: RegExp = new RegExp(/^[0-9,.\- ]*$/);
  protected _hasDigitRegex: RegExp = new RegExp(/[0-9]{1}/);

  protected _fieldsToIndex: { name: definedModelInterfaces['allFields'], unique: boolean | 'all' | 'active', sparse: boolean, index: boolean }[] = [];

  /* -------------------------------- Defaults -------------------------------- */

  protected _defaultFindOptions: HandyMongooseModelFindOpts<definedModelInterfaces['allFields']>;
  protected _defaultSort: MongooseSortingOptions<definedModelInterfaces['allFields']> | undefined = this._ModelSettings.defaultSort;
  protected _defaultQueryLimit: number = (this._ModelSettings.defaultQueryLimit !== undefined) ? this._ModelSettings.defaultQueryLimit : this.__mongoSettings.defaultQueryLimit;
  protected _stringTrimming: boolean = (this._ModelSettings.stringTrimming !== undefined) ? this._ModelSettings.stringTrimming : this.__mongoSettings.stringAutoTrimming;
  protected _defaultReturnUpdatedDocOnUpdate: boolean = (isNotUndefined(this._ModelSettings.returnUpdatedDocOnUpdate)) ? this._ModelSettings.returnUpdatedDocOnUpdate : this.__mongoSettings.returnUpdatedDocOnUpdateByDefault;
  protected _defaultValidationOnUpdate: boolean = (isNotUndefined(this._ModelSettings.defaultValidationOnUpdate)) ? this._ModelSettings.defaultValidationOnUpdate : this.__mongoSettings.defaultValidationOnUpdate;

  protected _useSoftdelete: boolean = (this._ModelSettings.softDelete || (isUndefined(this._ModelSettings.softDelete) && this.__mongoSettings.defaultSoftDelete));
  protected _useCreatedAt: boolean = (this._ModelSettings.createdAt || (isUndefined(this._ModelSettings.createdAt) && this.__mongoSettings.defaultCreatedAt));
  protected _useCreatedBy: boolean = (this._ModelSettings.createdBy || (isUndefined(this._ModelSettings.createdBy) && this.__mongoSettings.defaultCreatedBy));

  protected _useChangesHistory: boolean = (this._ModelSettings.changesHistory || (isUndefined(this._ModelSettings.changesHistory) && this.__mongoSettings.defaultChangesHistory));
  protected _limitChangesHistoryLength: boolean = (isNotUndefined(this._ModelSettings.changesHistoryLimited)) ? this._ModelSettings.changesHistoryLimited : this.__mongoSettings.defaultChangesHistoryLimited;
  protected _changesHistoryLength: number = (isNotUndefined(this._ModelSettings.changesHistoryLength)) ? this._ModelSettings.changesHistoryLength : this.__mongoSettings.defaultChangesHistoryLength;
  protected _keysToRemoveFromChangesHistory: string[] = (isNotUndefined(this._ModelSettings.keysToRemoveFromChangesHistory)) ? this._ModelSettings.keysToRemoveFromChangesHistory : this.__mongoSettings.defaultKeysToRemoveFromChangesHistory;
  protected _defaultSearchableFields: SingleOrArrayCombo<definedModelInterfaces['searchableFields']> = this._ModelSettings.searchDefaultFields;
  protected _searchDefaultOptions: MognooseSearchRegexOptions = (isNotUndefined(this._ModelSettings.searchDefaultOptions)) ? this._ModelSettings.searchDefaultOptions : this.__mongoSettings.searchDefaultOptions;

  /* ---------------------------- Public properties --------------------------- */

  // ? has to be public because of generic interface for read methods
  public defaultSelect: HandyMongooseSelect<definedModelInterfaces['allFields']> = this._ModelSettings.defaultSelect;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor () {
    this._init();
  }

  /* -------------------------------------------------------------------------- */
  /*                             Initializer methods                            */
  /* -------------------------------------------------------------------------- */

  protected _init(): void {

    if (isNullOrUndefined(this._ModelSettings.routable)) {
      this._ModelSettings.routable = this.__mongoSettings.defaultModelsRoutable;
    }

    this.__parseRoutingSettings();

    this._generateModelSchema();

    this._handleDefaultMethodsObjects();
    this._Schema = new Schema(this.__shape, { collection: this._modelName.UcFirst() });

    if (this._ModelSettings.autoIncrement) {
      let defaultAutoIncrementOptions = {
        model: this._modelName.UcFirst(),
        field: '_id',
        startAt: 1,
        incrementBy: 1
      }

      let { autoIncrementOpts = {} } = this._ModelSettings;
      let finalAutoIncrementOptions = { ...defaultAutoIncrementOptions, ...autoIncrementOpts };

      this._Schema.plugin(autoIncrement.autoIncrement, finalAutoIncrementOptions);
    }

    this._handleFieldsIndexes();
    this._handleMiddlewares();
    this._Model = model(this._modelName.UcFirst(), this._Schema, this._modelName.UcFirst());

    this._handleIndexes();
    this._generateCliHelper();

  }

  protected _generateCliHelper(): void {

    if (!__isDev || !this._ModelSettings.routable) {
      return;
    }

    let modelData: ModelCliData = {
      modelName: this._modelName,
      autoIncrement: this._ModelSettings.autoIncrement,
      softDelete: this._useSoftdelete,
      fields: [
        {
          inputType: 'none',
          publicName: 'Id',
          name: '_id',
          unique: 'all',
          required: true
        }
      ],
      searchableFields: [
        {
          name: '_id',
          displayValue: 'ID'
        }
      ]
    }

    let declaredFields: definedModelInterfaces['allFields'][] = Object.keys(this._modelDeclaration);
    let declaredFieldsLen: number = declaredFields.length;

    for (let i = 0; i < declaredFieldsLen; i++) {
      const declarationFieldName: string = declaredFields[i];
      let declaredData = this._modelDeclaration[declarationFieldName as definedModelInterfaces['allFields']];

      let { publicName, inputType = 'none', required = false, unique = false } = declaredData;

      if (this._searchableFields.includes(declarationFieldName)) {

        modelData.searchableFields.push({
          name: declarationFieldName,
          displayValue: publicName
        })

      }

      if (inputType === 'none') {
        continue;
      }

      modelData.fields.push({
        name: declarationFieldName,
        publicName: publicName,
        inputType: inputType,
        unique,
        required
      })

    }

    let helpersDirPath: string = join(__rootDir, 'src/cli/server-ref-files/models');
    let helperDirContent: string[] = readdirSync(helpersDirPath);
    let modelDataStrVal: string = JSON.stringify(modelData, null, 2);
    let cliHelperFileName: string = `${this._modelName.LcFirst()}.modelData.json`;

    let writeData: boolean = false;

    if (!helperDirContent.includes(cliHelperFileName)) {
      writeData = true;
    }

    let cliHelperFilePath = join(helpersDirPath, cliHelperFileName);

    if (!writeData) {

      let oldContent: string = readFileSync(cliHelperFilePath, { encoding: 'utf-8' });
      if (oldContent !== modelDataStrVal) {
        writeData = true;
      }

    }

    if (writeData) {
      writeFileSync(cliHelperFilePath, modelDataStrVal);
    }

  }

  protected _generateModelSchema(): void {

    let fieldsNames: definedModelInterfaces['allFields'][] = <definedModelInterfaces['allFields'][]>Object.keys(this._modelDeclaration);
    let fieldsLen: number = fieldsNames.length;

    for (let i = 0; i < fieldsLen; i++) {
      const fieldName: definedModelInterfaces['allFields'] = fieldsNames[i];

      let fieldDeclaration = this._modelDeclaration[fieldName];

      this._validators[fieldName] = fieldDeclaration.validators;

      if (fieldDeclaration.accessRules !== undefined) {
        this._fieldLevelAccessRules[fieldName] = fieldDeclaration.accessRules;
      }

      if (fieldName === '_id' || this._systemFieldsList.includes(fieldName)) {

        continue;

      }

      let indexField: boolean = fieldDeclaration.index;
      let fieldType = fieldDeclaration.type;
      let isFieldArray: boolean = (<string>fieldType).startsWith('[');

      let fieldTypeName = (<string>fieldType).replace('[', '').replace(']', '');
      let autoIndexing: boolean = !isFieldArray;
      let stringTrimming: boolean = fieldDeclaration.trim;

      let finalFieldType;

      switch (fieldTypeName) {

        case 'Boolean':

          finalFieldType = Boolean

          break;

        case 'Buffer':

          finalFieldType = Buffer;
          autoIndexing = false;

          break;

        case 'Number':

          finalFieldType = Number;

          break;

        case 'Date':

          finalFieldType = mongooseDate;

          break;

        case 'Mixed':
        case 'Files':

          finalFieldType = Mixed;
          autoIndexing = false;

          break;

        case 'ObjectId':

          finalFieldType = ObjectId;

          break;

        case 'ShortString':

          finalFieldType = String;
          stringTrimming = (stringTrimming !== undefined) ? stringTrimming : this._stringTrimming;
          break;

        case 'Text':

          finalFieldType = String;
          autoIndexing = false;
          stringTrimming = (stringTrimming !== undefined) ? stringTrimming : this._stringTrimming;

          break;

        default:
          break;
      }

      if (indexField && !autoIndexing && this.__mongoSettings.wrongIndexingWaring && __isMasterCluster) {
        handyWarnLog(`Indexing field "${fieldName}" might cause an error related to mongo max index field lenght.\nField will have to be indexed anyhow in order to achieve unique validation\n\nTo turn this warning off, reconsider this field type or set mongoDB.wrongIndexingWaring in handy.json to false`);
      }

      this.__shape[fieldName] = {
        type: (isFieldArray) ? [finalFieldType] : finalFieldType,
        trim: stringTrimming
      }

      if (fieldDeclaration.required) {
        this.__shape[fieldName].required = `${fieldDeclaration.publicName} is required`;
      }

      this._fieldsToIndex.push({
        name: fieldName,
        unique: fieldDeclaration.unique,
        sparse: (fieldDeclaration.unique) ? fieldDeclaration.sparse : undefined,
        index: (isNotUndefined(indexField)) ? indexField : autoIndexing,
      })

      if (isNotUndefined(fieldDeclaration.ref)) {
        this.__shape[fieldName].ref = fieldDeclaration.ref;
      }

      if (isNotEmpty(this._validators[fieldName])) {

        let validatorsLen: number = this._validators[fieldName].length;

        for (let i = 0; i < validatorsLen; i++) {
          let validator = this._validators[fieldName][i];

          validator.setAdditionalVals(this._ModelSettings, fieldName, this);
          this._validators[fieldName][i] = validator.extractValidator();

        }

        this.__shape[fieldName].validate = this._validators[fieldName];

      }

      // if (fieldDeclaration.ref) {
      //   console.log()
      //   this.__shape[fieldName].ref = fieldDeclaration.ref;
      // }

      if (fieldDeclaration.default !== undefined) {
        this.__shape[fieldName].default = fieldDeclaration.default;
      }

    }

    this._handleAutomaticFields();

  }

  protected _handleIndexes(): void {

    this._Model.on('index', err => {

      if (err) {
        this._handyError.register(err, 'high', 'Server error', `Error while creating model indexes for "${this._modelName}"`);
      }

    });

    this._Model.syncIndexes({});

  }

  protected _handleMiddlewares(): void {

    let mws: ModelMiddlewaresHolder[] = this._middlewares;
    let mwsLen: number = mws.length;

    //? Class name
    let instanceNamePrefix: string = `__${this.constructor.name}__`;
    let defaultInstanceNamePrefix: string = `__DefaultHandyModelClass__`;

    for (let i = 0; i < mwsLen; i++) {

      let { hook, type, method } = mws[i];

      if (!method.includes(instanceNamePrefix) && !method.includes(defaultInstanceNamePrefix)) {

        // ! this block here makes sure that it uses only 
        // ! propper mws, because of the way inheritance and middlewares work... 

        continue;
      }

      let finalMethodName: string = method.replace(instanceNamePrefix, '').replace(defaultInstanceNamePrefix, '');
      let instance: this = this;

      function mwThisExtractor(...args: any[]): any {

        // @ts-ignore
        return instance[finalMethodName].bind(instance)(this, args);

      }

      // @ts-ignore
      this._Schema[type](hook, mwThisExtractor);

    }

  }

  protected _handleAutomaticFields(): void {

    this._handleSearchableFields();

    if (this._useSoftdelete) {

      this.__shape['deleted'] = {
        type: Boolean,
        unique: false,
        required: false,
        index: false,
        default: false
      }

      this.__shape['restored'] = {
        type: Boolean,
        unique: false,
        required: false,
        index: false,
        default: false
      }

      this.__shape['deletedAt'] = {
        type: Number,
        unique: false,
        required: false,
        index: false,
        default: null
      }

      this.__shape['restoredAt'] = {
        type: Number,
        unique: false,
        required: false,
        index: false,
        default: null
      }

      this.__shape['deletedBy'] = {
        type: Number,
        unique: false,
        required: false,
        index: false,
        default: null,
        ref: 'User'
      }

      this.__shape['restoredBy'] = {
        type: Number,
        unique: false,
        required: false,
        index: false,
        default: null,
        ref: 'User'
      }

      this._modelFields.push('deleted', 'restored', 'deletedAt', 'restoredAt', 'deletedBy', 'restoredBy');
      this._modelFieldsLen += 6;

    }

    if (this._useCreatedAt) {

      this.__shape['createdAt'] = {
        type: Number,
        unique: false,
        required: false,
        index: false,
        default: null
      }

      this._modelFields.push('createdAt');
      this._modelFieldsLen++;

    }

    if (this._useCreatedBy) {

      this.__shape['createdBy'] = {
        type: Number,
        unique: false,
        required: false,
        index: false,
        default: null,
        ref: 'User'
      }

      this._modelFields.push('createdBy');
      this._modelFieldsLen++;

    }

    if (this._useChangesHistory) {

      this.__shape['changesHistory'] = {
        type: [Mixed],
        unique: false,
        required: false,
        index: false,
        default: [],
      }

      this._modelFields.push('changesHistory');
      this._modelFieldsLen++;

    }

  }

  protected _handleDefaultMethodsObjects(): void {

    let populate = (isNotUndefined(this._ModelSettings.defaultPopulate)) ? this._ModelSettings.defaultPopulate : undefined;
    let leanResult = (isNotUndefined(this._ModelSettings.defaultLeanFindResults)) ? this._ModelSettings.defaultLeanFindResults : this.__mongoSettings.defaultLeanFindResults;

    this._defaultFindOptions = {
      // select,
      // deselect: undefined,
      sort: (isNotUndefined(this._ModelSettings.defaultSort)) ? this._ModelSettings.defaultSort : undefined,
      limit: (isNotUndefined(this._ModelSettings.defaultQueryLimit)) ? this._ModelSettings.defaultQueryLimit : this.__mongoSettings.defaultQueryLimit,
      page: 1,
      populate,
      pagination: (isNotUndefined(this._ModelSettings.defaultPaginationDataIncluded)) ? this._ModelSettings.defaultPaginationDataIncluded : this.__mongoSettings.defaultPaginationDataIncluded,
      exactPaginationCount: (isNotUndefined(this._ModelSettings.defaultExactPaginationCount)) ? this._ModelSettings.defaultExactPaginationCount : this.__mongoSettings.defaultExactPagination,
      leanResults: leanResult
    }

    if (this._useSoftdelete) {

      let deletedDocs = (isNotUndefined(this._ModelSettings.defaultQueryDeletedOption))
        ? this._ModelSettings.defaultQueryDeletedOption
        : (<MongooseIncludeDeletedOption<definedModelInterfaces['allFields']>>this.__mongoSettings.defaultQueryDeletedOption);

      this._defaultFindOptions.deletedDocs = deletedDocs;

    }

  }

  protected _handleSearchableFields(): void {

    let declaredFields: definedModelInterfaces['allFields'][] = Object.keys(this._modelDeclaration);

    let searchableTypes: MongooseFieldType[] = [...this._stringSearchableFieldTypes, ...this._numberSearchableFieldTypes];

    let declaredFieldsLen: number = declaredFields.length;
    for (let i = 0; i < declaredFieldsLen; i++) {
      let fieldName = declaredFields[i];
      let fieldDeclaration = this._modelDeclaration[fieldName];
      if (searchableTypes.includes(fieldDeclaration.type)) {
        this._searchableFields.push(fieldName);
      }

    }

    // if (this._ModelSettings.autoIncrement && !this._searchableFields.includes('_id')) {
    //   this._searchableFields.push('_id');
    // }

    this._searchableFieldsLen = this._searchableFields.length;
  }

  protected _handleFieldsIndexes(): void {

    let _fieldsToIndexLen: number = this._fieldsToIndex.length;
    for (let i = 0; i < _fieldsToIndexLen; i++) {
      const { name, unique = false, sparse = false, index = false } = this._fieldsToIndex[i];

      if (!index && unique && this.__mongoSettings.uniqueValidatorOnNonIndexedFieldWarning) {
        handyWarnLog(`You are using unique validator on non indexed field "${name}".\nField will have to be indexed anyhow in order to achieve unique validation\n\nTo turn this warning off, index this field in model declaration or set mongoDB.uniqueValidatorOnNonIndexedFieldWarning in handy.json to false`);
      }

      if (!this._useSoftdelete) {

        if (index || unique) {
          this._Schema.index({ [name]: 1 }, { unique, sparse, background: false });
        }

        continue;

      }

      if (index || unique) {

        switch (unique) {
          case false:
            this._Schema.index({ [name]: 1 }, { sparse, unique, background: false });
            break;

          case 'all':
            this._Schema.index({ [name]: 1 }, { sparse, unique: true, background: false });
            break;

          case 'active':
            this._Schema.index({ [name]: 1, 'deleted': 1 }, { unique: true, sparse, partialFilterExpression: { 'deleted': false }, background: false });
            break;

          default:
            break;
        }

      }

    }

  }

  /* -------------------------------------------------------------------------- */
  /*                               Public methods                               */
  /* -------------------------------------------------------------------------- */

  /* --------------------------------- Create --------------------------------- */

  public createOne(
    doc: definedModelInterfaces['createShape'],
    request?: ServerRequest,
    response?: ServerResponse,
    customSaveOpts: any = {},
    validateAccess: boolean = false): Promise<definedModelInterfaces['fullModelShape']> {

    return new Promise((resolve, reject) => {

      this.createMany([doc], request, response, customSaveOpts, validateAccess)
        .then(docs => {

          resolve(docs[0])

        })
        .catch(err => {
          reject(err);
        })

    })

  }

  public createMany(
    docs: definedModelInterfaces['createShape'][],
    request?: ServerRequest,
    response?: ServerResponse,
    customSaveOpts: any = {},
    validateAccess: boolean = false): Promise<definedModelInterfaces['fullModelShape'][]> {

    return new Promise((resolve, reject) => {

      this._canCreateDocs(request, response, validateAccess)
        .then((canCreate: boolean) => {

          if (!canCreate) {
            return Promise.reject(this._handleError(`Doesn't have permission to create record for ${this._modelName}`, 'low', 'Forbidden', request, response));
          }

          if (this._useCreatedBy || this._useCreatedAt) {

            let creationTime: number = new Date().getTime();
            let createdBy: number = this._extractUserIdFromRequest(request);

            let docsLen: number = docs.length;
            for (let i = 0; i < docsLen; i++) {
              const loopedDoc = docs[i];

              if (this._useCreatedBy) {

                (<{ createdBy: number }><unknown>loopedDoc)['createdBy'] = this._extractUserIdFromRequest(request);

              }

              if (this._useCreatedAt) {

                (<{ createdAt: number }><unknown>loopedDoc)['createdAt'] = creationTime;

              }

              if (this._useChangesHistory) {

                (<{ changesHistory: MongoChangesHistoryData }><unknown>loopedDoc)['changesHistory'] = {
                  updateName: 'Creation',
                  sessionId: this._extractSessionIdFromRequest(request),
                  updatedAt: creationTime,
                  updatedBy: createdBy,
                  updatedTo: this._lightenHistoryData(loopedDoc)
                };

              }

            }

          }

          customSaveOpts = { ...customSaveOpts, ...{ handyRequest: request, handyResponse: response } };

          return this._Model.create(docs, customSaveOpts);

        })
        .then((newDocuments: definedModelInterfaces['fullModelShape'][]) => {

          let docsLen: number = newDocuments.length;
          let resultDocuments: definedModelInterfaces['fullModelShape'][] = [];

          for (let i = 0; i < docsLen; i++) {
            const doc = newDocuments[i];
            resultDocuments.push(doc.toObject());
          }

          resolve(resultDocuments);

        })
        .catch(err => {

          return reject(this._handleError(err));

        })

    })

  }

  /* ---------------------------------- Read ---------------------------------- */

  public find<T extends HandyMongooseSelect<definedModelInterfaces["allFields"]> = definedModelInterfaces['defaultSelect']>(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>> = {},
    select?: T,
    findParams: HandyMongooseModelPublicFindOpts<definedModelInterfaces['allFields']> = {},
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseFindResults<definedModelInterfaces, T>> {

    let finalParams: HandyMongooseModelFindOpts<definedModelInterfaces['allFields']> = { ...{}, ...findParams };
    finalParams.leanResults = true;

    return this._find(where, select, finalParams, request, response, validateAccess);

  }

  public findOne<T extends HandyMongooseSelect<definedModelInterfaces["allFields"]> = definedModelInterfaces['defaultSelect']>(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>> = {},
    select?: T,
    findParams: HandyMongooseModelPublicFindOneOpts<definedModelInterfaces['allFields']> = {},
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseFindOneResult<definedModelInterfaces, T>> {

    let finalParams: HandyMongooseModelFindOpts<definedModelInterfaces['allFields']> = findParams;
    finalParams.leanResults = true;

    return this._findOne(where, select, finalParams, request, response, validateAccess);

  }

  public findById<T extends HandyMongooseSelect<definedModelInterfaces["allFields"]> = definedModelInterfaces['defaultSelect']>(
    _id: definedModelInterfaces['idType'],
    select?: T,
    findParams: HandyMongooseModelPublicFindOneOpts<definedModelInterfaces['allFields']> = {},
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseFindOneResult<definedModelInterfaces, T>> {

    let finalParams: HandyMongooseModelFindOpts<definedModelInterfaces['allFields']> = findParams;
    finalParams.leanResults = true;
    let findQuery: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>> = <unknown>{ _id } as FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>;
    return this._findOne(findQuery, select, finalParams, request, response, validateAccess);

  }

  /* --------------------------------- Update --------------------------------- */

  public updateMany(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    update: UnSignedObject,
    updateOptions?: HandyMongooseModelUpdateOpts<definedModelInterfaces['allFields']>,
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseUpdateResult> {

    return this._updateMany(where, update, updateOptions, request, response, validateAccess);

  }

  public updateOne(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    update: UnSignedObject,
    updateOptions?: HandyMongooseModelUpdateOpts<definedModelInterfaces['allFields']>,
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseUpdateResult> {

    return this._updateOne(where, update, updateOptions, request, response, validateAccess);

  }

  /* --------------------------------- Delete --------------------------------- */

  public deleteMany(where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>, request?: ServerRequest, response?: ServerResponse, validateAccess: boolean = false): Promise<HandyMongooseRemoveResult> {

    return new Promise((resolve, reject) => {

      this._canDeleteOrRestoreDocs(where, request, response, <DbActionType<definedModelInterfaces['allFields']>>'delete', validateAccess)
        .then(canDeleteDocs => {

          if (!canDeleteDocs) {
            return Promise.reject(this._handleError(`You don't have permission remove this data.`, 'low', 'Forbidden', request, response));
          }

          if (this._useSoftdelete) {

            let { update, updateOptions } = this._getSoftDeleteUpdateOptions(request);

            this._updateMany(where, update, updateOptions, request, response, false)
              .then(updateResult => {

                let { updatedRecords, matchingRecords, success } = updateResult;
                return resolve({
                  deletedRecords: updatedRecords,
                  matchingRecords,
                  success
                })

              })
              .catch(err => {

                return reject(this._handleError(err, 'high', 'Server error', request, response));

              })

          } else {

            this._hardDelete(where, false, request)
              .then(hardDeleteResult => {

                let { deletedRecords, matchingRecords, success } = hardDeleteResult;
                return resolve({
                  deletedRecords,
                  matchingRecords,
                  success
                })

              })
              .catch(err => {
                return reject(this._handleError(err, 'high', 'Server error', request, response));
              })

          }

        })
        .catch(err => {

          return reject(this._handleError(err, 'high', 'Server error', request, response));

        })

    })

  }

  public deleteOne(where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>, request?: ServerRequest, response?: ServerResponse, validateAccess: boolean = false): Promise<HandyMongooseRemoveResult> {

    return new Promise((resolve, reject) => {

      this._canDeleteOrRestoreDocs(where, request, response, <DbActionType<definedModelInterfaces['allFields']>>'delete', validateAccess)
        .then(canDeleteDocs => {

          if (!canDeleteDocs) {
            return Promise.reject(this._handleError(`You don't have permission remove this data.`, 'low', 'Server error', request, response));
          }

          if (this._useSoftdelete) {

            let { update, updateOptions } = this._getSoftDeleteUpdateOptions(request);

            this._updateOne(where, update, updateOptions, request, response, false)
              .then(updateResult => {

                let { updatedRecords, matchingRecords, success } = updateResult;
                return resolve({
                  deletedRecords: updatedRecords,
                  matchingRecords,
                  success
                })

              })
              .catch(err => {

                return reject(this._handleError(err, 'high', 'Server error', request, response));

              })

          } else {

            this._hardDelete(where, true, request)
              .then(hardDeleteResult => {

                let { deletedRecords, matchingRecords, success } = hardDeleteResult;
                return resolve({
                  deletedRecords,
                  matchingRecords,
                  success
                })

              })
              .catch(err => {
                return reject(this._handleError(err, 'high', 'Server error', request, response));
              })

          }

        })
        .catch(err => {
          return reject(this._handleError(err, 'high', 'Server error', request, response));
        })

    })

  }

  public deleteById(
    _id: definedModelInterfaces['idType'],
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseRemoveResult> {

    let findQuery: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>> = <unknown>{ _id } as FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>;
    return this.deleteOne(findQuery, request, response, validateAccess);
  }

  /* --------------------------------- Restore -------------------------------- */

  public restoreOne(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseRestoreResult> {

    if (!this._useSoftdelete) {
      return Promise.reject(this._handleError('Using restore on non soft delete model', 'high', 'Bad request', request, response));
    }

    return new Promise((resolve, reject) => {

      this._canDeleteOrRestoreDocs(where, request, response, <DbActionType<definedModelInterfaces['allFields']>>'restore', validateAccess)
        .then(canRestoreResult => {

          if (!canRestoreResult) {
            return Promise.reject(this._handleError(`You don't have permission restore this data.`, 'low', 'Forbidden', request, response));
          }

          let { update, updateOptions } = this._getRestoreUpdateOptions(request);

          this._updateOne(where, update, updateOptions, request, response)
            .then(updateResult => {

              let { updatedRecords, matchingRecords, success } = updateResult;
              return resolve({
                restoredRecords: updatedRecords,
                matchingRecords,
                success
              })

            })
            .catch(err => {
              return reject(this._handleError(err, 'high', 'Server error', request, response));
            })

        })
        .catch(err => {
          return reject(this._handleError(err))
        })

    })

  }

  public restoreMany(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseRestoreResult> {

    if (!this._useSoftdelete) {
      return Promise.reject(this._handleError('Using restore on non soft delete model', 'high', 'Bad request', request, response));
    }

    return new Promise((resolve, reject) => {

      this._canDeleteOrRestoreDocs(where, request, response, <DbActionType<definedModelInterfaces['allFields']>>'restore', validateAccess)
        .then(canRestoreResult => {

          if (!canRestoreResult) {
            return Promise.reject(this._handleError(`You don't have permission restore this data.`, 'low', 'Forbidden', request, response));
          }

          let { update, updateOptions } = this._getRestoreUpdateOptions(request);

          this._updateMany(where, update, updateOptions, request)
            .then(updateResult => {

              let { updatedRecords, matchingRecords, success } = updateResult;
              return resolve({
                restoredRecords: updatedRecords,
                matchingRecords,
                success
              })

            })
            .catch(err => {
              return reject(this._handleError(err, 'high', 'Server error', request, response));
            })

        })
        .catch(err => {
          return reject(this._handleError(err, 'high', 'Server error', request, response))
        })

    })

  }

  public restoreById(
    _id: definedModelInterfaces['idType'],
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseRestoreResult> {
    let findQuery: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>> = <unknown>{ _id } as FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>;
    return this.restoreOne(findQuery, request, response, validateAccess);
  }

  /* ---------------------------------- Other --------------------------------- */

  public countDocuments(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    exact: boolean = true,
    deleted?: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<number> {

    return new Promise((resolve, reject) => {

      // ? select string _id only will make sure that it checks for model level rules only
      this._canReadDocs(where, request, response, '_id', deleted, validateAccess)
        .then(canReadDocsOnModelLevel => {

          if (!canReadDocsOnModelLevel) {
            return Promise.reject(this._handleError(`You don't have permission to count this data.`, 'low', 'Forbidden', request, response));
          }

          let countExtecution = this._Model[(exact) ? 'countDocuments' : 'estimatedDocumentCount'](where);

          let deletedWhere: HandyMongooseDeletedWhere = this._getDeletedWhere(deleted);
          if (this._useSoftdelete && isNotEmpty(deletedWhere)) {
            countExtecution.where(deletedWhere);
          }

          countExtecution.then(totalCount => {

            return resolve(totalCount);

          })
            .catch(err => {

              return reject(this._handleError(err));

            })

        })
        .catch(err => {
          return reject(this._handleError(err, 'high', 'Server error', request, response))
        })

    })

  }

  public distinct<T extends definedModelInterfaces["allFields"] | definedModelInterfaces["allFields"][]>(
    fieldNames: T,
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    deleted?: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseDistinctManyResults<definedModelInterfaces, T>> {

    if (typeof fieldNames === 'string') {
      return this._distinct(fieldNames, where, deleted, request, response, validateAccess);
    }

    let finalMultiResult: HandyMongooseDistinctManyResults<definedModelInterfaces, T> = {} as HandyMongooseDistinctManyResults<definedModelInterfaces, T>;

    return new Promise((resolve, reject) => {

      if (isEmpty(fieldNames)) {
        return reject(this._handleError(`No fields were selected for distinct function.`, 'low', 'Bad request', request, response));
      }

      let selectString: string = '';

      let fieldsLen: number = fieldNames.length;
      for (let i = 0; i < fieldsLen; i++) {
        const singleFieldName = fieldNames[i];
        selectString += `${singleFieldName} `;
      }

      // ? Checks for access rules for the specified field only
      this._canReadDocs(where, request, response, selectString.trim(), deleted, validateAccess)
        .then(canReadDocsOnModelLevel => {

          if (!canReadDocsOnModelLevel) {
            return Promise.reject(this._handleError(`You don't have permission to access this data.`, 'low', 'Forbidden', request, response));
          }

          let distinctPromises: Promise<any>[] = [];

          for (let i = 0; i < fieldsLen; i++) {
            const singleFieldName = <definedModelInterfaces["allFields"]>fieldNames[i];
            let singlePromise = new Promise<void>((singleResolve, singleReject) => {

              this._distinct(singleFieldName, where, deleted, request, response)
                .then(singleDistErr => {

                  finalMultiResult[singleFieldName] = singleDistErr;
                  return singleResolve();

                })
                .catch(singleDistErr => {

                  return singleReject(this._handleError(singleDistErr, 'high', 'Server error', request, response));

                })

            })

            distinctPromises.push(singlePromise);

          }

          Promise.all(distinctPromises)
            .then(() => {
              return resolve(finalMultiResult);
            })
            .catch(distinctPromisesErr => {
              return reject(this._handleError(distinctPromisesErr, 'high', 'Server error', request, response));
            })

        })
        .catch(err => {
          return reject(this._handleError(err, 'high', 'Server error', request, response))
        })

    })

  }

  public aggregate(pipeline: UnSignedObject[], deletedDocsSpecs?: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>) {

    let aggregateExecutuion = this._Model.aggregate(pipeline);

    if (!this._useSoftdelete) {
      return aggregateExecutuion;
    }

    let deletedWhere: HandyMongooseDeletedWhere = this._getDeletedWhere(deletedDocsSpecs);

    if (isNotEmpty(deletedWhere)) {
      aggregateExecutuion.match(deletedWhere);
    }

    return aggregateExecutuion;

  }

  public search<T extends HandyMongooseSelect<definedModelInterfaces["allFields"]> = definedModelInterfaces['defaultSelect']>(
    searchValue: string | number,
    fields?: SingleOrArrayCombo<definedModelInterfaces['searchableFields']>,
    select?: T,
    findParams: HandyMongooseModelPublicFindOpts<definedModelInterfaces['allFields']> & { regexOptions?: MognooseSearchRegexOptions } = {},
    additionalSearchQueries: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>[] = [],
    additionalFilterQueries: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>[] = [],
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseFindResults<definedModelInterfaces, T>> {

    let where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>> = this._getFinalSearchQuery(searchValue, fields, findParams, additionalSearchQueries, additionalFilterQueries);

    if (isNotEmpty(searchValue) && isEmptyObject(where)) {

      let { limit, page } = { ...this._defaultFindOptions, ...findParams };

      let result: HandyMongooseFindResults<definedModelInterfaces, T> = {
        docs: []
      };

      if (findParams.pagination) {
        result.paginationData = this._parsePaginationData(0, page, limit, []);
      }

      return Promise.resolve(result);

    }

    return this._find(where, select, findParams, request, response, validateAccess);

  }

  /* -------------------------------------------------------------------------- */
  /*                            Api listeners methods                           */
  /* -------------------------------------------------------------------------- */

  /* --------------------------------- Create --------------------------------- */

  protected _apiCreateMany(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: definedModelInterfaces['createShape'][]): void {

    this.createMany(body as definedModelInterfaces['createShape'][], request, response, undefined, true).then(createManyResult => {

      response.jsonResponse(createManyResult);

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiCreateOne(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    this.createOne(body, request, response, undefined, true).then(createOneResult => {

      response.jsonResponse(createOneResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  /* ---------------------------------- Read ---------------------------------- */

  protected _apiFind(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {}, select = {}, findOptions = {} } = body;

    this.find(where, select, findOptions, request, response, true).then(findResult => {

      response.jsonResponse(findResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiFindOne(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {}, select = {}, findOptions = {} } = body;

    this.findOne(where, select, findOptions, request, response, true).then(findOneResult => {

      response.jsonResponse(findOneResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiFindById(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { _id = {}, select = {}, findOptions = {} } = body;

    this.findById(_id, select, findOptions, request, response, true).then(findByIdResult => {

      response.jsonResponse(findByIdResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  /* --------------------------------- Update --------------------------------- */

  protected _apiUpdateMany(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {}, update = {}, updateOptions = {} } = body;

    this.updateMany(where, update, updateOptions, request, response, true).then(updateResult => {

      response.jsonResponse(updateResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiUpdateOne(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {}, update = {}, updateOptions = {} } = body;

    this.updateOne(where, update, updateOptions, request, response, true).then(updateResult => {

      response.jsonResponse(updateResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  /* --------------------------------- Delete --------------------------------- */

  protected _apiDeleteMany(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {} } = body;

    this.deleteMany(where, request, response, true).then(deleteManyResult => {

      response.jsonResponse(deleteManyResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiDeleteOne(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {} } = body;

    this.deleteOne(where, request, response, true).then(deleteOneResult => {

      response.jsonResponse(deleteOneResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiDeleteById(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { _id } = query;

    this.deleteById(_id, request, response, true).then(deleteByIdResult => {

      response.jsonResponse(deleteByIdResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  /* --------------------------------- Restore -------------------------------- */

  protected _apiRestoreMany(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {} } = body;

    this.restoreMany(where, request, response, true).then(restoreManyResult => {

      response.jsonResponse(restoreManyResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiRestoreOne(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {} } = body;

    this.restoreOne(where, request, response, true).then(restoreOneResult => {

      response.jsonResponse(restoreOneResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiRestoreById(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { _id } = query;

    this.restoreById(_id, request, response, true).then(restoreByIdResult => {

      response.jsonResponse(restoreByIdResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  /* ---------------------------------- Other --------------------------------- */

  protected _apiCountDocuments(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {}, exact = true, deleted = {} } = body;

    this.countDocuments(where, exact, deleted, request, response, true).then(countDocuments => {

      response.jsonResponse(countDocuments)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiDistinct(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { where = {}, fieldNames, deleted = {} } = body;

    this.distinct(fieldNames, where, deleted, request, response, true).then(distinctResult => {

      response.jsonResponse(distinctResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  protected _apiSearch(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject): void {

    let { searchValue, select, findOptions, fields, additionalSearchQueries, additionalFilterQueries } = body;

    this.search(searchValue, fields, select, findOptions, additionalSearchQueries, additionalFilterQueries, request, response, true).then(searchResult => {

      response.jsonResponse(searchResult)

    })
      .catch(err => {

        return response.errorResponse(err);

      })

  }

  /* -------------------------------------------------------------------------- */
  /*                           Internal query methods                           */
  /* -------------------------------------------------------------------------- */

  protected _find<T extends HandyMongooseSelect<definedModelInterfaces["allFields"]> = definedModelInterfaces['defaultSelect']>(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    select?: T,
    findParams: HandyMongooseModelFindOpts<definedModelInterfaces['allFields']> = {},
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseFindResults<definedModelInterfaces, T>> {

    let { sort, limit, page, populate, pagination, exactPaginationCount, deletedDocs, leanResults } = { ...this._defaultFindOptions, ...findParams };
    let selectStr: string = this._parseSelect(select);
    let deletedWhere: HandyMongooseDeletedWhere = this._getDeletedWhere(deletedDocs);

    return new Promise((resolve, reject) => {

      this._canReadDocs(where, request, response, selectStr, deletedDocs, validateAccess)
        .then(canReadDocs => {

          if (!canReadDocs) {
            return Promise.reject(this._handleError(`You don't have permission to access this data.`, 'low', 'Forbidden', request, response));
          }

          let Execution = this._Model.find(where);

          if (this._useSoftdelete && isNotEmpty(deletedWhere)) {

            Execution.where(deletedWhere);

          }

          // Limit
          if (isNotNullOrUndefined(limit)) {
            Execution.limit(limit);
          }

          // Pagination
          if (isNotNullOrUndefined(page) && page > 1 && isNotNullOrUndefined(limit)) {

            let skipLen: number = (page - 1) * limit;
            Execution.skip(skipLen);

          }

          // Select
          if (isNotEmpty(selectStr)) {
            Execution.select(selectStr);
          }

          if (isNotNullOrUndefined(sort)) {
            Execution.sort(this._parseSortOptions(sort));
          }

          // Parsing and adding populate
          if (isNotNullOrUndefined(populate)) {

            if (isArray(populate)) {

              let populateLen: number = (<[]>populate).length;
              for (let i = 0; i < populateLen; i++) {

                let populateOptions = (<HandyMongoosePopulateOptions<definedModelInterfaces['fullModelShape']>[]>populate)[i];
                Execution.populate(this._parseMongoosePopulateOptions(populateOptions));

              }

            } else {

              Execution.populate(this._parseMongoosePopulateOptions(<HandyMongoosePopulateOptions<definedModelInterfaces['fullModelShape']>>populate));

            }

          }

          if (leanResults) {
            Execution.lean();
          }

          return Execution;

        })
        .then((docs: definedModelInterfaces['fullModelShape'][]) => {

          let finalResult: HandyMongooseFindResults<definedModelInterfaces, T> = {
            docs
          };

          if (pagination) {

            let countExtecution = this._Model[(exactPaginationCount) ? 'countDocuments' : 'estimatedDocumentCount'](where);
            if (this._useSoftdelete && isNotEmpty(deletedWhere)) {
              countExtecution.where(deletedWhere);
            }

            countExtecution.then(countResult => {

              finalResult.paginationData = this._parsePaginationData(countResult, page, limit, finalResult.docs);

              resolve(finalResult);

            }, err => {
              reject(this._handleError(err, 'high', 'Server error', request, response));
            })

          } else {

            return resolve(finalResult);

          }

        }, err => {

          return reject(this._handleError(err, 'high', 'Server error', request, response));

        })

    })

  }

  protected _findOne<T extends HandyMongooseSelect<definedModelInterfaces["allFields"]> = definedModelInterfaces['defaultSelect']>(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    select?: T,
    findParams: HandyMongooseModelFindOpts<definedModelInterfaces['allFields']> = {},
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseFindOneResult<definedModelInterfaces, T>> {

    let { populate, deletedDocs, leanResults } = { ...this._defaultFindOptions, ...findParams };
    let deletedWhere: HandyMongooseDeletedWhere = this._getDeletedWhere(deletedDocs);
    let selectStr: string = this._parseSelect(select);

    return new Promise((resolve, reject) => {

      this._canReadDocs(where, request, response, selectStr, deletedDocs, validateAccess)
        .then(canReadDocs => {

          if (!canReadDocs) {
            return Promise.reject(this._handleError(`You don't have permission to read this data.`, 'low', 'Forbidden', request, response));
          }

          let Execution = this._Model.findOne(where);

          if (this._useSoftdelete && isNotEmpty(deletedWhere)) {

            Execution.where(deletedWhere);

          }

          // Select
          if (isNotEmpty(selectStr)) {
            Execution.select(selectStr);
          }

          // Parsing and adding populate
          if (isNotNullOrUndefined(populate)) {

            if (isArray(populate)) {

              let populateLen: number = (<[]>populate).length;
              for (let i = 0; i < populateLen; i++) {

                let populateOptions = (<HandyMongoosePopulateOptions<definedModelInterfaces['fullModelShape']>[]>populate)[i];
                Execution.populate(this._parseMongoosePopulateOptions(populateOptions));

              }

            } else {
              Execution.populate(this._parseMongoosePopulateOptions(<HandyMongoosePopulateOptions<definedModelInterfaces['fullModelShape']>>populate));
            }

          }

          if (leanResults) {
            Execution.lean();
          }

          return Execution;

        })
        .then((doc: definedModelInterfaces['fullModelShape']) => {

          resolve({
            doc: doc,
            foundRecord: isNotEmpty(doc)
          })

        }, err => {

          reject(this._handleError(err, 'high', 'Server error', request, response));

        })

    })

  }

  protected _updateMany(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    update: UnSignedObject,
    updateOptions: HandyMongooseModelUpdateOpts<definedModelInterfaces['allFields']> = {},
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseUpdateResult> {

    let { deletedDocs = this._defaultFindOptions.deletedDocs, updateName = 'Unknown' } = updateOptions;

    return new Promise((resolve, reject) => {

      this._canUpdateDocs(request, response, where, update, deletedDocs, validateAccess)
        .then(canUpdate => {

          if (this._useChangesHistory && !updateOptions.skipUpdateHistory) {

            let historyData: MongoChangesHistoryData = {
              sessionId: this._extractSessionIdFromRequest(request),
              updateName: updateName,
              updatedAt: new Date().getTime(),
              updatedBy: this._extractUserIdFromRequest(request),
              updatedTo: this._lightenHistoryData(update)
            };

            let $push: any = {
              changesHistory: {
                $each: [historyData],
              }
            }

            if (this._limitChangesHistoryLength) {
              $push.changesHistory.$slice = 0 - this._changesHistoryLength;
            }

            if (isEmpty(update.$push)) {
              update.$push = {};
            }

            update.$push = { ...update.$push, ...$push };

          }

          // @ts-ignore
          let Execution = this._Model.updateMany(where, update, { request, response })

          let deletedWhere: HandyMongooseDeletedWhere = this._getDeletedWhere(deletedDocs);
          if (this._useSoftdelete && isNotEmpty(deletedWhere)) {
            Execution.where(deletedWhere);
          }

          return Execution;

        })
        .then(updateResult => {

          resolve({
            matchingRecords: updateResult.n,
            updatedRecords: updateResult.nModified,
            success: updateResult.nModified > 0
          })

        })
        .catch(updateErr => {
          reject(this._handleError(updateErr, 'high', 'Server error', request, response));
        })

    })


  }

  protected _updateOne(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    update: UnSignedObject,
    updateOptions: HandyMongooseModelUpdateOpts<definedModelInterfaces['allFields']> = {},
    request?: ServerRequest,
    response?: ServerResponse,
    validateAccess: boolean = false): Promise<HandyMongooseUpdateResult> {

    let { deletedDocs = this._defaultFindOptions.deletedDocs, updateName = 'Unknown', customOptions } = updateOptions;

    return new Promise((resolve, reject) => {

      this._canUpdateDocs(request, response, where, update, deletedDocs, validateAccess)
        .then(canUpdate => {

          if (this._useChangesHistory && !updateOptions.skipUpdateHistory) {

            let historyData: MongoChangesHistoryData = {
              updateName: updateName,
              sessionId: this._extractSessionIdFromRequest(request),
              updatedAt: new Date().getTime(),
              updatedBy: this._extractUserIdFromRequest(request),
              updatedTo: this._lightenHistoryData(update)
            };

            let $push: any = {
              changesHistory: {
                $each: [historyData],
              }
            }

            if (this._limitChangesHistoryLength) {
              $push.changesHistory.$slice = 0 - this._changesHistoryLength;
            }

            if (isEmpty(update.$push)) {
              update.$push = {};
            }

            update.$push = { ...update.$push, ...$push };

          }

          // @ts-ignore
          let Execution = this._Model.updateOne(where, update, { request, response, customOptions });

          let deletedWhere: HandyMongooseDeletedWhere = this._getDeletedWhere(deletedDocs);
          if (this._useSoftdelete && isNotEmpty(deletedWhere)) {
            Execution.where(deletedWhere);
          }

          return Execution;

        })
        .then(updateResult => {

          resolve({
            matchingRecords: updateResult.n,
            updatedRecords: updateResult.nModified,
            success: updateResult.nModified > 0
          })

        })
        .catch(err => {

          reject(this._handleError(err, 'high', 'Server error', request, response));

        })

    })


  }

  protected _hardDelete(
    where: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>,
    single: boolean = false,
    request?: ServerRequest,
    response?: ServerResponse): Promise<HandyMongooseRemoveResult> {

    return new Promise((resolve, reject) => {

      let Execution = (single) ? this._Model.deleteOne(where) : this._Model.deleteMany(where);

      Execution
        .then(deletionResult => {

          return resolve({
            success: deletionResult.deletedCount > 0,
            matchingRecords: deletionResult.n,
            deletedRecords: deletionResult.deletedCount
          });

        })
        .catch(err => {

          return reject(this._handleError(err, 'high', 'Server error', request, response));

        })

    })

  }

  protected _distinct<T extends definedModelInterfaces["allFields"]>(fieldName: T, where: any = {},
    deleted?: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    request?: ServerRequest, response?: ServerResponse, validateAccess: boolean = false): Promise<HandyMongooseDistinctOneResults<definedModelInterfaces, T>> {

    return new Promise((resolve, reject) => {

      // ? Checks for access rules for the specified field only
      this._canReadDocs(where, request, response, fieldName, deleted, validateAccess)
        .then(canReadDocsOnModelLevel => {

          if (!canReadDocsOnModelLevel) {
            return Promise.reject(this._handleError(`You don't have permission to access this data.`, 'low', 'Forbidden', request, response));
          }
          let distinctExecution = this._Model.distinct(fieldName, where);

          let deletedWhere: HandyMongooseDeletedWhere = this._getDeletedWhere(deleted);
          if (this._useSoftdelete && isNotEmpty(deletedWhere)) {
            distinctExecution.where(deletedWhere);
          }

          distinctExecution.then(distinctResult => {

            return resolve(distinctResult);

          })
            .catch(err => {

              return reject(this._handleError(err));

            })

        })
        .catch(err => {
          return reject(this._handleError(err, 'high', 'Server error', request, response))
        })

    })

  }

  /* -------------------------------------------------------------------------- */
  /*                              Checkers                                      */
  /* -------------------------------------------------------------------------- */

  protected _hasModelAccessRules(action: DbActionType<definedModelInterfaces['allFields']>): boolean {

    if (isUndefined(this._ModelSettings.accessRules)) {
      return false;
    }

    return isNotUndefined(this._ModelSettings.accessRules[action]);

  }

  protected _canCreateDocs(request: ServerRequest, response: ServerResponse, validateAccess: boolean): Promise<boolean> {

    let action = <DbActionType<definedModelInterfaces['allFields']>>'create';

    if (!validateAccess || isEmpty(request) || !this._hasModelAccessRules(action) || request.user.hasRoles('superAdmin')) {
      return Promise.resolve(true);
    }

    let createRules = this._ModelSettings.accessRules.create;

    return new Promise((resolve, reject) => {

      if (typeof createRules === 'function') {

        this._getFunctionAccessValidatorPromise(createRules, request, action)
          .then((result: boolean) => {
            return resolve(result);
          })
          .catch(err => {
            return reject(this._handleError(err, 'high', 'Server error', request, response))
          })

      } else {

        let { groups, permission, groupId } = createRules;

        let can = false;

        if (!can && isNotEmpty(permission)) {
          can = request.user.hasPermissions(permission);
        }

        if (!can && isNotEmpty(groups)) {
          can = request.user.isMemberOfGroupTypes(groups);
        }

        if (!can && isNotEmpty(groupId)) {
          can = request.user.isMemberOfGroupId(groupId);
        }

        return resolve(can);

      }

    })

  }

  protected _canDeleteOrRestoreDocs(where: UnSignedObject, request: ServerRequest, response: ServerResponse, action: DbActionType<definedModelInterfaces['allFields']>, validateAccess: boolean): Promise<boolean> {

    if (!validateAccess || isEmpty(request) || !this._hasModelAccessRules(action) || request.user.hasRoles(['superAdmin'])) {
      return Promise.resolve(true);
    }

    let deleted: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]> =
      (action === 'delete')
        ? <MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>>'active'
        : <MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>>'deleted';

    let deleteRules = this._ModelSettings.accessRules.delete;

    return new Promise((resolve, reject) => {

      if (typeof deleteRules === 'function') {

        this._getFunctionAccessValidatorPromise(deleteRules, request, action, where)
          .then((result: boolean) => {
            return resolve(result);
          })
          .catch(err => {
            return reject(this._handleError(err, 'high', 'Server error', request, response))
          })

      } else {

        this._resolveModelLevelReadUpdateOrDeleteRules(deleteRules, request, response, where, deleted, action)
          .then(modelLevelAccessRulesResult => {

            let canDelete: boolean = false;
            let modelLevelAccessRulesResultLen: number = modelLevelAccessRulesResult.length;
            for (let i = 0; i < modelLevelAccessRulesResultLen; i++) {

              if (modelLevelAccessRulesResult[i]) {
                canDelete = true;
                break;
              }

            }

            return resolve(canDelete);

          })
          .catch(err => {
            return reject(this._handleError(err, 'high', 'Server error', request, response));
          })

      }

    })

  }

  protected _canUpdateDocs(
    request: ServerRequest,
    response: ServerResponse,
    where: UnSignedObject,
    updateQuery: {},
    deleted: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    validateAccess: boolean = false): Promise<boolean> {

    // Is either superadmin or has no request, which means that's system query
    if (!validateAccess || isUndefined(request) || request.user.hasRoles(['superAdmin'])) {
      return Promise.resolve(true);
    }

    let modelUpdateRules = (isEmpty(this._ModelSettings.accessRules)) ? null : this._ModelSettings.accessRules.update;
    let { fieldsLevelRules, hasFieldLevelRules, hasSystemField } = this._getUpdateFieldsAccessRules(updateQuery);

    // Has no update rules, so it's free to update
    if (isEmpty(modelUpdateRules) && !hasFieldLevelRules) {
      return Promise.resolve(true);
    }

    if (hasSystemField) {
      return Promise.reject(this._handleError(`You don't have permission to modify system specific fields.`, 'low', 'Forbidden', request, response));
    }

    if (!request.user.loggedIn) {
      return Promise.reject(this._handleError(`You don't have permission to access this data.`, 'low', 'Unauthorized', request, response));
    }

    return new Promise((resolve, reject) => {

      this._resolveModelLevelReadUpdateOrDeleteRules(modelUpdateRules, request, response, where, deleted, <DbActionType<definedModelInterfaces['allFields']>>'update', updateQuery)
        .then((modelLevelPromisesResults: boolean[]) => {

          return this._canReadOrUpdateDataBasedOnResolvedModelLevelAccessRules(
            where,
            request,
            response,
            deleted,
            modelLevelPromisesResults,
            hasFieldLevelRules,
            fieldsLevelRules,
            <DbActionType<definedModelInterfaces['allFields']>>'update',
            updateQuery
          );

        })
        .then((finalResult: boolean) => {

          if (finalResult) {
            return resolve(finalResult)
          } else {
            return reject(this._handleError(`You don't have permission to modify this data.`, 'low', 'Forbidden', request, response));
          }

        })
        .catch(error => {
          return reject(this._handleError(error, 'high', 'Server error', request, response));
        })

    })

  }

  protected _canReadDocs(
    where: UnSignedObject,
    request: ServerRequest,
    response: ServerResponse,
    selectStr: string,
    deleted: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    validateAccess: boolean = false): Promise<boolean> {

    // Is either superadmin or has no request, which means that's system query
    if (!validateAccess || isUndefined(request) || request.user.hasRoles(['superAdmin'])) {
      return Promise.resolve(true);
    }

    let modelReadRules = isEmpty(this._ModelSettings.accessRules) ? null : this._ModelSettings.accessRules.read;

    let { fieldsLevelRules, hasFieldLevelRules } = this._getReadFieldsAccessRules(selectStr);

    //? Has no update rules, so it's free to update
    if (isEmpty(modelReadRules) && !hasFieldLevelRules) {
      return Promise.resolve(true);
    }

    if (!request.user.loggedIn) {
      return Promise.resolve(false);
    }

    return new Promise((resolve, reject) => {

      let action = <DbActionType<definedModelInterfaces['allFields']>>'read';
      this._resolveModelLevelReadUpdateOrDeleteRules(modelReadRules, request, response, where, deleted, action)
        .then((modelLevelPromisesResults: boolean[]) => {

          return this._canReadOrUpdateDataBasedOnResolvedModelLevelAccessRules(where, request, response, deleted, modelLevelPromisesResults, hasFieldLevelRules, fieldsLevelRules, action);

        })
        .then((finalResult: boolean) => {

          if (finalResult) {
            return resolve(true)
          } else {
            return resolve(false);
          }

        })
        .catch(error => {
          return reject(this._handleError(error, 'high', 'Server error', request, response));
        })

    })

  }

  protected _canReadOrUpdateDataBasedOnResolvedModelLevelAccessRules(
    where: UnSignedObject,
    request: ServerRequest,
    response: ServerResponse,
    deleted: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    modeleLevelChecksResults: boolean[],
    hasFieldLevelRules: boolean,
    fieldsLevelRules: MongoFielLeveldAcessRules<definedModelInterfaces["allFields"]>[],
    action: DbActionType<definedModelInterfaces['allFields']>,
    additionalQuery: UnSignedObject = {}): Promise<boolean> {

    let can: boolean = false;

    let resultsLen: number = modeleLevelChecksResults.length;
    for (let i = 0; i < resultsLen; i++) {

      if (modeleLevelChecksResults[i] === true) {
        can = true;
        break;
      }

    }

    // ?Has read or update access from model level
    if (can) {
      return Promise.resolve(true);
    }

    // Has no model level access and there are no other rules, so there is nothing else to check, which means that has no access
    if (!hasFieldLevelRules) {
      return Promise.resolve(false);
    }

    return this._resolveFieldAccessRules(where, action, deleted, fieldsLevelRules, request, response, additionalQuery);

  }

  protected _checkFieldTypeValidityForAccessReffrence(fieldName: definedModelInterfaces["allFields"], type: 'groupId' | 'userId'): false | string {

    let fieldType = this._modelDeclaration[fieldName].type;

    if (!(fieldType === 'Number' || fieldType === '[Number]')) {

      if (!(fieldName === '_id' && this._ModelSettings.autoIncrement)) {
        return `"${fieldName}" is invalid field for ${(type === 'groupId') ? 'group' : 'user'} access validation reffrence. "${fieldName}" must be [Number] | Number field type.`;
      }

    }

    if (this._systemFieldsList.includes(fieldName) && !this._systemReffrenceAbleFieldsList.includes(fieldName)) {

      return `"${fieldName}" is invalid field for reffrence ${(type === 'groupId') ? 'group' : 'user'} access validation. This system fields is not allowed for reffrencing.`

    }

    return false;

  }

  /* -------------------------------------------------------------------------- */
  /*                               Helper methods                               */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Extractors ------------------------------- */

  protected _extractUserIdFromRequest(request?: ServerRequest): number {

    return (isEmpty(request) || !request.user.loggedIn) ? null : request.user._id;

  }

  protected _extractSessionIdFromRequest(request?: ServerRequest): string {

    return (isEmpty(request)) ? null : request.handyClientSessionId;

  }

  /* --------------------------------- Parsers -------------------------------- */

  protected _parseSelect(select: HandyMongooseSelect<definedModelInterfaces['allFields']> = this.defaultSelect): string {

    if (isEmpty(select)) {
      return '';
    }

    let result = '';

    let selectFields: string[] = [];

    if (typeof select.fields == 'string') {
      selectFields = [select.fields];
    } else {
      selectFields = select.fields;
    }

    let selectFieldsLen: number = selectFields.length;

    if (select.selectType === 'select') {

      for (let i = 0; i < selectFieldsLen; i++) {
        const field = selectFields[i];

        result += `${field} `;

      }

    }

    if (select.selectType === 'deselect') {

      for (let i = 0; i < selectFieldsLen; i++) {
        const field = selectFields[i];

        result += `-${field} `;

      }

    }

    return result.trim();

  }

  protected _parseMongoosePopulateOptions(populateOptions: HandyMongoosePopulateOptions<string>): OriginalMongoosePopulateOptions {

    let result: OriginalMongoosePopulateOptions = {
      path: populateOptions.path,
      model: populateOptions.model
    };

    let select: string = this._parseSelect(populateOptions.select);
    if (select.length > 0) {
      result.select = select;
    }

    if (populateOptions.sort !== undefined || populateOptions.limit !== undefined) {

      let options: OriginalMongoosePopulateOptions['options'] = {};

      if (populateOptions.sort !== undefined) {
        options.sort = this._parseSortOptions(populateOptions.sort);
      }

      if (populateOptions.limit !== undefined) {
        options.limit = populateOptions.limit;
      }

      result.options = options;

    }

    if (populateOptions.where !== undefined) {

      result.match = populateOptions.where;

    }

    if (populateOptions.deepPopulate !== undefined) {
      result.populate = this._parseMongoosePopulateOptions(populateOptions.deepPopulate);
    }

    return result;

  }

  protected _parseSortOptions(sortingOptions: MongooseSortingOptions<string>): { [key: string]: MongooseSortingDirection } {

    if (!Array.isArray(sortingOptions)) {
      sortingOptions = [sortingOptions];
    }

    let result: { [key: string]: MongooseSortingDirection } = {};
    let optionsLen: number = sortingOptions.length;

    for (let i = 0; i < optionsLen; i++) {
      const singleOption = sortingOptions[i];
      result[singleOption.field] = singleOption.direction;
    }

    return result;

  }

  protected _parsePaginationData(totalRecordsCount: number, page: number, limit: number, docs: any[]): HandyMongooseResultsPagination {

    let pagesCount: number = Math.floor(totalRecordsCount / limit) + 1;

    return {
      totalRecordsCount,
      hasRecords: isNotEmpty(docs),
      page,
      pagesCount,
      recordsPerPage: limit,
      thisPageRecordsCount: docs.length,
      hasMorePages: (pagesCount > 1),
      hasNextPage: page < pagesCount,
      hasPrevPage: page > 1
    };

  }

  /* --------------------------------- Getters -------------------------------- */

  protected _getUpdatedFieldsFromQuery(updateQuery: any = {}): definedModelInterfaces['allFields'][] {

    let fieldsList: definedModelInterfaces['allFields'][] = [];

    let queryKeys: string[] = Object.keys(updateQuery);
    let queryKeysLen: number = queryKeys.length;
    for (let i = 0; i < queryKeysLen; i++) {
      const singleQueryKey = queryKeys[i];

      if (singleQueryKey.startsWith('$')) {
        fieldsList = [...fieldsList, ...this._getUpdatedFieldsFromQuery(updateQuery[singleQueryKey])];
      } else {
        fieldsList.push(singleQueryKey);
      }

    }

    return fieldsList;

  }

  protected _getUpdateFieldsAccessRules(
    updateQuery: any = {}): { fieldsLevelRules: MongoFielLeveldAcessRules<definedModelInterfaces['allFields']>[], hasFieldLevelRules: boolean, hasSystemField: boolean } {

    let fieldsLevelRules: MongoFielLeveldAcessRules<definedModelInterfaces['allFields']>[] = [];
    let hasSystemField: boolean = false;
    let hasFieldLevelRules: boolean = false;

    let fieldsList: definedModelInterfaces['allFields'][] = this._getUpdatedFieldsFromQuery(updateQuery);
    let fieldsLen: number = fieldsList.length;
    for (let i = 0; i < fieldsLen; i++) {
      const fieldName = fieldsList[i];

      // !tries to update system field from outside of the app, which is not allowed via api unless is wrapped 
      // !in dedicated method...
      if (this._systemFieldsList.includes(fieldName)) {

        hasSystemField = true;
        break;

      }

      if (isNotEmpty(this._fieldLevelAccessRules[fieldName]) && isNotEmpty(this._fieldLevelAccessRules[fieldName].update)) {
        fieldsLevelRules.push(this._fieldLevelAccessRules[fieldName].update);
        hasFieldLevelRules = true;
      }

    }

    let hasModelLevelAccessRules: boolean = isEmpty(this._ModelSettings.accessRules) ? false : isNotEmpty(this._ModelSettings.accessRules.update);

    if (fieldsLevelRules.length < fieldsLen && hasModelLevelAccessRules) {

      // ?Basically means that doesn't have access to all fields that tries to update 
      let stopper = (...args: any[]) => {
        return false;
      }
      fieldsLevelRules.unshift(stopper);
      hasFieldLevelRules = true;

    }

    return {
      fieldsLevelRules,
      hasSystemField,
      hasFieldLevelRules
    };

  }

  protected _getReadFieldsFromSelectString(selectStr: string): definedModelInterfaces['allFields'][] {

    let fieldsList: definedModelInterfaces['allFields'][] = selectStr.split(' ');
    let fieldsLen: number = fieldsList.length;

    if (fieldsLen === 0) {
      return this._modelFields;
    }
    let finalList: definedModelInterfaces['allFields'][] = [];
    let selectedFields: definedModelInterfaces['allFields'][] = [];
    let deSelectFields: definedModelInterfaces['allFields'][] = [];
    let hasSelected: boolean = false;
    let hasDeselected: boolean = false;

    for (let i = 0; i < fieldsLen; i++) {

      let field = fieldsList[i] as string;
      if (field.startsWith('-')) {
        deSelectFields.push(field.replace('-', ''));
        hasDeselected = true;
      } else {
        selectedFields.push(field);
        hasSelected = true;
      }

    }

    if (hasSelected && !hasDeselected) {

      if (!selectedFields.includes('_id')) {
        selectedFields.push('_id');
      }

      return selectedFields;
    }

    if (!hasSelected && hasDeselected) {

      for (let i = 0; i < this._modelFieldsLen; i++) {
        const field = this._modelFields[i];

        if (!deSelectFields.includes(field)) {
          finalList.push(field);
        }

      }

      return finalList;

    }

    // ? Has both, selected and deselected, which means that only id can be deselected in this case
    return selectedFields;

  }

  protected _getReadFieldsAccessRules(selectStr: string): { fieldsLevelRules: MongoFielLeveldAcessRules<definedModelInterfaces['allFields']>[], hasFieldLevelRules: boolean } {

    let hasFieldLevelRules: boolean = false;
    let fieldsLevelRules: MongoFielLeveldAcessRules<definedModelInterfaces['allFields']>[] = [];

    let fieldsList: definedModelInterfaces['allFields'][] = this._getReadFieldsFromSelectString(selectStr);

    let fieldsLen: number = fieldsList.length;
    for (let i = 0; i < fieldsLen; i++) {
      const fieldName = fieldsList[i];

      if (isNotEmpty(this._fieldLevelAccessRules[fieldName]) && isNotEmpty(this._fieldLevelAccessRules[fieldName].read)) {

        fieldsLevelRules.push(this._fieldLevelAccessRules[fieldName].read);
        hasFieldLevelRules = true;

      }

    }

    let hasModelLevelAccessRules: boolean = isEmpty(this._ModelSettings.accessRules) ? false : isNotEmpty(this._ModelSettings.accessRules.read);

    if (fieldsLevelRules.length < fieldsLen && hasModelLevelAccessRules) {

      // Basically means that doesn't have access to all fields that tries to update 
      let stopper = (...args: any[]) => {
        return false;
      }
      fieldsLevelRules.unshift(stopper);
    }

    return {
      hasFieldLevelRules,
      fieldsLevelRules
    };

  }

  protected _getFunctionAccessValidatorPromise(
    rule: CombinedUserMongoAccessValidator<definedModelInterfaces['allFields']>,
    request: ServerRequest,
    action: DbActionType<definedModelInterfaces['allFields']>,
    conditionsQueryOrDoc?: any,
    updateQuery?: any): Promise<boolean> {

    let test = rule(request.user, action, conditionsQueryOrDoc, updateQuery);
    if (isNotEmpty((<Promise<boolean>>test).then)) {
      return test as Promise<boolean>;
    } else {
      return Promise.resolve(test);
    }

  }

  protected _getDocFieldsList(doc: definedModelInterfaces['fullModelShape']): definedModelInterfaces['allFields'][] {

    return Object.keys(doc) as definedModelInterfaces['allFields'][];

  }

  protected _getDeletedWhere(deletedDocsSpecs: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>): HandyMongooseDeletedWhere {

    let deletedWhere: HandyMongooseDeletedWhere = {};

    if (this._useSoftdelete) {

      if (deletedDocsSpecs === 'active') {
        deletedWhere = { deleted: false };
      }

      if (deletedDocsSpecs === 'deleted') {
        deletedWhere = { deleted: true };
      }

      if (deletedDocsSpecs === 'restored') {
        deletedWhere = { restored: true };
      }

    }

    return deletedWhere;

  }

  protected _getFieldLevelAccessPromises(
    where: UnSignedObject,
    action: DbActionType<definedModelInterfaces['allFields']>,
    deleted: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    fieldsAccessRules: MongoFielLeveldAcessRules<definedModelInterfaces["allFields"]>[],
    request: ServerRequest,
    response: ServerResponse,
    additionalQuery: UnSignedObject): Promise<boolean>[] {

    let fieldLevelPromises: Promise<boolean>[] = [];

    let fieldsLen: number = fieldsAccessRules.length;
    for (let i = 0; i < fieldsLen; i++) {
      const fieldRules = fieldsAccessRules[i];

      if (typeof fieldRules === 'function') {

        let testInPromise = this._getFunctionAccessValidatorPromise(fieldRules, request, action, where, additionalQuery);
        fieldLevelPromises.push(testInPromise);

      } else {

        let checkPromise: Promise<boolean> = new Promise((fieldCheckResolve, fieldCheckReject) => {

          let { groups, permission, groupIdField, userIdField } = fieldRules;
          let canUpdateField: boolean = false;
          let asyncCheckPromises: Promise<boolean>[] = [];

          if (isNotEmpty(permission) && request.user.hasPermissions(permission)) {
            canUpdateField = true;
          }

          if (!canUpdateField && isNotEmpty(groups) && request.user.isMemberOfGroupTypes(groups)) {
            canUpdateField = true;
          }

          asyncCheckPromises.push(Promise.resolve(canUpdateField));

          if (!canUpdateField && (isNotEmpty(groupIdField) && isNotNullOrUndefined(request.user.groupId) || isNotEmpty(userIdField))) {

            asyncCheckPromises.push(this._compareAccessFieldsCount(where, deleted, request, response, groupIdField, userIdField));

          }

          Promise.all(asyncCheckPromises)
            .then(asyncResults => {
              let hasAsyncFieldAccess: boolean = false;
              let asyncResultsLen: number = asyncResults.length;
              for (let j = 0; j < asyncResultsLen; j++) {

                if (asyncResults[j]) {
                  hasAsyncFieldAccess = true;
                  break;
                }

              }
              return fieldCheckResolve(hasAsyncFieldAccess);

            })
            .catch(asyncCheckErr => {
              return fieldCheckReject(asyncCheckErr);
            })

        })

        fieldLevelPromises.push(checkPromise);

      }

    }

    return fieldLevelPromises;
  }

  protected _getReffrenceQueryForFieldAsyncCheck(fieldName: definedModelInterfaces["allFields"], type: 'groupId' | 'userId', request: ServerRequest): { [key: string]: number } | string {

    let fieldValidityErr = this._checkFieldTypeValidityForAccessReffrence(fieldName, type);
    if (fieldValidityErr !== false) {
      return fieldValidityErr;
    }

    return { [fieldName]: (type === 'groupId') ? request.user.groupId : request.user._id };

  }

  protected _getSoftDeleteUpdateOptions(request: ServerRequest): { updateOptions: HandyMongooseModelUpdateOpts<definedModelInterfaces['allFields']>, update: UnSignedObject } {

    let updateOptions: HandyMongooseModelUpdateOpts<definedModelInterfaces['allFields']> = {
      // @ts-ignore
      deletedDocs: 'active',
      updateName: 'Delete'
    }

    let update: UnSignedObject = {
      $set: {
        deleted: true,
        restored: false,
        deletedAt: new Date().getTime(),
        restoredAt: null,
        deletedBy: this._extractUserIdFromRequest(request),
        restoredBy: null
      }
    }

    return {
      updateOptions,
      update
    }

  }

  protected _getRestoreUpdateOptions(request: ServerRequest): { updateOptions: HandyMongooseModelUpdateOpts<definedModelInterfaces['allFields']>, update: UnSignedObject } {

    let updateOptions: HandyMongooseModelUpdateOpts<definedModelInterfaces['allFields']> = {
      // @ts-ignore
      deletedDocs: 'deleted',
      updateName: 'Restore'
    }

    let update: UnSignedObject = {
      deleted: false,
      restored: true,
      deletedAt: null,
      restoredAt: new Date().getTime(),
      deletedBy: null,
      restoredBy: this._extractUserIdFromRequest(request)
    }

    return {
      updateOptions,
      update
    }

  }

  protected _getFinalSearchQuery(
    searchValue: string | number,
    fields: SingleOrArrayCombo<definedModelInterfaces['searchableFields']> = [],
    findParams: HandyMongooseModelPublicFindOpts<definedModelInterfaces['allFields']> & { regexOptions?: MognooseSearchRegexOptions } = {},
    additionalSearchQueries: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>[] = [],
    additionalAndQueries: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>[] = []): FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>> {

    let searchQueries: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>[] = [];

    if (isNotEmpty(searchValue)) {

      let isNumber: boolean = typeof searchValue === 'number';
      let isString: boolean = typeof searchValue === 'string';
      let stringSearchVal: string;
      let numberSearchVal: string;
      let isNegative: boolean = false;

      if (typeof searchValue === 'string') {
        searchValue = searchValue.trim();
        stringSearchVal = searchValue;

        // ? is string containing only numbers, spaces ".,-" 
        if (this._hasDigitRegex.test(searchValue) && this._possibleNumberRegex.test(searchValue)) {

          searchValue = searchValue.replace(/\s/, '');

          if (searchValue.startsWith('-')) {
            isNegative = true;
          }

          if (searchValue.startsWith('.') || searchValue.startsWith(',')) {
            searchValue = '0' + searchValue;
          }

          searchValue = searchValue.replace(/\-/, '');

          // ?sorting delimineters
          let periodSplitted: string[] = searchValue.split('.');
          let periodSplittedLen: number = periodSplitted.length;

          let commaSplitted: string[] = searchValue.split(',');
          let commaSplittedLen: number = commaSplitted.length;

          // Finding the first one...
          if (periodSplittedLen > 1 && commaSplittedLen > 1) {

            let firstDelimeineter: '.' | ',' = (periodSplittedLen < commaSplittedLen) ? '.' : ',';
            let decimalSplit: string[] = searchValue.split(firstDelimeineter);
            let decimalSplitLen: number = decimalSplit.length;

            let beforeDecimal: string = decimalSplit[0];
            let afterDecimalString: string = '';

            for (let i = 1; i < decimalSplitLen; i++) {

              let afterSplitFraction = decimalSplit[i];
              afterSplitFraction.replace(/\./, '');
              afterSplitFraction.replace(/,/, '');

              afterDecimalString += afterSplitFraction;

            }

            beforeDecimal.replace(/\./, '');
            beforeDecimal.replace(/,/, '');

            numberSearchVal = `${beforeDecimal}.${afterDecimalString}`;

          }

          if (periodSplittedLen < commaSplittedLen) {

            let beforeDecimal: string = periodSplitted[0];
            let afterDecimalString: string = '';

            for (let i = 1; i < periodSplittedLen; i++) {

              let afterSplitFraction = periodSplitted[i];
              afterSplitFraction.replace(/\./, '');
              afterSplitFraction.replace(/,/, '');

              afterDecimalString += afterSplitFraction;

            }

            beforeDecimal.replace(/\./, '');
            beforeDecimal.replace(/,/, '');

            numberSearchVal = `${beforeDecimal}.${afterDecimalString}`;

          }

          if (commaSplittedLen < periodSplittedLen) {

            let beforeDecimal: string = commaSplitted[0];
            let afterDecimalString: string = '';

            for (let i = 1; i < commaSplittedLen; i++) {

              let afterSplitFraction = commaSplitted[i];
              afterSplitFraction.replace(/\./, '');
              afterSplitFraction.replace(/,/, '');

              afterDecimalString += afterSplitFraction;

            }

            beforeDecimal.replace(/\./, '');
            beforeDecimal.replace(/,/, '');

            numberSearchVal = `${beforeDecimal}.${afterDecimalString}`;

          }

          if (numberSearchVal === undefined) {
            numberSearchVal = searchValue;
          }

        }

      }

      if (typeof searchValue === 'number') {
        isNegative = (searchValue < 0);
        numberSearchVal = searchValue.toString();
        stringSearchVal = numberSearchVal;
      }

      let fieldsToSearch: definedModelInterfaces['searchableFields'][] = [];

      if (isEmpty(fields)) {
        fields = (isEmpty(this._defaultSearchableFields)) ? this._searchableFields : this._defaultSearchableFields;
      }

      if (typeof fields === 'string') {
        fieldsToSearch = [fields];
      }

      if (isArray(fields)) {
        fieldsToSearch = fields as definedModelInterfaces['searchableFields'][];
      }

      let regexOptions: MognooseSearchRegexOptions = { ...findParams.regexOptions, ...this._searchDefaultOptions };
      let regexOptsStr: string;

      if (regexOptions.caseSensitive) {
        regexOptsStr += `i`;
      }
      if (regexOptions.multiline) {
        regexOptsStr += `m`;
      }
      if (regexOptions.extended) {
        regexOptsStr += `x`;
      }
      if (regexOptions.dotAsWildCard) {
        regexOptsStr += `s`;
      }

      let stringSearchRegexDefinition: UnSignedObject = {
        $regex: (isNegative) ? `-${stringSearchVal}` : stringSearchVal
      }

      if (regexOptsStr) {
        stringSearchRegexDefinition.$options = regexOptsStr;
      }

      let numberSearchNumericValue: number;
      if (numberSearchVal) {
        let numericVal: number = parseFloat(numberSearchVal);
        numberSearchNumericValue = (isNegative) ? 0 - numericVal : numericVal;
      }

      let fieldsToSearchLen: number = fieldsToSearch.length;
      for (let i = 0; i < fieldsToSearchLen; i++) {
        const fieldName = fieldsToSearch[i] as definedModelInterfaces["allFields"];

        if (this._stringSearchableFieldTypes.includes(this._modelDeclaration[fieldName].type)) {
          // @ts-ignore
          searchQueries.push({ [fieldName]: stringSearchRegexDefinition });

        }

        if (numberSearchVal && (this._numberSearchableFieldTypes.includes(this._modelDeclaration[fieldName].type) || (fieldName === '_id' && this._ModelSettings.autoIncrement))) {

          // @ts-ignore
          searchQueries.push({ [fieldName]: numberSearchNumericValue });

        }

      }

    }

    let allQueries: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>[] = [...searchQueries, ...additionalSearchQueries];
    let allQueriesLen: number = allQueries.length;
    let finalSearchQuery: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>> = {};
    if (allQueriesLen > 0) {

      finalSearchQuery.$or = [];

      for (let index = 0; index < allQueriesLen; index++) {
        const singleQuery = allQueries[index];
        // @ts-ignore
        finalSearchQuery.$or.push(singleQuery);
      }

    }

    let finalQuery: FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>> = {};
    if (isNotEmpty(additionalAndQueries)) {
      // @ts-ignore
      finalQuery.$and = [...additionalAndQueries];
      // @ts-ignore
      finalQuery.$and.push(finalSearchQuery as FilterQuery<mongooseModelInterface<definedModelInterfaces['fullModelShape']>>[])
    } else {
      finalQuery = finalSearchQuery;
    }

    return finalQuery;

  }

  /* ---------------------------------- Other --------------------------------- */


  protected _handleError(
    error: HandyError | any,
    priority: ErrorPriority = 'low',
    errorCode: ErrorReasons = 'Server error',
    request?: ServerRequest,
    response?: ServerResponse,
    source: Error = new Error): HandyError {

    if (this._handyError.isHandyError(error, request, response)) {
      return error;
    }

    let finalError: HandyError;

    if (isNotEmptyObject(error)) {

      let errKeys: string[] = Object.keys(error);
      if (errKeys.includes('name')) {

        let errName: string = error.name;

        switch (errName) {

          case 'ValidationError':

            let publicErrorsList: string[] = [];

            let subErrors = error.errors;
            let subErrorsKeys: string[] = Object.keys(subErrors);

            let subErrorsLen: number = subErrorsKeys.length;
            for (let i = 0; i < subErrorsLen; i++) {

              const errorKey = subErrorsKeys[i];
              publicErrorsList.push(subErrors[errorKey]['message']);

            }

            finalError = this._handyError.register(error, 'medium', 'Bad request', 'Data validation failed', { public: publicErrorsList }, request, response);

            break;

          case 'MongoError':

            if (error.code === 11000) {
              finalError = this._handyError.register(error, 'medium', 'Bad request', 'Data validation failed', { public: ['Unique record validation failed'] }, request, response);
            }

            break;

          default:
            break;
        }

      }

    }

    if (isNotUndefined(finalError)) {
      return finalError;
    }

    return this._handyError.register(error, priority, errorCode, 'Db error', { private: 'Mongoose/mongo related error' }, request, response, source);

  }

  protected _removeUnallowedSymbolsFromUpdateHistoryData(updateVal: any): any {

    if (typeof updateVal !== 'object' || updateVal === null || updateVal === undefined) {
      return updateVal;
    }

    let keysToCheck: string[] = Object.keys(updateVal);
    let result: UnSignedObject = {};

    let keysLen: number = keysToCheck.length;
    for (let i = 0; i < keysLen; i++) {
      const singleKey = keysToCheck[i];

      result[singleKey.replace('$', '@').replace('.', '#')] = this._removeUnallowedSymbolsFromUpdateHistoryData(updateVal[singleKey]);

    }

    return result;


  }

  protected _lightenHistoryData(doc: any = {}): number {

    let newHistData = { ...doc };
    let keysToRemoveLen: number = this._keysToRemoveFromChangesHistory.length;

    for (let i = 0; i < keysToRemoveLen; i++) {
      const key = this._keysToRemoveFromChangesHistory[i];
      delete newHistData[key];

    }

    return this._removeUnallowedSymbolsFromUpdateHistoryData(newHistData);

  }

  protected _compareAccessFieldsCount(
    where: any,
    deleted: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    request: ServerRequest,
    response: ServerResponse,
    groupIdField: definedModelInterfaces["allFields"],
    userIdField: definedModelInterfaces["allFields"]): Promise<boolean> {

    let groupCountComparsion: Promise<boolean> = new Promise((resolve, reject) => {

      let $or: any[] = [];

      if (isNotEmpty(groupIdField) && isNotNullOrUndefined(request.user.groupId)) {

        let fieldQueryOrError = this._getReffrenceQueryForFieldAsyncCheck(groupIdField, 'groupId', request);
        if (typeof fieldQueryOrError === 'string') {
          return reject(this._handleError(fieldQueryOrError, 'high', 'Server error', request, response));
        }

        $or.push(fieldQueryOrError);

      }

      if (isNotEmpty(userIdField)) {

        let fieldQueryOrError = this._getReffrenceQueryForFieldAsyncCheck(userIdField, 'userId', request);
        if (typeof fieldQueryOrError === 'string') {
          return reject(this._handleError(fieldQueryOrError, 'high', 'Server error', request, response));
        }

        $or.push(fieldQueryOrError);

      }

      let verifyQuery: any = {};
      verifyQuery = {
        $and: [
          where,
        ]
      }

      if ($or.length > 1) {
        verifyQuery.$and.push({ $or });
      } else {
        verifyQuery.$and.push($or[0]);
      }

      Promise.all([
        this.countDocuments(where, true, deleted),
        this.countDocuments(verifyQuery, true, deleted)
      ])
        .then(countPromisesResult => {

          return resolve(countPromisesResult[0] === countPromisesResult[1]);

        })
        .catch(countPromisesError => {

          return reject(this._handleError(countPromisesError, 'high', 'Server error', request, response));

        })


    })

    return groupCountComparsion;

  }

  /* -------------------------------- Resolvers ------------------------------- */

  protected _resolveModelLevelReadUpdateOrDeleteRules(
    modelLevelRules: MongoFielLeveldAcessRules<definedModelInterfaces["allFields"]>,
    request: ServerRequest,
    response: ServerResponse,
    where: UnSignedObject,
    deleted: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    action: DbActionType<definedModelInterfaces['allFields']>,
    additionalQuery: UnSignedObject = {}): Promise<boolean[]> {

    let modelLevelPromises: Promise<boolean>[] = [];

    if (isNotEmpty(modelLevelRules)) {

      if (typeof modelLevelRules === 'function') {

        let testInPromise = this._getFunctionAccessValidatorPromise(modelLevelRules, request, action, where, additionalQuery);
        modelLevelPromises.push(testInPromise);

      } else {

        let { groups, permission, groupIdField, userIdField } = modelLevelRules;
        let can: boolean = false;

        if (isNotEmpty(permission) && request.user.hasPermissions(permission)) {
          can = true;
        }

        if (!can && isNotEmpty(groups) && request.user.isMemberOfGroupTypes(groups)) {
          can = true;
        }

        modelLevelPromises.push(Promise.resolve(can));

        if (!can && (isNotEmpty(groupIdField) && isNotNullOrUndefined(request.user.groupId) || isNotEmpty(userIdField))) {

          modelLevelPromises.push(this._compareAccessFieldsCount(where, deleted, request, response, groupIdField, userIdField));

        }

      }

      return Promise.all(modelLevelPromises);

    }

    // ?has no model level rules
    return Promise.resolve([false]);

  }

  protected _resolveFieldAccessRules(
    where: UnSignedObject,
    action: DbActionType<definedModelInterfaces['allFields']>,
    deleted: MongooseIncludeDeletedOption<definedModelInterfaces["allFields"]>,
    fieldsAccessRules: MongoFielLeveldAcessRules<definedModelInterfaces["allFields"]>[],
    request: ServerRequest,
    response: ServerResponse,
    additionalQuery: UnSignedObject = {}): Promise<boolean> {

    if (request.user.hasRoles('superAdmin')) {
      return Promise.resolve(true);
    }

    let asyncTests = this._getFieldLevelAccessPromises(where, action, deleted, fieldsAccessRules, request, response, additionalQuery);
    return new Promise((resolve, reject) => {

      Promise.all(asyncTests)
        .then(fieldsLevelAccessResults => {
          let canOperateBasedOnFieldsLevel: boolean = false;

          let fieldsLevelAccessResultsLen: number = fieldsLevelAccessResults.length;
          for (let k = 0; k < fieldsLevelAccessResultsLen; k++) {
            if (!fieldsLevelAccessResults[k]) {
              canOperateBasedOnFieldsLevel = false;
              break;

            } else {

              if (!canOperateBasedOnFieldsLevel) {
                canOperateBasedOnFieldsLevel = true;
              }

            }

          }

          return resolve(canOperateBasedOnFieldsLevel);

        })
        .catch(allFieldLevelTEstsErr => {
          return reject(allFieldLevelTEstsErr);
        })

    })

  }

  /* -------------------------------------------------------------------------- */
  /*                                 Middlewares                                */
  /* -------------------------------------------------------------------------- */

  @MongooseMW('findOneAndUpdate')
  @MongooseMW('update')
  @MongooseMW('updateMany')
  @MongooseMW('updateOne')
  protected _setDefaultUpdateOptions(query: any, args: any[]): Promise<any> {

    if (isUndefined(query.options.runValidators)) {
      query.options.runValidators = this._defaultValidationOnUpdate;
      query.options.context = 'query';
    }

    if (isUndefined(query.options.new)) {
      query.options.new = this._defaultReturnUpdatedDocOnUpdate;
    }

    return Promise.resolve();

  }

  /* ----------------------------- Private method ----------------------------- */

  private __defaultMethodsRoutesSettings: ApiRequestListenerSettings[] = [];

  private __parseRoutingSettings(): void {

    // !Added this way so it's not visible via intelisense...
    this.constructor.prototype.__getDefaultMethodsRoutes = () => {
      return this.__defaultMethodsRoutesSettings;
    }

    if (!this._ModelSettings.routable) {
      return;
    }

    let methodsList: MongooseDefaultPublicMethods[] = [
      'countDocuments', 'createMany', 'createOne', 'deleteById', 'deleteMany', 'deleteOne', 'distinct', 'find', 'findById', 'findOne', 'restoreById', 'restoreMany', 'restoreOne', 'search', 'updateMany', 'updateOne'
    ];

    let methodsLen: number = methodsList.length;
    for (let i = 0; i < methodsLen; i++) {
      let methodName = methodsList[i];
      let methodRoutingSettings = this.__getMethodRoutingSettings(methodName);

      if (methodRoutingSettings === false) {
        continue;
      }

      let { apiVersions, env, accessValidationfn, groups, permissions, requestModifier, requestValidator, requiredParams } = methodRoutingSettings;

      let requestSettings: ApiRequestListenerSettings = {
        requestType: this._getRequestTypeBasedFromMethodName(methodName),
        // @ts-ignore
        method: this[`_api${methodName.UcFirst()}`].bind(this),
        apiVersions,
        env,
        accessValidationfn,
        groups,
        permissions,
        publicRoute: methodRoutingSettings.publicRoute,
        routePath: `model/${this._ModelSettings.name.LcFirst()}/${methodName}`,
        requestModifier,
        requestValidator,
        requiredParams

      };

      this.__defaultMethodsRoutesSettings.push(requestSettings);

    }

  }

  private __getMethodRoutingSettings(methodName: MongooseDefaultPublicMethods): DefaultMongoRoutingAccessRule | false {

    let acessRules: DefaultMongoRoutingAccessRule = {};
    let routable: boolean;

    // let permissionsChecks: 

    // ?Checks method level restrictions set in @Model decorator scope
    let modelLevelMethodRestrictions = this.__getMethodExplicitRoutingRestrictions(methodName, 'model');
    if (modelLevelMethodRestrictions !== false) {

      let levelResult = this.__parseLevelRules(acessRules, modelLevelMethodRestrictions, routable);

      acessRules = levelResult.newRules;
      routable = levelResult.routable;

      if (routable === false) {
        return false;
      }

      if (levelResult.finished === true) {
        return levelResult.newRules;
      }

    }

    // ?Checks action level restrictions set in @Model decorator scope
    let modelLevelActionDefaultRestriction = this.__getActionDefaultRoutingRestrictions(methodName, 'model');
    if (modelLevelActionDefaultRestriction !== false) {

      let levelResult = this.__parseLevelRules(acessRules, modelLevelActionDefaultRestriction, routable);

      acessRules = levelResult.newRules;
      routable = levelResult.routable;

      if (routable === false) {
        return false;
      }

      if (levelResult.finished === true) {
        return levelResult.newRules;
      }

    }

    // ?Checks default top level restrictions set in @Model decorator scope
    let modelLevelTopDefaultRestriction = this.__getLevelDefaultRoutingRestrictions('model');
    if (modelLevelTopDefaultRestriction !== false) {

      let levelResult = this.__parseLevelRules(acessRules, modelLevelTopDefaultRestriction, routable);

      acessRules = levelResult.newRules;
      routable = levelResult.routable;

      if (routable === false) {
        return false;
      }

      if (levelResult.finished === true) {
        return levelResult.newRules;
      }

    }

    if (isUndefined(acessRules.publicRoute) && isNotUndefined(this._ModelSettings.publicRoutable)) {
      acessRules.publicRoute = this._ModelSettings.publicRoutable;
    }

    // !Moves to app level restrictions inheritance

    let globalLevelMethodRestrictions = this.__getMethodExplicitRoutingRestrictions(methodName, 'global');
    if (globalLevelMethodRestrictions !== false) {

      let levelResult = this.__parseLevelRules(acessRules, globalLevelMethodRestrictions, routable);

      acessRules = levelResult.newRules;
      routable = levelResult.routable;

      if (routable === false) {
        return false;
      }

      if (levelResult.finished === true) {
        return levelResult.newRules;
      }

    }

    let globalLevelActionDefaultRestriction = this.__getActionDefaultRoutingRestrictions(methodName, 'global');
    if (globalLevelActionDefaultRestriction !== false) {

      let levelResult = this.__parseLevelRules(acessRules, globalLevelActionDefaultRestriction, routable);

      acessRules = levelResult.newRules;
      routable = levelResult.routable;

      if (routable === false) {
        return false;
      }

      if (levelResult.finished === true) {
        return levelResult.newRules;
      }

    }

    let appLevelDefaultRules = this.__getLevelDefaultRoutingRestrictions('global');
    let levelResult = this.__parseLevelRules(acessRules, appLevelDefaultRules, routable);

    acessRules = levelResult.newRules;
    routable = levelResult.routable;

    if (routable === false) {
      return false;
    }

    // ? returns settings anyhow, if no restrictions were set, it means it's open regardless of role/permission
    return levelResult.newRules;

  }

  private __parseLevelRules(acessRules: DefaultMongoRoutingAccessRule, definedRules: DefaultMongoRoutingAccessRule | false, routable?: boolean): { newRules: DefaultMongoRoutingAccessRule, finished: boolean, routable: boolean } {

    let result: { newRules: DefaultMongoRoutingAccessRule, finished: boolean, routable: boolean } = {
      finished: false,
      newRules: acessRules,
      routable
    }

    if (definedRules === false) {
      return result;
    }

    let hasReasonableRules: boolean = (isNotUndefined(acessRules.permissions) || isNotUndefined(acessRules.groups) || isNotUndefined(acessRules.accessValidationfn))

    if (isUndefined(routable) && definedRules.routable === false) {
      result.routable = false;
      return result;
    }

    if (isUndefined(routable) && definedRules.routable === true) {
      routable = true;
    }

    if (isUndefined(acessRules.publicRoute) && isNotUndefined(definedRules.publicRoute)) {
      result.newRules.publicRoute = definedRules.publicRoute;
    }

    if (isUndefined(acessRules.env) && isNotUndefined(definedRules.env)) {
      result.newRules.env = definedRules.env;
    }

    if (isUndefined(acessRules.apiVersions) && isNotUndefined(definedRules.apiVersions)) {
      result.newRules.apiVersions = definedRules.apiVersions;
    }

    if (isUndefined(acessRules.requestModifier) && isNotUndefined(definedRules.requestModifier)) {
      result.newRules.requestModifier = definedRules.requestModifier;
    }

    if (isUndefined(acessRules.requestValidator) && isNotUndefined(definedRules.requestValidator)) {
      result.newRules.requestValidator = definedRules.requestValidator;
    }

    if (isUndefined(acessRules.requiredParams) && isNotUndefined(definedRules.requiredParams)) {
      result.newRules.requiredParams = definedRules.requiredParams;
    }

    if (!hasReasonableRules) {

      if (isNotUndefined(definedRules.permissions)) {
        hasReasonableRules = true;
        result.newRules.permissions = definedRules.permissions;
      }

      if (isNotUndefined(definedRules.groups)) {
        hasReasonableRules = true;
        result.newRules.groups = definedRules.groups;
      }

      if (isNotUndefined(definedRules.accessValidationfn)) {
        hasReasonableRules = true;
        result.newRules.accessValidationfn = definedRules.accessValidationfn;
      }

    }

    if (hasReasonableRules && isNotUndefined(result.newRules.publicRoute) && isNotUndefined(result.newRules.env)) {
      result.finished = true;
    }

    return result;

  }

  private __getActionLevelRoutingRestrictions(methodName: MongooseDefaultPublicMethods, level: 'model' | 'global'): false | DefaultMongoRoutingAccessRule {

    let methodActionType: 'create' | 'read' | 'update' | 'delete' | 'restore' = 'read';

    if (methodName.includes('create')) {
      methodActionType = 'create';
    }

    if (methodName.includes('update')) {
      methodActionType = 'update';
    }

    if (methodName.includes('delete')) {
      methodActionType = 'delete';
    }

    if (methodName.includes('restore')) {
      methodActionType = 'restore';
    }

    let rootRestrictions;

    if (level === 'model') {
      rootRestrictions = this._ModelSettings.routingRestrictions;
    } else {
      rootRestrictions = defaultModelsMethodsRoutingRestrinctions;
    }

    if (isEmpty(rootRestrictions) || isEmpty(rootRestrictions.actions)) {
      return false;
    }

    // @ts-ignore
    let actionLevelRestrictions = rootRestrictions.actions[methodActionType];

    if (isEmpty(actionLevelRestrictions)) {
      return false;
    }

    return actionLevelRestrictions;

  }

  private __getMethodExplicitRoutingRestrictions(methodName: MongooseDefaultPublicMethods, level: 'model' | 'global'): false | DefaultMongoRoutingAccessRule {

    let actionLevelRestrictions = this.__getActionLevelRoutingRestrictions(methodName, level) as any;

    if (actionLevelRestrictions === false) {
      return false;
    }

    if (isEmpty(actionLevelRestrictions[methodName])) {
      return false;
    }

    return actionLevelRestrictions[methodName] as DefaultMongoRoutingAccessRule;

  }

  private __getActionDefaultRoutingRestrictions(methodName: MongooseDefaultPublicMethods, level: 'model' | 'global'): false | DefaultMongoRoutingAccessRule {

    let actionLevelRestrictions = this.__getActionLevelRoutingRestrictions(methodName, level) as any;

    if (actionLevelRestrictions === false) {
      return false;
    }

    if (isEmpty(actionLevelRestrictions.default)) {
      return false;
    }

    return actionLevelRestrictions.default as DefaultMongoRoutingAccessRule;

  }

  private __getLevelDefaultRoutingRestrictions(level: 'model' | 'global'): false | DefaultMongoRoutingAccessRule {

    let rootRestrictions;

    if (level === 'model') {
      rootRestrictions = this._ModelSettings.routingRestrictions;
    } else {
      rootRestrictions = defaultModelsMethodsRoutingRestrinctions;
    }

    if (isEmpty(rootRestrictions) || isEmpty(rootRestrictions.default)) {
      return false;
    }

    return rootRestrictions.default;
  }

  protected _getRequestTypeBasedFromMethodName(methodName: MongooseDefaultPublicMethods): ApiRequestListenerSettings['requestType'] {

    let postListeners: MongooseDefaultPublicMethods[] = ['countDocuments', 'search', 'createMany', 'createOne', 'deleteMany', 'deleteOne', 'distinct', 'find', 'findOne', 'findById'];
    let putListeners: MongooseDefaultPublicMethods[] = ['restoreById', 'restoreMany', 'restoreOne', 'updateMany', 'updateOne'];
    let getListeners: MongooseDefaultPublicMethods[] = [];
    let deleteListeners: MongooseDefaultPublicMethods[] = ['deleteById'];

    if (postListeners.includes(methodName)) {
      return 'post';
    }

    if (putListeners.includes(methodName)) {
      return 'put';
    }

    if (getListeners.includes(methodName)) {
      return 'get';
    }

    if (deleteListeners.includes(methodName)) {
      return 'delete';
    }

    handyErrLog(`Can't get request type for "${methodName}" in model default routing methods`);

  }

}

