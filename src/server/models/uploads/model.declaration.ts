import { HandyModelDeclaration } from "@handy/types";
import { UploadsModelInterfaces } from "./model.interface";

import { LengthValidator } from "@validators/mongoose";
import { HandyConfigService } from "@services";
import { Inject } from "@handy/core";

const config = Inject(HandyConfigService);

export const UploadsModelDeclaration: HandyModelDeclaration<UploadsModelInterfaces> = {
  _id: {
    publicName: 'Id',
  },
  url: {
    type: 'ShortString',
    required: true,
    unique: true,
    publicName: 'File url',
    inputType: 'none'
  },
  storragePath: {
    type: 'ShortString',
    required: true,
    unique: false,
    publicName: 'Storrage path',
    inputType: 'none'
  },
  storrageFileName: {
    type: 'ShortString',
    required: true,
    unique: false,
    publicName: 'Storrage file name',
    inputType: 'none'
  },
  fileType: {
    type: 'ShortString',
    required: true,
    unique: false,
    publicName: 'File type',
    inputType: 'none'
  },
  originalFileName: {
    type: 'ShortString',
    required: true,
    unique: false,
    publicName: 'File name',
    inputType: 'none'
  },
  accessRules: {
    type: 'Mixed',
    required: false,
    unique: false,
    publicName: 'Access rules',
    inputType: 'none'
  },
  thumbs: {
    type: 'Mixed',
    required: false,
    unique: false,
    publicName: 'Thumbnails',
    inputType: 'none'
  }

  // Rest of the fields

}

export type UploadsModelDeclarationType = typeof UploadsModelDeclaration;