import { HandyNgConfigService } from '@handy-ng/services';
import { HandyServiceLoadedHandler } from '@handy-ng/extenders';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

import { HttpRequestType, UnSignedObject, HttpRequestHeaders, RequestQueryParams, RequestQueryParamValue, HandyApiCallResult, HandyJsonRequestErrorResponse, PublicConfigData, ArrayOrUnionToUnion, FileInputData } from '@handy-ng/types';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UploadsModelInterfaces } from '@server/models/uploads/model.interface';

export class DefaultHandyNgApiService extends HandyServiceLoadedHandler {

  protected _XSRF_TOKEN: string;
  protected _ACCESS_TOKEN: string;
  protected _HANDY_CLIENT_SESSION_ID: string;

  protected _projDomain: string;
  protected _apiVersion: number;
  protected _isServer: boolean;
  protected _isDev: boolean;
  protected _apiUrl: string;

  constructor (
    protected _handyNgConfigService: HandyNgConfigService,
    protected _httpClient: HttpClient
  ) {

    super();

    this._handyNgConfigService.onStateLoaded(() => {
      this._init();
    })

  }

  protected _init(): void {

    this._XSRF_TOKEN = this._handyNgConfigService.getXSRF_TOKEN();
    this._ACCESS_TOKEN = this._handyNgConfigService.getHANDY_USER_ACCESS_TOKEN();
    this._HANDY_CLIENT_SESSION_ID = this._handyNgConfigService.getHANDY_CLIENT_SESSION_ID();

    this._projDomain = this._handyNgConfigService.getProjectDomain();

    this._isDev = this._handyNgConfigService.isEnv('dev');
    this._isServer = this._handyNgConfigService.isPlatform('server');

    this._handyNgConfigService.onConfigChange(() => {
      
      this._ACCESS_TOKEN = this._handyNgConfigService.getHANDY_USER_ACCESS_TOKEN();

    })

    this._markStateAsLoaded();

  }

  protected _httpRequest(method: HttpRequestType, endpoint: string, queryParams: RequestQueryParams = {}, body: UnSignedObject = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false): Observable<Object> {

    endpoint = this._appendQueryToEndpoint(endpoint, queryParams);

    return new Observable(observer => {

      this._handyNgConfigService.startLoader();

      if (this._handyNgConfigService.hasTransferStateKey(endpoint)) {

        observer.next(this._handyNgConfigService.getFromTransferState(endpoint, undefined));
        observer.complete();
        this._handyNgConfigService.stopLoader();
        this._handyNgConfigService.removeFromTransferState(endpoint);
        return;

      }

      let options: UnSignedObject = { headers: this._appendHeaders(headers), reportProgress };

      if (reportProgress) {
        options['observe'] = 'events';
      }

      let request: Observable<Object>;

      switch (method) {

        case 'get':

          request = this._httpClient.get(endpoint, options);

          break;

        case 'delete':

          request = this._httpClient.delete(endpoint, options);

          break;

        case 'put':

          request = this._httpClient.put(endpoint, body, options);

          break;

        case 'post':

          request = this._httpClient.post(endpoint, body, options);

          break;

        default:

          observer.error('No method specified');

          break;

      }

      request.subscribe(result => {

        if (!reportProgress) {

          observer.next(result);
          observer.complete();
          this._handyNgConfigService.stopLoader();

          this._handyNgConfigService.saveInTransferState(endpoint, result);
          return;

        }

        if (result['type'] === HttpEventType.UploadProgress) {
          observer.next(result);
        }

        if (result['type'] == HttpEventType.Response) {

          observer.next(result);
          observer.complete();
          this._handyNgConfigService.stopLoader();

          this._handyNgConfigService.saveInTransferState(endpoint, result);
          return;

        }

      }, (err: Error) => {

        observer.error(err);
        this._handyNgConfigService.stopLoader();

      }, () => {

        observer.complete();
        this._handyNgConfigService.stopLoader();

      })

    })

  }

  protected _apiHttpRequest(method: HttpRequestType, endpoint: string, queryParams: RequestQueryParams = {}, body: UnSignedObject = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): Observable<Object> {

    if (!this._initialized) {

      return new Observable(observer => {

        let requestIntSub: Subscription = this._loadedStateSubject.pipe(first(state => state === true))
          .subscribe(() => {

            let parsedHeadersAndEndpoint = this._parseApiEndpointAndHeaders(endpoint, headers);

            this._httpRequest(method, parsedHeadersAndEndpoint.endpoint, queryParams, body, parsedHeadersAndEndpoint.headers, reportProgress).subscribe(result => {
              observer.next(result);
            }, err => {
              observer.error(err);
              requestIntSub.unsubscribe();
            }, () => {
              observer.complete();
              requestIntSub.unsubscribe();
            })

            return;

          })

      })

    }

    let parsedHeadersAndEndpoint = this._parseApiEndpointAndHeaders(endpoint, headers);

    return this._httpRequest(method, parsedHeadersAndEndpoint.endpoint, queryParams, body, parsedHeadersAndEndpoint.headers, reportProgress);

  }

  protected _parseApiEndpointAndHeaders(endpoint: string, headers: HttpRequestHeaders = {}, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): { headers: HttpRequestHeaders, endpoint: string } {

    if (this._XSRF_TOKEN) {
      headers['X-xsrf-token'] = this._XSRF_TOKEN;
    }

    if (this._isServer && this._ACCESS_TOKEN) {
      headers['Authorization'] = this._ACCESS_TOKEN;
    }

    if (this._HANDY_CLIENT_SESSION_ID) {
      headers['Handy-client-session-id'] = this._HANDY_CLIENT_SESSION_ID;
    }

    if (endpoint.startsWith('/')) {
      endpoint = endpoint.replace('/', '');
    }

    while (endpoint.includes('//')) {
      endpoint = endpoint.replace('//', '/');
    }

    endpoint = `${this._projDomain}api/v${apiversion}/${endpoint}`;

    return {
      headers, endpoint
    }

  }

  protected _appendQueryToEndpoint(endpoint: string, query: UnSignedObject = {}): string {

    let addon: string;

    if (query) {

      const queryParams: string[] = Object.keys(query);
      const paramsLen: number = queryParams.length;
      const lastIndex: number = paramsLen - 1;

      if (paramsLen > 0) {

        addon = '';

        for (let i = 0; i < paramsLen; i++) {
          const paramName: string = queryParams[i];
          let paramVal: RequestQueryParamValue = query[paramName];

          let paramParsedVal: string = '';

          if (Array.isArray(paramVal)) {

            let singleValsLen: number = paramVal.length;
            let lastSingleValIndex: number = singleValsLen - 1;

            for (let j = 0; j < singleValsLen; j++) {
              let singleParamVal: RequestQueryParamValue = encodeURIComponent(paramVal[j]);

              paramParsedVal = `${paramParsedVal}${singleParamVal}`;

              if (j !== lastSingleValIndex) {
                paramParsedVal += ','
              }

            }

          } else {

            paramParsedVal = `${encodeURIComponent(paramVal)}`;

          }

          addon += `${paramName}=${paramParsedVal}`;

          if (i !== lastIndex) {
            addon += '&';
          }

        }

      }

    }

    if (addon) {

      // Removes question mark to avoid duplicity
      if (endpoint.endsWith('?')) {
        endpoint = endpoint.slice(0, -1);
      }

      // Removes last slash on endpoint
      if (endpoint.endsWith('/')) {
        endpoint = endpoint.slice(0, -1);
      }

      endpoint += `?${addon}`;
    }

    return endpoint;

  }

  protected _appendHeaders(headers?: HttpRequestHeaders): HttpHeaders | undefined {

    if (!headers) {
      return undefined;
    }

    let parsed: HttpHeaders = new HttpHeaders();

    let headersList: string[] = Object.keys(headers);
    let headersLen: number = headersList.length;

    if (headersLen > 0) {

      for (let i = 0; i < headersLen; i++) {
        const headerName: string = headersList[i];
        const headerVal: string = `${headers[headerName]}`

        parsed = parsed.append(headerName, headerVal);

      }

    }

    return parsed;

  }

  // Direct api calls

  public getRequest<ResponseDataType = any>(endpoint: string, queryParams: RequestQueryParams = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): Observable<HandyApiCallResult<ResponseDataType>> {

    return this._apiHttpRequest('get', endpoint, queryParams, undefined, headers, reportProgress, apiversion) as Observable<HandyApiCallResult<ResponseDataType>>;

  }

  public postRequest<ResponseDataType = any>(endpoint: string, body: UnSignedObject = {}, queryParams: RequestQueryParams = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): Observable<HandyApiCallResult<ResponseDataType>> {

    return this._apiHttpRequest('post', endpoint, queryParams, body, headers, reportProgress, apiversion) as Observable<HandyApiCallResult<ResponseDataType>>;

  }

  public putRequest<ResponseDataType = any>(endpoint: string, body: UnSignedObject = {}, queryParams: RequestQueryParams = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): Observable<HandyApiCallResult<ResponseDataType>> {

    return this._apiHttpRequest('put', endpoint, queryParams, body, headers, reportProgress, apiversion) as Observable<HandyApiCallResult<ResponseDataType>>;

  }

  public deleteRequest<ResponseDataType = any>(endpoint: string, queryParams: RequestQueryParams = {}, headers: HttpRequestHeaders = {}, reportProgress: boolean = false, apiversion: ArrayOrUnionToUnion<PublicConfigData['apiVersions']> = '1'): Observable<HandyApiCallResult<ResponseDataType>> {

    return this._apiHttpRequest('delete', endpoint, queryParams, undefined, headers, reportProgress, apiversion) as Observable<HandyApiCallResult<ResponseDataType>>;

  }

  public fileUpload(file: File, fileType: ServerAllowedExt, accessRules: UploadsModelInterfaces['fullModelShape']['accessRules'] = null, thumbs: string | string[]): Observable<HandyApiCallResult<{ body: FileInputData }>> {

    let formdata = new FormData();
    formdata.append('file', file, this.__sanitizeFileName(file.name));

    if (accessRules) {
      formdata.append('accessRules', JSON.stringify(accessRules));
    }

    if (thumbs) {
      formdata.append('thumbs', JSON.stringify(thumbs));
    }

    let endpoint: string = (this._handyNgConfigService.data.fileUpload.separateUploadHandlersFileTypes.includes(<any>fileType)) ? `service/handyFileUpload/${fileType}Upload` : 'service/handyFileUpload/upload';

    return this.postRequest(endpoint, formdata, undefined, undefined, true);

  }

  private __sanitizeFileName(original: string): string {

    let splittedOriginal: string[] = original.split('.');
    let chuncks: string[] = [];

    let splittedLen: number = splittedOriginal.length;
    for (let i = 0; i < splittedLen; i++) {
      const safeChunck = splittedOriginal[i].replace(/[^a-z0-9]/gi, '_').toLowerCase();
      chuncks.push(safeChunck);
    }

    return chuncks.join('.');

  }

}

export type ServerAllowedExt = PublicConfigData['fileUpload']['allowedFileTypes'][number];
export type FileAccessRules = UploadsModelInterfaces['fullModelShape']['accessRules'];