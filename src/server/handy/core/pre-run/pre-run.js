const fs = require('fs');
const path = require('path');
const utils = require('./utils');

const rootPath = path.join(__dirname, '../../../../../');
const configPath = path.join(__dirname, '../../../../../handy.json');
const configTypesFilePath = path.join(__dirname, '../../types/dynamic-types/config.d.ts');

const webClientConfigTypesFilePath = path.join(__dirname, '../../../../client/web/src/app/handy/types/dynamic-types/handy-public-config.ts');
const webClientConfigTypesExists = fs.existsSync(webClientConfigTypesFilePath);

let configData = JSON.parse(fs.readFileSync(configPath), { encoding: 'utf-8' });
const settingsList = Object.keys(configData);
const settingLen = settingsList.length;

let originalTypes = fs.readFileSync(configTypesFilePath, {encoding: 'utf-8'});
let finalTypes = '';

// Generating configSetting type in config.ts
let configSettingTypeStarter = `/// Config types and interfaces\nexport type ConfigSetting = keyof ConfigData;\n\n`;
finalTypes += configSettingTypeStarter;

// Genarating setting interface
let configDataInterface = `export interface ConfigData {`;
let publicConfigDataInterface = `type ConfigEnv = { env?: 'dev' | 'stag' | 'prod' }; \n\nexport interface PublicConfigData extends ConfigEnv {`;
let separateInterfaces = [];
let publicSeparateInterfaces = [];

const parseObjToInterface = (name, obj, level, custom = false) => {

  let result = (name === undefined || custom) ? '' : `'${name}': `;

  for (let i = 0; i < level; i++) {
    result = '  ' + result;
  }

  result = `\n` + result;

  if (typeof obj === 'object' && !Array.isArray(obj)) {

    result += '{';
    let keys = Object.keys(obj);
    let keysLen = keys.length;

    for (let i = 0; i < keysLen; i++) {
      let key = keys[i];
      let name = (!isNaN(key)) ? `'${key}'` : key;

      result += parseObjToInterface(name, obj[key], level + 1);

    }

    result += `\n`;
    for (let i = 0; i < level; i++) {
      result += '  ';
    }

    result += '}';

  } else {

    if (Array.isArray(obj)) {

      result += '[';

      let arrLen = obj.length;
      for (let i = 0; i < arrLen; i++) {
        const value = obj[i];

        switch (typeof value) {
          case 'string':
            result += `'${value}'`
            break;

          case 'number':
            result += `${value}`
            break;

          default:

            result += parseObjToInterface(undefined, value, level + 1);

            break;
        }

        if ((i + 1) !== arrLen) {
          result += ' |';
          continue;
        }

      }

      result += ']';

    } else {

      if (typeof obj === 'undefined') {
        
        throw new Error('Wrong config setting. Missing env type in ' + name);

      }
      result += typeof obj;
    }

  }

  if (!custom) {
    result = result + `,`;
  }

  return result;

}

for (let i = 0; i < settingLen; i++) {

  const settingName = settingsList[i];
  let { val, stagVal, devVal, public = false, generateInterface = false, interfaceName = `Config${utils.UcFirst(settingName)}Interface`} = configData[settingName];

  let intf = '';
  let nestLevel = (generateInterface) ? 0 : 1;

  intf = parseObjToInterface(settingName, val, nestLevel, generateInterface);

  if (!generateInterface) {

    configDataInterface += intf;
    if (public) {
      publicConfigDataInterface += intf;
    }

  } else {

    configDataInterface += `\n  ${settingName}: ${interfaceName},`; 
    
    let separateIntf = {
      interfaceName,
      intf: intf.replace(/(^[ \t]*\n)/gm, '')
    }
    
    separateInterfaces.push(separateIntf);
    
    if (public) {
      publicConfigDataInterface += `\n  ${settingName}: ${interfaceName},`; 
      publicSeparateInterfaces.push(separateIntf);
    }

  }

}

let separateIntfStr = '';
let separateIntfLen = separateInterfaces.length;
for (let i = 0; i < separateIntfLen; i++) {
  const intf = separateInterfaces[i];
  
  if (intf.intf.includes('{')) {
    separateIntfStr += `export interface ${intf.interfaceName.charAt(0).toUpperCase() + intf.interfaceName.slice(1)} ${intf.intf} \n\n`;
  } else {
    separateIntfStr += `export type ${intf.interfaceName.charAt(0).toUpperCase() + intf.interfaceName.slice(1)} = ${intf.intf}; \n\n`;
  }

}

configDataInterface += `\n}`;
publicConfigDataInterface += `\n}`;

configDataInterface = configDataInterface.replace(/(^[ \t]*\n)/gm, '');
publicConfigDataInterface = publicConfigDataInterface.replace(/(^[ \t]*\n)/gm, '');

finalTypes += separateIntfStr + configDataInterface + `\n\n` + publicConfigDataInterface;

let errorConfig = configData['errors'].val;
let devErrorConfig = configData['errors'].devVal;

if (devErrorConfig !== undefined) {
  errorConfig = {...errorConfig, devErrorConfig};
}
let responses = Object.keys(errorConfig['defaultResponses']);
let responsesLen = responses.length;

let errorCodesTypeStr = `\n\n///Other types and interfaces\nexport type ErrorReasons =`
for (let i = 0; i < responsesLen; i++) {
  const response = responses[i];
  
  errorCodesTypeStr += ` '${response}'`

  if ((i + 1) !== responsesLen) {
    errorCodesTypeStr += ' |';
    continue;
  }

  errorCodesTypeStr += ';';
}

finalTypes += errorCodesTypeStr;

// UserRoles
let UserRoleType = `\n\n///User role type \nexport type UserRole = keyof ConfigData['usersRoles'];`
finalTypes += UserRoleType;

// UserRoles
let usersGroupType = `\n\n///Users Group type \nexport type UserGroup = keyof ConfigData['userGroups'];`
finalTypes += usersGroupType;

// UserRoles
let additonalAccesPermission = `\n\n///Users Group type \nexport type AdditionalAccessPermission = keyof ConfigData['additionalAccessPermissionsSettings'];`
finalTypes += additonalAccesPermission;

// Email Providers
let emailProviderType = `\n\n///Email provider \nexport type EmailProvider = keyof ConfigData['mailer']['providers'];`
finalTypes += emailProviderType;

// Email Templates

let mailerTemplatesPath = path.join(rootPath, configData.mailer.val.templatesPath);

let mailerTemplatesList = [];
const getMailerTemplates = (dirPath) => {

  let folderContent = fs.readdirSync(dirPath);
  let folderContentLen = folderContent.length;

  for (let i = 0; i < folderContentLen; i++) {
    const contentPath = path.join(dirPath, folderContent[i]);
    let isDir = fs.lstatSync(contentPath).isDirectory();

    if (isDir) {
      getMailerTemplates(contentPath);
    } else {
      if (contentPath.endsWith('.hbs')) {
        mailerTemplatesList.push(contentPath.replace(mailerTemplatesPath, '').replace(/\\/g, '/').replace('/', ''));
      }
    }

  }

}

getMailerTemplates(mailerTemplatesPath);

let mailerTemplatesListLen = mailerTemplatesList.length;

let emailTemplatePathType = `\n\n///Email templates list \nexport type EmailTemplatePath =`
for (let i = 0; i < mailerTemplatesListLen; i++) {
  const template = mailerTemplatesList[i];
  
  emailTemplatePathType += ` '${template}'`

  if ((i + 1) !== mailerTemplatesListLen) {
    emailTemplatePathType += ' |';
    continue;
  }

  emailTemplatePathType += ';';
}

finalTypes += emailTemplatePathType;


if (originalTypes !== finalTypes) {
  fs.writeFileSync(configTypesFilePath, finalTypes, { encoding: 'utf-8' });
}