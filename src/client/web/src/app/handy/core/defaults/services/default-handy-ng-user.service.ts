import { SingleOrArrayCombo } from '@server-types';
import { filter, first } from 'rxjs/operators';
import { UserModelInterfaces } from '@server-models/user/model.interface';

import { HandyNgConfigService, HandyNgApiService, HandyNgSocketService, HandyNgUserNotificationService, HandyNgUtilsService } from '@handy-ng/services';
import { HandyServiceLoadedHandler } from '@handy-ng/extenders';
import { Subject, Observable } from 'rxjs';

import {
  AdditionalAccessPermission, UserRole, UserGroup,
  RequestQueryParams, HttpRequestHeaders,
  ArrayOrUnionToUnion, PublicConfigData, HandyApiCallResult,
  UnSignedObject, WebAppLoginResult, HandyNgSocket, HandyNgDataTableState,
  ClientErrCodes, EmailRequestAction
} from '@handy-ng/types';

import { UserNgModel } from '@handy-ng/models/user.ng-model';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

export class DefaultHandyNgUserService extends HandyServiceLoadedHandler {

  protected _userChangeEvent: Subject<void> = new Subject();

  protected _data: Partial<UserModelInterfaces['fullModelShape']> = {};

  protected _loggedIn: boolean = false;
  protected _roles: UserRole[] = [];
  protected _permissions: AdditionalAccessPermission[] = [];
  protected _groups: UserGroup[] = [];
  protected _groupId: number;

  protected _handyDeviceId: string;
  protected _handySessionId: string;
  protected _serverUserServiceName: string = 'handyUser';

  protected _refreshTokenTimeout: NodeJS.Timeout;
  protected _tokenRefreshStrategy: 'refresh' | 'getData' = 'refresh';

  protected _socket: HandyNgSocket;
  protected _privateSocketRoomsList: string[] = [];
  protected _lastSocketState: boolean = false;

  protected _formFieldPinnedValPreffix: string = 'formFieldPinnedVal';
  protected _datatableStateValPreffix: string = 'dataTableStateVal';
  protected _formFieldMemoryStateValPreffix: string = 'formFieldMemoryStateVal';
  protected _formMemoryStateValPreffix: string = 'formMemoryStateVal';

  private __stateEmitterSubject: Subject<void> = new Subject();

  constructor (
    protected _handyNgConfigService: HandyNgConfigService,
    protected _handyngApiService: HandyNgApiService,
    protected _userModel: UserNgModel,
    protected _handyNgSocketService: HandyNgSocketService,
    protected _handyNgUtilsService: HandyNgUtilsService,
    public notify: HandyNgUserNotificationService,
    protected _router: Router) {

    super();
    this._handyNgConfigService.onStateLoaded(() => {
      this._init();
    })

  }

  protected _init(): void {

    this._data = this._handyNgConfigService.getInitUserData();

    if (this._data) {
      this._loggedIn = true;
    }

    this._handyDeviceId = this._handyNgConfigService.getHANDY_CLIENT_DEVICE_ID();
    this._handySessionId = this._handyNgConfigService.getHANDY_CLIENT_SESSION_ID();

    if (!this._loggedIn && this._handyNgConfigService.isPlatform('browser')) {
      this._refreshAccessToken(true);
    } else {
      this._markStateAsLoaded();
    }

    this._handleDefaultUserSocket();

    this.__stateEmitterSubject.pipe(debounceTime(1000)).subscribe(() => {

      if (!this._loggedIn) {
        return;
      }
      
      this._socket.emit('stateChange', this._data.state);
    })

  }

  protected _handleDefaultUserSocket(): void {

    this._socket = this._handyNgSocketService.getSocket('web-app');
    if (this._handyDeviceId) {
      this._socket.joinRooms([`web_device_id_${this._handyDeviceId}`]);
    }

    if (this._handySessionId) {
      this._socket.joinRooms([`web_session_id_${this._handySessionId}`]);
    }

    this._socketPrivateRoomsHandler();

    this._userChangeEvent.pipe(debounceTime(1500)).subscribe(() => {

      this._socketPrivateRoomsHandler();

    })

    this._socket.on('user-change', 2000).pipe(filter(triggerSessionId => triggerSessionId !== this._handySessionId)).subscribe(() => {

      this._getMyData();

    })

    this._socket.on('stateChange', 2000).subscribe((eventData: any) => {

      if (!this._loggedIn) {
        return;
      }

      this._data.state = eventData;

    })

    this._socket.on<{ session: string, status: boolean }>('login-status-change').pipe(filter(statusData => statusData.session !== this._handySessionId && statusData.status !== this._loggedIn)).subscribe(statusData => {

      this.onNextUserChange(() => {
        let url: string = (this._loggedIn) ? '/dashboard' : '/';
        this._router.navigate([url]);
      })

      if (statusData.status) {

        this._triggerAutoLoginAfterConnectionRenewed();
        return;

      }

      this.logout(false);

    })

    this._socket.on('access-token-change', 2000).pipe(filter(triggerSessionId => triggerSessionId !== this._handySessionId)).subscribe((triggerSessionId: string) => {

      this._tokenRefreshStrategy = 'getData';

      if (!this._loggedIn) {
        this._triggerAutoLoginAfterConnectionRenewed();
        return;
      }

    })

  }

  protected _serviceApiGet<ResponseDataType = any>(endpoint: string, queryParams: RequestQueryParams = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): Observable<HandyApiCallResult<ResponseDataType>> {

    endpoint = this._generateFinalEndpoint(endpoint);

    return this._handyngApiService.getRequest<ResponseDataType>(endpoint, queryParams, headers, reportProgress, apiversion);

  }

  protected _serviceApiPost<ResponseDataType = any>(endpoint: string, body: UnSignedObject = {}, queryParams: RequestQueryParams = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): Observable<HandyApiCallResult<ResponseDataType>> {

    endpoint = this._generateFinalEndpoint(endpoint);

    return this._handyngApiService.postRequest<ResponseDataType>(endpoint, body, queryParams, headers, reportProgress, apiversion);

  }

  protected _serviceApiPut<ResponseDataType = any>(endpoint: string, body: UnSignedObject = {}, queryParams: RequestQueryParams = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): Observable<HandyApiCallResult<ResponseDataType>> {

    endpoint = this._generateFinalEndpoint(endpoint);

    return this._handyngApiService.putRequest<ResponseDataType>(endpoint, body, queryParams, headers, reportProgress, apiversion);

  }

  protected _serviceApiDelete<ResponseDataType = any>(endpoint: string, queryParams: RequestQueryParams = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): Observable<HandyApiCallResult<ResponseDataType>> {

    endpoint = this._generateFinalEndpoint(endpoint);

    return this._handyngApiService.deleteRequest<ResponseDataType>(endpoint, queryParams, headers, reportProgress, apiversion);

  }

  protected _generateFinalEndpoint(serviceEndpoint: string): string {
    return `service/${this._serverUserServiceName}/${serviceEndpoint}`;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Events                                   */
  /* -------------------------------------------------------------------------- */

  protected _triggerUserChangeEvent(): void {
    this._userChangeEvent.next();
  }

  /* -------------------------------------------------------------------------- */
  /*                             Setters and geters                             */
  /* -------------------------------------------------------------------------- */

  public get loggedInStatus(): boolean {
    return this._loggedIn;
  }

  public set loggedInStatus(val: boolean) {

    console.error(`User logged in status can't be changed from outside of User service`);

  }

  public get userData(): Partial<UserModelInterfaces['fullModelShape']> {
    return this._data;
  }

  public set userData(val: Partial<UserModelInterfaces['fullModelShape']>) {

    console.error(`User data can't be changed from outside of User service`);

  }

  public get socket(): HandyNgSocket {
    return this._socket;
  }

  public set socket(socket: HandyNgSocket) {

    console.error(`User socket can't be changed from outside of User service`);

  }

  /* -------------------------------------------------------------------------- */
  /*                                  Api calls                                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Authentification ---------------------------- */

  public login(email: string, password: string): Promise<WebAppLoginResult> {

    return new Promise((resolve, reject) => {

      this._serviceApiPost<WebAppLoginResult>('webAppLogin', { email: email.trim(), password }).subscribe((result => {

        this._loggedIn = result.success;

        if (this._loggedIn) {

          let { accessTokenData, userData } = result.data;

          this._data = userData;

          this._triggerUserChangeEvent();
          this._tokenRefreshStrategy = 'refresh';
          this._handleAccessTokenRefreshing(accessTokenData);

        } else {
          this.logout();
        }

        return resolve(result.data);

      }), err => {

        this.logout();
        return reject(err);

      })

    })

  }

  public register(email: string, password: string): Promise<HandyApiCallResult<UserModelInterfaces['fullModelShape']>> {

    return new Promise((resolve, reject) => {

      this._serviceApiPost<UserModelInterfaces['fullModelShape']>('webAppRegister', { email: email.trim(), password }).subscribe((result => {

        return resolve(result);

      }), err => {

        return reject(err);

      })

    })

  }

  public logout(clearCookies: boolean = false): void {

    this._clearRefreshAccessTokenTimeout();

    if (clearCookies) {
      this._logoutApiCall();
    }

    this._data = null;
    this._loggedIn = false;
    this._handyNgConfigService.setUserAccessToken(null);

    this._triggerUserChangeEvent();

  }

  public requestAuthEmail(email: string, action: EmailRequestAction): Promise<HandyApiCallResult<any>> {

    let endpoint: string;

    switch (action) {
      case 'verify':
        endpoint = 'requestVerificationEmail';
        break;

      case 'unlock':
        endpoint = 'requestUnlockEmail';
        break;

      case 'passwordReset':
        endpoint = 'requestPasswordResetEmail';
        break;

      default:
        break;
    }

    return new Promise((resolve, reject) => {

      this._serviceApiGet(endpoint, { email: email.trim() }).subscribe((result => {

        return resolve(result);

      }), err => {

        return reject(err);

      })

    })

  }

  public resetPassword(email: string, password: string, resetHash: string): Promise<HandyApiCallResult<any>> {

    return new Promise((resolve, reject) => {

      this._serviceApiPost('passwordReset', { email: email.trim(), password, resetHash }).subscribe((result => {

        return resolve(result);

      }), err => {

        return reject(err);

      })

    })

  }

  protected _logoutApiCall(): void {

    this._serviceApiDelete('webAppLogout').subscribe(result => {

      // ? Nothing to show, just need to hit the api to clear cookies

    }, err => {

    })

  }

  protected _refreshAccessToken(initial: boolean = false): void {

    let endpoint: string = (this._tokenRefreshStrategy === 'getData') ? 'webAppAccessTokenData' : 'refreshWebAppAccessToken';

    this._serviceApiGet<WebAppLoginResult['accessTokenData']>(endpoint).subscribe(result => {

      this._tokenRefreshStrategy = 'refresh';
      this._handleAccessTokenRefreshing(result.data);

      if (initial) {
        this._getMyData(initial)
      }

    }, err => {

      this.logout(true);

      if (initial) {
        this._markStateAsLoaded();
      }

    })

  }

  /* ---------------------------- User data getters --------------------------- */

  protected _getMyData(initial: boolean = false): void {

    this._serviceApiGet<Partial<UserModelInterfaces['fullModelShape']>>('getMyData').subscribe(result => {

      this._data = result.data;
      this._loggedIn = true;

      if (!this._data.state) {
        this._data.state = {};
      }

      if (initial) {
        this._markStateAsLoaded();
      }

      this._triggerUserChangeEvent();

    }, err => {

      if (initial) {
        this._markStateAsLoaded();
      }

      this.logout(err.status > 499 || err.status < 400);

    })

  }

  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  public redirectToDashboard(): void {
    this._router.navigate(['/dashboard']);
  }

  public redirectToErrPage(code?: ClientErrCodes, refCode?: string): void {

    this._router.navigate(['/error'], {
      queryParams: {
        code,
        refCode
      }
    })

  }

  public redirectToErrPageWithApiErr(err: any = {}): void {

    let { code, refCode } = this._handyNgUtilsService.getErrDataFromAPiErr(err);

    this._router.navigate(['/error'], {
      queryParams: {
        code,
        refCode
      }
    })

  }

  protected _clearRefreshAccessTokenTimeout(): void {

    if (this._handyNgConfigService.isPlatform('browser')) {

      if (this._refreshTokenTimeout) {
        clearTimeout(this._refreshTokenTimeout);
      }

    }

  }

  protected _handleAccessTokenRefreshing(tokenData: WebAppLoginResult['accessTokenData']): void {

    this._clearRefreshAccessTokenTimeout();
    this._handyNgConfigService.setUserAccessToken(tokenData.token);
    let refreshIn: number = tokenData.expiresIn * 0.75;

    this._refreshTokenTimeout = setTimeout(() => {

      this._refreshAccessToken();

    }, refreshIn);

  }

  protected _handleInitialSocketEvents(): void {

    this._socket.on('userChange').subscribe(() => {

      this._getMyData();

    })

  }

  protected _socketPrivateRoomsHandler(): void {

    if (this._loggedIn) {

      this._lastSocketState = true;

      let { email, _id, groupId = null } = this._data;

      let rooms: string[] = [
        `user_id_${_id}`,
        `user_email_${email}`,
      ];

      if (groupId) {
        rooms.push(`users_group_id_${groupId}`);
      }

      let connectedRoomsLen: number = this._privateSocketRoomsList.length;
      let requestedRoomsLen: number = rooms.length;

      let sameRooms: boolean = true;

      if (connectedRoomsLen === requestedRoomsLen) {

        for (let i = 0; i < requestedRoomsLen; i++) {
          const singleConnectedRoom = rooms[i];

          if (!this._privateSocketRoomsList.includes(singleConnectedRoom)) {
            sameRooms = false;
            break;
          }

        }

      } else {
        sameRooms = false;
      }

      if (sameRooms) {
        return;
      }

      this._privateSocketRoomsList = rooms;

      this._socket.joinRooms(rooms);

      return;

    }

    if (this._privateSocketRoomsList.length > 0) {

      this._socket.leaveRooms(this._privateSocketRoomsList);
      this._privateSocketRoomsList = [];
    }

    this._lastSocketState = false;
    return;

  }

  protected _triggerAutoLoginAfterConnectionRenewed(): void {

    this._getMyData();
    this._tokenRefreshStrategy = 'getData';
    this._refreshAccessToken();

  }

  public update(update: UnSignedObject, updateName: string = 'Update from web client') {

    if (!this._loggedIn) {

      return this._userModel.updatedOne({ _id: -1 }, {});

    }

    return this._userModel.updatedOne({ _id: this._data._id }, update, { updateName });

  }

  public getUserPreference<PreferenceName extends keyof UserModelInterfaces['fullModelShape']['preferences']>(preferenceName: PreferenceName, unsetVal: UserModelInterfaces['fullModelShape']['preferences'][PreferenceName]): UserModelInterfaces['fullModelShape']['preferences'][PreferenceName] {

    if (this._loggedIn && this._data.preferences !== undefined && this._data.preferences[preferenceName] !== undefined) {
      return this._data.preferences[preferenceName];
    } else {
      return unsetVal;
    }

  }

  public setUserPreference<PreferenceName extends keyof UserModelInterfaces['fullModelShape']['preferences']>(preferenceName: PreferenceName, value: UserModelInterfaces['fullModelShape']['preferences'][PreferenceName]): void {

    if (!this._loggedIn || this._handyNgConfigService.isPlatform('server')) {
      return;
    }

    let savedVal = this.getUserPreference(preferenceName, null);

    if (this._handyNgUtilsService.deepCompare(savedVal, value)) {
      return;
    }

    if (!this._data.preferences) {
      this._data.preferences = {};
    }

    this._data.preferences[preferenceName] = value;

    let preferencePath = `preferences.${preferenceName}`;
    this.update({ $set: { [preferencePath]: value } }).subscribe(updateResult => {

    }, err => {

    });

  }

  public getUserSocket(): HandyNgSocket {

    return this._socket;

  }

  public userChange(debounceTimeInMs: number = 0): Observable<void> {

    return this._userChangeEvent.pipe(debounceTime(debounceTimeInMs));

  }

  public refreshUserData(toDoOnChange?: () => any): void {

    if (toDoOnChange) {
      this.onNextUserChange(toDoOnChange);
    }

    this._getMyData();
  }

  public onNextUserChange(toDoOnChange: () => any): void {

    this.userChange().pipe(first()).subscribe(() => {
      toDoOnChange();
    })

  }

  public hasRole(roles: SingleOrArrayCombo<UserRole> = []): boolean {

    if (!this._loggedIn) {
      return false;
    }

    if (this._data.roles.includes('superAdmin')) {
      return true;
    }

    let rolesToCheck: UserRole[] = (Array.isArray(roles)) ? roles : [roles];
    let has: boolean = false;

    let rolesToCheckLen: number = rolesToCheck.length;
    for (let i = 0; i < rolesToCheckLen; i++) {
      const singleRoleToCheck = rolesToCheck[i];

      if (this._data.roles.includes(singleRoleToCheck)) {
        has = true;
        break;
      }

    }

    return has;

  }

  public hasPermission(permissions: SingleOrArrayCombo<AdditionalAccessPermission> = []): boolean {

    if (!this._loggedIn) {
      return false;
    }

    if (this._data.roles.includes('superAdmin')) {
      return true;
    }

    let persmissionsToCheck: AdditionalAccessPermission[] = (Array.isArray(permissions)) ? permissions : [permissions];
    let has: boolean = false;

    let permissionsToCheckLen: number = persmissionsToCheck.length;
    for (let i = 0; i < permissionsToCheckLen; i++) {
      const singlePermissionToCheck = persmissionsToCheck[i];

      if (this._data.permissions.includes(singlePermissionToCheck)) {
        has = true;
        break;
      }

    }

    return has;

  }

  public isMemberOfGrouptType(groups: SingleOrArrayCombo<UserGroup> = []): boolean {

    if (!this._loggedIn) {
      return false;
    }

    let groupsToCheck: UserGroup[] = (Array.isArray(groups)) ? groups : [groups];
    let has: boolean = false;

    let groupsToCheckLen: number = groupsToCheck.length;
    for (let i = 0; i < groupsToCheckLen; i++) {
      const singlegroupToCheck = groupsToCheck[i];

      if (this._data.groups.includes(singlegroupToCheck)) {
        has = true;
        break;
      }

    }

    return has;

  }

  /* -------------------------------------------------------------------------- */
  /*                               State managing                               */
  /* -------------------------------------------------------------------------- */

  public saveStateVal(name: string, val: any): void {

    if (!this._loggedIn) {
      return;
    }

    if (!this._data.state) {
      this._data.state = {};
    }

    this._data.state[name] = val;
    this.__stateEmitterSubject.next();

  }

  public getStateVal(name: string, defaultVal: any = null): any {

    if (!this._loggedIn) {
      return defaultVal;
    }

    let result = (this._data.state && this._data.state[name] !== null && this._data.state[name] !== undefined) ? this._data.state[name] : defaultVal;
    return result;

  }

  public resetStateVal(name: string): void {

    this.saveStateVal(name, null);

  }

  /* ------------------------------- Forms state ------------------------------ */

  public pinFormFieldVal(name: string, val: string): boolean {

    if (!this._loggedIn) {
      return false;
    }

    this.saveStateVal(`${this._formFieldPinnedValPreffix}_${name}`, val);

    if (!val) {
      return false;
    } else {
      return true;
    }

  }

  public getFormFieldPinVal(name: string, defaultVal: any = null): any {
    return this.getStateVal(`${this._formFieldPinnedValPreffix}_${name}`, defaultVal);
  }

  public saveFormFieldStateVal(name: string, val: string): void {
    this.saveStateVal(`${this._formFieldMemoryStateValPreffix}_${name}`, val);
  }

  public getFormFieldStateVal(name: string, defaultVal: any = null): any {
    return this.getStateVal(`${this._formFieldMemoryStateValPreffix}_${name}`, defaultVal);
  }

  public saveFormStateVal(name: string, val: string): void {
    this.saveStateVal(`${this._formMemoryStateValPreffix}_${name}`, val);
  }

  public getFormStateVal(name: string, defaultVal: any = null): any {
    return this.getStateVal(`${this._formMemoryStateValPreffix}_${name}`, defaultVal);
  }

  public resetFormStateVal(name: string): void {
    this.resetStateVal(`${this._formMemoryStateValPreffix}_${name}`);
  }

  /* ---------------------------- Data table state ---------------------------- */

  public saveDataTableStateVal(name: string, val: HandyNgDataTableState): void {
    this.saveStateVal(`${this._datatableStateValPreffix}_${name}`, val as any);
  }

  public getDataTableStateVal(name: string, defaultVal: HandyNgDataTableState = {
    filterData: {},
    paginatorData: {
      pageIndex: 0,
      pageSize: 20
    },
    sort: {
      field: null,
      direction: null
    },
    filtersToggleState: false,
    displayedColumns: [],
    expanded: false
  }): HandyNgDataTableState {
    return this.getStateVal(`${this._datatableStateValPreffix}_${name}`, defaultVal) as HandyNgDataTableState;
  }

  public resetDataTableStateVal(name: string): void {
    this.resetStateVal(`${this._datatableStateValPreffix}_${name}`);
  }

}

