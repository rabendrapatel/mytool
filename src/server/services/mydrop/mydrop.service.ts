import { PostApiRequest, Service } from "@handy/core";
import { HandyError, ServerRequest, ServerRequestUser, ServerResponse } from "@handy/types";
import { MydropModel } from "@models";
import { HandyService, HandyErrorService, HandyUtilsService, HandyShortlinkService, HandyConfigService } from "@services";

@Service({
  singleton: true,
  routable: true,
})
export class MydropService extends HandyService {

  constructor (
    private __handyError: HandyErrorService,
    private __model: MydropModel,
    private __utils: HandyUtilsService,
    private __shortLink: HandyShortlinkService,
    private __config: HandyConfigService
    ) {

    super();

  }

  @PostApiRequest({
    requiredParams: {
      body: ['content', 'expireAt']
    }
  })
  public create(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query: any, body: { content: string, expireAt: number }) {

    let { content, expireAt } = body;
    let password: string = this.__utils.generateStrongPassword();
    this.__model.createOne({
      content,
      expireAt,
      password
    }).then(dropContent => {

      let { _id } = dropContent;
      return this.__shortLink.generateShortlink(this.__config.getClientUrl() + 'dropmsg/' + _id, false);

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

    this.__model.findById(id, { selectType: 'select', fields: ['_id', 'expireAt', 'content', 'password'] })
      .then(dropQueryResult => {

        let { doc, foundRecord } = dropQueryResult;

        if (!foundRecord) {
          return Promise.reject(this.__handyError.register(null, 'low', 'Resource not found'));
        }

        if (doc.password !== password) {
          this.__removeDrop(id);
          return Promise.reject(this.__handyError.register(null, 'low', 'Forbidden'));
        }
        
        if (doc.expireAt < Date.now()) {
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