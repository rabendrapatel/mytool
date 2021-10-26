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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const chalk = require('chalk');
const util_1 = require("util");
let rootPath = path.join(__dirname, '../../../../../../');
global.__rootDir = rootPath;
global.__distDir = path.join(__rootDir, 'src/server/dist/');
const rootContent = fs.readdirSync(__rootDir);
global.__behaviorEventPrefix = '__behvior_subject_event__';
// Getting enviroment
global.__env = 'dev';
global.__isDev = true;
global.__isProd = false;
global.__isStag = false;
if (rootContent.includes('stag.flag')) {
    global.__env = 'stag';
    global.__isDev = false;
    global.__isStag = true;
}
if (rootContent.includes('prod.flag')) {
    global.__env = 'prod';
    global.__isDev = false;
    global.__isProd = true;
}
// warning and error logs
global.handyErrLog = (msg) => {
    console.log();
    console.log(chalk.red('HANDY ERROR!'));
    console.log();
    if (typeof msg === 'object') {
        msg = util_1.inspect(msg, { colors: true, depth: null });
    }
    console.log(chalk.red(msg));
    console.log();
};
global.handyWarnLog = (msg) => {
    console.log();
    console.log(chalk.keyword('orange')('HANDY WARNING'));
    console.log();
    if (typeof msg === 'object') {
        msg = util_1.inspect(msg, { colors: true, depth: null });
    }
    console.log(chalk.keyword('orange')(msg));
    console.log();
};
global.handySuccessLog = (msg) => {
    console.log();
    if (typeof msg === 'object') {
        msg = util_1.inspect(msg, { colors: true, depth: null });
    }
    console.log(chalk.keyword('green')(msg));
    console.log();
};
String.prototype.UcFirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.LcFirst = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
};
// String.prototype.startsWith = function (prefix: string): boolean {
//   console.log(this, prefix);
//   return this.indexOf(prefix, 0) !== -1;
// }
// String.prototype.endsWith = function (suffix: string): boolean {
//   return this.indexOf(suffix, this.length - suffix.length) !== -1;
// };
// Fucking strange that it works only here....
global.isArray = (o) => {
    if (typeof o === 'object') {
        return Array.isArray(o);
    }
    return false;
};
global.isUndefined = (value) => {
    return (value === undefined);
};
global.isNotUndefined = (value) => {
    return !isUndefined(value);
};
global.isNull = (value) => {
    return (value === null);
};
global.isNotNull = (value) => {
    return !isNull(value);
};
global.isNullOrUndefined = (value) => {
    return (value === undefined || value === null);
};
global.isNotNullOrUndefined = (value) => {
    return !isNullOrUndefined(value);
};
global.isEmptyObject = (value) => {
    return Object.keys(value).length === 0 && value.constructor === Object;
};
global.isNotEmptyObject = (value) => {
    return !isEmptyObject(value);
};
global.isEmpty = (value) => {
    return (isNullOrUndefined(value) || (typeof value === 'string' && value === '') || (isArray(value) && value.length === 0) || (typeof value === 'object' && isEmptyObject(value)));
};
global.isNotEmpty = (value) => {
    return !isEmpty(value);
};
//# sourceMappingURL=globals.js.map