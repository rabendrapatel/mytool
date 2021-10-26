"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropModel = void 0;
const _models_1 = require("@models");
const core_1 = require("@handy/core");
const model_declaration_1 = require("./model.declaration");
let DropModel = class DropModel extends _models_1.HandyModelClass {
    constructor() {
        super();
        this.clearExpired(new Date());
    }
    clearExpired(executionDate) {
        this.deleteMany({
            expiryAt: {
                $lte: executionDate.getTime()
            }
        })
            .then(() => {
        })
            .catch(err => {
            this._handyError.register(err, 'high', 'Server error', undefined, { private: { msg: 'Expired drops removing failed' } });
        });
    }
};
__decorate([
    core_1.CronInterval({
        repeatEvery: {
            min: 0.5
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", void 0)
], DropModel.prototype, "clearExpired", null);
DropModel = __decorate([
    core_1.MongooseModel({
        name: 'Drop',
        modelDeclaration: model_declaration_1.DropModelDeclaration,
        softDelete: false,
        createdAt: true,
        createdBy: false,
        autoIncrement: true,
        changesHistory: false,
        routable: false,
        publicRoutable: false,
    }),
    __metadata("design:paramtypes", [])
], DropModel);
exports.DropModel = DropModel;
//# sourceMappingURL=drop.model.js.map