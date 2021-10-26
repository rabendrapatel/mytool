import { HandyModelClass } from '@models';
import { MongooseModel, Inject, MongooseMW, GetRequest, CronInterval } from "@handy/core";
import { ShortlinkModelDeclaration } from './model.declaration'
import { ShortlinkModelInterfaces } from "./model.interface";
import { ServerRequest, ServerRequestUser, ServerResponse } from '@handy/types';

@MongooseModel<ShortlinkModelInterfaces>({
  name: 'Shortlink',
  modelDeclaration: ShortlinkModelDeclaration,
  softDelete: false,
  createdAt: false,
  createdBy: false,
  autoIncrement: true,
  changesHistory: false,
  routable: true,
  publicRoutable: false,
  defaultSelect: {
    selectType: 'select',
    fields: ['finalUrl', 'shortlinkHash', 'oneTime', '_id']
  }
})
export class ShortlinkModel extends HandyModelClass<ShortlinkModelInterfaces> {

  constructor () {
 
    super();
    
  }

}