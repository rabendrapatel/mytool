import { ModelSettings, HandyModelDeclaration, MongooseModelService, MongooseValidatorProps, MongooseModelFieldValidator } from "@handy/types";

export abstract class DefaultMongooseFieldValidator {

  protected publicFieldName: string;
  protected modelSettings: ModelSettings<any>;
  protected fieldDeclaration: HandyModelDeclaration<any>;
  protected modelInstance: MongooseModelService;
  protected fieldPath: string;

  constructor () { }

  public abstract validator(value: any, ...args: any[]): boolean | Promise<boolean>;
  public abstract message(props?: MongooseValidatorProps): string;

  public setAdditionalVals(additionalModelSettings: ModelSettings<any>, fieldName: string, modelInstance: MongooseModelService) {

    this.modelSettings = additionalModelSettings;
    this.fieldDeclaration = (<unknown>this.modelSettings.modelDeclaration[fieldName]) as HandyModelDeclaration<any>;
    this.publicFieldName = (<unknown>this.fieldDeclaration.publicName) as string;
    this.modelInstance = modelInstance;
    this.fieldPath = fieldName;
    
  }

  public extractValidator(): MongooseModelFieldValidator {

    return {
      validator: this.validator.bind(this),
      message: this.message.bind(this),
      setAdditionalVals: this.setAdditionalVals,
    }

  }
  
}