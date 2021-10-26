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
exports.DropService = void 0;
const core_1 = require("@handy/core");
const _models_1 = require("@models");
const _services_1 = require("@services");
let DropService = class DropService extends _services_1.HandyService {
    constructor(__handyError, __model, __utils, __shortLink, __config) {
        super();
        this.__handyError = __handyError;
        this.__model = __model;
        this.__utils = __utils;
        this.__shortLink = __shortLink;
        this.__config = __config;
    }
    create(request, response, user, query, body) {
        let { content, expiryAt } = body;
        let password = this.__utils.generateStrongPassword();
        this.__model.createOne({
            content,
            expiryAt,
            password
        }).then(dropContent => {
            let { _id } = dropContent;
            return this.__shortLink.generateShortlink(this.__config.getClientUrl() + 'drop/' + _id, false);
        })
            .then(url => {
            response.jsonResponse({ url, password });
        })
            .catch(err => {
            let parsedError = this.__handyError.register(err, 'high', 'Server error', undefined, { private: 'Drop creating failed' }, request);
            response.errorResponse(parsedError);
        });
    }
    authorize(request, response, user, query, body) {
        let { id, password } = body;
        this.__model.findById(id, { selectType: 'select', fields: ['_id', 'expiryAt', 'content', 'password'] })
            .then(dropQueryResult => {
            let { doc, foundRecord } = dropQueryResult;
            if (!foundRecord) {
                return Promise.reject(this.__handyError.register(null, 'low', 'Resource not found'));
            }
            if (doc.password !== password) {
                this.__removeDrop(id);
                return Promise.reject(this.__handyError.register(null, 'low', 'Forbidden'));
            }
            if (doc.expiryAt < Date.now()) {
                this.__removeDrop(id);
                return Promise.reject(this.__handyError.register(null, 'low', 'Gone'));
            }
            response.jsonResponse(doc.content);
            this.__removeDrop(id);
        })
            .catch(err => {
            let parsedError = this.__handyError.register(err, 'high', 'Server error', undefined, { private: 'Drop creating failed' }, request);
            response.errorResponse(parsedError);
        });
    }
    __removeDrop(id) {
        this.__model.deleteById(id).then(() => {
            // ALl good
        })
            .catch(err => {
            let parsedError = this.__handyError.register(err, 'high', 'Server error', undefined, { private: 'Drop creating failed' });
        });
    }
};
__decorate([
    core_1.PostApiRequest({
        requiredParams: {
            body: ['content', 'expiryAt']
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DropService.prototype, "create", null);
__decorate([
    core_1.PostApiRequest({
        requiredParams: {
            body: ['id', 'password']
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DropService.prototype, "authorize", null);
DropService = __decorate([
    core_1.Service({
        singleton: true,
        routable: true,
    }),
    __metadata("design:paramtypes", [_services_1.HandyErrorService,
        _models_1.DropModel,
        _services_1.HandyUtilsService,
        _services_1.HandyShortlinkService,
        _services_1.HandyConfigService])
], DropService);
exports.DropService = DropService;
//# sourceMappingURL=drop.service.js.map