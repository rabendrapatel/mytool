import { Middleware } from '@handy/core';
import { DefaultHandyMiddleware } from '@handy/core/defaults/controllers/middlewares/default-handy.middleware';

@Middleware()
export class HandyMiddleware extends DefaultHandyMiddleware {}