import { HandyModelDeclaration } from "@handy/types";
import { StudentModelInterfaces } from "./model.interface";

import { LengthValidator } from "@validators/mongoose";
import { HandyConfigService } from "@services";
import { Inject } from "@handy/core";

const config = Inject(HandyConfigService);

export const StudentModelDeclaration: HandyModelDeclaration<StudentModelInterfaces> = {
  _id: {
    publicName: 'Id',
  },
  studentName: {
    publicName: 'Student Name',
    inputType:'text',
    required:true,
    unique:false,
    type:'Text'
  },
  studentAddress: {
    publicName: 'Full Address',
    inputType:'text-area',
    required:true,
    unique:false,
    type:'Text'
  },
  studentCourse: {
    publicName: 'Course',
    inputType:'select',
    required:true,
    unique:false,
    type:'Text'
  },
  studentMobile: {
    publicName: 'Mobile No',
    inputType:'number',
    required:true,
    unique:true,
    type:'Number'
  },
  studentEmail: {
    publicName: 'Email',
    inputType:'text',
    required:false,
    unique:false,
    type:'Text'
  },

}

export type StudentModelDeclarationType = typeof StudentModelDeclaration;