import { Inject, PLATFORM_ID, Injector } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PublicConfigData, HandyApiCallResult, HandyTimeObject } from '@handy-ng/types';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { HandyServiceLoadedHandler } from '@handy-ng/extenders';
import { HandyNgUtilsService } from '@handy-ng/services/handy-ng-utils.service';
import { Subject } from 'rxjs';
import { io as IO } from "socket.io-client";

export class DefaultHandyNgConfigService extends HandyServiceLoadedHandler {

  protected _isBrowser: boolean;
  protected _isServer: boolean;

  protected _serverConfigData: PublicConfigData;

  protected _XSRF_TOKEN: string;
  protected _HANDY_USER_ACCESS_TOKEN: string;
  protected _HANDY_CLIENT_SESSION_ID: string;
  protected _HANDY_CLIENT_DEVICE_ID: string;

  protected _HANDY_USER_DATA: string;

  protected _SERVER_REQUEST: any;
  protected _SERVER_RESPONSE: any;

  private __SERVER_SECRET: string;

  protected _transferStateKeyName: string = '_handyNgConfigServiceTransferState';

  protected _failedConfigDataGettingCounter: number = 0;
  protected _projDomain: string;

  public configChangeEvent: Subject<void> = new Subject();

  constructor (
    protected _handyNgUtilsService: HandyNgUtilsService,
    protected _transferState: TransferState,
    protected _injector: Injector,
    @Inject(PLATFORM_ID) _platformId: string,
    protected _httpClient: HttpClient
  ) {

    super();

    this._isBrowser = isPlatformBrowser(_platformId);

    if (this._isBrowser) {

      this._handyNgUtilsService.startSleepDetector();
      this._handyNgUtilsService.workersCores = window.navigator.hardwareConcurrency ? window.navigator.hardwareConcurrency : 4;
      
    }

    this._isServer = !this._isBrowser;
    this._HANDY_CLIENT_SESSION_ID = this._handyNgUtilsService.generateHash({ emptySpace: false, specialChars: false, lowerCaseletters: true, capitalsLetters: true, digits: true }, true);

    if (this._isBrowser) {

      this._getConfigTransferState();
      this._configDataLoaded();

    } else {

      this._serverConfigData = this.getSsrInjectroData('HANDY_CONFIG');

      this._HANDY_USER_DATA = this.getSsrInjectroData('HANDY_USER_DATA');
      this._HANDY_USER_ACCESS_TOKEN = this.getSsrInjectroData('HANDY_USER_ACCESS_TOKEN');

      this._SERVER_REQUEST = this.getSsrInjectroData('SERVER_REQUEST');
      this._SERVER_RESPONSE = this.getSsrInjectroData('SERVER_RESPONSE');

      this._XSRF_TOKEN = this.getSsrInjectroData('XSRF_TOKEN');
      this.__SERVER_SECRET = this.getSsrInjectroData('SERVER_SECRET');

      this._saveConfigTransferState();
      this._configDataLoaded();

    }

  }

  protected _generateParsedConfigData(): void {

    if (!this._XSRF_TOKEN) {

      this._XSRF_TOKEN = this.getCookie('XSRF-TOKEN', null);

      if (this._isBrowser) {

        this._XSRF_TOKEN = this.getCookie('XSRF-TOKEN', null);

        // ? to be able to keep a signed cookie (more secure)
        if (this._XSRF_TOKEN) {
          this._XSRF_TOKEN = this._XSRF_TOKEN.substr(2, 10);
        }

      }

    }

    if (!this._HANDY_CLIENT_DEVICE_ID) {

      this._HANDY_CLIENT_DEVICE_ID = this.getCookie(this.data.deviceIdCookieHash, null);

      if (this._isBrowser) {

        // ? to be able to keep a signed cookie (more secure)
        if (this._HANDY_CLIENT_DEVICE_ID) {
          this._HANDY_CLIENT_DEVICE_ID = this._HANDY_CLIENT_DEVICE_ID.substr(2, 13);
        }

      }

    }

    // ? to make sure that ng universal is passing xsrf token
    if (this._isServer && this.__SERVER_SECRET && this._XSRF_TOKEN) {

      this._XSRF_TOKEN = `${this._XSRF_TOKEN}_${this.__SERVER_SECRET}`;

    }

    this._parseProjectDomain();
    this._markStateAsLoaded();

  }

  public isPlatform(platform: 'browser' | 'server'): boolean {

    return (platform === 'browser') ? this._isBrowser : this._isServer;

  }

  public isEnv(env: 'dev' | 'stag' | 'prod'): boolean {

    return this.data.env === env;

  }

  get data(): PublicConfigData {
    return this._serverConfigData;
  }

  set data(data: PublicConfigData) {
    console.error(`Config data can't be changed from outside of Config service`);
  }

  protected _loadingState: boolean = false;
  get loading(): boolean {
    return this._loadingState;
  }

  set loading(data: boolean) {
    console.error(`Config loader can't be changed from outside of Config service, use addLoader()/removeLoader() method`);
  }

  protected _loadersCount: number = 0;
  public startLoader(): void {

    if (this._isServer) {
      return;
    }

    this._loadersCount++;
    this._loadingState = true;

  }

  public stopLoader(): void {

    if (this._isServer) {
      return;
    }

    this._loadersCount--;

    if (this._loadersCount < 0) {
      this._loadersCount = 0;
    }

    if (this._loadersCount === 0) {
      this._loadingState = false;
    }

  }

  protected _getConfigDataFromAPi(): void {

    let { protocol, hostname } = window.location;

    this._httpClient.get(`${protocol}//${hostname}/api/v1/service/handyConfig/public-config-data`).subscribe((result: HandyApiCallResult) => {

      if (result.success) {
        this._serverConfigData = result.data;

        if (!this._XSRF_TOKEN && result.data.XSRF_TOKEN) {
          this._XSRF_TOKEN = result.data.XSRF_TOKEN;
        }

        if (!this._HANDY_CLIENT_DEVICE_ID && result.data.HANDY_CLIENT_DEVICE_ID) {
          this._HANDY_CLIENT_DEVICE_ID = result.data.HANDY_CLIENT_DEVICE_ID;
        }

        this._configDataLoaded();
        return;
      }

      this._retryToGetDataFromApi();

    }, err => {
      this._retryToGetDataFromApi();
    })

  }

  protected _retryToGetDataFromApi(): void {

    if (this._failedConfigDataGettingCounter < 6) {

      setTimeout(() => {
        this._getConfigDataFromAPi();
        this._failedConfigDataGettingCounter++;
      }, 750);

      return;
    }

  }

  protected _configDataLoaded(): void {

    if (!this._validateConfigData()) {

      this._retryToGetDataFromApi();
      return;
    }

    this._generateParsedConfigData();
    this._listenToRefreshingOnNpmRunDev();

  }

  protected _validateConfigData(): boolean {

    try {

      return typeof this._serverConfigData.projectName === 'string';

    } catch (error) {
      return false;
    }

  }

  protected _saveConfigTransferState(): void {

    this._serverConfigData = this.getSsrInjectroData('HANDY_CONFIG');
    this._XSRF_TOKEN = this.getSsrInjectroData('XSRF_TOKEN');
    this._HANDY_USER_ACCESS_TOKEN = this.getSsrInjectroData('HANDY_USER_ACCESS_TOKEN');
    this._HANDY_USER_DATA = this.getSsrInjectroData('HANDY_USER_DATA');

    this._transferState.set(makeStateKey(this._transferStateKeyName), {
      _serverConfigData: this._serverConfigData,
      _XSRF_TOKEN: this._XSRF_TOKEN,
      _HANDY_USER_ACCESS_TOKEN: this._HANDY_USER_ACCESS_TOKEN,
      _HANDY_USER_DATA: this._HANDY_USER_DATA,
      _HANDY_CLIENT_SESSION_ID: this._HANDY_CLIENT_SESSION_ID,
    } as any);

  }

  protected _hasConfigTransferState(): boolean {

    return this._transferState.hasKey(makeStateKey(this._transferStateKeyName));

  }

  protected _getConfigTransferState(): void {

    if (this._hasConfigTransferState()) {

      let state = this._transferState.get(makeStateKey(this._transferStateKeyName), null) as any;
      if (state !== null) {

        this._serverConfigData = state._serverConfigData;
        this._XSRF_TOKEN = state._XSRF_TOKEN;
        this._HANDY_USER_ACCESS_TOKEN = state._HANDY_USER_ACCESS_TOKEN;
        this._HANDY_USER_DATA = state._HANDY_USER_DATA;
        this._HANDY_CLIENT_SESSION_ID = state._HANDY_CLIENT_SESSION_ID;

      }

      this._transferState.remove(makeStateKey(this._transferStateKeyName));

    }

  }

  protected _parseProjectDomain(): void {

    let protocol: 'https' | 'http' = this.data.ssl ? 'https' : 'http';
    let domain: string = this.data.domain;

    if (!domain.endsWith('/')) {
      domain += '/';
    }

    if (this._isBrowser && this.isEnv('dev')) {

      domain = window.location.hostname + '/';

    }

    this._projDomain = `${protocol}://${domain}`;

  }

  public saveInTransferState(key: string, value: any): void {

    if (this._isBrowser) {
      return;
    }

    this._transferState.set(makeStateKey(key), value);

  }

  public hasTransferStateKey(key: string): boolean {

    if (this._isServer) {
      return false;
    }

    return this._transferState.hasKey(makeStateKey(key));

  }

  public getFromTransferState(key: string, valueIfEmpty: any): any {

    if (this._isServer || !this.hasTransferStateKey(key)) {
      return valueIfEmpty;
    }

    return this._transferState.get(makeStateKey(key), valueIfEmpty);

  }

  public removeFromTransferState(key: string): void {

    if (this._isBrowser || this.hasTransferStateKey(key)) {
      return this._transferState.remove(makeStateKey(key));
    }


  }

  public getSsrInjectroData(injectionToken: string): any {

    if (this.isPlatform('server') || !injectionToken) {
      return this._injector.get(injectionToken);
    }

    return null;

  }

  public getXSRF_TOKEN(): string {
    return this._XSRF_TOKEN;
  }

  public getHANDY_USER_ACCESS_TOKEN(): string {
    return this._HANDY_USER_ACCESS_TOKEN;
  }

  public getHANDY_CLIENT_SESSION_ID(): string {
    return this._HANDY_CLIENT_SESSION_ID;
  }

  public getHANDY_CLIENT_DEVICE_ID(): string {
    return this._HANDY_CLIENT_DEVICE_ID;
  }

  public setUserAccessToken(token: string): void {

    this._HANDY_USER_ACCESS_TOKEN = token;
    this.configChangeEvent.next();

  }

  public setCookie(name: string, value: any, lifespan: HandyTimeObject): void {

    if (this._isServer) {

      this._SERVER_RESPONSE.setCookie(name, value, {
        lifespan, path: '/',
        serverOnly: false,
        signed: false
      })

      return;

    }

    let finalVal: string;

    if (typeof value === 'string') {
      finalVal = value;
    } else {
      finalVal = `${this.data.objectCookiePreffix}${JSON.stringify({ value })}`;
    }

    let path = '/';

    let expires: string = new Date(Date.now() + (this._handyNgUtilsService.handyTimeObjectToSec(lifespan) * 1000)).toUTCString();
    let secure = (this.data.ssl) ? ';secure' : '';

    document.cookie = name.trim() + '=' + encodeURIComponent(finalVal) + '; expires=' + expires + '; path=' + path + secure;

  }

  public getCookie(name: string, returnValueIfEmpty: any = null): any {

    if (this._isServer) {
      return this._SERVER_REQUEST.getCookie(name === 'XSRF-TOKEN' || name === this.data.deviceIdCookieHash, name, returnValueIfEmpty);
    }

    let allCookies = document.cookie.split(';');

    for (let i = 0; i < allCookies.length; i++) {

      let cookie = allCookies[i];

      let pair = cookie.split('=');
      let parsedCookieName = pair[0].trim();

      if (name !== parsedCookieName) {
        continue;
      }

      let cookieValue = decodeURIComponent(pair[1]).trim();
      if (cookieValue.startsWith(this.data.objectCookiePreffix)) {
        cookieValue = JSON.parse(cookieValue.replace(this.data.objectCookiePreffix, '')).value;
      }

      returnValueIfEmpty = cookieValue;

      break;

    }

    return returnValueIfEmpty;

  }

  public removeCookie(name: string): void {
    this.setCookie(name, '', { sec: 0 })
  }

  public getInitUserData(): any {

    return this._HANDY_USER_DATA;

  }

  public getProjectDomain(): string {
    return this._projDomain;
  }

  /**
   * Make sure to use this one only on singletons because of memory leaks...
   *
   * @memberof DefaultHandyNgConfigService
   */
  public onConfigChange(doOnChange: () => void): void {

    this.configChangeEvent.subscribe(() => {
      doOnChange();
    })

  }

  // ? handles reloading on changes during development
  protected _listenToRefreshingOnNpmRunDev(): void {

    if (this.isEnv('dev') && this._isBrowser) {

      if (window.location.port !== '4200') {

        let refreshing: boolean = false;
        let listeningUrl: string = `${this.getProjectDomain()}:3201`.replace('/:3', ':3');

        let devChangesListener = IO(listeningUrl, { reconnectionAttempts: 2400, reconnectionDelay: 1500, transports: ['polling'] });

        devChangesListener.on('change', () => {

          if (!refreshing) {

            refreshing = true;
            setTimeout(() => {
              window.location.reload();
            }, 500);

          }

        })

      }

    }

  }

}

