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
exports.DefaultHandyTrackingService = void 0;
const decorators_1 = require("@handy/core/decorators");
const _services_1 = require("@services");
class DefaultHandyTrackingService extends _services_1.HandyService {
    constructor(_config, _externalApi, _handyErrorService) {
        super();
        this._config = _config;
        this._externalApi = _externalApi;
        this._handyErrorService = _handyErrorService;
        this._matomoId = __isDev ? 1 : null;
        this._domain = this._config.get().domain;
        this._externalApi.hostNme = 'handyapps.dev';
        this._externalApi.protocol = 'https:';
        this._getTrackingIdFromHub();
    }
    _matomoCheck(moment) {
        this._getTrackingIdFromHub();
    }
    _getTrackingIdFromHub() {
        if (__isDev) {
            return;
        }
        this._externalApi.postJSON('/api/v1/service/severComunicator/getMatomoTrackingId', { domain: this._domain }).then(result => {
            if (typeof result.body.data === 'number') {
                this._matomoId = result.body.data;
            }
        })
            .catch(err => {
            this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: 'Error getting domain matomo data' });
        });
    }
    getAnalyticsId(request, response, user, query) {
        response.jsonResponse({ id: this._matomoId });
    }
}
__decorate([
    decorators_1.CronInterval({
        repeatEvery: {
            hr: 6
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", void 0)
], DefaultHandyTrackingService.prototype, "_matomoCheck", null);
__decorate([
    decorators_1.GetApiRequest({
        publicRoute: false,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultHandyTrackingService.prototype, "getAnalyticsId", null);
exports.DefaultHandyTrackingService = DefaultHandyTrackingService;
//# sourceMappingURL=default-handy-tracking.service.js.map