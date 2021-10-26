import {
  MongooseModelInterfaces, SearchableMongooseModelFields, CompleteMongooseModelShapeInterface,
  MongooseModelCreateShape, CompleteMongoModelFields, UnSignedObject, UserRole, SingleOrArrayCombo, AdditionalAccessPermission, UserGroup, ConfigData
} from "@handy/types";

/* -------------------------------------------------------------------------- */
/*                            Uploads model interfaces                           */
/* -------------------------------------------------------------------------- */

export interface UploadsModelInterfaces extends MongooseModelInterfaces {

  /* ---------------------- Model fields shape interface ---------------------- */
  shape: {

    url: string,
    fileType: string,
    storrageFileName: string,
    originalFileName: string,
    storragePath: string,
    accessRules?: {
      publicAccess?: boolean,
      roles?: UserRole[],
      permissions?: AdditionalAccessPermission[],
      groupTypes?: UserGroup[],
      userId?: number,
      groupId?: number,
      password?: string
    },
    thumbs?: {
      [key in keyof ConfigData['fileUpload']['thumsSets']]?: string
    }

  },

  /* --------------------------- Settings interfaces -------------------------- */

  softDelete: false,
  createdAt: true,
  createdBy: true,
  autoIncrement: true,
  changesHistory: false,
  defaultSelect: {
    selectType: 'deselect',
    fields: ['_id']
  }

  /* --------------------- Dynamicly generated interfaces --------------------- */
  /* ------------------------------ Do not change ----------------------------- */

  fullModelShape: CompleteMongooseModelShapeInterface<this['shape'], this['softDelete'], this['createdAt'], this['createdBy'], this['autoIncrement'], this['changesHistory']>,
  docShape: this['fullModelShape'],
  createShape: MongooseModelCreateShape<this['fullModelShape']>,
  allFields: CompleteMongoModelFields<keyof this['fullModelShape'], this['softDelete'], this['createdAt'], this['createdBy'], this['changesHistory']>,
  idType: this['fullModelShape']['_id'],
  searchableFields: SearchableMongooseModelFields<this>,

}