"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLengthValidator = void 0;
const mongoose_1 = require("@validators/mongoose");
class DefaultLengthValidator extends mongoose_1.MongooseFieldValidator {
    constructor(type, length, errMsg) {
        super();
        this.type = type;
        this.length = length;
        this.errMsg = errMsg;
    }
    validator(value) {
        if (typeof value === 'string' || typeof value === 'number') {
            if (typeof value === 'number') {
                value = value.toString();
            }
            let valueLen = value.length;
            return (this.type === 'max') ? valueLen <= this.length : valueLen >= this.length;
        }
        return true;
    }
    message(props) {
        return (this.errMsg) ? this.errMsg : `${this.publicFieldName} has to be ${(this.type === 'max') ? 'shorter' : 'longer'} than ${this.length} character`;
    }
}
exports.DefaultLengthValidator = DefaultLengthValidator;
//# sourceMappingURL=field-length-validator.js.map