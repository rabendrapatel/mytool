import { Inject } from '@handy/core';
import { ServerMiddleware, ServerRequest, ServerResponse, NextFn, HandyError } from '@handy/types';
import { HandyErrorService } from '@services';
import { Application } from 'express';

export class DefaultHandyErrorMiddleware implements ServerMiddleware {

  protected errorService: HandyErrorService = Inject(HandyErrorService);
  constructor () { }

  middleware(app: Application): void {

    app.use((request: ServerRequest, response: ServerResponse, next: NextFn) => {

      return next(this.errorService.register(null, 'low', 'Resource not found', undefined, undefined, request, response));

    })

    app.use((error: any, request: ServerRequest, response: ServerResponse, next: any) => {

      let err = this.errorService.register(error, 'medium', 'Server error', undefined, undefined, request);
      return response.errorResponse(err);

    })

  }

}