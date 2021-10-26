/// <reference types="node" />
import { HandyService, HandyErrorService } from "@services";
import * as https from 'https';
import * as http from 'http';
import { UnSignedObject, OnInit, RequestType } from "@handy/types";
export declare class DefaultHandyExternalApiService extends HandyService implements OnInit {
    protected _handyErrorService: HandyErrorService;
    protected _host: string;
    set hostNme(host: string);
    protected _protocol: RequestProtocol;
    set protocol(protocol: RequestProtocol);
    constructor();
    onInit(): void;
    get<ExpectedResponseType = any>(endpoint: string, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding?: string): Promise<HandyExternalApiResponse<ExpectedResponseType>>;
    delete<ExpectedResponseType = any>(endpoint: string, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding?: string): Promise<HandyExternalApiResponse<ExpectedResponseType>>;
    postJSON<ExpectedResponseType = any>(endpoint: string, body: UnSignedObject, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding?: string): Promise<HandyExternalApiResponse<ExpectedResponseType>>;
    putJSON<ExpectedResponseType = any>(endpoint: string, body: UnSignedObject, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding?: string): Promise<HandyExternalApiResponse<ExpectedResponseType>>;
    postFormUrlencoded<ExpectedResponseType = any>(endpoint: string, body: UnSignedObject, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding?: string): Promise<HandyExternalApiResponse<ExpectedResponseType>>;
    putFormUrlencoded<ExpectedResponseType = any>(endpoint: string, body: UnSignedObject, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders, resEncoding?: string): Promise<HandyExternalApiResponse<ExpectedResponseType>>;
    protected _parseResponse<ExpectedResponseType = any>(respBody: any, res: http.IncomingMessage): HandyExternalApiResponse<ExpectedResponseType>;
    protected _parseEndpoint(endpoint: string, queryParams?: UnSignedObject): string;
    protected _parseRequestoptions(endpoint: string, method: RequestType, queryParams?: UnSignedObject, headers?: http.OutgoingHttpHeaders): https.RequestOptions;
    protected _appendOutgoingJSONHeaders(body: string, headers?: http.OutgoingHttpHeaders): http.OutgoingHttpHeaders;
    protected _appendOutgoingFormUrlencodedHeaders(body: string, headers?: http.OutgoingHttpHeaders): http.OutgoingHttpHeaders;
}
declare type RequestProtocol = 'http:' | 'https:';
declare type HandyExternalApiResponse<ExpectedResponseType = any> = {
    body: ExpectedResponseType;
    statusCode: number;
    headers: http.IncomingHttpHeaders;
};
export {};
