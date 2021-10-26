import { DefaultHandyNgModelMethods } from './../core/defaults/extenders/handy-ng-model-methods';
import { MongooseModelInterfaces } from '@server-types';

export class HandyNgModelMethods<T extends MongooseModelInterfaces> extends DefaultHandyNgModelMethods<T> {}