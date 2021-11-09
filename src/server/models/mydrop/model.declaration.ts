import { HandyModelDeclaration } from "@handy/types";
import { MydropModelInterfaces } from "./model.interface";

import { LengthValidator } from "@validators/mongoose";
import { HandyConfigService } from "@services";
import { Inject } from "@handy/core";

const config = Inject(HandyConfigService);

export const MydropModelDeclaration: HandyModelDeclaration<MydropModelInterfaces> = {
  _id: {
    publicName: 'Id',
  },

  // Rest of the fields
  content:{
    publicName :'Content',
    inputType: 'rich-text',
    type : "Text",
    required: true,
    unique :false,
  },

  password :{
    publicName :'Password',
    inputType: 'password',
    type : "ShortString",
    required: true,
    unique :false,
  },

  expireAt :{
    publicName :'Expiration',
    inputType: 'date',
    required: true,
    unique :false,
    type: 'Number'
  }

}

export type MydropModelDeclarationType = typeof MydropModelDeclaration;