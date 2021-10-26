import { first } from 'rxjs/operators';
import { HandyNgConfigService, HandyNgApiService, HandyNgUserService } from '@handy-ng/services';
import { HandyServiceLoadedHandler } from '@handy-ng/extenders';

export class DefaultHandyNgCoreService extends HandyServiceLoadedHandler {

  protected _configLoadedState: boolean = false;
  protected _apiLoadedState: boolean = false;
  protected _userLoadedState: boolean = false;

  constructor (
    protected _handyNgConfigService: HandyNgConfigService,
    protected _handyNgApiService: HandyNgApiService,
    protected _handyNgUserService: HandyNgUserService,
  ) {

    super();
    this._handleDependenciesLodedStateSubscriptions();

  }

  protected _handleDependenciesLodedStateSubscriptions(): void {

    this._handyNgConfigService.onStateLoaded(() => {
      this._configLoadedState = true;
      this._checkFinalState();
    })
    
    this._handyNgApiService.onStateLoaded(() => {
      this._apiLoadedState = true;
      this._checkFinalState();
    })
    
    this._handyNgUserService.onStateLoaded(() => {
      this._userLoadedState = true;
      this._checkFinalState();
    })
    
}

  protected _checkFinalState(): void {

    if (this._userLoadedState && this._configLoadedState && this._apiLoadedState) {
      this._markStateAsLoaded()
    }

  }

}

