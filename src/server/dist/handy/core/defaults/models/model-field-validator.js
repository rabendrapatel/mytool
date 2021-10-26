"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMongooseFieldValidator = void 0;
class DefaultMongooseFieldValidator {
    constructor() { }
    setAdditionalVals(additionalModelSettings, fieldName, modelInstance) {
        this.modelSettings = additionalModelSettings;
        this.fieldDeclaration = this.modelSettings.modelDeclaration[fieldName];
        this.publicFieldName = this.fieldDeclaration.publicName;
        this.modelInstance = modelInstance;
        this.fieldPath = fieldName;
    }
    extractValidator() {
        return {
            validator: this.validator.bind(this),
            message: this.message.bind(this),
            setAdditionalVals: this.setAdditionalVals,
        };
    }
}
exports.DefaultMongooseFieldValidator = DefaultMongooseFieldValidator;
//# sourceMappingURL=model-field-validator.js.map