import './globals';
import 'socket.io/';

import {
  SingleOrArrayCombo, UnSignedObject, HandyTimeObject, HandyTimeUnit,
  HandyJsonRequestErrorResponse, MongooseModelInterfaces, PublicConfigData,
  AdditionalAccessPermission, UserRole, UserGroup, ArrayOrUnionToUnion,
  HandyMongooseSelect, HandyMongooseModelPublicFindOpts, HandyMongooseFindResults,
  HandyMongooseModelPublicFindOneOpts, HandyMongooseFindOneResult, 
  HandyMongooseModelUpdateOpts, HandyMongooseUpdateResult, HandyMongooseRemoveResult,
  HandyMongooseRestoreResult, MongooseIncludeDeletedOption,HandyMongooseDistinctManyResults,
  MognooseSearchRegexOptions, HandySocketClientEventPayload, HandySocketServerEventPayload,
  HashGeneratorOptions, WebAppLoginResult, MongooseSortingOptions,
  PasswordStrengthResult, PasswordIndicatorName, PasswordStrenghtDictionary, PdfUrlGeneratingData, FileInputData, HandyFileInputData
} from '@handy/types';

export { FilterQuery } from 'mongoose';
export {
  SingleOrArrayCombo, UnSignedObject, HandyTimeObject, HandyTimeUnit,
  HandyJsonRequestErrorResponse, MongooseModelInterfaces, PublicConfigData,
  AdditionalAccessPermission, UserRole, UserGroup, ArrayOrUnionToUnion,
  HandyMongooseSelect, HandyMongooseModelPublicFindOpts,
  HandyMongooseFindResults, HandyMongooseModelPublicFindOneOpts, HandyMongooseFindOneResult, 
  HandyMongooseModelUpdateOpts, HandyMongooseUpdateResult, HandyMongooseRemoveResult,
  HandyMongooseRestoreResult, MongooseIncludeDeletedOption,HandyMongooseDistinctManyResults,
  MognooseSearchRegexOptions, HandySocketClientEventPayload, HandySocketServerEventPayload,
  HashGeneratorOptions, WebAppLoginResult, MongooseSortingOptions,
  PasswordStrengthResult, PasswordIndicatorName, PasswordStrenghtDictionary, PdfUrlGeneratingData,
  FileInputData, HandyFileInputData
}

export type HandyApiCallResult<T = any> = {
  success: true,
  data: T
}


