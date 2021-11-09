import { MongooseModelInterfaces, SearchableMongooseModelFields, CompleteMongooseModelShapeInterface, MongooseModelCreateShape, CompleteMongoModelFields } from "@handy/types";
export interface StudentModelInterfaces extends MongooseModelInterfaces {
    shape: {
        studentName: string;
        studentAddress: string;
        studentCourse: string;
        studentMobile: number;
        studentEmail?: string;
    };
    softDelete: false;
    createdAt: true;
    createdBy: false;
    autoIncrement: true;
    changesHistory: false;
    defaultSelect: {
        selectType: 'deselect';
        fields: ['_id'];
    };
    fullModelShape: CompleteMongooseModelShapeInterface<this['shape'], this['softDelete'], this['createdAt'], this['createdBy'], this['autoIncrement'], this['changesHistory']>;
    docShape: this['fullModelShape'];
    createShape: MongooseModelCreateShape<this['fullModelShape']>;
    allFields: CompleteMongoModelFields<keyof this['fullModelShape'], this['softDelete'], this['createdAt'], this['createdBy'], this['changesHistory']>;
    idType: this['fullModelShape']['_id'];
    searchableFields: SearchableMongooseModelFields<this>;
}
