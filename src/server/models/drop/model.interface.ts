import {
  MongooseModelInterfaces, SearchableMongooseModelFields, CompleteMongooseModelShapeInterface,
  MongooseModelCreateShape, CompleteMongoModelFields, UnSignedObject
} from "@handy/types";

/* -------------------------------------------------------------------------- */
/*                            Drop model interfaces                           */
/* -------------------------------------------------------------------------- */

export interface DropModelInterfaces extends MongooseModelInterfaces {

  /* ---------------------- Model fields shape interface ---------------------- */
  shape: {

    // field: type,
    content: string,
    password: string,
    expiryAt: number

  },

  /* --------------------------- Settings interfaces -------------------------- */

  softDelete: false,
  createdAt: true,
  createdBy: false,
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