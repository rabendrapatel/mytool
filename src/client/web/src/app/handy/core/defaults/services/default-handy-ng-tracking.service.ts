import { DOCUMENT } from '@angular/common';
import { HandyNgConfigService, HandyNgUserService, HandyNgLayoutService, HandyNgApiService } from '@handy-ng/services';
import { Renderer2, Inject, RendererFactory2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HandyServiceLoadedHandler } from '@handy-ng/extenders';

export class DefaultHandyNgTrackingService extends HandyServiceLoadedHandler {

  protected _renderer: Renderer2;
  protected _matomo: any;

  protected _lastPage: string;
  protected _doNotTrack: boolean = this._handyNgConfigService.isPlatform('server') || !this._handyNgConfigService.data.clientAnalytics.tracking;
  protected _abTesting: boolean = this._handyNgConfigService.data.clientAnalytics.abTesting;

  protected _abTestingUserStateName: string = '_client_AB_test_version';
  protected _abTestingUserCookieName: string = 'handy_AB_t_v';
  protected _abVersion: 'A' | 'B';
  protected _sessionId: string = this._handyNgConfigService.getHANDY_CLIENT_SESSION_ID();

  public get abVersion(): 'A' | 'B' {
    return this._abVersion;
  }

  protected _layoutService: HandyNgLayoutService;
  protected _matomoId: number;

  constructor (
    @Inject(DOCUMENT) protected _document,
    protected _handyNgConfigService: HandyNgConfigService,
    protected _rendererFactory: RendererFactory2,
    protected _userService: HandyNgUserService,
    protected _apiService: HandyNgApiService,
    protected _router: Router) {

    super();

  }

  public __asignLayoutService(service: HandyNgLayoutService): void {

    this._asignAbVersion();

    if (this._doNotTrack) {

      this._markStateAsLoaded();
      return;

    }

    this._layoutService = service;

    this.onStateLoadedPromise().then(() => {
      this._afterInit();
    })
      .catch(err => {
        console.error(err)
      })

    this._renderer = this._rendererFactory.createRenderer(null, null);
    this._apiService.getRequest('service/handyTracking/getAnalyticsId').subscribe(result => {

      if (typeof result.data.id !== 'number') {
        this._markStateAsLoaded();
        return;
      }

      this._appendScript(result.data.id);

    }, err => {

      console.error(err);
      this._markStateAsLoaded();

    })


  }

  protected _asignAbVersion(): void {

    if (!this._abTesting) {
      this._abVersion = 'A';
      return;
    }

    this._abVersion = this._getUserVersion();
    this._saveAbVersion();

    let loggedIn: boolean = this._userService.loggedInStatus;
    this._userService.userChange().subscribe(() => {

      if (loggedIn !== this._userService.loggedInStatus) {

        let savedVersion: 'A' | 'B' = this._getUserVersion();

        if (savedVersion !== this._abVersion) {
          this.setMixedAbVersion();
        }

        this._abVersion = savedVersion;
        this._saveAbVersion();

      }

    })

  }

  protected setMixedAbVersion(): void {

    this._customVariable(3, 'Handy A/B VERSION', 'MIXED', 'visit');
    this.trackNonInteractionEvent('Marking MIXED AB Version');

  }

  protected _getUserVersion(): 'A' | 'B' {

    let finalVal: 'A' | 'B' = Math.round(Math.random()) < 1 ? 'A' : 'B';
    return this._userService.getStateVal(this._abTestingUserStateName, this._handyNgConfigService.getCookie(this._abTestingUserCookieName, finalVal));

  }

  protected _saveAbVersion(): void {

    this._userService.saveStateVal(this._abTestingUserStateName, this._abVersion);
    this._handyNgConfigService.setCookie(this._abTestingUserCookieName, this._abVersion, { d: 30 });

  }

  protected _afterInit(): void {

    this._router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        this._pageChange(event);

      }

    })

  }

  protected _appendScript(matomoId: number): void {

    if (this._matomo !== undefined) {

      this._markStateAsLoaded();
      return;

    }

    if (this._isValidMatomo() && !this._matomo) {

      this._matomo = window['_paq'];

    }

    // @ts-ignore
    window.HANDY_GLOBALS = {
      tracking: {
        record: this._handyNgConfigService.data.clientAnalytics.recordSession,
        sessionId: this._sessionId,
        deviceId: this._handyNgConfigService.getHANDY_CLIENT_DEVICE_ID(),
      }
    }

    let firstScript = this._renderer.createElement('script');
    firstScript.type = 'text/javascript';
    firstScript.async = true;
    firstScript.text = `

      var _paq = window._paq = window._paq || [];

      _paq.push(['setCustomVariable', 1, 'Handy SESSION ID', '${this._sessionId}', 'page']);

      _paq.push(['setCustomVariable', 1, 'Handy DEVICE ID', '${this._handyNgConfigService.getHANDY_CLIENT_DEVICE_ID()}', 'visit']);
      ${this._abTesting ? "_paq.push(['setCustomVariable', 2, 'Handy A/B VERSION', '" + this._abVersion + "', 'visit']);" : null}
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */

      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);

      (function () {
        var u = "https://analytics.handyapps.dev/";
        _paq.push(['setTrackerUrl', u + 'matomo.php']);
        _paq.push(['setSiteId', '${matomoId}']);
        var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript'; g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
      })();
    
    `;

    if (!this._matomo) {
      this._renderer.appendChild(this._document.head, firstScript);
    }

    this._checkForMatomoVar();
    
  }

  protected _checkForMatomoVar(): void {

    if (!this._isValidMatomo()) {

      setTimeout(() => {
        this._checkForMatomoVar();
      }, 100);

      return;

    }

    this._matomo = window['_paq'];
    this._markStateAsLoaded();
    return;

  }

  protected _isValidMatomo(): boolean {

    if (!window['_paq']) {
      return false;
    }

    if (typeof window['_paq'] !== 'object') {
      return false;
    }

    if (Array.isArray(window['_paq'])) {
      return false;
    }

    return true;

  }

  protected _pageChange(event: NavigationEnd): void {

    let { urlAfterRedirects } = event;

    if (this._lastPage) {
      this._matomo.push(['setReferrerUrl', this._lastPage]);
    }

    this._lastPage = urlAfterRedirects;
    this._matomo.push(['setCustomUrl', urlAfterRedirects]);

    let title: string = this._layoutService.title;
    if (title) {
      this._matomo.push(['setDocumentTitle', title]);
    }

    this._matomo.push(['deleteCustomVariables', 'page']);
    this._customVariable(1, 'Handy SESSION ID', this._sessionId, 'page');

    this._matomo.push(['trackPageView']);

  }

  protected _customVariable(index: number, name: string, value: string | number, scope: 'visit' | 'page' = 'page'): void {

    this._matomo.push(['setCustomVariable', index, name, value, scope]);

  }

  protected _trackEvent(category: string, action: string, name?: string, value?: number): void {

    if (this._doNotTrack) {
      return;
    }

    try {
      this._matomo.push(['trackEvent', category, action, name, value]);
    } catch (error) {

      this.onStateLoadedPromise().then(() => {

        try {

          this._matomo.push(['trackEvent', category, action, name, value]);

        } catch (err) {
          console.error(err);
        }

      })
        .catch(err => {
          console.error(err);
        })

    }

  }

  public trackRawEvent(action: string, name?: string, value?: number): void {
    this._trackEvent('raw', action, name, value);
  }

  public trackNonInteractionEvent(action: string, name?: string, value?: number): void {
    this._trackEvent('non-interaction', action, name, value);
  }

  public trackInteraction(action: string, name: string): void {
    this._trackEvent('interaction', action, name);
  }

  public trackClick(name: string): void {
    this.trackInteraction('click', name);
  }

  public trackConversion(action?: string, name?: string, value?: number): void {
    this._trackEvent('conversion', action, name, value);
  }

  public trackGoal(action?: string, name?: string, value?: number): void {
    this._trackEvent('goal', action, name, value);
  }

  public trackError(refCode: string): void {
    this.trackNonInteractionEvent('Handy Error', refCode);
  }

}