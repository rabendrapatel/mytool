import { PostApiRequest, Service } from "@handy/core";
import { HandyError, ServerRequest, ServerRequestUser, ServerResponse } from "@handy/types";
import { DropModel } from "@models";
import { HandyService, HandyErrorService, HandyUtilsService, HandyShortlinkService, HandyConfigService } from "@services";

@Service({
  singleton: true,
  routable: true,
})
export class DropService extends HandyService {

  constructor (
    private __handyError: HandyErrorService,
    private __model: DropModel,
    private __utils: HandyUtilsService,
    private __shortLink: HandyShortlinkService,
    private __config: HandyConfigService
  ) {

    super();

  }

  @PostApiRequest({
    requiredParams: {
      body: ['content', 'expiryAt']
    }
  })
  public create(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: any, body: { content: string, expiryAt: number }) {

    let { content, expiryAt } = body;
    let password: string = this.__utils.generateStrongPassword();
    this.__model.createOne({
      content,
      expiryAt,
      password
    }).then(dropContent => {

      let { _id } = dropContent;
      return this.__shortLink.generateShortlink(this.__config.getClientUrl() + 'drop/' + _id, false);

    })
      .then(url => {
        response.jsonResponse({ url, password });
      })
      .catch(err => {

        let parsedError: HandyError = this.__handyError.register(err, 'high', 'Server error', undefined, { private: 'Drop creating failed' }, request);
        response.errorResponse(parsedError);

      })

  }

  @PostApiRequest({
    requiredParams: {
      body: ['id', 'password']
    },
  })
  public authorize(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: any, body: { password: string, id: number }) {

    let { id, password } = body;

    this.__model.findById(id, { selectType: 'select', fields: ['_id', 'expiryAt', 'content', 'password'] })
      .then(dropQueryResult => {

        let { doc, foundRecord } = dropQueryResult;

        if (!foundRecord) {
          return Promise.reject(this.__handyError.register(null, 'low', 'Resource not found'));
        }

        if (doc.password !== password) {
          this.__removeDrop(id);
          return Promise.reject(this.__handyError.register(null, 'low', 'Forbidden'));
        }
        
        if (doc.expiryAt < Date.now()) {
          this.__removeDrop(id);
          return Promise.reject(this.__handyError.register(null, 'low', 'Gone'));
        }
        
        response.jsonResponse(doc.content);
        this.__removeDrop(id);

      })
      .catch(err => {

        let parsedError: HandyError = this.__handyError.register(err, 'high', 'Server error', undefined, { private: 'Drop creating failed' }, request);
        response.errorResponse(parsedError);

      })

  }

  private __removeDrop(id: number): void {

    this.__model.deleteById(id).then(() => {
      // ALl good
    })
      .catch(err => {

        let parsedError: HandyError = this.__handyError.register(err, 'high', 'Server error', undefined, { private: 'Drop creating failed' });

      })

  }

}