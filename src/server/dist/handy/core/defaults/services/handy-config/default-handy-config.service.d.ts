/// <reference types="node" />
import { HandyService } from "@services";
import * as path from 'path';
import * as fs from 'fs';
import { ConfigData, PublicConfigData, ServerResponse, ServerRequest, ServerRequestUser, UnSignedObject } from "@handy/types";
export declare class DefaultHandyConfigService extends HandyService {
    protected path: typeof path;
    protected fs: typeof fs;
    protected rawData: any;
    protected configData: ConfigData;
    protected publicConfigData: PublicConfigData;
    protected _serverUrl: string;
    protected _serverApiUrl: string;
    constructor();
    protected loadRawData(): void;
    protected parseRawData(): void;
    get(): ConfigData;
    getPublic(): PublicConfigData;
    getMongoConnectionUri(): string;
    getServerUrl(): string;
    getClientUrl(): string;
    getApiUrl(): string;
    protected _nodeVersionString: string;
    protected _nodeVersionNumber: number;
    getNodeVersion<T extends 'string' | 'number'>(type: T): T extends 'string' ? string : number;
    servePublicConfigData(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: UnSignedObject): void;
}
