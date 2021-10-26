import { HandyService, HandyConfigService, HandyErrorService } from "@services";

import * as nodeMailer from 'nodemailer';
import { Options } from "nodemailer/lib/mailer";

import * as fs from 'fs';
import * as path from 'path';

import * as hbs from 'handlebars';
import { ConfigMailerInterface, EmailProvider, ErrorPriority, EmailTemplatePath, EmailData } from "@handy/types";

export class DefaultHandyMailerService extends HandyService {

  protected settings: ConfigMailerInterface;
  protected defaultProvider: EmailProvider;
  protected defaultAccount: string;

  protected nodeMailer = nodeMailer;
  protected fs = fs;
  protected path = path;

  protected hbs = hbs;

  protected emailErrorPriority: ErrorPriority = 'high';
  protected emailResponseMessage: string;
  protected emailResponseHeadline: string;

  constructor (protected config: HandyConfigService, protected errorService: HandyErrorService) {
    super();

    this.settings = this.config.get().mailer;
    this.defaultProvider = <EmailProvider>this.settings.defaultProvider;
    this.defaultAccount = this.settings.providers[this.defaultProvider].defaultAccount;

    this.registerPartials();

    this.hbs.registerHelper('toJSON', function (objectToPretyfy) {

      let prettyJson = JSON.stringify(objectToPretyfy, null, 6)
        .replace(/\n( *)/g, function (match, p1) {
          return '<br>' + '&nbsp;'.repeat(p1.length);
        }).replace(/\"/g, '').replace(/\\/g, '/')

      return new hbs.SafeString(JSON.stringify(prettyJson));

    });

  }

  protected getTransporter(providerName: EmailProvider, accountName: string): nodeMailer.Transporter {

    let provider = this.settings.providers[providerName];
    let account = (<any>provider.accounts)[accountName];

    let secure: boolean = (provider.port === 465) ? true : false;

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

  protected getTemplate(teplatePath: EmailTemplatePath): string {

    return this.fs.readFileSync(this.path.join(__rootDir, this.settings.templatesPath, teplatePath), { encoding: 'utf-8' });

  }

  protected registerPartials() {

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

  public sendMail(emailData: EmailData): Promise<void> {

    return new Promise((resolve, reject) => {

      let {
        to,
        subject,
        template,
        data = {},
        text = this.settings.defaultTextMsg,
        attachments = null,
        provider = this.defaultProvider,
        account,
        replyTo
      } = emailData;

      if (account === undefined) {
        account = this.settings.providers[provider].defaultAccount;
      }

      let accountSettings: any = (<any>this.settings.providers)[provider].accounts[account];

      if (accountSettings === undefined) {

        if (__isDev) {
          handyErrLog(`Unknow provider account: ${account}`);
        }

        return reject(this.errorService.register(undefined, this.emailErrorPriority, 'Bad request', `Unknow provider account: ${account}`, { private: { emailData } }));

      }

      let transporter = this.getTransporter(provider, account);

      let templateSource: string = this.getTemplate(template);
      let html: string = this.hbs.compile(templateSource)(data);

      let mailOptions: Options = {
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

        })

    })

  }

}