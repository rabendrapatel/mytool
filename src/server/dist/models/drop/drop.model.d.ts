import { HandyModelClass } from '@models';
import { DropModelInterfaces } from "./model.interface";
export declare class DropModel extends HandyModelClass<DropModelInterfaces> {
    constructor();
    clearExpired(executionDate: Date): void;
}
