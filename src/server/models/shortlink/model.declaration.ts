import { HandyModelDeclaration } from "@handy/types";
import { ShortlinkModelInterfaces } from "./model.interface";

import { HandyConfigService } from "@services";
import { Inject } from "@handy/core";

const config = Inject(HandyConfigService);

export const ShortlinkModelDeclaration: HandyModelDeclaration<ShortlinkModelInterfaces> = {
  _id: {
    publicName: 'Id',
  },
  finalUrl: {
    type: 'ShortString',
    required: true,
    unique: false,
    inputType: 'none',
    publicName: 'Final url'
  },
  shortlinkHash: {
    type: 'ShortString',
    required: true,
    unique: false,
    inputType: 'none',
    publicName: 'Hash'
  },
  oneTime: {
    type: 'Boolean',
    publicName: 'One time link',
    required: true,
    default: false,
    inputType: 'none'
  }
}

export type ShortlinkModelDeclarationType = typeof ShortlinkModelDeclaration;