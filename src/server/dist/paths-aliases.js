"use strict";
// @ts-ignore
const aliasesRegistry = require('module-alias');
aliasesRegistry.addAliases({
    '@handy': __dirname + '/handy/',
    '@services': __dirname + '/services/',
    '@routeControllers': __dirname + '/controllers/routes/',
    '@socketControllers': __dirname + '/controllers/sockets/',
    '@middlewares': __dirname + '/controllers/middlewares/',
    '@models': __dirname + '/models/',
    '@modules': __dirname + '/modules/',
    '@validators': __dirname + '/validators/'
});
//# sourceMappingURL=paths-aliases.js.map