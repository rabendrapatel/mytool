"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHandyErrorService = void 0;
const _services_1 = require("@services");
const rxjs_1 = require("rxjs");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const core_1 = require("@handy/core");
class DefaultHandyErrorService extends _services_1.HandyService {
    constructor() {
        super();
        this.events = new rxjs_1.Subject();
        this.fs = fs;
        this.path = path;
        this.errors = [];
        this.writingToLogFile = false;
        this.hasUnloogedErrors = false;
        this.notificationEmailTo = [];
        this.notificationEmailToLength = 0;
        this.config = core_1.Inject(_services_1.HandyConfigService);
    }
    onInit() {
        this.mailer = core_1.Inject(_services_1.HandyMailerService);
        this._utils = core_1.Inject(_services_1.HandyUtilsService);
        this.logFilePath = path.join(__rootDir, 'src/server/handy/logs/error-logs.json');
        this.errorsConfig = this.config.get().errors;
        this.errorsLogHistorylength = this.errorsConfig.errorsLogHistorylength;
        this.errorsPriorityToConsole = this.errorsConfig.console;
        this.errorsPriorityToNotifyByEmail = this.errorsConfig.notifyByEmail;
        this.notificationEmailTo = (isArray(this.errorsConfig.emailTo)) ? this.errorsConfig.emailTo : [this.errorsConfig.emailTo];
        this.notificationEmailToLength = this.notificationEmailTo.length;
        this.projectName = this.config.get().projectName;
        this.init();
    }
    init() {
        if (!this.fs.existsSync(this.logFilePath)) {
            this.generateLogFile();
        }
        this.events.subscribe((stream) => {
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
        });
    }
    register(error, priority = 'low', errorCode = 'Server error', errorMsg, additionalData, request, response, source = new Error) {
        if (this.isHandyError(error, request, response)) {
            return error;
        }
        let newError = this.getDefaultError(errorCode, priority, errorMsg);
        if (request !== undefined) {
            newError.hasRequest = true;
            let { query, body, url, user, cookies, headers } = request;
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
    isHandyError(err, request, respose) {
        if (isNotEmpty(err) && isNotUndefined(err.isHandyError)) {
            if (!err.hasRequest && isNotEmpty(request)) {
                let { query, body, url, user, cookies, headers } = request;
                err.request = { query, body, url, user, cookies, headers };
                this.addRequestToError(err.refCode, request);
            }
            return true;
        }
        return false;
    }
    getDefaultErrorMsg(errorCode = 'Server error') {
        let msg = this.errorsConfig.defaultResponses[errorCode].msg;
        return (msg) ? msg : undefined;
    }
    generateLogFile() {
        fs.ensureDirSync(this.logFilePath.replace('/error-logs.json', ''));
        fs.writeFileSync(this.logFilePath, JSON.stringify({ errors: this.errors }, null, 4), null);
    }
    getDefaultError(errorCode = 'Server error', priority, errorMsg) {
        let newHandyError = {
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
    getErrorSource(err) {
        if (err.stack === undefined) {
            return 'Unknown';
        }
        let stackLine = err.stack.split("\n")[2];
        let caller_line = stackLine.slice(stackLine.lastIndexOf('/'), stackLine.lastIndexOf(')'));
        if (caller_line.length == 0) {
            caller_line = stackLine.slice(stackLine.lastIndexOf('('), stackLine.lastIndexOf(')'));
        }
        let line_no = caller_line.slice(caller_line.indexOf(':') + 1, caller_line.lastIndexOf(':'));
        return line_no;
    }
    getDefaultMsg(code) {
        return this.errorsConfig.defaultResponses[code]['msg'];
    }
    generateErrorRefCode() {
        let refCode = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < this.errorsConfig.refCodeLenght; i++) {
            refCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return refCode;
    }
    saveErrorsToLogFile() {
        if (!this.writingToLogFile) {
            this.writingToLogFile = true;
            fs.writeFile(this.logFilePath, JSON.stringify({ errors: this.errors }, null, 4), (err => {
                this.writingToLogFile = false;
                this.events.next({ eventName: 'finsihedSavingLogs' });
            }));
        }
        else {
            this.hasUnloogedErrors = true;
        }
    }
    sendNotificationEmail(error) {
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
                    .catch((err) => {
                });
            }
        });
    }
    addRequestToError(refCode, request) {
        let errorsLen = this.errors.length;
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
exports.DefaultHandyErrorService = DefaultHandyErrorService;
//# sourceMappingURL=default-handy-error.service.js.map