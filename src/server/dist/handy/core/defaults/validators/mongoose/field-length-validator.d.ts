import { MongooseFieldValidator } from "@validators/mongoose";
import { MongooseValidatorProps } from "@handy/types";
export declare class DefaultLengthValidator extends MongooseFieldValidator {
    protected type: 'min' | 'max';
    protected length: number;
    protected errMsg?: string;
    constructor(type: 'min' | 'max', length: number, errMsg?: string);
    validator(value: any): boolean | Promise<boolean>;
    message(props: MongooseValidatorProps): string;
}
