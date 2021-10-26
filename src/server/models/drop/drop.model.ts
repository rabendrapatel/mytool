import { HandyModelClass } from '@models';
import { MongooseModel, Inject, CronInterval } from "@handy/core";
import { DropModelDeclaration } from './model.declaration'
import { DropModelInterfaces } from "./model.interface";

@MongooseModel<DropModelInterfaces>({
  name: 'Drop',
  modelDeclaration: DropModelDeclaration,
  softDelete: false,
  createdAt: true,
  createdBy: false,
  autoIncrement: true,
  changesHistory: false,
  routable: false,
  publicRoutable: false,
})
export class DropModel extends HandyModelClass<DropModelInterfaces> {

  constructor () {

    super();
    this.clearExpired(new Date())

  }

  @CronInterval({
    repeatEvery: {
      min: 0.5
    }
  })
  public clearExpired(executionDate: Date): void {

    this.deleteMany({
      expiryAt: {
        $lte: executionDate.getTime()
      }
    })
    .then(() => {

    })
    .catch(err => {
      
      this._handyError.register(err, 'high', 'Server error', undefined, { private: { msg: 'Expired drops removing failed' } });
      
    })

  }

}