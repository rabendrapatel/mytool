import { CronInterval, GetApiRequest } from "@handy/core/decorators";
import { ServerRequest, ServerRequestUser, ServerResponse, UnSignedObject } from "@handy/types";
import { HandyConfigService, HandyErrorService, HandyExternalApiService, HandyService } from "@services";

export class DefaultHandyTrackingService extends HandyService {

  protected _matomoId: number = __isDev ? 1 : null;
  protected _domain: string = this._config.get().domain;

  constructor (protected _config: HandyConfigService, protected _externalApi: HandyExternalApiService, protected _handyErrorService: HandyErrorService) {

    super();  

    this._externalApi.hostNme = 'handyapps.dev';
    this._externalApi.protocol = 'https:';

    this._getTrackingIdFromHub();

  }

  @CronInterval({
    repeatEvery: {
      hr: 6
    }
  })
  public _matomoCheck(moment: Date): void {

    this._getTrackingIdFromHub();

  }
  
  protected _getTrackingIdFromHub(): void {

    if (__isDev) {
      return;
    }

    this._externalApi.postJSON('/api/v1/service/severComunicator/getMatomoTrackingId', { domain: this._domain }).then(result => {

      if (typeof result.body.data === 'number') {
        this._matomoId = result.body.data;
      }

    })
    .catch(err => {
      this._handyErrorService.register(err, 'high', 'Server error', undefined, { private: 'Error getting domain matomo data'});
    })

  }

  @GetApiRequest({
    publicRoute: false,
  })
  public getAnalyticsId(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject): void {
    response.jsonResponse({id: this._matomoId});
  }
  
}