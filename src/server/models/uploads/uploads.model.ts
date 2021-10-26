import { HandyModelClass } from '@models';
import { MongooseModel, Inject, MongooseMW } from "@handy/core";
import { UploadsModelDeclaration } from './model.declaration'
import { UploadsModelInterfaces } from "./model.interface";

@MongooseModel<UploadsModelInterfaces>({
  name: 'Uploads',
  modelDeclaration: UploadsModelDeclaration,
  softDelete: false,
  createdAt: true,
  createdBy: true,
  autoIncrement: true,
  changesHistory: false,
  routable: false,
  publicRoutable: false,
})
export class UploadsModel extends HandyModelClass<UploadsModelInterfaces> {

  constructor () {

    super();

  }

  @MongooseMW('save', 'pre')
  public safeFileName(mwThis: UploadsModelInterfaces['createShape'], rest: any[]): Promise<UploadsModelInterfaces['createShape']> {

    return new Promise<UploadsModelInterfaces['createShape']>((resolve, reject) => {
      
      mwThis.originalFileName = this.__normalizeFileName(mwThis.originalFileName + '');

      resolve(mwThis);
      
    })

  }

  private __normalizeFileName(originalName: string): string {

    let result: string = originalName;
    while (result.includes('/') || result.includes('\\') || result.includes('(') || result.includes(')') || result.includes('&')) {

      result = result.replace('(', '');
      result = result.replace(')', '');
      result = result.replace('/', '-');
      result = result.replace('&', 'and');
      result = result.replace('\\', '-');

    }

    return result;

  }

}