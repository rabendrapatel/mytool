/// <reference types="node" />
import { HandyService, HandyConfigService, HandyErrorService } from "@services";
import * as nodeMailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as hbs from 'handlebars';
import { ConfigMailerInterface, EmailProvider, ErrorPriority, EmailTemplatePath, EmailData } from "@handy/types";
export declare class DefaultHandyMailerService extends HandyService {
    protected config: HandyConfigService;
    protected errorService: HandyErrorService;
    protected settings: ConfigMailerInterface;
    protected defaultProvider: EmailProvider;
    protected defaultAccount: string;
    protected nodeMailer: typeof nodeMailer;
    protected fs: typeof fs;
    protected path: typeof path;
    protected hbs: typeof hbs;
    protected emailErrorPriority: ErrorPriority;
    protected emailResponseMessage: string;
    protected emailResponseHeadline: string;
    constructor(config: HandyConfigService, errorService: HandyErrorService);
    protected getTransporter(providerName: EmailProvider, accountName: string): nodeMailer.Transporter;
    protected getTemplate(teplatePath: EmailTemplatePath): string;
    protected registerPartials(): void;
    sendMail(emailData: EmailData): Promise<void>;
}
