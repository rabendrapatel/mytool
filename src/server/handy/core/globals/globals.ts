import * as fs from 'fs';
import * as path from 'path';
const chalk = require('chalk');

import { inspect } from 'util';

let rootPath: string = path.join(__dirname, '../../../../../../');
global.__rootDir = rootPath;
global.__distDir = path.join(__rootDir, 'src/server/dist/');

const rootContent: string[] = fs.readdirSync(__rootDir);

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
global.handyErrLog = (msg: any) => {
  console.log();
  console.log(chalk.red('HANDY ERROR!'));
  console.log();

  if (typeof msg === 'object') {
    msg = inspect(msg, { colors: true, depth: null });
  }

  console.log(chalk.red(msg));
  console.log();

}

global.handyWarnLog = (msg: any) => {
  console.log();
  console.log(chalk.keyword('orange')('HANDY WARNING'));
  console.log();

  if (typeof msg === 'object') {
    msg = inspect(msg, { colors: true, depth: null });
  }

  console.log(chalk.keyword('orange')(msg));
  console.log();
}

global.handySuccessLog = (msg: any) => {
  console.log();

  if (typeof msg === 'object') {
    msg = inspect(msg, { colors: true, depth: null });
  }

  console.log(chalk.keyword('green')(msg));
  console.log();
}

String.prototype.UcFirst = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

String.prototype.LcFirst = function () {
  return this.charAt(0).toLowerCase() + this.slice(1)
}

// String.prototype.startsWith = function (prefix: string): boolean {

//   console.log(this, prefix);

//   return this.indexOf(prefix, 0) !== -1;
// }

// String.prototype.endsWith = function (suffix: string): boolean {
//   return this.indexOf(suffix, this.length - suffix.length) !== -1;
// };

// Fucking strange that it works only here....
global.isArray = (o: any) => {

  if (typeof o === 'object') {
    return Array.isArray(o);
  }

  return false;

}

global.isUndefined = (value: any) => {

  return (value === undefined);

}

global.isNotUndefined = (value: any) => {

  return !isUndefined(value);

}

global.isNull = (value: any) => {

  return (value === null);

}

global.isNotNull = (value: any) => {

  return !isNull(value);

}

global.isNullOrUndefined = (value: any) => {

  return (value === undefined || value === null);

}

global.isNotNullOrUndefined = (value: any) => {

  return !isNullOrUndefined(value);

}

global.isEmptyObject = (value: Object) => {

  return Object.keys(value).length === 0 && value.constructor === Object;

}

global.isNotEmptyObject = (value: Object) => {

  return !isEmptyObject(value);

}

global.isEmpty = (value: any) => {
  return (isNullOrUndefined(value) || (typeof value === 'string' && value === '') || (isArray(value) && value.length === 0) || (typeof value === 'object' && isEmptyObject(value)));
}

global.isNotEmpty = (value: any) => {

  return !isEmpty(value);

}