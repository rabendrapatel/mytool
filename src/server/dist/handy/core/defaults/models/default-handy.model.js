"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyModelClass = void 0;
const mongoose_1 = require("mongoose");
const autoIncrement = __importStar(require("mongoose-plugin-autoinc"));
const _services_1 = require("@services");
const core_1 = require("@handy/core");
const decorators_1 = require("@handy/core/decorators");
const default_models_access_validator_1 = require("@models/default-models-access.validator");
const fs_1 = require("fs");
const path_1 = require("path");
let { String, Number, Buffer, Boolean, Mixed, ObjectId } = mongoose_1.SchemaTypes;
let mongooseDate = mongoose_1.SchemaTypes.Date;
class DefaultHandyModelClass {
    /* -------------------------------------------------------------------------- */
    /*                                 Constructor                                */
    /* -------------------------------------------------------------------------- */
    constructor() {
        /* --------------------------------- Classes -------------------------------- */
        this._handyConfig = core_1.Inject(_services_1.HandyConfigService);
        this._handyJwtService = core_1.Inject(_services_1.HandyJwtService);
        this._handyError = core_1.Inject(_services_1.HandyErrorService);
        /* --------------------------------- Holders -------------------------------- */
        this.__mongoSettings = this._handyConfig.get().mongoDB;
        this.__shape = {};
        this._ModelSettings = this.constructor.prototype.ModelSettings;
        this._modelDeclaration = this._ModelSettings.modelDeclaration;
        this._modelName = this._ModelSettings.name;
        this._modelFields = Object.keys(this._modelDeclaration);
        this._modelFieldsLen = this._modelFields.length;
        this._searchableFields = [];
        this._searchableFieldsLen = this._searchableFields.length;
        this._stringSearchableFieldTypes = ['ShortString', 'Text', '[Text]', '[ShortString]'];
        this._numberSearchableFieldTypes = ['Number', '[Number]'];
        this._modelLevelAccessRules = this._ModelSettings.accessRules;
        this._fieldLevelAccessRules = {};
        this._validators = {};
        this._middlewares = this.constructor.prototype.middlewares;
        this._systemFieldsList = [
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
        this._systemReffrenceAbleFieldsList = [
            'deletedBy',
            'restoredBy',
            'createdBy',
        ];
        this._possibleNumberRegex = new RegExp(/^[0-9,.\- ]*$/);
        this._hasDigitRegex = new RegExp(/[0-9]{1}/);
        this._fieldsToIndex = [];
        this._defaultSort = this._ModelSettings.defaultSort;
        this._defaultQueryLimit = (this._ModelSettings.defaultQueryLimit !== undefined) ? this._ModelSettings.defaultQueryLimit : this.__mongoSettings.defaultQueryLimit;
        this._stringTrimming = (this._ModelSettings.stringTrimming !== undefined) ? this._ModelSettings.stringTrimming : this.__mongoSettings.stringAutoTrimming;
        this._defaultReturnUpdatedDocOnUpdate = (isNotUndefined(this._ModelSettings.returnUpdatedDocOnUpdate)) ? this._ModelSettings.returnUpdatedDocOnUpdate : this.__mongoSettings.returnUpdatedDocOnUpdateByDefault;
        this._defaultValidationOnUpdate = (isNotUndefined(this._ModelSettings.defaultValidationOnUpdate)) ? this._ModelSettings.defaultValidationOnUpdate : this.__mongoSettings.defaultValidationOnUpdate;
        this._useSoftdelete = (this._ModelSettings.softDelete || (isUndefined(this._ModelSettings.softDelete) && this.__mongoSettings.defaultSoftDelete));
        this._useCreatedAt = (this._ModelSettings.createdAt || (isUndefined(this._ModelSettings.createdAt) && this.__mongoSettings.defaultCreatedAt));
        this._useCreatedBy = (this._ModelSettings.createdBy || (isUndefined(this._ModelSettings.createdBy) && this.__mongoSettings.defaultCreatedBy));
        this._useChangesHistory = (this._ModelSettings.changesHistory || (isUndefined(this._ModelSettings.changesHistory) && this.__mongoSettings.defaultChangesHistory));
        this._limitChangesHistoryLength = (isNotUndefined(this._ModelSettings.changesHistoryLimited)) ? this._ModelSettings.changesHistoryLimited : this.__mongoSettings.defaultChangesHistoryLimited;
        this._changesHistoryLength = (isNotUndefined(this._ModelSettings.changesHistoryLength)) ? this._ModelSettings.changesHistoryLength : this.__mongoSettings.defaultChangesHistoryLength;
        this._keysToRemoveFromChangesHistory = (isNotUndefined(this._ModelSettings.keysToRemoveFromChangesHistory)) ? this._ModelSettings.keysToRemoveFromChangesHistory : this.__mongoSettings.defaultKeysToRemoveFromChangesHistory;
        this._defaultSearchableFields = this._ModelSettings.searchDefaultFields;
        this._searchDefaultOptions = (isNotUndefined(this._ModelSettings.searchDefaultOptions)) ? this._ModelSettings.searchDefaultOptions : this.__mongoSettings.searchDefaultOptions;
        /* ---------------------------- Public properties --------------------------- */
        // ? has to be public because of generic interface for read methods
        this.defaultSelect = this._ModelSettings.defaultSelect;
        /* ----------------------------- Private method ----------------------------- */
        this.__defaultMethodsRoutesSettings = [];
        this._init();
    }
    /* -------------------------------------------------------------------------- */
    /*                             Initializer methods                            */
    /* -------------------------------------------------------------------------- */
    _init() {
        if (isNullOrUndefined(this._ModelSettings.routable)) {
            this._ModelSettings.routable = this.__mongoSettings.defaultModelsRoutable;
        }
        this.__parseRoutingSettings();
        this._generateModelSchema();
        this._handleDefaultMethodsObjects();
        this._Schema = new mongoose_1.Schema(this.__shape, { collection: this._modelName.UcFirst() });
        if (this._ModelSettings.autoIncrement) {
            let defaultAutoIncrementOptions = {
                model: this._modelName.UcFirst(),
                field: '_id',
                startAt: 1,
                incrementBy: 1
            };
            let { autoIncrementOpts = {} } = this._ModelSettings;
            let finalAutoIncrementOptions = Object.assign(Object.assign({}, defaultAutoIncrementOptions), autoIncrementOpts);
            this._Schema.plugin(autoIncrement.autoIncrement, finalAutoIncrementOptions);
        }
        this._handleFieldsIndexes();
        this._handleMiddlewares();
        this._Model = mongoose_1.model(this._modelName.UcFirst(), this._Schema, this._modelName.UcFirst());
        this._handleIndexes();
        this._generateCliHelper();
    }
    _generateCliHelper() {
        if (!__isDev || !this._ModelSettings.routable) {
            return;
        }
        let modelData = {
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
        };
        let declaredFields = Object.keys(this._modelDeclaration);
        let declaredFieldsLen = declaredFields.length;
        for (let i = 0; i < declaredFieldsLen; i++) {
            const declarationFieldName = declaredFields[i];
            let declaredData = this._modelDeclaration[declarationFieldName];
            let { publicName, inputType = 'none', required = false, unique = false } = declaredData;
            if (this._searchableFields.includes(declarationFieldName)) {
                modelData.searchableFields.push({
                    name: declarationFieldName,
                    displayValue: publicName
                });
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
            });
        }
        let helpersDirPath = path_1.join(__rootDir, 'src/cli/server-ref-files/models');
        let helperDirContent = fs_1.readdirSync(helpersDirPath);
        let modelDataStrVal = JSON.stringify(modelData, null, 2);
        let cliHelperFileName = `${this._modelName.LcFirst()}.modelData.json`;
        let writeData = false;
        if (!helperDirContent.includes(cliHelperFileName)) {
            writeData = true;
        }
        let cliHelperFilePath = path_1.join(helpersDirPath, cliHelperFileName);
        if (!writeData) {
            let oldContent = fs_1.readFileSync(cliHelperFilePath, { encoding: 'utf-8' });
            if (oldContent !== modelDataStrVal) {
                writeData = true;
            }
        }
        if (writeData) {
            fs_1.writeFileSync(cliHelperFilePath, modelDataStrVal);
        }
    }
    _generateModelSchema() {
        let fieldsNames = Object.keys(this._modelDeclaration);
        let fieldsLen = fieldsNames.length;
        for (let i = 0; i < fieldsLen; i++) {
            const fieldName = fieldsNames[i];
            let fieldDeclaration = this._modelDeclaration[fieldName];
            this._validators[fieldName] = fieldDeclaration.validators;
            if (fieldDeclaration.accessRules !== undefined) {
                this._fieldLevelAccessRules[fieldName] = fieldDeclaration.accessRules;
            }
            if (fieldName === '_id' || this._systemFieldsList.includes(fieldName)) {
                continue;
            }
            let indexField = fieldDeclaration.index;
            let fieldType = fieldDeclaration.type;
            let isFieldArray = fieldType.startsWith('[');
            let fieldTypeName = fieldType.replace('[', '').replace(']', '');
            let autoIndexing = !isFieldArray;
            let stringTrimming = fieldDeclaration.trim;
            let finalFieldType;
            switch (fieldTypeName) {
                case 'Boolean':
                    finalFieldType = Boolean;
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
            };
            if (fieldDeclaration.required) {
                this.__shape[fieldName].required = `${fieldDeclaration.publicName} is required`;
            }
            this._fieldsToIndex.push({
                name: fieldName,
                unique: fieldDeclaration.unique,
                sparse: (fieldDeclaration.unique) ? fieldDeclaration.sparse : undefined,
                index: (isNotUndefined(indexField)) ? indexField : autoIndexing,
            });
            if (isNotUndefined(fieldDeclaration.ref)) {
                this.__shape[fieldName].ref = fieldDeclaration.ref;
            }
            if (isNotEmpty(this._validators[fieldName])) {
                let validatorsLen = this._validators[fieldName].length;
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
    _handleIndexes() {
        this._Model.on('index', err => {
            if (err) {
                this._handyError.register(err, 'high', 'Server error', `Error while creating model indexes for "${this._modelName}"`);
            }
        });
        this._Model.syncIndexes({});
    }
    _handleMiddlewares() {
        let mws = this._middlewares;
        let mwsLen = mws.length;
        //? Class name
        let instanceNamePrefix = `__${this.constructor.name}__`;
        let defaultInstanceNamePrefix = `__DefaultHandyModelClass__`;
        for (let i = 0; i < mwsLen; i++) {
            let { hook, type, method } = mws[i];
            if (!method.includes(instanceNamePrefix) && !method.includes(defaultInstanceNamePrefix)) {
                // ! this block here makes sure that it uses only 
                // ! propper mws, because of the way inheritance and middlewares work... 
                continue;
            }
            let finalMethodName = method.replace(instanceNamePrefix, '').replace(defaultInstanceNamePrefix, '');
            let instance = this;
            function mwThisExtractor(...args) {
                // @ts-ignore
                return instance[finalMethodName].bind(instance)(this, args);
            }
            // @ts-ignore
            this._Schema[type](hook, mwThisExtractor);
        }
    }
    _handleAutomaticFields() {
        this._handleSearchableFields();
        if (this._useSoftdelete) {
            this.__shape['deleted'] = {
                type: Boolean,
                unique: false,
                required: false,
                index: false,
                default: false
            };
            this.__shape['restored'] = {
                type: Boolean,
                unique: false,
                required: false,
                index: false,
                default: false
            };
            this.__shape['deletedAt'] = {
                type: Number,
                unique: false,
                required: false,
                index: false,
                default: null
            };
            this.__shape['restoredAt'] = {
                type: Number,
                unique: false,
                required: false,
                index: false,
                default: null
            };
            this.__shape['deletedBy'] = {
                type: Number,
                unique: false,
                required: false,
                index: false,
                default: null,
                ref: 'User'
            };
            this.__shape['restoredBy'] = {
                type: Number,
                unique: false,
                required: false,
                index: false,
                default: null,
                ref: 'User'
            };
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
            };
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
            };
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
            };
            this._modelFields.push('changesHistory');
            this._modelFieldsLen++;
        }
    }
    _handleDefaultMethodsObjects() {
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
        };
        if (this._useSoftdelete) {
            let deletedDocs = (isNotUndefined(this._ModelSettings.defaultQueryDeletedOption))
                ? this._ModelSettings.defaultQueryDeletedOption
                : this.__mongoSettings.defaultQueryDeletedOption;
            this._defaultFindOptions.deletedDocs = deletedDocs;
        }
    }
    _handleSearchableFields() {
        let declaredFields = Object.keys(this._modelDeclaration);
        let searchableTypes = [...this._stringSearchableFieldTypes, ...this._numberSearchableFieldTypes];
        let declaredFieldsLen = declaredFields.length;
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
    _handleFieldsIndexes() {
        let _fieldsToIndexLen = this._fieldsToIndex.length;
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
    createOne(doc, request, response, customSaveOpts = {}, validateAccess = false) {
        return new Promise((resolve, reject) => {
            this.createMany([doc], request, response, customSaveOpts, validateAccess)
                .then(docs => {
                resolve(docs[0]);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    createMany(docs, request, response, customSaveOpts = {}, validateAccess = false) {
        return new Promise((resolve, reject) => {
            this._canCreateDocs(request, response, validateAccess)
                .then((canCreate) => {
                if (!canCreate) {
                    return Promise.reject(this._handleError(`Doesn't have permission to create record for ${this._modelName}`, 'low', 'Forbidden', request, response));
                }
                if (this._useCreatedBy || this._useCreatedAt) {
                    let creationTime = new Date().getTime();
                    let createdBy = this._extractUserIdFromRequest(request);
                    let docsLen = docs.length;
                    for (let i = 0; i < docsLen; i++) {
                        const loopedDoc = docs[i];
                        if (this._useCreatedBy) {
                            loopedDoc['createdBy'] = this._extractUserIdFromRequest(request);
                        }
                        if (this._useCreatedAt) {
                            loopedDoc['createdAt'] = creationTime;
                        }
                        if (this._useChangesHistory) {
                            loopedDoc['changesHistory'] = {
                                updateName: 'Creation',
                                sessionId: this._extractSessionIdFromRequest(request),
                                updatedAt: creationTime,
                                updatedBy: createdBy,
                                updatedTo: this._lightenHistoryData(loopedDoc)
                            };
                        }
                    }
                }
                customSaveOpts = Object.assign(Object.assign({}, customSaveOpts), { handyRequest: request, handyResponse: response });
                return this._Model.create(docs, customSaveOpts);
            })
                .then((newDocuments) => {
                let docsLen = newDocuments.length;
                let resultDocuments = [];
                for (let i = 0; i < docsLen; i++) {
                    const doc = newDocuments[i];
                    resultDocuments.push(doc.toObject());
                }
                resolve(resultDocuments);
            })
                .catch(err => {
                return reject(this._handleError(err));
            });
        });
    }
    /* ---------------------------------- Read ---------------------------------- */
    find(where = {}, select, findParams = {}, request, response, validateAccess = false) {
        let finalParams = Object.assign({}, findParams);
        finalParams.leanResults = true;
        return this._find(where, select, finalParams, request, response, validateAccess);
    }
    findOne(where = {}, select, findParams = {}, request, response, validateAccess = false) {
        let finalParams = findParams;
        finalParams.leanResults = true;
        return this._findOne(where, select, finalParams, request, response, validateAccess);
    }
    findById(_id, select, findParams = {}, request, response, validateAccess = false) {
        let finalParams = findParams;
        finalParams.leanResults = true;
        let findQuery = { _id };
        return this._findOne(findQuery, select, finalParams, request, response, validateAccess);
    }
    /* --------------------------------- Update --------------------------------- */
    updateMany(where, update, updateOptions, request, response, validateAccess = false) {
        return this._updateMany(where, update, updateOptions, request, response, validateAccess);
    }
    updateOne(where, update, updateOptions, request, response, validateAccess = false) {
        return this._updateOne(where, update, updateOptions, request, response, validateAccess);
    }
    /* --------------------------------- Delete --------------------------------- */
    deleteMany(where, request, response, validateAccess = false) {
        return new Promise((resolve, reject) => {
            this._canDeleteOrRestoreDocs(where, request, response, 'delete', validateAccess)
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
                        });
                    })
                        .catch(err => {
                        return reject(this._handleError(err, 'high', 'Server error', request, response));
                    });
                }
                else {
                    this._hardDelete(where, false, request)
                        .then(hardDeleteResult => {
                        let { deletedRecords, matchingRecords, success } = hardDeleteResult;
                        return resolve({
                            deletedRecords,
                            matchingRecords,
                            success
                        });
                    })
                        .catch(err => {
                        return reject(this._handleError(err, 'high', 'Server error', request, response));
                    });
                }
            })
                .catch(err => {
                return reject(this._handleError(err, 'high', 'Server error', request, response));
            });
        });
    }
    deleteOne(where, request, response, validateAccess = false) {
        return new Promise((resolve, reject) => {
            this._canDeleteOrRestoreDocs(where, request, response, 'delete', validateAccess)
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
                        });
                    })
                        .catch(err => {
                        return reject(this._handleError(err, 'high', 'Server error', request, response));
                    });
                }
                else {
                    this._hardDelete(where, true, request)
                        .then(hardDeleteResult => {
                        let { deletedRecords, matchingRecords, success } = hardDeleteResult;
                        return resolve({
                            deletedRecords,
                            matchingRecords,
                            success
                        });
                    })
                        .catch(err => {
                        return reject(this._handleError(err, 'high', 'Server error', request, response));
                    });
                }
            })
                .catch(err => {
                return reject(this._handleError(err, 'high', 'Server error', request, response));
            });
        });
    }
    deleteById(_id, request, response, validateAccess = false) {
        let findQuery = { _id };
        return this.deleteOne(findQuery, request, response, validateAccess);
    }
    /* --------------------------------- Restore -------------------------------- */
    restoreOne(where, request, response, validateAccess = false) {
        if (!this._useSoftdelete) {
            return Promise.reject(this._handleError('Using restore on non soft delete model', 'high', 'Bad request', request, response));
        }
        return new Promise((resolve, reject) => {
            this._canDeleteOrRestoreDocs(where, request, response, 'restore', validateAccess)
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
                    });
                })
                    .catch(err => {
                    return reject(this._handleError(err, 'high', 'Server error', request, response));
                });
            })
                .catch(err => {
                return reject(this._handleError(err));
            });
        });
    }
    restoreMany(where, request, response, validateAccess = false) {
        if (!this._useSoftdelete) {
            return Promise.reject(this._handleError('Using restore on non soft delete model', 'high', 'Bad request', request, response));
        }
        return new Promise((resolve, reject) => {
            this._canDeleteOrRestoreDocs(where, request, response, 'restore', validateAccess)
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
                    });
                })
                    .catch(err => {
                    return reject(this._handleError(err, 'high', 'Server error', request, response));
                });
            })
                .catch(err => {
                return reject(this._handleError(err, 'high', 'Server error', request, response));
            });
        });
    }
    restoreById(_id, request, response, validateAccess = false) {
        let findQuery = { _id };
        return this.restoreOne(findQuery, request, response, validateAccess);
    }
    /* ---------------------------------- Other --------------------------------- */
    countDocuments(where, exact = true, deleted, request, response, validateAccess = false) {
        return new Promise((resolve, reject) => {
            // ? select string _id only will make sure that it checks for model level rules only
            this._canReadDocs(where, request, response, '_id', deleted, validateAccess)
                .then(canReadDocsOnModelLevel => {
                if (!canReadDocsOnModelLevel) {
                    return Promise.reject(this._handleError(`You don't have permission to count this data.`, 'low', 'Forbidden', request, response));
                }
                let countExtecution = this._Model[(exact) ? 'countDocuments' : 'estimatedDocumentCount'](where);
                let deletedWhere = this._getDeletedWhere(deleted);
                if (this._useSoftdelete && isNotEmpty(deletedWhere)) {
                    countExtecution.where(deletedWhere);
                }
                countExtecution.then(totalCount => {
                    return resolve(totalCount);
                })
                    .catch(err => {
                    return reject(this._handleError(err));
                });
            })
                .catch(err => {
                return reject(this._handleError(err, 'high', 'Server error', request, response));
            });
        });
    }
    distinct(fieldNames, where, deleted, request, response, validateAccess = false) {
        if (typeof fieldNames === 'string') {
            return this._distinct(fieldNames, where, deleted, request, response, validateAccess);
        }
        let finalMultiResult = {};
        return new Promise((resolve, reject) => {
            if (isEmpty(fieldNames)) {
                return reject(this._handleError(`No fields were selected for distinct function.`, 'low', 'Bad request', request, response));
            }
            let selectString = '';
            let fieldsLen = fieldNames.length;
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
                let distinctPromises = [];
                for (let i = 0; i < fieldsLen; i++) {
                    const singleFieldName = fieldNames[i];
                    let singlePromise = new Promise((singleResolve, singleReject) => {
                        this._distinct(singleFieldName, where, deleted, request, response)
                            .then(singleDistErr => {
                            finalMultiResult[singleFieldName] = singleDistErr;
                            return singleResolve();
                        })
                            .catch(singleDistErr => {
                            return singleReject(this._handleError(singleDistErr, 'high', 'Server error', request, response));
                        });
                    });
                    distinctPromises.push(singlePromise);
                }
                Promise.all(distinctPromises)
                    .then(() => {
                    return resolve(finalMultiResult);
                })
                    .catch(distinctPromisesErr => {
                    return reject(this._handleError(distinctPromisesErr, 'high', 'Server error', request, response));
                });
            })
                .catch(err => {
                return reject(this._handleError(err, 'high', 'Server error', request, response));
            });
        });
    }
    aggregate(pipeline, deletedDocsSpecs) {
        let aggregateExecutuion = this._Model.aggregate(pipeline);
        if (!this._useSoftdelete) {
            return aggregateExecutuion;
        }
        let deletedWhere = this._getDeletedWhere(deletedDocsSpecs);
        if (isNotEmpty(deletedWhere)) {
            aggregateExecutuion.match(deletedWhere);
        }
        return aggregateExecutuion;
    }
    search(searchValue, fields, select, findParams = {}, additionalSearchQueries = [], additionalFilterQueries = [], request, response, validateAccess = false) {
        let where = this._getFinalSearchQuery(searchValue, fields, findParams, additionalSearchQueries, additionalFilterQueries);
        if (isNotEmpty(searchValue) && isEmptyObject(where)) {
            let { limit, page } = Object.assign(Object.assign({}, this._defaultFindOptions), findParams);
            let result = {
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
    _apiCreateMany(request, response, user, query, body) {
        this.createMany(body, request, response, undefined, true).then(createManyResult => {
            response.jsonResponse(createManyResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiCreateOne(request, response, user, query, body) {
        this.createOne(body, request, response, undefined, true).then(createOneResult => {
            response.jsonResponse(createOneResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    /* ---------------------------------- Read ---------------------------------- */
    _apiFind(request, response, user, query, body) {
        let { where = {}, select = {}, findOptions = {} } = body;
        this.find(where, select, findOptions, request, response, true).then(findResult => {
            response.jsonResponse(findResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiFindOne(request, response, user, query, body) {
        let { where = {}, select = {}, findOptions = {} } = body;
        this.findOne(where, select, findOptions, request, response, true).then(findOneResult => {
            response.jsonResponse(findOneResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiFindById(request, response, user, query, body) {
        let { _id = {}, select = {}, findOptions = {} } = body;
        this.findById(_id, select, findOptions, request, response, true).then(findByIdResult => {
            response.jsonResponse(findByIdResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    /* --------------------------------- Update --------------------------------- */
    _apiUpdateMany(request, response, user, query, body) {
        let { where = {}, update = {}, updateOptions = {} } = body;
        this.updateMany(where, update, updateOptions, request, response, true).then(updateResult => {
            response.jsonResponse(updateResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiUpdateOne(request, response, user, query, body) {
        let { where = {}, update = {}, updateOptions = {} } = body;
        this.updateOne(where, update, updateOptions, request, response, true).then(updateResult => {
            response.jsonResponse(updateResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    /* --------------------------------- Delete --------------------------------- */
    _apiDeleteMany(request, response, user, query, body) {
        let { where = {} } = body;
        this.deleteMany(where, request, response, true).then(deleteManyResult => {
            response.jsonResponse(deleteManyResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiDeleteOne(request, response, user, query, body) {
        let { where = {} } = body;
        this.deleteOne(where, request, response, true).then(deleteOneResult => {
            response.jsonResponse(deleteOneResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiDeleteById(request, response, user, query, body) {
        let { _id } = query;
        this.deleteById(_id, request, response, true).then(deleteByIdResult => {
            response.jsonResponse(deleteByIdResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    /* --------------------------------- Restore -------------------------------- */
    _apiRestoreMany(request, response, user, query, body) {
        let { where = {} } = body;
        this.restoreMany(where, request, response, true).then(restoreManyResult => {
            response.jsonResponse(restoreManyResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiRestoreOne(request, response, user, query, body) {
        let { where = {} } = body;
        this.restoreOne(where, request, response, true).then(restoreOneResult => {
            response.jsonResponse(restoreOneResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiRestoreById(request, response, user, query, body) {
        let { _id } = query;
        this.restoreById(_id, request, response, true).then(restoreByIdResult => {
            response.jsonResponse(restoreByIdResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    /* ---------------------------------- Other --------------------------------- */
    _apiCountDocuments(request, response, user, query, body) {
        let { where = {}, exact = true, deleted = {} } = body;
        this.countDocuments(where, exact, deleted, request, response, true).then(countDocuments => {
            response.jsonResponse(countDocuments);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiDistinct(request, response, user, query, body) {
        let { where = {}, fieldNames, deleted = {} } = body;
        this.distinct(fieldNames, where, deleted, request, response, true).then(distinctResult => {
            response.jsonResponse(distinctResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    _apiSearch(request, response, user, query, body) {
        let { searchValue, select, findOptions, fields, additionalSearchQueries, additionalFilterQueries } = body;
        this.search(searchValue, fields, select, findOptions, additionalSearchQueries, additionalFilterQueries, request, response, true).then(searchResult => {
            response.jsonResponse(searchResult);
        })
            .catch(err => {
            return response.errorResponse(err);
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                           Internal query methods                           */
    /* -------------------------------------------------------------------------- */
    _find(where, select, findParams = {}, request, response, validateAccess = false) {
        let { sort, limit, page, populate, pagination, exactPaginationCount, deletedDocs, leanResults } = Object.assign(Object.assign({}, this._defaultFindOptions), findParams);
        let selectStr = this._parseSelect(select);
        let deletedWhere = this._getDeletedWhere(deletedDocs);
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
                    let skipLen = (page - 1) * limit;
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
                        let populateLen = populate.length;
                        for (let i = 0; i < populateLen; i++) {
                            let populateOptions = populate[i];
                            Execution.populate(this._parseMongoosePopulateOptions(populateOptions));
                        }
                    }
                    else {
                        Execution.populate(this._parseMongoosePopulateOptions(populate));
                    }
                }
                if (leanResults) {
                    Execution.lean();
                }
                return Execution;
            })
                .then((docs) => {
                let finalResult = {
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
                    });
                }
                else {
                    return resolve(finalResult);
                }
            }, err => {
                return reject(this._handleError(err, 'high', 'Server error', request, response));
            });
        });
    }
    _findOne(where, select, findParams = {}, request, response, validateAccess = false) {
        let { populate, deletedDocs, leanResults } = Object.assign(Object.assign({}, this._defaultFindOptions), findParams);
        let deletedWhere = this._getDeletedWhere(deletedDocs);
        let selectStr = this._parseSelect(select);
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
                        let populateLen = populate.length;
                        for (let i = 0; i < populateLen; i++) {
                            let populateOptions = populate[i];
                            Execution.populate(this._parseMongoosePopulateOptions(populateOptions));
                        }
                    }
                    else {
                        Execution.populate(this._parseMongoosePopulateOptions(populate));
                    }
                }
                if (leanResults) {
                    Execution.lean();
                }
                return Execution;
            })
                .then((doc) => {
                resolve({
                    doc: doc,
                    foundRecord: isNotEmpty(doc)
                });
            }, err => {
                reject(this._handleError(err, 'high', 'Server error', request, response));
            });
        });
    }
    _updateMany(where, update, updateOptions = {}, request, response, validateAccess = false) {
        let { deletedDocs = this._defaultFindOptions.deletedDocs, updateName = 'Unknown' } = updateOptions;
        return new Promise((resolve, reject) => {
            this._canUpdateDocs(request, response, where, update, deletedDocs, validateAccess)
                .then(canUpdate => {
                if (this._useChangesHistory && !updateOptions.skipUpdateHistory) {
                    let historyData = {
                        sessionId: this._extractSessionIdFromRequest(request),
                        updateName: updateName,
                        updatedAt: new Date().getTime(),
                        updatedBy: this._extractUserIdFromRequest(request),
                        updatedTo: this._lightenHistoryData(update)
                    };
                    let $push = {
                        changesHistory: {
                            $each: [historyData],
                        }
                    };
                    if (this._limitChangesHistoryLength) {
                        $push.changesHistory.$slice = 0 - this._changesHistoryLength;
                    }
                    if (isEmpty(update.$push)) {
                        update.$push = {};
                    }
                    update.$push = Object.assign(Object.assign({}, update.$push), $push);
                }
                // @ts-ignore
                let Execution = this._Model.updateMany(where, update, { request, response });
                let deletedWhere = this._getDeletedWhere(deletedDocs);
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
                });
            })
                .catch(updateErr => {
                reject(this._handleError(updateErr, 'high', 'Server error', request, response));
            });
        });
    }
    _updateOne(where, update, updateOptions = {}, request, response, validateAccess = false) {
        let { deletedDocs = this._defaultFindOptions.deletedDocs, updateName = 'Unknown', customOptions } = updateOptions;
        return new Promise((resolve, reject) => {
            this._canUpdateDocs(request, response, where, update, deletedDocs, validateAccess)
                .then(canUpdate => {
                if (this._useChangesHistory && !updateOptions.skipUpdateHistory) {
                    let historyData = {
                        updateName: updateName,
                        sessionId: this._extractSessionIdFromRequest(request),
                        updatedAt: new Date().getTime(),
                        updatedBy: this._extractUserIdFromRequest(request),
                        updatedTo: this._lightenHistoryData(update)
                    };
                    let $push = {
                        changesHistory: {
                            $each: [historyData],
                        }
                    };
                    if (this._limitChangesHistoryLength) {
                        $push.changesHistory.$slice = 0 - this._changesHistoryLength;
                    }
                    if (isEmpty(update.$push)) {
                        update.$push = {};
                    }
                    update.$push = Object.assign(Object.assign({}, update.$push), $push);
                }
                // @ts-ignore
                let Execution = this._Model.updateOne(where, update, { request, response, customOptions });
                let deletedWhere = this._getDeletedWhere(deletedDocs);
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
                });
            })
                .catch(err => {
                reject(this._handleError(err, 'high', 'Server error', request, response));
            });
        });
    }
    _hardDelete(where, single = false, request, response) {
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
            });
        });
    }
    _distinct(fieldName, where = {}, deleted, request, response, validateAccess = false) {
        return new Promise((resolve, reject) => {
            // ? Checks for access rules for the specified field only
            this._canReadDocs(where, request, response, fieldName, deleted, validateAccess)
                .then(canReadDocsOnModelLevel => {
                if (!canReadDocsOnModelLevel) {
                    return Promise.reject(this._handleError(`You don't have permission to access this data.`, 'low', 'Forbidden', request, response));
                }
                let distinctExecution = this._Model.distinct(fieldName, where);
                let deletedWhere = this._getDeletedWhere(deleted);
                if (this._useSoftdelete && isNotEmpty(deletedWhere)) {
                    distinctExecution.where(deletedWhere);
                }
                distinctExecution.then(distinctResult => {
                    return resolve(distinctResult);
                })
                    .catch(err => {
                    return reject(this._handleError(err));
                });
            })
                .catch(err => {
                return reject(this._handleError(err, 'high', 'Server error', request, response));
            });
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                              Checkers                                      */
    /* -------------------------------------------------------------------------- */
    _hasModelAccessRules(action) {
        if (isUndefined(this._ModelSettings.accessRules)) {
            return false;
        }
        return isNotUndefined(this._ModelSettings.accessRules[action]);
    }
    _canCreateDocs(request, response, validateAccess) {
        let action = 'create';
        if (!validateAccess || isEmpty(request) || !this._hasModelAccessRules(action) || request.user.hasRoles('superAdmin')) {
            return Promise.resolve(true);
        }
        let createRules = this._ModelSettings.accessRules.create;
        return new Promise((resolve, reject) => {
            if (typeof createRules === 'function') {
                this._getFunctionAccessValidatorPromise(createRules, request, action)
                    .then((result) => {
                    return resolve(result);
                })
                    .catch(err => {
                    return reject(this._handleError(err, 'high', 'Server error', request, response));
                });
            }
            else {
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
        });
    }
    _canDeleteOrRestoreDocs(where, request, response, action, validateAccess) {
        if (!validateAccess || isEmpty(request) || !this._hasModelAccessRules(action) || request.user.hasRoles(['superAdmin'])) {
            return Promise.resolve(true);
        }
        let deleted = (action === 'delete')
            ? 'active'
            : 'deleted';
        let deleteRules = this._ModelSettings.accessRules.delete;
        return new Promise((resolve, reject) => {
            if (typeof deleteRules === 'function') {
                this._getFunctionAccessValidatorPromise(deleteRules, request, action, where)
                    .then((result) => {
                    return resolve(result);
                })
                    .catch(err => {
                    return reject(this._handleError(err, 'high', 'Server error', request, response));
                });
            }
            else {
                this._resolveModelLevelReadUpdateOrDeleteRules(deleteRules, request, response, where, deleted, action)
                    .then(modelLevelAccessRulesResult => {
                    let canDelete = false;
                    let modelLevelAccessRulesResultLen = modelLevelAccessRulesResult.length;
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
                });
            }
        });
    }
    _canUpdateDocs(request, response, where, updateQuery, deleted, validateAccess = false) {
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
            this._resolveModelLevelReadUpdateOrDeleteRules(modelUpdateRules, request, response, where, deleted, 'update', updateQuery)
                .then((modelLevelPromisesResults) => {
                return this._canReadOrUpdateDataBasedOnResolvedModelLevelAccessRules(where, request, response, deleted, modelLevelPromisesResults, hasFieldLevelRules, fieldsLevelRules, 'update', updateQuery);
            })
                .then((finalResult) => {
                if (finalResult) {
                    return resolve(finalResult);
                }
                else {
                    return reject(this._handleError(`You don't have permission to modify this data.`, 'low', 'Forbidden', request, response));
                }
            })
                .catch(error => {
                return reject(this._handleError(error, 'high', 'Server error', request, response));
            });
        });
    }
    _canReadDocs(where, request, response, selectStr, deleted, validateAccess = false) {
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
            let action = 'read';
            this._resolveModelLevelReadUpdateOrDeleteRules(modelReadRules, request, response, where, deleted, action)
                .then((modelLevelPromisesResults) => {
                return this._canReadOrUpdateDataBasedOnResolvedModelLevelAccessRules(where, request, response, deleted, modelLevelPromisesResults, hasFieldLevelRules, fieldsLevelRules, action);
            })
                .then((finalResult) => {
                if (finalResult) {
                    return resolve(true);
                }
                else {
                    return resolve(false);
                }
            })
                .catch(error => {
                return reject(this._handleError(error, 'high', 'Server error', request, response));
            });
        });
    }
    _canReadOrUpdateDataBasedOnResolvedModelLevelAccessRules(where, request, response, deleted, modeleLevelChecksResults, hasFieldLevelRules, fieldsLevelRules, action, additionalQuery = {}) {
        let can = false;
        let resultsLen = modeleLevelChecksResults.length;
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
    _checkFieldTypeValidityForAccessReffrence(fieldName, type) {
        let fieldType = this._modelDeclaration[fieldName].type;
        if (!(fieldType === 'Number' || fieldType === '[Number]')) {
            if (!(fieldName === '_id' && this._ModelSettings.autoIncrement)) {
                return `"${fieldName}" is invalid field for ${(type === 'groupId') ? 'group' : 'user'} access validation reffrence. "${fieldName}" must be [Number] | Number field type.`;
            }
        }
        if (this._systemFieldsList.includes(fieldName) && !this._systemReffrenceAbleFieldsList.includes(fieldName)) {
            return `"${fieldName}" is invalid field for reffrence ${(type === 'groupId') ? 'group' : 'user'} access validation. This system fields is not allowed for reffrencing.`;
        }
        return false;
    }
    /* -------------------------------------------------------------------------- */
    /*                               Helper methods                               */
    /* -------------------------------------------------------------------------- */
    /* ------------------------------- Extractors ------------------------------- */
    _extractUserIdFromRequest(request) {
        return (isEmpty(request) || !request.user.loggedIn) ? null : request.user._id;
    }
    _extractSessionIdFromRequest(request) {
        return (isEmpty(request)) ? null : request.handyClientSessionId;
    }
    /* --------------------------------- Parsers -------------------------------- */
    _parseSelect(select = this.defaultSelect) {
        if (isEmpty(select)) {
            return '';
        }
        let result = '';
        let selectFields = [];
        if (typeof select.fields == 'string') {
            selectFields = [select.fields];
        }
        else {
            selectFields = select.fields;
        }
        let selectFieldsLen = selectFields.length;
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
    _parseMongoosePopulateOptions(populateOptions) {
        let result = {
            path: populateOptions.path,
            model: populateOptions.model
        };
        let select = this._parseSelect(populateOptions.select);
        if (select.length > 0) {
            result.select = select;
        }
        if (populateOptions.sort !== undefined || populateOptions.limit !== undefined) {
            let options = {};
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
    _parseSortOptions(sortingOptions) {
        if (!Array.isArray(sortingOptions)) {
            sortingOptions = [sortingOptions];
        }
        let result = {};
        let optionsLen = sortingOptions.length;
        for (let i = 0; i < optionsLen; i++) {
            const singleOption = sortingOptions[i];
            result[singleOption.field] = singleOption.direction;
        }
        return result;
    }
    _parsePaginationData(totalRecordsCount, page, limit, docs) {
        let pagesCount = Math.floor(totalRecordsCount / limit) + 1;
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
    _getUpdatedFieldsFromQuery(updateQuery = {}) {
        let fieldsList = [];
        let queryKeys = Object.keys(updateQuery);
        let queryKeysLen = queryKeys.length;
        for (let i = 0; i < queryKeysLen; i++) {
            const singleQueryKey = queryKeys[i];
            if (singleQueryKey.startsWith('$')) {
                fieldsList = [...fieldsList, ...this._getUpdatedFieldsFromQuery(updateQuery[singleQueryKey])];
            }
            else {
                fieldsList.push(singleQueryKey);
            }
        }
        return fieldsList;
    }
    _getUpdateFieldsAccessRules(updateQuery = {}) {
        let fieldsLevelRules = [];
        let hasSystemField = false;
        let hasFieldLevelRules = false;
        let fieldsList = this._getUpdatedFieldsFromQuery(updateQuery);
        let fieldsLen = fieldsList.length;
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
        let hasModelLevelAccessRules = isEmpty(this._ModelSettings.accessRules) ? false : isNotEmpty(this._ModelSettings.accessRules.update);
        if (fieldsLevelRules.length < fieldsLen && hasModelLevelAccessRules) {
            // ?Basically means that doesn't have access to all fields that tries to update 
            let stopper = (...args) => {
                return false;
            };
            fieldsLevelRules.unshift(stopper);
            hasFieldLevelRules = true;
        }
        return {
            fieldsLevelRules,
            hasSystemField,
            hasFieldLevelRules
        };
    }
    _getReadFieldsFromSelectString(selectStr) {
        let fieldsList = selectStr.split(' ');
        let fieldsLen = fieldsList.length;
        if (fieldsLen === 0) {
            return this._modelFields;
        }
        let finalList = [];
        let selectedFields = [];
        let deSelectFields = [];
        let hasSelected = false;
        let hasDeselected = false;
        for (let i = 0; i < fieldsLen; i++) {
            let field = fieldsList[i];
            if (field.startsWith('-')) {
                deSelectFields.push(field.replace('-', ''));
                hasDeselected = true;
            }
            else {
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
    _getReadFieldsAccessRules(selectStr) {
        let hasFieldLevelRules = false;
        let fieldsLevelRules = [];
        let fieldsList = this._getReadFieldsFromSelectString(selectStr);
        let fieldsLen = fieldsList.length;
        for (let i = 0; i < fieldsLen; i++) {
            const fieldName = fieldsList[i];
            if (isNotEmpty(this._fieldLevelAccessRules[fieldName]) && isNotEmpty(this._fieldLevelAccessRules[fieldName].read)) {
                fieldsLevelRules.push(this._fieldLevelAccessRules[fieldName].read);
                hasFieldLevelRules = true;
            }
        }
        let hasModelLevelAccessRules = isEmpty(this._ModelSettings.accessRules) ? false : isNotEmpty(this._ModelSettings.accessRules.read);
        if (fieldsLevelRules.length < fieldsLen && hasModelLevelAccessRules) {
            // Basically means that doesn't have access to all fields that tries to update 
            let stopper = (...args) => {
                return false;
            };
            fieldsLevelRules.unshift(stopper);
        }
        return {
            hasFieldLevelRules,
            fieldsLevelRules
        };
    }
    _getFunctionAccessValidatorPromise(rule, request, action, conditionsQueryOrDoc, updateQuery) {
        let test = rule(request.user, action, conditionsQueryOrDoc, updateQuery);
        if (isNotEmpty(test.then)) {
            return test;
        }
        else {
            return Promise.resolve(test);
        }
    }
    _getDocFieldsList(doc) {
        return Object.keys(doc);
    }
    _getDeletedWhere(deletedDocsSpecs) {
        let deletedWhere = {};
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
    _getFieldLevelAccessPromises(where, action, deleted, fieldsAccessRules, request, response, additionalQuery) {
        let fieldLevelPromises = [];
        let fieldsLen = fieldsAccessRules.length;
        for (let i = 0; i < fieldsLen; i++) {
            const fieldRules = fieldsAccessRules[i];
            if (typeof fieldRules === 'function') {
                let testInPromise = this._getFunctionAccessValidatorPromise(fieldRules, request, action, where, additionalQuery);
                fieldLevelPromises.push(testInPromise);
            }
            else {
                let checkPromise = new Promise((fieldCheckResolve, fieldCheckReject) => {
                    let { groups, permission, groupIdField, userIdField } = fieldRules;
                    let canUpdateField = false;
                    let asyncCheckPromises = [];
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
                        let hasAsyncFieldAccess = false;
                        let asyncResultsLen = asyncResults.length;
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
                    });
                });
                fieldLevelPromises.push(checkPromise);
            }
        }
        return fieldLevelPromises;
    }
    _getReffrenceQueryForFieldAsyncCheck(fieldName, type, request) {
        let fieldValidityErr = this._checkFieldTypeValidityForAccessReffrence(fieldName, type);
        if (fieldValidityErr !== false) {
            return fieldValidityErr;
        }
        return { [fieldName]: (type === 'groupId') ? request.user.groupId : request.user._id };
    }
    _getSoftDeleteUpdateOptions(request) {
        let updateOptions = {
            // @ts-ignore
            deletedDocs: 'active',
            updateName: 'Delete'
        };
        let update = {
            $set: {
                deleted: true,
                restored: false,
                deletedAt: new Date().getTime(),
                restoredAt: null,
                deletedBy: this._extractUserIdFromRequest(request),
                restoredBy: null
            }
        };
        return {
            updateOptions,
            update
        };
    }
    _getRestoreUpdateOptions(request) {
        let updateOptions = {
            // @ts-ignore
            deletedDocs: 'deleted',
            updateName: 'Restore'
        };
        let update = {
            deleted: false,
            restored: true,
            deletedAt: null,
            restoredAt: new Date().getTime(),
            deletedBy: null,
            restoredBy: this._extractUserIdFromRequest(request)
        };
        return {
            updateOptions,
            update
        };
    }
    _getFinalSearchQuery(searchValue, fields = [], findParams = {}, additionalSearchQueries = [], additionalAndQueries = []) {
        let searchQueries = [];
        if (isNotEmpty(searchValue)) {
            let isNumber = typeof searchValue === 'number';
            let isString = typeof searchValue === 'string';
            let stringSearchVal;
            let numberSearchVal;
            let isNegative = false;
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
                    let periodSplitted = searchValue.split('.');
                    let periodSplittedLen = periodSplitted.length;
                    let commaSplitted = searchValue.split(',');
                    let commaSplittedLen = commaSplitted.length;
                    // Finding the first one...
                    if (periodSplittedLen > 1 && commaSplittedLen > 1) {
                        let firstDelimeineter = (periodSplittedLen < commaSplittedLen) ? '.' : ',';
                        let decimalSplit = searchValue.split(firstDelimeineter);
                        let decimalSplitLen = decimalSplit.length;
                        let beforeDecimal = decimalSplit[0];
                        let afterDecimalString = '';
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
                        let beforeDecimal = periodSplitted[0];
                        let afterDecimalString = '';
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
                        let beforeDecimal = commaSplitted[0];
                        let afterDecimalString = '';
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
            let fieldsToSearch = [];
            if (isEmpty(fields)) {
                fields = (isEmpty(this._defaultSearchableFields)) ? this._searchableFields : this._defaultSearchableFields;
            }
            if (typeof fields === 'string') {
                fieldsToSearch = [fields];
            }
            if (isArray(fields)) {
                fieldsToSearch = fields;
            }
            let regexOptions = Object.assign(Object.assign({}, findParams.regexOptions), this._searchDefaultOptions);
            let regexOptsStr;
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
            let stringSearchRegexDefinition = {
                $regex: (isNegative) ? `-${stringSearchVal}` : stringSearchVal
            };
            if (regexOptsStr) {
                stringSearchRegexDefinition.$options = regexOptsStr;
            }
            let numberSearchNumericValue;
            if (numberSearchVal) {
                let numericVal = parseFloat(numberSearchVal);
                numberSearchNumericValue = (isNegative) ? 0 - numericVal : numericVal;
            }
            let fieldsToSearchLen = fieldsToSearch.length;
            for (let i = 0; i < fieldsToSearchLen; i++) {
                const fieldName = fieldsToSearch[i];
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
        let allQueries = [...searchQueries, ...additionalSearchQueries];
        let allQueriesLen = allQueries.length;
        let finalSearchQuery = {};
        if (allQueriesLen > 0) {
            finalSearchQuery.$or = [];
            for (let index = 0; index < allQueriesLen; index++) {
                const singleQuery = allQueries[index];
                // @ts-ignore
                finalSearchQuery.$or.push(singleQuery);
            }
        }
        let finalQuery = {};
        if (isNotEmpty(additionalAndQueries)) {
            // @ts-ignore
            finalQuery.$and = [...additionalAndQueries];
            // @ts-ignore
            finalQuery.$and.push(finalSearchQuery);
        }
        else {
            finalQuery = finalSearchQuery;
        }
        return finalQuery;
    }
    /* ---------------------------------- Other --------------------------------- */
    _handleError(error, priority = 'low', errorCode = 'Server error', request, response, source = new Error) {
        if (this._handyError.isHandyError(error, request, response)) {
            return error;
        }
        let finalError;
        if (isNotEmptyObject(error)) {
            let errKeys = Object.keys(error);
            if (errKeys.includes('name')) {
                let errName = error.name;
                switch (errName) {
                    case 'ValidationError':
                        let publicErrorsList = [];
                        let subErrors = error.errors;
                        let subErrorsKeys = Object.keys(subErrors);
                        let subErrorsLen = subErrorsKeys.length;
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
    _removeUnallowedSymbolsFromUpdateHistoryData(updateVal) {
        if (typeof updateVal !== 'object' || updateVal === null || updateVal === undefined) {
            return updateVal;
        }
        let keysToCheck = Object.keys(updateVal);
        let result = {};
        let keysLen = keysToCheck.length;
        for (let i = 0; i < keysLen; i++) {
            const singleKey = keysToCheck[i];
            result[singleKey.replace('$', '@').replace('.', '#')] = this._removeUnallowedSymbolsFromUpdateHistoryData(updateVal[singleKey]);
        }
        return result;
    }
    _lightenHistoryData(doc = {}) {
        let newHistData = Object.assign({}, doc);
        let keysToRemoveLen = this._keysToRemoveFromChangesHistory.length;
        for (let i = 0; i < keysToRemoveLen; i++) {
            const key = this._keysToRemoveFromChangesHistory[i];
            delete newHistData[key];
        }
        return this._removeUnallowedSymbolsFromUpdateHistoryData(newHistData);
    }
    _compareAccessFieldsCount(where, deleted, request, response, groupIdField, userIdField) {
        let groupCountComparsion = new Promise((resolve, reject) => {
            let $or = [];
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
            let verifyQuery = {};
            verifyQuery = {
                $and: [
                    where,
                ]
            };
            if ($or.length > 1) {
                verifyQuery.$and.push({ $or });
            }
            else {
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
            });
        });
        return groupCountComparsion;
    }
    /* -------------------------------- Resolvers ------------------------------- */
    _resolveModelLevelReadUpdateOrDeleteRules(modelLevelRules, request, response, where, deleted, action, additionalQuery = {}) {
        let modelLevelPromises = [];
        if (isNotEmpty(modelLevelRules)) {
            if (typeof modelLevelRules === 'function') {
                let testInPromise = this._getFunctionAccessValidatorPromise(modelLevelRules, request, action, where, additionalQuery);
                modelLevelPromises.push(testInPromise);
            }
            else {
                let { groups, permission, groupIdField, userIdField } = modelLevelRules;
                let can = false;
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
    _resolveFieldAccessRules(where, action, deleted, fieldsAccessRules, request, response, additionalQuery = {}) {
        if (request.user.hasRoles('superAdmin')) {
            return Promise.resolve(true);
        }
        let asyncTests = this._getFieldLevelAccessPromises(where, action, deleted, fieldsAccessRules, request, response, additionalQuery);
        return new Promise((resolve, reject) => {
            Promise.all(asyncTests)
                .then(fieldsLevelAccessResults => {
                let canOperateBasedOnFieldsLevel = false;
                let fieldsLevelAccessResultsLen = fieldsLevelAccessResults.length;
                for (let k = 0; k < fieldsLevelAccessResultsLen; k++) {
                    if (!fieldsLevelAccessResults[k]) {
                        canOperateBasedOnFieldsLevel = false;
                        break;
                    }
                    else {
                        if (!canOperateBasedOnFieldsLevel) {
                            canOperateBasedOnFieldsLevel = true;
                        }
                    }
                }
                return resolve(canOperateBasedOnFieldsLevel);
            })
                .catch(allFieldLevelTEstsErr => {
                return reject(allFieldLevelTEstsErr);
            });
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                                 Middlewares                                */
    /* -------------------------------------------------------------------------- */
    _setDefaultUpdateOptions(query, args) {
        if (isUndefined(query.options.runValidators)) {
            query.options.runValidators = this._defaultValidationOnUpdate;
            query.options.context = 'query';
        }
        if (isUndefined(query.options.new)) {
            query.options.new = this._defaultReturnUpdatedDocOnUpdate;
        }
        return Promise.resolve();
    }
    __parseRoutingSettings() {
        // !Added this way so it's not visible via intelisense...
        this.constructor.prototype.__getDefaultMethodsRoutes = () => {
            return this.__defaultMethodsRoutesSettings;
        };
        if (!this._ModelSettings.routable) {
            return;
        }
        let methodsList = [
            'countDocuments', 'createMany', 'createOne', 'deleteById', 'deleteMany', 'deleteOne', 'distinct', 'find', 'findById', 'findOne', 'restoreById', 'restoreMany', 'restoreOne', 'search', 'updateMany', 'updateOne'
        ];
        let methodsLen = methodsList.length;
        for (let i = 0; i < methodsLen; i++) {
            let methodName = methodsList[i];
            let methodRoutingSettings = this.__getMethodRoutingSettings(methodName);
            if (methodRoutingSettings === false) {
                continue;
            }
            let { apiVersions, env, accessValidationfn, groups, permissions, requestModifier, requestValidator, requiredParams } = methodRoutingSettings;
            let requestSettings = {
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
    __getMethodRoutingSettings(methodName) {
        let acessRules = {};
        let routable;
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
    __parseLevelRules(acessRules, definedRules, routable) {
        let result = {
            finished: false,
            newRules: acessRules,
            routable
        };
        if (definedRules === false) {
            return result;
        }
        let hasReasonableRules = (isNotUndefined(acessRules.permissions) || isNotUndefined(acessRules.groups) || isNotUndefined(acessRules.accessValidationfn));
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
    __getActionLevelRoutingRestrictions(methodName, level) {
        let methodActionType = 'read';
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
        }
        else {
            rootRestrictions = default_models_access_validator_1.defaultModelsMethodsRoutingRestrinctions;
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
    __getMethodExplicitRoutingRestrictions(methodName, level) {
        let actionLevelRestrictions = this.__getActionLevelRoutingRestrictions(methodName, level);
        if (actionLevelRestrictions === false) {
            return false;
        }
        if (isEmpty(actionLevelRestrictions[methodName])) {
            return false;
        }
        return actionLevelRestrictions[methodName];
    }
    __getActionDefaultRoutingRestrictions(methodName, level) {
        let actionLevelRestrictions = this.__getActionLevelRoutingRestrictions(methodName, level);
        if (actionLevelRestrictions === false) {
            return false;
        }
        if (isEmpty(actionLevelRestrictions.default)) {
            return false;
        }
        return actionLevelRestrictions.default;
    }
    __getLevelDefaultRoutingRestrictions(level) {
        let rootRestrictions;
        if (level === 'model') {
            rootRestrictions = this._ModelSettings.routingRestrictions;
        }
        else {
            rootRestrictions = default_models_access_validator_1.defaultModelsMethodsRoutingRestrinctions;
        }
        if (isEmpty(rootRestrictions) || isEmpty(rootRestrictions.default)) {
            return false;
        }
        return rootRestrictions.default;
    }
    _getRequestTypeBasedFromMethodName(methodName) {
        let postListeners = ['countDocuments', 'search', 'createMany', 'createOne', 'deleteMany', 'deleteOne', 'distinct', 'find', 'findOne', 'findById'];
        let putListeners = ['restoreById', 'restoreMany', 'restoreOne', 'updateMany', 'updateOne'];
        let getListeners = [];
        let deleteListeners = ['deleteById'];
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
__decorate([
    decorators_1.MongooseMW('findOneAndUpdate'),
    decorators_1.MongooseMW('update'),
    decorators_1.MongooseMW('updateMany'),
    decorators_1.MongooseMW('updateOne'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], DefaultHandyModelClass.prototype, "_setDefaultUpdateOptions", null);
exports.DefaultHandyModelClass = DefaultHandyModelClass;
//# sourceMappingURL=default-handy.model.js.map