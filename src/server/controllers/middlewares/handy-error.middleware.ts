import { Middleware } from '@handy/core';
import { DefaultHandyErrorMiddleware } from '@handy/core/defaults/controllers/middlewares/default-handy-error.middleware';

@Middleware({ 
  errorMiddleware: true
})
export class HandyErrorMiddleware extends DefaultHandyErrorMiddleware {}
