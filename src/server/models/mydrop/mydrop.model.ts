import { HandyModelClass } from '@models';
import { MongooseModel, Inject } from "@handy/core";
import { MydropModelDeclaration } from './model.declaration'
import { MydropModelInterfaces } from "./model.interface";

@MongooseModel<MydropModelInterfaces>({
  name: 'Mydrop',
  modelDeclaration: MydropModelDeclaration,
  softDelete: false,
  createdAt: true,
  createdBy: false,
  autoIncrement: true,
  changesHistory: false,
  routable: true,
  publicRoutable: false,
})
export class MydropModel extends HandyModelClass<MydropModelInterfaces> {

  constructor () {

    super();

  }

}