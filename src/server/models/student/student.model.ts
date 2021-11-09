import { HandyModelClass } from '@models';
import { MongooseModel, Inject } from "@handy/core";
import { StudentModelDeclaration } from './model.declaration'
import { StudentModelInterfaces } from "./model.interface";

@MongooseModel<StudentModelInterfaces>({
  name: 'Student',
  modelDeclaration: StudentModelDeclaration,
  softDelete: false,
  createdAt: true,
  createdBy: false,
  autoIncrement: true,
  changesHistory: false,
  routable: true,
  publicRoutable: false,
})
export class StudentModel extends HandyModelClass<StudentModelInterfaces> {

  constructor () {

    super();

  }

}