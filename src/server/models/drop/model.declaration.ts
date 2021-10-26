import { HandyModelDeclaration } from "@handy/types";
import { DropModelInterfaces } from "./model.interface";

import { LengthValidator } from "@validators/mongoose";
import { HandyConfigService } from "@services";
import { Inject } from "@handy/core";

const config = Inject(HandyConfigService);

export const DropModelDeclaration: HandyModelDeclaration<DropModelInterfaces> = {
  _id: {
    publicName: 'Id',
  },

  content: {
    publicName: 'Content',
    inputType: 'rich-text',
    required: true,
    unique: false,
    type: 'Text',
  },
  password: {
    publicName: 'Password',
    inputType: 'password',
    required: true,
    unique: false,
    type: 'ShortString',
  },
  expiryAt: {
    publicName: 'Expiration',
    inputType: 'date',
    required: true,
    unique: false,
    type: 'Number'
  }

  // Rest of the fields

}

export type DropModelDeclarationType = typeof DropModelDeclaration;