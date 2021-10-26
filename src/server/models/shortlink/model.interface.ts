import {
  MongooseModelInterfaces, SearchableMongooseModelFields, CompleteMongooseModelShapeInterface,
  MongooseModelCreateShape, CompleteMongoModelFields, UnSignedObject
} from "@handy/types";

/* -------------------------------------------------------------------------- */
/*                            Shortlink model interfaces                           */
/* -------------------------------------------------------------------------- */

export interface ShortlinkModelInterfaces extends MongooseModelInterfaces {

  /* ---------------------- Model fields shape interface ---------------------- */
  shape: {

    finalUrl: string,
    shortlinkHash: string,
    oneTime: boolean

  },

  /* --------------------------- Settings interfaces -------------------------- */

  softDelete: false,
  createdAt: false,
  createdBy: false,
  autoIncrement: true,
  changesHistory: false,
  defaultSelect: {
    selectType: 'select',
    fields: ['finalUrl', 'shortlinkHash', 'oneTime', '_id']
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