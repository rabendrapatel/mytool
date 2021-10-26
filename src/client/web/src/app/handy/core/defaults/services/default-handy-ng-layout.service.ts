import { DOCUMENT } from '@angular/common';
import { HandyNgUserService, HandyNgConfigService, HandyNgTrackingService } from '@handy-ng/services';
import { Renderer2, Inject, RendererFactory2 } from '@angular/core';
import { UserModelInterfaces } from '@server/models/user/model.interface';
import { Platform } from '@angular/cdk/platform';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Router, NavigationEnd, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

export class DefaultHandyNgLayoutService {

  protected _renderer: Renderer2;
  public layoutChange: Subject<ChangeEvents> = new Subject();

  protected _cookiesNames: (keyof UserModelInterfaces['fullModelShape']['preferences'])[] = [
    'webDarkTheme', 'webSidenavMode', 'webSidenavOpenState', 'webSidenavPinned', 'mobileWebSidenavPinned',
    'webNotificationDurationInSeconds', 'webNotificationPosition'
  ];

  protected _isDarkTheme: boolean;
  protected _darkThemeClassName: string = 'dark-theme';
  protected _lightThemeClassName: string = 'light-theme';
  protected _darkThemeCookieName: string = 'dark_theme';

  protected _title: string;
  protected _defaultTitle: string = this._handyNgConfigService.data.projectName;

  protected _bodyElm: any = (this._handyNgConfigService.isPlatform('browser')) ? document.body : this._document.body;

  protected _sidenavOpenState: boolean = true;
  protected _sidenavOpenStateCookieName: string = 'sidenav_open_state';

  protected _sidenavMode: UserModelInterfaces['fullModelShape']['preferences']['webSidenavMode'] = 'side';
  protected _sidenavPosition: UserModelInterfaces['fullModelShape']['preferences']['webSidenavPosition'] = 'side';
  protected _sidenavPinned: UserModelInterfaces['fullModelShape']['preferences']['webSidenavPinned'] = true;

  public sidenavTopGap: number = 0;
  public navBarHeight: number = 0;

  protected _notificationPosition: UserModelInterfaces['fullModelShape']['preferences']['webNotificationPosition'] = {
    horizontal: 'right',
    vertical: 'top'
  };

  protected _notificationDuration: UserModelInterfaces['fullModelShape']['preferences']['webNotificationDurationInSeconds'] = 5;

  public isHandset: boolean = false;
  public isHandsetLandscape: boolean = false;
  public isHandsetPortrait: boolean = false;
  public isTablet: boolean = false;
  public isTabletPortrait: boolean = false;
  public isTabletLandscape: boolean = false;
  public isWeb: boolean = false;
  public isWebPortrait: boolean = false;
  public isWebLandscape: boolean = false;
  public isXSmall: boolean = false;
  public isSmall: boolean = false;
  public isMedium: boolean = false;
  public isLarge: boolean = false;
  public isXLarge: boolean = false;

  public isAndroid: boolean = false;
  public isiOS: boolean = false;
  public isDesktop: boolean = false;
  public isMobile: boolean = false;

  public breakPointChange: Subject<void> = new Subject();

  constructor (
    protected _titleService: Title,
    protected _metaService: Meta,
    protected _handyNgConfigService: HandyNgConfigService,
    protected _handyNgUserService: HandyNgUserService,
    @Inject(DOCUMENT) protected _document,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) protected _defaultSnackBarOptions: MatSnackBarConfig,
    protected _rendererFactory: RendererFactory2,
    protected _devicePlatform: Platform,
    protected _breakpointObserver: BreakpointObserver,
    protected _trackingService: HandyNgTrackingService,
    protected _router: Router) {

    this._renderer = this._rendererFactory.createRenderer(null, null);

    if (this._handyNgConfigService.isPlatform('browser')) {
      this._handleBreakPoinChanges();
      this._handleDevicePlatform();
    }

    this._setPredefines();
    this._handleRouteTitle();

    this._trackingService.__asignLayoutService(this as any);
    this._handyNgUserService.userChange().subscribe(() => {

      this._setPredefines();

    })

  }

  protected _setPredefines(): void {

    this._setPreferedTheme();
    this._setPreferedSidenavMode();
    this._setPreferedSidenavOpenState();
    this._setPreferedSidenavPosition();
    this._setPreferedNavPin();
    this._setPreferedNotificationPosition();
    this._setPreferedNotificationDuration();

  }

  protected _savePreference<PreferenceName extends keyof UserModelInterfaces['fullModelShape']['preferences']>(
    name: PreferenceName, value: UserModelInterfaces['fullModelShape']['preferences'][PreferenceName], updateUser: boolean = true): void {

    if (updateUser) {

      this._handyNgUserService.setUserPreference(name, value);
      this._handyNgConfigService.setCookie(`_user_preference${name}`, value, { d: 365 });

    }

  }

  protected _getPreferenceCookie<PreferenceName extends keyof UserModelInterfaces['fullModelShape']['preferences']>(
    name: PreferenceName, valueIfEmpty: UserModelInterfaces['fullModelShape']['preferences'][PreferenceName]): UserModelInterfaces['fullModelShape']['preferences'][PreferenceName] {

    return this._handyNgConfigService.getCookie(`_user_preference${name}`, valueIfEmpty) as UserModelInterfaces['fullModelShape']['preferences'][PreferenceName];

  }

  protected _getPreferenceSetting<PreferenceName extends keyof UserModelInterfaces['fullModelShape']['preferences']>(name: PreferenceName): UserModelInterfaces['fullModelShape']['preferences'][PreferenceName] {

    return this._handyNgUserService.getUserPreference(name, this._getPreferenceCookie(name, this._handyNgConfigService.data.defaultUserPreferences[name] as UserModelInterfaces['fullModelShape']['preferences'][PreferenceName]));

  }

  protected _isDifferentPrefereceValue<PreferenceName extends keyof UserModelInterfaces['fullModelShape']['preferences']>(name: PreferenceName, value: UserModelInterfaces['fullModelShape']['preferences'][PreferenceName]): boolean {

    let actualSaved = this._getPreferenceSetting(name);

    if (typeof actualSaved !== typeof value) {
      return true;
    }

    if (typeof value === 'object') {

      let savedStr: string = JSON.stringify(actualSaved);
      let valueStr: string = JSON.stringify(value);

      return valueStr !== savedStr;

    }

    return value !== actualSaved;

  }

  /* ---------------------------- Dark/light theme ---------------------------- */

  public switchTheme(updateUserPreference: boolean = true, setToDark?: boolean): void {

    if (setToDark === undefined) {
      this._isDarkTheme = !this._isDarkTheme;
    } else {
      this._isDarkTheme = setToDark;
    }

    if (this._isDarkTheme) {
      this._renderer.addClass(this._bodyElm, this._darkThemeClassName);
      this._renderer.removeClass(this._bodyElm, this._lightThemeClassName);
    } else {
      this._renderer.removeClass(this._bodyElm, this._darkThemeClassName);
      this._renderer.addClass(this._bodyElm, this._lightThemeClassName);
    }

    this._savePreference('webDarkTheme', this._isDarkTheme, updateUserPreference);

    this.layoutChange.next('theme');

  }

  public get darkTheme(): boolean {
    return this._isDarkTheme;
  }

  protected _setPreferedTheme(): void {

    this.switchTheme(false, this._getPreferenceSetting('webDarkTheme'));

  }

  /* ---------------------------- Full screen form ---------------------------- */

  protected _isFullScreenForm: boolean = false;

  public get isFullScreenForm(): boolean {
    return this._isFullScreenForm;
  }

  public set isFullScreenForm(isFullscreen: boolean) {
    console.error(`Use toogleFullScreenForm() method to set ${isFullscreen} as a isFullScreenForm`);
  }

  public toogleFullScreenForm(): void {

    this._isFullScreenForm = !this._isFullScreenForm;

  }

  /* ---------------------------------- Title --------------------------------- */

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    console.error(`Use _setTitle(title:string) method to set ${title} as a title`);
  }

  public _setTitle(title: string): void {

    this._title = title;
    this._titleService.setTitle(title);

  }

  protected _handleRouteTitle(): void {

    this._router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        this._parseTitleFormState();
      }

    })

  }

  protected _parseTitleFormState(): void {

    let state: RouterStateSnapshot = this._router.routerState.snapshot;

    let finalTitle: string = this._defaultTitle;
    let snapShot: ActivatedRouteSnapshot = state.root;

    let { pageTitle } = snapShot.data;

    if (pageTitle) {

      let { title, appendToProjName = false, preppendToProjName = false, projNameSeparator = '-' } = <RouteTitleData>pageTitle;
      finalTitle = (!appendToProjName && !preppendToProjName) ? title : (appendToProjName) ? `${this._defaultTitle} ${projNameSeparator} ${title}` : `${title} ${projNameSeparator} ${this._defaultTitle}`;
    }

    while (snapShot.children.length > 0) {
      
      snapShot = snapShot.children[0];
      let { pageTitle } = snapShot.data;

      if (pageTitle) {

        let { title, appendToProjName = false, preppendToProjName = false, projNameSeparator = '-' } = <RouteTitleData>pageTitle;
        finalTitle = (!appendToProjName && !preppendToProjName) ? title : (appendToProjName) ? `${this._defaultTitle} ${projNameSeparator} ${title}` : `${title} ${projNameSeparator} ${this._defaultTitle}`;

      }

    }

    this._setTitle(finalTitle);

  }

  public setMetaTag(tag: MetaDefinition | MetaDefinition[]): void {

    let toAdd: MetaDefinition[] = (Array.isArray(tag)) ? tag : [tag];
    this._metaService.addTags(toAdd);

  }

  public getMetaTag(attrSelector: string): HTMLMetaElement[] {
    return this._metaService.getTags(attrSelector);
  }

  public removeMetaTag(attrSelector: string): void {
    return this._metaService.removeTag(attrSelector);
  }

  public updateTag(tag: MetaDefinition, attrSelector: string): void {
    this._metaService.updateTag(tag, attrSelector);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Navigation                                 */
  /* -------------------------------------------------------------------------- */

  /* --------------------------- Sidenav open state --------------------------- */

  public get sidenavOpenState(): boolean {
    return this._sidenavOpenState;
  }

  public set sidenavOpenState(status: boolean) {
    console.error(`Use toggleSidenav() method to change sidenav open state`);
  }

  public get sidenavPined(): boolean {
    return this._sidenavPinned;
  }

  public set sidenavPined(status: boolean) {
    console.error(`Use toggleSidenavPinnedState() method to change sidenav pinned state`);
  }

  public toggleSidenavPinnedState(updateUserPreference: boolean = false, setToPinned?: boolean): void {

    if (setToPinned === undefined) {
      this._sidenavPinned = !this._sidenavPinned;
    } else {
      this._sidenavPinned = setToPinned;
    }

    if (updateUserPreference) {
      this._savePreference((this._isSmallScreen()) ? 'mobileWebSidenavPinned' : 'webSidenavPinned', this._sidenavPinned, updateUserPreference);
    }

    if (!this.layoutChange) {
      this.layoutChange = new Subject();
    }
    this.layoutChange.next('pinnedState');

  }

  protected _setPreferedNavPin(): void {

    this.toggleSidenavPinnedState(false, this._getPreferenceSetting((this._isSmallScreen()) ? 'mobileWebSidenavPinned' : 'webSidenavPinned'));

  }

  public toggleSidenav(updateUserPreference: boolean = false, setToOpen?: boolean): void {

    if (setToOpen === undefined) {
      this._sidenavOpenState = !this._sidenavOpenState;
    } else {
      this._sidenavOpenState = setToOpen;
    }

    if (updateUserPreference && !this._isSmallScreen()) {
      this._savePreference('webSidenavOpenState', this._sidenavOpenState, updateUserPreference);
    }

    this.layoutChange.next('sidenavOpen');

  }

  public handleSidenavOpenChange(event: MatSidenav): void {

    this._sidenavOpenState = event.opened;

  }

  protected _setPreferedSidenavOpenState(): void {

    this.toggleSidenav(false, (this._isSmallScreen()) ? false : this._getPreferenceSetting('webSidenavOpenState'));

  }

  /* ------------------------------ Sidenav mode ------------------------------ */

  public get sidenavMode(): UserModelInterfaces['fullModelShape']['preferences']['webSidenavMode'] {
    return this._sidenavMode;
  }

  public set sidenavMode(mode: UserModelInterfaces['fullModelShape']['preferences']['webSidenavMode']) {
    console.error(`Use setSidenavMode() method to change sidenav mode`);
  }

  public setSidenavMode(mode: UserModelInterfaces['fullModelShape']['preferences']['webSidenavMode'], updateUserPreference: boolean = false): void {

    this._sidenavMode = (this._isSmallScreen()) ? 'over' : mode;
    this._savePreference('webSidenavMode', this._sidenavMode, updateUserPreference);

  }

  protected _setPreferedSidenavMode(): void {

    this.setSidenavMode(this._getPreferenceSetting('webSidenavMode'), false);

  }

  /* ---------------------------- Sidenav position ---------------------------- */

  public get sidenavPosition(): UserModelInterfaces['fullModelShape']['preferences']['webSidenavPosition'] {
    return this._sidenavPosition;
  }

  public set sidenavPosition(mode: UserModelInterfaces['fullModelShape']['preferences']['webSidenavPosition']) {
    console.error(`Use setSidenavPosition() method to change sidenav position`);
  }

  public switchSidenavPosition(position?: UserModelInterfaces['fullModelShape']['preferences']['webSidenavPosition'], updateUserPreference: boolean = true): void {

    if (position === undefined) {
      this._sidenavPosition = (this._sidenavPosition === 'side') ? 'over' : 'side';
    } else {
      this._sidenavPosition = position;
    }

    this._handleSidenvTopGap();
    this._savePreference('webSidenavPosition', this._sidenavPosition, updateUserPreference);

  }

  protected _handleSidenvTopGap(): void {

    this.navBarHeight = (this.isXSmall) ? 55 : 55;
    this.sidenavTopGap = (this._sidenavPosition === 'over') ? 0 : this.navBarHeight;

  }

  protected _setPreferedSidenavPosition(): void {

    this.switchSidenavPosition(this._getPreferenceSetting('webSidenavPosition'), false);

  }

  /* ------------------------- Notifications position ------------------------- */
  public get notificationPosition(): UserModelInterfaces['fullModelShape']['preferences']['webNotificationPosition'] {
    return this._notificationPosition;
  }

  public set notificationPosition(position: UserModelInterfaces['fullModelShape']['preferences']['webNotificationPosition']) {
    console.error(`Use set setNotificationPosition() method to change default notification position`);
  }

  public setNotificationPosition(position: UserModelInterfaces['fullModelShape']['preferences']['webNotificationPosition'], updateUserPreference: boolean = false): void {

    let { horizontal, vertical } = position;

    this._defaultSnackBarOptions.horizontalPosition = horizontal;
    this._defaultSnackBarOptions.verticalPosition = vertical;

    this._notificationPosition = position;
    this._savePreference('webNotificationPosition', this._notificationPosition, updateUserPreference);

  }

  protected _setPreferedNotificationPosition(): void {

    this.setNotificationPosition(this._getPreferenceSetting('webNotificationPosition'), false);

  }

  /* ------------------------- Notifications duration ------------------------- */
  public get notificationDuration(): UserModelInterfaces['fullModelShape']['preferences']['webNotificationDurationInSeconds'] {
    return this._notificationDuration;
  }

  public set notificationDuration(duration: UserModelInterfaces['fullModelShape']['preferences']['webNotificationDurationInSeconds']) {
    console.error(`Use set setNotificationDuration() method to change default notification duration`);
  }

  public setNotificationDuration(duration: UserModelInterfaces['fullModelShape']['preferences']['webNotificationDurationInSeconds'], updateUserPreference: boolean = false): void {

    this._defaultSnackBarOptions.duration = duration * 1000;

    this._notificationDuration = duration;
    this._savePreference('webNotificationDurationInSeconds', this._notificationDuration, updateUserPreference);

  }

  protected _setPreferedNotificationDuration(): void {

    this.setNotificationDuration(this._getPreferenceSetting('webNotificationDurationInSeconds'), false);

  }

  /* --------------------------- Breakpoint changes --------------------------- */
  protected _handleBreakPoinChanges(): void {

    let breakPointList: string[] = [
      'XSmall', 'Small', 'Medium', 'Large', 'XLarge',
    ];

    let breakPoinstQueries: string[] = [];

    let breakPointsLen: number = breakPointList.length;
    for (let i = 0; i < breakPointsLen; i++) {
      const singleBreakPoint = breakPointList[i];
      breakPoinstQueries.push(Breakpoints[singleBreakPoint]);
    }

    this._breakpointObserver.observe(breakPoinstQueries).subscribe(change => {

      for (let i = 0; i < breakPointsLen; i++) {
        const singleBreakPoint = breakPointList[i];
        this._handleBreakpointBodyClassAndPropsChanges(singleBreakPoint);
      }

      if (this._isSmallScreen()) {
        this._sidenavMode = 'over';
        this._sidenavOpenState = false;
      } else {
        this._sidenavMode = 'side';
      }

      this._handleSidenvTopGap();

      this.breakPointChange.next();

    })

  }

  protected _handleBreakpointBodyClassAndPropsChanges(breakPointName: string): void {

    this[`is${breakPointName}`] = this._breakpointObserver.isMatched(Breakpoints[breakPointName].replace('.99', ''));

    if (this[`is${breakPointName}`]) {
      this._renderer.addClass(document.body, breakPointName.toLowerCase() + '-layout');
    } else {
      this._renderer.removeClass(document.body, breakPointName.toLowerCase() + '-layout');
    }

  }

  /* --------------- Device platform, ios, android, safari etc.. -------------- */

  protected _handleDevicePlatform(): void {

    let platformsList: string[] = [
      'Android', 'iOS',
    ];

    let isDesktop: boolean = true;

    let platformsLen: number = platformsList.length;
    for (let i = 0; i < platformsLen; i++) {
      const singlePlatform = platformsList[i];
      this[`is${singlePlatform}`] = this._devicePlatform[singlePlatform.toUpperCase()];

      if (this[`is${singlePlatform}`]) {
        isDesktop = false;
        this._renderer.addClass(document.body, singlePlatform.toLowerCase() + '-layout');
      } else {
        this._renderer.removeClass(document.body, singlePlatform.toLowerCase() + '-layout');
      }

    }

    if (isDesktop) {

      this.isDesktop = true;
      this.isMobile = false;

      this._renderer.removeClass(document.body, 'mobile-layout');
      this._renderer.addClass(document.body, 'desktop-layout');

    } else {

      this.isDesktop = false;
      this.isMobile = true;

      this._renderer.removeClass(document.body, 'desktop-layout');
      this._renderer.addClass(document.body, 'mobile-layout');

    }

  }

  protected _isSmallScreen(): boolean {
    return this.isXSmall || this.isSmall || this.isMedium;
  }

}

/**
 * Usage:
 * 
 * data: {
 *   pageTitle: setRouteTitle({ title: 'any title you want' })
 * }
 * 
 * @param titleSetting 
 */
export const setRouteTitle = (titleSetting: RouteTitleData): RouteTitleData => {

  return titleSetting;

}

export interface RouteTitleData {
  title: string, 
  appendToProjName?: boolean, 
  preppendToProjName?: boolean, 
  projNameSeparator?: string
}

type ChangeEvents = 'theme' | 'sidenavOpen' | 'pinnedState'