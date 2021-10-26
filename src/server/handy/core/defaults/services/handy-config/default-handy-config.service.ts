import { HandyService } from "@services";
import * as path from 'path';
import * as fs from 'fs';
import { ConfigData, PublicConfigData, ConfigMongoDBInterface, ServerResponse, ServerRequest, ServerRequestUser, UnSignedObject, HashGeneratorOptions } from "@handy/types";
import { GetApiRequest } from "@handy/core/decorators";
import { versions } from "process";

export class DefaultHandyConfigService extends HandyService {

  protected path = path;
  protected fs = fs;

  protected rawData: any;
  protected configData: ConfigData;

  protected publicConfigData: PublicConfigData;
  protected _serverUrl: string;
  protected _serverApiUrl: string;

  constructor () {
    super();

    this.loadRawData();
    this.parseRawData();

  }

  protected loadRawData(): void {

    this.rawData = JSON.parse(this.fs.readFileSync(this.path.join(__rootDir, 'handy.json'), { encoding: 'utf-8' }));

  }

  protected parseRawData(): void {

    let settingNames: string[] = Object.keys(this.rawData);
    let settingsLen: number = settingNames.length;
    let values: any = {};
    let publicValues: any = {};
    let envPreffix: 'stagVal' | 'devVal';

    if (__env === 'stag') {
      envPreffix = 'stagVal';
    }

    if (__env === 'dev') {
      envPreffix = 'devVal';
    }

    for (let i = 0; i < settingsLen; i++) {

      const settingName: string = settingNames[i];

      let settingVal: any = this.rawData[settingName].val;
      const envVal: any = (envPreffix === undefined) ? undefined : this.rawData[settingName][envPreffix];
      const isObject: boolean = (typeof settingVal === 'object');
      const isPublic: boolean = (this.rawData[settingName].public === true) ? true : false

      if (envVal !== undefined) {

        if (isObject) {
          settingVal = { ...settingVal, ...envVal };
        } else {
          settingVal = envVal;
        }

      }

      values[settingName] = settingVal;

      if (isPublic) {
        publicValues[settingName] = settingVal;
      }

    }

    this.configData = values;

    if (__isStag) {
      // @ts-ignore
      let jwtTypes: keyof ConfigData['jwt']['types'] = Object.keys(this.configData.jwt.types) as keyof ConfigData['jwt']['types'];
      let typesLen: number = jwtTypes.length;

      for (let i = 0; i < typesLen; i++) {
        const singleType = jwtTypes[i] as keyof ConfigData['jwt']['types'];
        this.configData.jwt.types[singleType].secret += '_stag';
      }

    }

    this.publicConfigData = publicValues;

  }

  public get(): ConfigData {
    return this.configData;
  }

  public getPublic(): PublicConfigData {
    return { ...this.publicConfigData, ...{ env: __env } };
  }

  public getMongoConnectionUri(): string {

    let mongoSettings: ConfigMongoDBInterface = this.configData.mongoDB;
    let uri = '';

    if (mongoSettings.local) {
      mongoSettings.host = 'localhost';
    }

    if (mongoSettings.dbName == 'this#projectName') {
      this.configData.mongoDB.dbName = this.get().projectName;
      this.configData.mongoDB.dbName += `_${__env}_mongo_db`;
    }

    let dbName = this.configData.mongoDB.dbName = this.configData.mongoDB.dbName.replace(/ /g, '_').toLowerCase();

    uri = 'mongodb://' + mongoSettings.host + ':' + mongoSettings.port + '/' + mongoSettings.dbName;

    if (mongoSettings.auth) {
      uri = 'mongodb://' + mongoSettings.user + ':' + mongoSettings.password + '@' + mongoSettings.host + ':' + mongoSettings.port + '/' + dbName + '?authSource=admin';
    }

    if (mongoSettings.secret == 'this#default') {
      this.configData.mongoDB.secret = this.get().secret;
    }

    return uri.replace(/ /g, '_');

  }

  public getServerUrl(): string {

    if (this._serverUrl) {
      return this._serverUrl;
    }

    let configDomain: string = this.get().domain;
    configDomain = configDomain.replace('http://', '').replace('https://', '');
    if (configDomain.startsWith('www.')) {
      configDomain = configDomain.replace('www.', '');
    }

    while (configDomain.includes('/')) {
      configDomain.replace('/', '');
    }

    let finalServerUrl: string = (this.configData.ssl) ? 'https://' : 'http://';
    this._serverUrl = `${finalServerUrl}${configDomain}`;

    return this._serverUrl;

  }

  public getClientUrl(): string {

    let url: string = this.getServerUrl();

    if (!url.endsWith('/')) {
      url += '/'
    }

    return url;

  }

  public getApiUrl(): string {

    if (this._serverApiUrl) {
      return this._serverApiUrl;
    }

    this._serverApiUrl = `${this.getServerUrl()}/api`;
    return this._serverApiUrl;

  }

  protected _nodeVersionString: string = versions.node;
  protected _nodeVersionNumber: number;
  public getNodeVersion<T extends 'string' | 'number'>(type: T): T extends 'string' ? string : number {

    if (type === 'string') {
      // @ts-ignore
      return this._nodeVersionString;
    }

    if (this._nodeVersionNumber !== undefined) {
      // @ts-ignore
      return this._nodeVersionNumber;
    }

    let splittedStr: string[] = this._nodeVersionString.split('.');
    let splittedLen: number = splittedStr.length;

    let finalStr: string;

    if (splittedLen > 2) {
      splittedStr.length = 2;
    }

    finalStr = this._nodeVersionString;
    if (splittedLen > 1) {
      finalStr = splittedStr.join('.');
    }

    // @ts-ignore
    return parseFloat(finalStr);

  }

  @GetApiRequest({
    publicRoute: true,
    customUrlPath: 'public-config-data',
    apiVersions: '1'
  })
  public servePublicConfigData(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void {

    let XSRF_TOKEN = request.getCookie(true, 'XSRF-TOKEN', undefined);
    let HANDY_CLIENT_DEVICE_ID: string = request.getCookie(true, this.get().deviceIdCookieHash, undefined);

    response.jsonResponse({ ...this.getPublic(), XSRF_TOKEN, HANDY_CLIENT_DEVICE_ID });

  }

}