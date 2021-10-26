import { ModelSettings, HandyModelDeclaration, MongooseModelService, MongooseValidatorProps, MongooseModelFieldValidator } from "@handy/types";
export declare abstract class DefaultMongooseFieldValidator {
    protected publicFieldName: string;
    protected modelSettings: ModelSettings<any>;
    protected fieldDeclaration: HandyModelDeclaration<any>;
    protected modelInstance: MongooseModelService;
    protected fieldPath: string;
    constructor();
    abstract validator(value: any, ...args: any[]): boolean | Promise<boolean>;
    abstract message(props?: MongooseValidatorProps): string;
    setAdditionalVals(additionalModelSettings: ModelSettings<any>, fieldName: string, modelInstance: MongooseModelService): void;
    extractValidator(): MongooseModelFieldValidator;
}
