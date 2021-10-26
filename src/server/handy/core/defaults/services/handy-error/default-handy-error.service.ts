import { HandyService, HandyConfigService, HandyMailerService, HandyUtilsService } from "@services";
import { Subject } from 'rxjs';

import * as fs from 'fs-extra';
import * as path from 'path';
import { OnInit, ConfigErrorsInterface, HandyError, ErrorPriority, ErrorReasons, ServerRequest, ServerResponse, _PrivateRequest } from "@handy/types";
import { Inject } from "@handy/core";

export class DefaultHandyErrorService extends HandyService implements OnInit {

  protected events: Subject<ErrorEventsStream> = new Subject();
  protected errorsConfig: ConfigErrorsInterface;

  protected fs = fs;
  protected path = path;
  protected logFilePath: string;

  protected errors: HandyError[] = [];
  protected writingToLogFile: boolean = false;

  private hasUnloogedErrors: boolean = false;
  private errorsLogHistorylength: number;
  private projectName: string;

  protected errorsPriorityToConsole: ErrorPriority[];
  protected errorsPriorityToNotifyByEmail: ErrorPriority[];
  protected notificationEmailTo: string[] = [];
  protected notificationEmailToLength: number = 0;

  protected config: HandyConfigService = Inject(HandyConfigService);
  protected _utils: HandyUtilsService;
  protected mailer: HandyMailerService;

  constructor () {
    super();
  }

  public onInit() {

    this.mailer = Inject(HandyMailerService);
    this._utils = Inject(HandyUtilsService);

    this.logFilePath = path.join(__rootDir, 'src/server/handy/logs/error-logs.json');
    this.errorsConfig = this.config.get().errors;
    this.errorsLogHistorylength = this.errorsConfig.errorsLogHistorylength;
    this.errorsPriorityToConsole = this.errorsConfig.console;

    this.errorsPriorityToNotifyByEmail = this.errorsConfig.notifyByEmail;
    this.notificationEmailTo = (isArray(this.errorsConfig.emailTo)) ? <unknown>this.errorsConfig.emailTo as string[] : [<unknown>this.errorsConfig.emailTo as string];
    this.notificationEmailToLength = this.notificationEmailTo.length;

    this.projectName = this.config.get().projectName;

    this.init();

  }

  protected init(): void {

    if (!this.fs.existsSync(this.logFilePath)) {
      this.generateLogFile();
    }

    this.events.subscribe((stream: ErrorEventsStream) => {

      let { eventName, data } = stream;

      switch (eventName) {

        case 'finsihedSavingLogs':

          if (this.hasUnloogedErrors) {
            this.hasUnloogedErrors = false;
            this.saveErrorsToLogFile();
          }

          break;

        default:
          break;
      }

    })

  }

  public register(
    error: HandyError | any,
    priority: ErrorPriority = 'low',
    errorCode: ErrorReasons = 'Server error',
    errorMsg?: string,
    additionalData?: HandyError['additionalData'],
    request?: ServerRequest,
    response?: ServerResponse,
    source: Error = new Error) {


    if (this.isHandyError(error, request, response)) {

      return error;

    }

    let newError: HandyError = this.getDefaultError(errorCode, priority, errorMsg);

    if (request !== undefined) {
      newError.hasRequest = true;
      let { query, body, url, user, cookies, headers } = request as _PrivateRequest;
      newError.request = { query, body, url, user, cookies, headers };
    }

    newError.originalError = (typeof error === 'object') ? { error } : error;
    newError.source = this.getErrorSource(source);
    newError.additionalData = additionalData;

    this.errors.unshift(newError);

    if (this.errors.length > this.errorsLogHistorylength) {
      this.errors.length = this.errorsLogHistorylength;
    }

    this.saveErrorsToLogFile();

    if (this.errorsPriorityToConsole.includes(priority)) {

      switch (priority) {
        case 'high':
          handyErrLog(newError);
          break;

        case 'medium':
          handyWarnLog(newError);
          break;

        default:
          console.log(newError);
          break;
      }

    }

    if (!__isDev && this.errorsPriorityToNotifyByEmail.includes(priority)) {

      this.sendNotificationEmail(newError);

    }

    return newError;

  }

  public isHandyError(err: HandyError | any, request?: ServerRequest, respose?: ServerResponse): boolean {

    if (isNotEmpty(err) && isNotUndefined(err.isHandyError)) {

      if (!err.hasRequest && isNotEmpty(request)) {
        let { query, body, url, user, cookies, headers } = request as _PrivateRequest;
        err.request = { query, body, url, user, cookies, headers };
        this.addRequestToError(err.refCode, request);
      }

      return true;

    }

    return false;

  }

  public getDefaultErrorMsg(errorCode: ErrorReasons = 'Server error'): string {

    let msg: string = this.errorsConfig.defaultResponses[errorCode].msg;
    return (msg) ? msg : undefined;

  }

  protected generateLogFile(): void {

    fs.ensureDirSync(this.logFilePath.replace('/error-logs.json', ''));
    fs.writeFileSync(this.logFilePath, JSON.stringify({ errors: this.errors }, null, 4), null);

  }

  protected getDefaultError(
    errorCode: ErrorReasons = 'Server error',
    priority: ErrorPriority,
    errorMsg?: string): HandyError {

    let newHandyError: HandyError = {
      parsed: true,
      priority,
      time: new Date().getTime(),
      source: '',
      errorCode: this.errorsConfig.defaultResponses[errorCode].code,
      errorHeadline: errorCode,
      errorMsg: (isEmpty(errorMsg)) ? this.getDefaultMsg(errorCode) : errorMsg,
      refCode: this.generateErrorRefCode(),
      hasRequest: false,
      isHandyError: true
    };

    return newHandyError;

  }

  private getErrorSource(err: Error): string {

    if (err.stack === undefined) {

      return 'Unknown';
    }

    let stackLine: string = err.stack.split("\n")[2];
    let caller_line: string = stackLine.slice(stackLine.lastIndexOf('/'), stackLine.lastIndexOf(')'))
    if (caller_line.length == 0) {
      caller_line = stackLine.slice(stackLine.lastIndexOf('('), stackLine.lastIndexOf(')'))
    }

    let line_no = caller_line.slice(caller_line.indexOf(':') + 1, caller_line.lastIndexOf(':'));

    return line_no;

  }

  private getDefaultMsg(code: ErrorReasons): string {

    return (<any>this.errorsConfig).defaultResponses[code]['msg'];

  }

  protected generateErrorRefCode(): string {

    let refCode = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < this.errorsConfig.refCodeLenght; i++) {
      refCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return refCode;

  }

  protected saveErrorsToLogFile(): void {

    if (!this.writingToLogFile) {

      this.writingToLogFile = true;

      fs.writeFile(this.logFilePath, JSON.stringify({ errors: this.errors }, null, 4), (err => {

        this.writingToLogFile = false;
        this.events.next({ eventName: 'finsihedSavingLogs' });

      }));

    } else {

      this.hasUnloogedErrors = true;

    }

  }

  protected sendNotificationEmail(error: HandyError): void {

    new Promise((resolve, reject) => {

      for (let i = 0; i < this.notificationEmailToLength; i++) {
        const reciever = this.notificationEmailTo[i];

        this.mailer.sendMail({
          to: reciever,
          subject: `Error notice from ${this.projectName}`,
          template: 'error/error-notice.hbs',
          data: {
            error,
            handyEnv: __env,
            projectName: this.projectName
          }
        })
          .then(() => {
            // Email sent, noting to do
          })
          .catch((err: HandyError) => {

          })
      }

    })

  }

  protected addRequestToError(refCode: string, request: _PrivateRequest): void {

    let errorsLen: number = this.errors.length;

    for (let i = 0; i < errorsLen; i++) {
      const err = this.errors[i];

      if (err.refCode !== refCode) {
        continue;
      }

      let { query, body, url, user, cookies, headers } = request;
      this.errors[i].request = { query, body, url, user, cookies, headers };
      break;

    }

    this.saveErrorsToLogFile();

  }

}

type EventNames = 'finsihedSavingLogs';

interface ErrorEventsStream {
  eventName: EventNames,
  data?: any
}