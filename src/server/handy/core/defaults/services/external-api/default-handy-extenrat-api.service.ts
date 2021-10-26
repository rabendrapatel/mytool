import { HandyService, HandyErrorService } from "@services";
import * as https from 'https';
import * as http from 'http';
import * as querystring from 'querystring';
import { UnSignedObject, OnInit, RequestType } from "@handy/types";
import { Inject } from "@handy/core/injector/injector";

export class DefaultHandyExternalApiService extends HandyService implements OnInit {

  protected _handyErrorService: HandyErrorService;

  protected _host: string;
  public set hostNme(host: string) {
    this._host = host;
  }

  protected _protocol: RequestProtocol = 'https:';
  public set protocol(protocol: RequestProtocol) {
    this._protocol = protocol;
  }

  constructor () {
    super();
  }

  public onInit() {
    this._handyErrorService = Inject(HandyErrorService);
  }

  public get<ExpectedResponseType = any>(endpoint: string, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding: string = 'utf8'): Promise<HandyExternalApiResponse<ExpectedResponseType>> {

    return new Promise((resolve, reject) => {

      let handler: typeof http | typeof https = (this._protocol === 'https:') ? https : http;

      let requestCall = handler.request(this._parseRequestoptions(endpoint, 'get', queryParams, headers), res => {

        res.setEncoding(resEncoding);

        let body: string = '';

        res.on('data', chunk => {
          body += chunk;
        })

        res.on('end', () => {

          return resolve(this._parseResponse<ExpectedResponseType>(body, res));

        })

      })

      requestCall.on('error', (err => {

        return reject(err);

      }))

      requestCall.end();

    })

  }
  
  public delete<ExpectedResponseType = any>(endpoint: string, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding: string = 'utf8'): Promise<HandyExternalApiResponse<ExpectedResponseType>> {

    return new Promise((resolve, reject) => {

      let handler: typeof http | typeof https = (this._protocol === 'https:') ? https : http;

      let requestCall = handler.request(this._parseRequestoptions(endpoint, 'delete', queryParams, headers), res => {

        res.setEncoding(resEncoding);

        let body: string = '';

        res.on('data', chunk => {
          body += chunk;
        })

        res.on('end', () => {

          return resolve(this._parseResponse<ExpectedResponseType>(body, res));

        })

      })

      requestCall.on('error', (err => {

        return reject(err);

      }))

      requestCall.end();

    })

  }

  public postJSON<ExpectedResponseType = any>(endpoint: string, body: UnSignedObject, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding: string = 'utf8'): Promise<HandyExternalApiResponse<ExpectedResponseType>> {

    return new Promise((resolve, reject) => {

      let bodyString: string = JSON.stringify(body);
      let handler: typeof http | typeof https = (this._protocol === 'https:') ? https : http;

      let requestCall = handler.request(this._parseRequestoptions(endpoint, 'post', queryParams, this._appendOutgoingJSONHeaders(bodyString, headers)), res => {

        res.setEncoding(resEncoding);

        let body: string = '';

        res.on('data', chunk => {
          body += chunk;
        })

        res.on('end', () => {

          return resolve(this._parseResponse<ExpectedResponseType>(body, res));

        })

      })

      requestCall.on('error', (err => {

        return reject(err);

      }))

      requestCall.write(bodyString);
      requestCall.end();

    })

  }
  
  public putJSON<ExpectedResponseType = any>(endpoint: string, body: UnSignedObject, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding: string = 'utf8'): Promise<HandyExternalApiResponse<ExpectedResponseType>> {

    return new Promise((resolve, reject) => {

      let bodyString: string = JSON.stringify(body);
      let handler: typeof http | typeof https = (this._protocol === 'https:') ? https : http;

      let requestCall = handler.request(this._parseRequestoptions(endpoint, 'put', queryParams, this._appendOutgoingJSONHeaders(bodyString, headers)), res => {

        res.setEncoding(resEncoding);

        let body: string = '';

        res.on('data', chunk => {
          body += chunk;
        })

        res.on('end', () => {

          return resolve(this._parseResponse<ExpectedResponseType>(body, res));

        })

      })

      requestCall.on('error', (err => {

        return reject(err);

      }))

      requestCall.write(bodyString);
      requestCall.end();

    })

  }
  
  public postFormUrlencoded<ExpectedResponseType = any>(endpoint: string, body: UnSignedObject, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding: string = 'utf8'): Promise<HandyExternalApiResponse<ExpectedResponseType>> {

    return new Promise((resolve, reject) => {

      let bodyString: string = querystring.stringify(body);
      let handler: typeof http | typeof https = (this._protocol === 'https:') ? https : http;

      let requestCall = handler.request(this._parseRequestoptions(endpoint, 'post', queryParams, this._appendOutgoingFormUrlencodedHeaders(bodyString, headers)), res => {

        res.setEncoding(resEncoding);

        let body: string = '';

        res.on('data', chunk => {
          body += chunk;
        })

        res.on('end', () => {

          return resolve(this._parseResponse<ExpectedResponseType>(body, res));

        })

      })

      requestCall.on('error', (err => {

        return reject(err);

      }))

      requestCall.write(bodyString);
      requestCall.end();

    })

  }
  
  public putFormUrlencoded<ExpectedResponseType = any>(endpoint: string, body: UnSignedObject, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding: string = 'utf8'): Promise<HandyExternalApiResponse<ExpectedResponseType>> {

    return new Promise((resolve, reject) => {

      let bodyString: string = querystring.stringify(body);
      let handler: typeof http | typeof https = (this._protocol === 'https:') ? https : http;

      let requestCall = handler.request(this._parseRequestoptions(endpoint, 'put', queryParams, this._appendOutgoingFormUrlencodedHeaders(bodyString, headers)), res => {

        res.setEncoding(resEncoding);

        let body: string = '';

        res.on('data', chunk => {
          body += chunk;
        })

        res.on('end', () => {

          return resolve(this._parseResponse<ExpectedResponseType>(body, res));

        })

      })

      requestCall.on('error', (err => {

        return reject(err);

      }))

      requestCall.write(bodyString);
      requestCall.end();

    })

  }

  protected _parseResponse<ExpectedResponseType = any>(respBody: any, res: http.IncomingMessage): HandyExternalApiResponse<ExpectedResponseType> {

    let { headers = {}, statusCode } = res;
    let body: ExpectedResponseType = respBody;
    if (isNotEmpty(headers['content-type']) && (headers['content-type'].includes('application/json') || headers['content-type'].includes('text/javascript'))) {
      body = JSON.parse(respBody);
    }

    return {
      statusCode: res.statusCode,
      body,
      headers: res.headers
    }

  }

  protected _parseEndpoint(endpoint: string, queryParams?: UnSignedObject): string {

    if (endpoint.length > 0 && !endpoint.startsWith('/')) {
      endpoint = `/${endpoint}`;
    }

    if (queryParams) {

      if (!endpoint.endsWith('?')) {
        endpoint = `${endpoint}?`;
      }

      endpoint += querystring.stringify(queryParams);

    }

    return endpoint;

  }

  protected _parseRequestoptions(endpoint: string, method: RequestType, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders): https.RequestOptions {

    return { hostname: this._host, path: this._parseEndpoint(endpoint, queryParams), protocol: this._protocol, method: method.toUpperCase(), headers }

  }

  protected _appendOutgoingJSONHeaders(body: string, headers: http.OutgoingHttpHeaders = {}): http.OutgoingHttpHeaders {

    headers['Content-Type'] = 'application/json; charset=UTF-8';
    headers['Content-Length'] = body.length;

    return headers;

  }
  
  protected _appendOutgoingFormUrlencodedHeaders(body: string, headers: http.OutgoingHttpHeaders = {}): http.OutgoingHttpHeaders {

    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers['Content-Length'] = Buffer.byteLength(body);

    return headers;

  }

}

type RequestProtocol = 'http:' | 'https:';
type HandyExternalApiResponse<ExpectedResponseType = any> = {
  body: ExpectedResponseType,
  statusCode: number,
  headers: http.IncomingHttpHeaders
}