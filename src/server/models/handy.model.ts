import { DefaultHandyModelClass } from '@handy/core/defaults/models/default-handy.model';
import { MongooseModelInterfaces } from "@handy/types";

export class HandyModelClass<T extends MongooseModelInterfaces> extends DefaultHandyModelClass<T> {}