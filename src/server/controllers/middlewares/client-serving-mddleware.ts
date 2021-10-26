import { Middleware } from '@handy/core';
import { DefaultClientServingMiddleware } from '@handy/core/defaults/controllers/middlewares/default-client-serving.middleware';

@Middleware({ clientServingMiddleware: true })
export class ClientServingMiddleware extends DefaultClientServingMiddleware {}