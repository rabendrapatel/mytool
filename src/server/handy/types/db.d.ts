import { SingleOrArrayCombo, ArrayOrUnionToUnion, DefaultMongoRoutingAccessRule, AllowedPropsNames, UserGroup, AdditionalAccessPermission, ServerRequestUser, UnSignedObject, ServerRequest, ServerResponse, RequiredKeys, ConfigData } from '@handy/types';

export interface MongooseValidatorProps {
  path: string,
  value: any
}
export interface MongooseModelFieldValidator {
  validator: (val: any, ...args: any[]) => boolean | Promise<boolean>,
  message: (props: MongooseValidatorProps) => string,
  setAdditionalVals: (ModelSettings: any, fieldName: string, modelInstance: MongooseModelService) => void,
  extractValidator?: () => MongooseModelFieldValidator
}

export type MongoFielLeveldAcessRules<T> = {
  userIdField?: T,
  groups?: SingleOrArrayCombo<UserGroup>,
  groupIdField?: T,
  permission?: SingleOrArrayCombo<AdditionalAccessPermission>,
} | CombinedUserMongoAccessValidator<T>;

export type MongoFieldAccess<T> = {
  read?: MongoFielLeveldAcessRules<T>,
  update?: MongoFielLeveldAcessRules<T>
}

export type MongoSystemFieldAccess<T> = {
  read?: MongoFielLeveldAcessRules<T>
}

export type MongoModelLevelAccesRules<T> = {
  read?: MongoFielLeveldAcessRules<T>,
  create?: {
    groups?: SingleOrArrayCombo<UserGroup>,
    groupId?: SingleOrArrayCombo<number>,
    permission?: SingleOrArrayCombo<AdditionalAccessPermission>,
  } | CombinedUserMongoAccessValidator<T>,
  delete?: MongoFielLeveldAcessRules<T>,
  update?: MongoFielLeveldAcessRules<T>,
  restore?: T extends 'restored' ? MongoFielLeveldAcessRules<T> : never
}



export interface FileInputData {
  _id: number,
  originalFileName: string,
  url: string,
  fileType: string,
  thumbs?: {
    [key in keyof ConfigData['fileUpload']['thumsSets']]?: string
  }
  progress?: number,
  finished?: boolean,
  error?: string
}

export type HandyFileInputData = FileInputData[];

export type MongooseFieldType = 'ShortString' | 'Text' | 'Number' | 'Buffer' | 'Boolean' | 'ObjectId' | 'Mixed' | 'Date' | '[ShortString]' | '[Text]' | '[Number]' | '[Buffer]' | '[Boolean]' | '[ObjectId]' | '[Mixed]' | '[Date]' | '[Files]';

export type FilterMongooseFieldType<T extends MongooseModelInterfaces, fieldName extends T['allFields']> =
  T['shape'][fieldName] extends Array<object> ? '[Mixed]'
  : T['shape'][fieldName] extends Array<number> ? '[Number]'
  : T['shape'][fieldName] extends number ? 'Number'
  : T['shape'][fieldName] extends HandyFileInputData ? '[Files]'
  : T['shape'][fieldName] extends Array<string> ? '[ShortString]' | '[Text]' | '[ObjectId]'
  : T['shape'][fieldName] extends string ? 'ShortString' | 'Text' | 'ObjectId'
  : T['shape'][fieldName] extends Array<boolean> ? '[Boolean]'
  : T['shape'][fieldName] extends boolean ? 'Boolean'
  : T['shape'][fieldName] extends object ? 'Mixed'
  : MongooseFieldType;

export type FilterFieldInputType<T extends MongooseModelInterfaces, fieldName extends T['allFields']> =
  T['shape'][fieldName] extends Array<number> ? '[number]' | '[date]' | '[slider]' | '[time-number]' | '[select]' | '[radio-group]' | 'multi-select' | 'none'
  : T['shape'][fieldName] extends number ? 'number' | 'date' | 'slider' | 'time-number' | 'select' | 'radio-group' | 'none'
  : T['shape'][fieldName] extends HandyFileInputData ? '[Files]' | 'none'
  : T['shape'][fieldName] extends Array<string> ? 'multi-select' | '[text]' | '[text-area]' | '[time-string]' | '[rich-text]' | '[password]' | 'none'
  : T['shape'][fieldName] extends string ? 'text' | 'text-area' | 'time-string' | 'rich-text' | 'password' | 'select' | 'none'
  : T['shape'][fieldName] extends Array<boolean> ? '[slide-toggle]' | 'multi-select' | 'none'
  : T['shape'][fieldName] extends boolean ? 'slide-toggle' | 'check-box' | 'none'
  : T['shape'][fieldName] extends Array<object> ? 'multi-select' | '[date-range]' | '[text]' | 'none'
  : T['shape'][fieldName] extends object ? 'date-range' | 'select' | 'text' | 'none'
  : MongooseFieldType;

export interface ModelFieldCliData {
  name: string,
  publicName: string,
  inputType: string,
  unique: 'all' | 'active' | boolean,
  required: boolean
}

export interface ModelCliData {
  modelName: string,
  autoIncrement: boolean,
  softDelete: boolean,
  fields: ModelFieldCliData[],
  searchableFields: { name: string, displayValue: string }[]
}

export type MongooseDefaultPublicMethods = 'createOne' | 'createMany' | 'findOne' | 'findById' | 'find' | 'search' | 'countDocuments' | 'distinct' | 'updateOne' | 'updateMany' | 'deleteOne' | 'deleteById' | 'deleteMany' | 'restoreOne' | 'restoreById' | 'restoreMany';

type ExtractMongooseDefaultPublicMethods<action extends DbActionType<T['allFields']>, T extends MongooseModelInterfaces> =
  action extends 'create' ? 'createOne' | 'createMany'
  : action extends 'read' ? 'findOne' | 'findById' | 'find' | 'search' | 'countDocuments' | 'distinct'
  : action extends 'update' ? 'updateOne' | 'updateMany'
  : action extends 'delete' ? 'deleteOne' | 'deleteById' | 'deleteMany'
  : 'restoreOne' | 'restoreById' | 'restoreMany';

export type HandyModelField<fieldName extends T['allFields'], T extends MongooseModelInterfaces> = {
  type: FilterMongooseFieldType<T, fieldName>,
  inputType: FilterFieldInputType<T, fieldName>,
  required: fieldName extends RequiredKeys<T['fullModelShape']> ? true : false,
  publicName: string,
  unique?: T['softDelete'] extends false ? boolean : 'all' | 'active' | false,
  accessRules?: MongoFieldAccess<T['allFields']>,
  validators?: MongooseModelFieldValidator[],
  ref?: string,
  default?: T['createShape'][fieldName] | null,
  index?: boolean,
  sparse?: boolean,
  trim?: T['fullModelShape'][fieldName] extends string | string[] ? boolean : never
}

export interface HandySystemModelField<T> {
  accessRules?: MongoSystemFieldAccess<T>,
}

export interface HandySystem_idField<T> {
  publicName: string,
  accessRules?: MongoFieldAccess<T>,
}

type DefaultMongoFieldsToRemove = keyof MongoSoftDeleteFields | keyof MongoCreatedAtField | keyof MongoCreatedByField | keyof MongoChangesHistoryField | '_id';
type SearchFieldsToRemove = keyof MongoSoftDeleteFields | keyof MongoCreatedAtField | keyof MongoCreatedByField | keyof MongoChangesHistoryField;
export type HandyMongooseSystemFields = DefaultMongoFieldsToRemove;
type DeclarationFieldsToRemove<T extends string> = T extends DefaultMongoFieldsToRemove ? never : T;
export type HandyMongooseDeletedWhere = { deleted?: boolean } | { restored?: boolean };


export type MongooseSortingDirection = 'asc' | 'desc' | 'ascending' | 'descending';
export type MongooseSortingOptions<T> = SingleOrArrayCombo<{
  field: T,
  direction: MongooseSortingDirection
}>;

export interface OriginalMongoosePopulateOptions {
  path: string,
  match?: any,
  model?: string,
  select?: string,
  options?: { sort?: { [key: string]: MongooseSortingDirection }, limit?: number },
  populate?: OriginalMongoosePopulateOptions
}

export interface HandyMongooseResultsPagination {
  hasRecords: boolean,
  totalRecordsCount: number,
  thisPageRecordsCount: number,
  page: number,
  recordsPerPage: number,
  pagesCount: number,
  hasMorePages: boolean,
  hasNextPage: boolean,
  hasPrevPage: boolean
}

export interface HandyMongooseModelFindOpts<T> {
  sort?: MongooseSortingOptions<T>,
  limit?: number,
  page?: number,
  populate?: SingleOrArrayCombo<HandyMongoosePopulateOptions<T>>,
  deletedDocs?: MongooseIncludeDeletedOption<T>,
  pagination?: boolean,
  exactPaginationCount?: boolean,
  leanResults?: boolean
}

export interface HandyMongooseModelUpdateOpts<T> {
  updateName?: string,
  skipUpdateHistory?: boolean,
  deletedDocs?: MongooseIncludeDeletedOption<T>,
  customOptions?: any
}

export type HandyMongooseModelPublicFindOpts<T> = Omit<HandyMongooseModelFindOpts<T>, 'leanResults'>;
export type HandyMongooseModelPublicFindOneOpts<T> = Omit<HandyMongooseModelFindOpts<T>, 'leanResults' | 'sort' | 'limit' | 'page' | 'pagination' | 'exactPaginationCount'>;

export interface HandyMongooseFindResults<modelInterface extends MongooseModelInterfaces, select extends HandyMongooseSelect<modelInterface['allFields']>> {
  docs: HandyMongooseFindOneDynamicResults<modelInterface, select>[] | [],
  paginationData?: HandyMongooseResultsPagination
}
export interface HandyMongooseFindOneResult<modelInterface extends MongooseModelInterfaces, select extends HandyMongooseSelect<modelInterface['allFields']>> {
  doc: HandyMongooseFindOneDynamicResults<modelInterface, select> | null,
  foundRecord: boolean
}


export type HandyMongooseDistinctOneResults<modelInterface extends MongooseModelInterfaces, selectedKey extends modelInterface['allFields']> = modelInterface['fullModelShape'][selectedKey][];
export type HandyMongooseDistinctManyResults<modelInterface extends MongooseModelInterfaces, selectedKey extends modelInterface['allFields'][]> = {
  [key in selectedKey[number]]: HandyMongooseDistinctOneResults<modelInterface, key>
};

export type HandyMongooseDistinctResults<modelInterface extends MongooseModelInterfaces, selectedKey extends SingleOrArrayCombo<modelInterface['allFields']>>
  = selectedKey extends modelInterface['allFields'] ? HandyMongooseDistinctOneResults<modelInterface, selectedKey> :
  selectedKey extends modelInterface['allFields'][] ? HandyMongooseDistinctManyResults<modelInterface, selectedKey> : any[];

type HandyMongooseFindOneDynamicResults<
  modelInterface extends MongooseModelInterfaces,
  select extends HandyMongooseSelect<modelInterface['allFields']>,
  selectType = select['selectType'],
  selectedFields extends string | string[] = select['fields']
  > =
  selectType extends 'deselect'
  ? Omit<modelInterface['fullModelShape'], selectedFields extends modelInterface['allFields'] ? selectedFields : ArrayOrUnionToUnion<selectedFields>>
  : Pick<modelInterface['fullModelShape'], selectedFields extends modelInterface['allFields'] ? selectedFields : ArrayOrUnionToUnion<selectedFields>>;

export interface HandyMongooseModelFindByIdOpts<T, AutoIncrement> {
  select?: HandyMongooseSelect<T>,
  populate?: HandyMongoosePopulateOptions<T> | HandyMongoosePopulateOptions<T>[],
  deletedDocs?: MongooseIncludeDeletedOption<T>,
  leanResult?: boolean
}

export interface HandyMongooseUpdateResult {
  success: boolean,
  updatedRecords: number,
  matchingRecords: number
}

export interface HandyMongooseRemoveResult {
  success: boolean,
  deletedRecords: number,
  matchingRecords: number
}

export interface HandyMongooseRestoreResult {
  success: boolean,
  restoredRecords: number,
  matchingRecords: number
}

// Mongoose findOne method interfaces
export interface HandyMongooseModelFindOneOpts<T> {
  query?: Object,
  select?: HandyMongooseSelect<T>,
  populate?: SingleOrArrayCombo<HandyMongoosePopulateOptions<T>>,
  deletedDocs?: MongooseIncludeDeletedOption<T>,
  leanResult?: boolean
}

export type HandyMongoosePopulateOptions<T> = {
  path: T,
  where?: any,
  select?: HandyMongooseSelect<T>,
  limit?: number,
  model?: string,
  sort?: MongooseSortingOptions<string>,
  deepPopulate?: HandyMongoosePopulateOptions<string>
}

export type HandyMongooseSelect<T> = {
  fields: SingleOrArrayCombo<T>,
  selectType: 'select' | 'deselect'
}


export type MongooseIncludeDeletedOption<T> = keyof MongoSoftDeleteFields extends T ? 'active' | 'deleted' | 'all' | 'restored' : never | undefined;

export type HandyModelDeclaration<T extends MongooseModelInterfaces> = {
  [fieldName in DeclarationFieldsToRemove<T['allFields']>]: HandyModelField<fieldName, T>
} & {
    [fieldName in Extract<T['allFields'], DefaultMongoFieldsToRemove>]?: HandySystemModelField<T['allFields']>
  } & { _id: HandySystem_idField<T['allFields']> }

export interface MongooseModelInterfaces {

  shape: {
    [key: string]: any
  },

  // Settings intetrfaces
  softDelete: boolean,
  createdAt: boolean,
  createdBy: boolean,
  changesHistory: boolean,
  autoIncrement: boolean,

  // Dynamicly generated interfaces
  fullModelShape: any,
  createShape: any,
  allFields: any,
  idType: number | string,
  searchableFields: SearchableMongooseModelFields<this>,
  defaultSelect: HandyMongooseSelect<this['allFields']>

}

export interface ModelSettings<T extends MongooseModelInterfaces> {

  /* -------------------------------- Required -------------------------------- */

  name: string,
  modelDeclaration: HandyModelDeclaration<T>,
  softDelete: T['softDelete'],
  createdAt: T['createdAt'],
  createdBy: T['createdBy'],
  changesHistory: T['changesHistory'],
  autoIncrement: T['autoIncrement'],

  /* -------------------------------- Optional -------------------------------- */

  autoIncrementOpts?: {
    field?: T['allFields'],
    startAt?: number,
    incrementBy?: number
  },

  /* ------------------------------ Model Routing ----------------------------- */

  routable?: boolean,
  publicRoutable?: boolean,

  routingRestrictions?: {
    default?: DefaultMongoRoutingAccessRule // applies to every non set....
    actions?: {
      [key in DbActionType<T['allFields']>]?: {
        [method in ExtractMongooseDefaultPublicMethods<key, T> | 'default']?: DefaultMongoRoutingAccessRule
      }
    }
  }

  /* ---------------------------------- Rest ---------------------------------- */

  changesHistoryLimited?: boolean,
  changesHistoryLength?: number,
  keysToRemoveFromChangesHistory?: string[],
  accessRules?: MongoModelLevelAccesRules<T['allFields']>,
  defaultQueryDeletedOption?: MongooseIncludeDeletedOption<T['allFields']>,
  defaultSelect?: T['defaultSelect'],
  defaultSort?: MongooseSortingOptions<T['allFields']>,
  defaultQueryLimit?: number,
  defaultPopulate?: [
    HandyMongoosePopulateOptions<T['allFields']>
  ] | [],
  searchDefaultFields?: SingleOrArrayCombo<T['searchableFields']>,
  searchDefaultOptions?: MognooseSearchRegexOptions,
  defaultPaginationDataIncluded?: boolean,
  defaultExactPaginationCount?: boolean,
  defaultLeanFindResults?: boolean,
  defaultValidationOnUpdate?: boolean,
  stringTrimming?: boolean,
  returnUpdatedDocOnUpdate?: boolean,

}

export type DefaultModelsRoutingRestrinctions = {
  default: DefaultMongoRoutingAccessRule // applies to every non set....
  actions?: {
    [key in DbActionType<'restored'>]?: {
      [method in ExtractMongooseDefaultPublicMethods<key, any> | 'default']?: DefaultMongoRoutingAccessRule
    }
  }
}

export type SearchableMongooseModelFields<modelInterface extends MongooseModelInterfaces> = AllowedPropsNames<Omit<modelInterface['fullModelShape'], SearchFieldsToRemove>, string | string[] | number | number[]>;
export type MognooseSearchRegexOptions = {
  caseSensitive?: boolean,
  multiline?: boolean,
  extended?: boolean,
  dotAsWildCard?: boolean
}

export type MongoSoftDeleteFields = {
  deleted?: boolean,
  restored?: boolean,
  deletedAt?: number,
  restoredAt?: number,
  deletedBy?: number,
  restoredBy?: number
}

export type MongoCreatedAtField = {
  createdAt?: number
}

export type MongoCreatedByField = {
  createdBy?: number
}

export interface MongoChangesHistoryData {
  updatedBy: number,
  updatedAt: number,
  sessionId: string,
  updateName: string,
  updatedTo: any,
}

export type MongoChangesHistoryField = {
  changesHistory?: MongoChangesHistoryData[]
}

export type CompleteMongoModelFields<ModelFields, softDelete extends boolean, createdAt extends boolean, createdBy extends boolean, changesHistory extends boolean>
  = ModelFields
  | (softDelete extends true ? keyof MongoSoftDeleteFields : never)
  | (createdAt extends true ? keyof MongoCreatedAtField : never)
  | (createdAt extends true ? keyof MongoCreatedAtField : never)
  | (changesHistory extends true ? keyof MongoChangesHistoryField : never);

export type CompleteMongooseModelShapeInterface<modelInterface, softDelete extends boolean, createdAt extends boolean, createdBy extends boolean, autoIncrement extends boolean, changesHistory extends boolean>
  = modelInterface
  & (softDelete extends true ? MongoSoftDeleteFields : {})
  & (createdAt extends true ? MongoCreatedAtField : {})
  & (createdBy extends true ? MongoCreatedByField : {})
  & (changesHistory extends true ? MongoChangesHistoryField : {})
  & (autoIncrement extends true ? { _id: number } : { _id: string });


export type MongooseModelCreateShape<ModelInterface> = Omit<ModelInterface, '_id' | 'createdAt' | 'createdBy' | 'deleted' | 'deletedBy' | 'deletedAt' | 'restored' | 'restoredBy' | 'restoredAt' | 'changesHistory'>;

type HardDeleteDBActionTypes = 'create' | 'read' | 'update' | 'delete';
type SoftDeleteDBActionTypes = HardDeleteDBActionTypes | 'restore';

export type DbActionType<T> = T extends 'restored' ? SoftDeleteDBActionTypes : HardDeleteDBActionTypes;
export type CombinedUserMongoAccessValidator<T> = (user: ServerRequestUser, action: DbActionType<T>, conditionsQueryOrDoc?: any, updateQuery?: any) => boolean | Promise<boolean>;

export interface MongooseModelService {
  countDocuments(where: UnSignedObject, exact: boolean, deleted?: MongooseIncludeDeletedOption<any>, request?: ServerRequest, response?: ServerResponse, validateAccess?: boolean): Promise<number>
}