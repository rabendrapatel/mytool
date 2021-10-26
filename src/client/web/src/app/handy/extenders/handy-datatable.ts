import { DefultHandyNgDataTable } from '@handy-ng/core/defaults/extenders/handy-ng-datatable';
import { HandyNgUserService } from '@handy-ng/services';
import { MongooseModelInterfaces } from '@handy-ng/types';

export abstract class HandyDataTable<TableDataType = any, FilterType = any, ModelInterface extends MongooseModelInterfaces = any> extends DefultHandyNgDataTable<TableDataType, FilterType, ModelInterface> {

  constructor (protected _handyNgUserService: HandyNgUserService) {
    super(_handyNgUserService);
  }

}