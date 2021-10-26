"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultShortlinkService = exports.ShortlinkUrlPrefix = void 0;
const core_1 = require("@handy/core");
const _services_1 = require("@services");
const _models_1 = require("@models");
exports.ShortlinkUrlPrefix = 'sl';
class DefaultShortlinkService {
    constructor() {
        this._handyErrorService = core_1.Inject(_services_1.HandyErrorService);
        this._handyUtilsService = core_1.Inject(_services_1.HandyUtilsService);
        this._handyConfigService = core_1.Inject(_services_1.HandyConfigService);
        this._clientUrl = this._handyConfigService.getClientUrl().slice(0, -1);
    }
    onInit() {
        this._model = core_1.Inject(_models_1.ShortlinkModel);
    }
    generateShortlink(finalUrl, oneTime = false) {
        return new Promise((resolve, reject) => {
            let hash = this._handyUtilsService.generateHash({ specialChars: false, lowerCaseletters: true, capitalsLetters: false, emptySpace: false }, true);
            this._model.createOne({
                finalUrl,
                oneTime,
                shortlinkHash: hash
            })
                .then((result => {
                let finalShortlink = `${this._handyConfigService.getServerUrl()}/${exports.ShortlinkUrlPrefix}/${hash}`;
                return resolve(finalShortlink);
            }))
                .catch(err => {
                this._handyErrorService.register(err, 'medium', 'Server error', undefined, { private: { note: 'Error while genrating shortlink', finalUrl, oneTime, hash } });
            });
        });
    }
    redirectToFinalPath(req, res) {
        let shortlinkHash = req.params['shortlinkHash'];
        this._model.findOne({ shortlinkHash }).then(result => {
            if (!result.foundRecord) {
                res.redirectToClientErrPage(this._handyErrorService.register(null, 'low', 'Resource not found', undefined, undefined, req, res));
                return;
            }
            let { oneTime, finalUrl, _id } = result.doc;
            finalUrl = finalUrl.replace(this._clientUrl, '');
            if (oneTime) {
                this._deactivateOneTimeLink(_id);
            }
            return res.redirect(finalUrl);
        })
            .catch(err => {
            res.redirectToClientErrPage(this._handyErrorService.register(err, 'medium', undefined, undefined, undefined, req, res));
        });
    }
    _deactivateOneTimeLink(_id) {
        this._model.deleteById(_id)
            .then(removingResult => {
            if (!removingResult.deletedRecords) {
                this._handyErrorService.register(undefined, 'medium', undefined, undefined, { private: { msg: 'Error while removing one time link', _id } });
            }
        })
            .catch(err => {
            this._handyErrorService.register(err, 'medium', undefined, undefined, { private: { msg: 'Error while removing one time link', _id } });
        });
    }
}
exports.DefaultShortlinkService = DefaultShortlinkService;
//# sourceMappingURL=handy-shotlink.js.map