import { MongooseFieldValidator } from "@validators/mongoose";
import { MongooseValidatorProps } from "@handy/types";

export class DefaultLengthValidator extends MongooseFieldValidator {

  constructor (protected type: 'min' | 'max', protected length: number, protected errMsg?: string) {
    super();
  }

  validator(value: any): boolean | Promise<boolean> {

    if (typeof value === 'string' || typeof value === 'number') {

      if (typeof value === 'number') {
        value = value.toString();
      }

      let valueLen = value.length;
      return (this.type === 'max') ? valueLen <= this.length : valueLen >= this.length;

    }

    return true;

  }

  message(props: MongooseValidatorProps): string {
    return (this.errMsg) ? this.errMsg : `${this.publicFieldName} has to be ${(this.type === 'max') ? 'shorter' : 'longer'} than ${this.length} character`;
  }

}