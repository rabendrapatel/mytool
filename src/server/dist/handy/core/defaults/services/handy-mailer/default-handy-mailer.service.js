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
exports.DefaultHandyMailerService = void 0;
const _services_1 = require("@services");
const nodeMailer = __importStar(require("nodemailer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const hbs = __importStar(require("handlebars"));
class DefaultHandyMailerService extends _services_1.HandyService {
    constructor(config, errorService) {
        super();
        this.config = config;
        this.errorService = errorService;
        this.nodeMailer = nodeMailer;
        this.fs = fs;
        this.path = path;
        this.hbs = hbs;
        this.emailErrorPriority = 'high';
        this.settings = this.config.get().mailer;
        this.defaultProvider = this.settings.defaultProvider;
        this.defaultAccount = this.settings.providers[this.defaultProvider].defaultAccount;
        this.registerPartials();
        this.hbs.registerHelper('toJSON', function (objectToPretyfy) {
            let prettyJson = JSON.stringify(objectToPretyfy, null, 6)
                .replace(/\n( *)/g, function (match, p1) {
                return '<br>' + '&nbsp;'.repeat(p1.length);
            }).replace(/\"/g, '').replace(/\\/g, '/');
            return new hbs.SafeString(JSON.stringify(prettyJson));
        });
    }
    getTransporter(providerName, accountName) {
        let provider = this.settings.providers[providerName];
        let account = provider.accounts[accountName];
        let secure = (provider.port === 465) ? true : false;
        return this.nodeMailer.createTransport({
            host: provider.host,
            port: provider.port,
            secure,
            auth: {
                user: account.mail,
                pass: account.password
            },
            tls: !secure && provider.port === 587 ? {
                ciphers: 'SSLv3'
            } : undefined
        });
    }
    getTemplate(teplatePath) {
        return this.fs.readFileSync(this.path.join(__rootDir, this.settings.templatesPath, teplatePath), { encoding: 'utf-8' });
    }
    registerPartials() {
        let partialsDir = path.join(__rootDir, this.settings.templatesPath, 'partials');
        let partials = [];
        let partialsContent = fs.readdirSync(partialsDir, 'utf-8');
        let partialsCount = partialsContent.length;
        for (let i = 0; i < partialsCount; i++) {
            let partialFile = partialsContent[i];
            let splittedName = partialFile.split('.');
            let splittedLen = splittedName.length;
            let ext = splittedName[splittedLen - 1];
            if (ext === 'hbs') {
                splittedName.length = splittedLen - 1;
                let partialName = splittedName.join('.');
                let partialPath = path.join(__rootDir, this.settings.templatesPath, 'partials', partialFile);
                let template = fs.readFileSync(partialPath, 'utf8');
                this.hbs.registerPartial(partialName, template);
            }
        }
    }
    sendMail(emailData) {
        return new Promise((resolve, reject) => {
            let { to, subject, template, data = {}, text = this.settings.defaultTextMsg, attachments = null, provider = this.defaultProvider, account, replyTo } = emailData;
            if (account === undefined) {
                account = this.settings.providers[provider].defaultAccount;
            }
            let accountSettings = this.settings.providers[provider].accounts[account];
            if (accountSettings === undefined) {
                if (__isDev) {
                    handyErrLog(`Unknow provider account: ${account}`);
                }
                return reject(this.errorService.register(undefined, this.emailErrorPriority, 'Bad request', `Unknow provider account: ${account}`, { private: { emailData } }));
            }
            let transporter = this.getTransporter(provider, account);
            let templateSource = this.getTemplate(template);
            let html = this.hbs.compile(templateSource)(data);
            let mailOptions = {
                from: accountSettings.from + ' <' + accountSettings.mail + '>',
                to,
                subject,
                replyTo,
                attachments,
                html,
                text
            };
            transporter.sendMail(mailOptions)
                .then(() => {
                return resolve();
            })
                .catch(emailErr => {
                let err = this.errorService.register(emailErr, this.emailErrorPriority, 'Server error', undefined, { private: { emailData } });
                return reject(err);
            });
        });
    }
}
exports.DefaultHandyMailerService = DefaultHandyMailerService;
//# sourceMappingURL=default-handy-mailer.service.js.map