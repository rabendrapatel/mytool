/// <reference types="node" />
import { HandyService, HandyConfigService, HandyMailerService, HandyUtilsService } from "@services";
import { Subject } from 'rxjs';
import * as fs from 'fs-extra';
import * as path from 'path';
import { OnInit, ConfigErrorsInterface, HandyError, ErrorPriority, ErrorReasons, ServerRequest, ServerResponse, _PrivateRequest } from "@handy/types";
export declare class DefaultHandyErrorService extends HandyService implements OnInit {
    protected events: Subject<ErrorEventsStream>;
    protected errorsConfig: ConfigErrorsInterface;
    protected fs: typeof fs;
    protected path: typeof path;
    protected logFilePath: string;
    protected errors: HandyError[];
    protected writingToLogFile: boolean;
    private hasUnloogedErrors;
    private errorsLogHistorylength;
    private projectName;
    protected errorsPriorityToConsole: ErrorPriority[];
    protected errorsPriorityToNotifyByEmail: ErrorPriority[];
    protected notificationEmailTo: string[];
    protected notificationEmailToLength: number;
    protected config: HandyConfigService;
    protected _utils: HandyUtilsService;
    protected mailer: HandyMailerService;
    constructor();
    onInit(): void;
    protected init(): void;
    register(error: HandyError | any, priority?: ErrorPriority, errorCode?: ErrorReasons, errorMsg?: string, additionalData?: HandyError['additionalData'], request?: ServerRequest, response?: ServerResponse, source?: Error): any;
    isHandyError(err: HandyError | any, request?: ServerRequest, respose?: ServerResponse): boolean;
    getDefaultErrorMsg(errorCode?: ErrorReasons): string;
    protected generateLogFile(): void;
    protected getDefaultError(errorCode: ErrorReasons, priority: ErrorPriority, errorMsg?: string): HandyError;
    private getErrorSource;
    private getDefaultMsg;
    protected generateErrorRefCode(): string;
    protected saveErrorsToLogFile(): void;
    protected sendNotificationEmail(error: HandyError): void;
    protected addRequestToError(refCode: string, request: _PrivateRequest): void;
}
declare type EventNames = 'finsihedSavingLogs';
interface ErrorEventsStream {
    eventName: EventNames;
    data?: any;
}
export {};
