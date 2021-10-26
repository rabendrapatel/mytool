import { Inject } from '@handy/core';
import { HandyErrorService, HandyUtilsService, HandyConfigService } from '@services';
import { OnInit, ServerRequest, ServerResponse, HandyError } from '@handy/types';
import { ShortlinkModel } from '@models';

export const ShortlinkUrlPrefix: string = 'sl';

export class DefaultShortlinkService implements OnInit {

  protected _handyErrorService: HandyErrorService = Inject(HandyErrorService);
  protected _handyUtilsService: HandyUtilsService = Inject(HandyUtilsService);
  protected _handyConfigService: HandyConfigService = Inject(HandyConfigService);

  protected _model: ShortlinkModel;

  protected _clientUrl: string = this._handyConfigService.getClientUrl().slice(0, -1);

  constructor () { }

  public onInit(): void {

    this._model = Inject(ShortlinkModel);

  }

  public generateShortlink(finalUrl: string, oneTime: boolean = false): Promise<string> {

    return new Promise((resolve, reject) => {

      let hash: string = this._handyUtilsService.generateHash({ specialChars: false, lowerCaseletters: true, capitalsLetters: false, emptySpace: false }, true)

      this._model.createOne({
        finalUrl,
        oneTime,
        shortlinkHash: hash
      })
      .then((result => {

        let finalShortlink: string = `${this._handyConfigService.getServerUrl()}/${ShortlinkUrlPrefix}/${hash}`;
        return resolve(finalShortlink);

      }))
      .catch(err => {
        this._handyErrorService.register(err, 'medium', 'Server error', undefined, { private: {note: 'Error while genrating shortlink', finalUrl, oneTime, hash }});
      })

    })

  }

  public redirectToFinalPath(req: ServerRequest, res: ServerResponse): void {

    let shortlinkHash: string = req.params['shortlinkHash'];

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

    })

  }

  protected _deactivateOneTimeLink(_id: number): void {

    this._model.deleteById(_id)
    .then(removingResult => {

      if (!removingResult.deletedRecords) {
        this._handyErrorService.register(undefined, 'medium', undefined, undefined, { private: { msg: 'Error while removing one time link', _id} });
      }

    })
    .catch(err => {
      this._handyErrorService.register(err, 'medium', undefined, undefined, { private: { msg: 'Error while removing one time link', _id } });
    })

  }

}