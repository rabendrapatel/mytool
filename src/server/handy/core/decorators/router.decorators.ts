import { RoutergDecoratorSettings, RequestType, ServerResponse, ServerRequest, RoutesPrototypeHolder, UnSignedObject, ServerRequestUser } from "@handy/types";

const addRoutesHoldersToPrototype = (prototype: any): void => {

  if (prototype.__handyRequestListeners === undefined) {

    let emptyRoutesPrototypeHolder: RoutesPrototypeHolder<any>[] = [];
    prototype.__handyRequestListeners = emptyRoutesPrototypeHolder;
    prototype.__getHandyRequestListeners = (): RoutesPrototypeHolder<any>[] => {
      return prototype.__handyRequestListeners;
    }

  }

}

const addRequestListenerToPrototype = <T extends RoutergDecoratorSettings>(method: string, settings: T, requestType: RequestType, prototype: any, isApi: boolean = false): void => {

  addRoutesHoldersToPrototype(prototype);

  let listener: RoutesPrototypeHolder<T> = {
    requestType,
    settings,
    method,
    isApi
  }

  prototype.__handyRequestListeners.push(listener);

}


/* ---------------------------- Regular listeners --------------------------- */

export const GetRequest = (requestListenerSettings: Omit<RoutergDecoratorSettings, 'apiVersions'> = {}) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject) => void>) => {

    addRequestListenerToPrototype(methodName, requestListenerSettings, 'get', target.constructor.prototype);

  }

}

export const PostRequest = (requestListenerSettings: Omit<RoutergDecoratorSettings, 'apiVersions'> = {}) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject) => void>) => {

    addRequestListenerToPrototype(methodName, requestListenerSettings, 'post', target.constructor.prototype);

  }

}

export const PutRequest = (requestListenerSettings: Omit<RoutergDecoratorSettings, 'apiVersions'> = {}) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject, body?: UnSignedObject) => void>) => {

    addRequestListenerToPrototype(methodName, requestListenerSettings, 'put', target.constructor.prototype);

  }

}

export const DeleteRequest = (requestListenerSettings: Omit<RoutergDecoratorSettings, 'apiVersions'> = {}) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject) => void>) => {

    addRequestListenerToPrototype(methodName, requestListenerSettings, 'delete', target.constructor.prototype);

  }

}

/* ------------------------------ Api listeners ----------------------------- */

export const GetApiRequest = (requestListenerSettings: RoutergDecoratorSettings = {}) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: UnSignedObject) => void>) => {

    addRequestListenerToPrototype(methodName, requestListenerSettings, 'get', target.constructor.prototype, true);

  }

}

export const PostApiRequest = (requestListenerSettings: RoutergDecoratorSettings = {}) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: any, body?: any) => void>) => {

    addRequestListenerToPrototype(methodName, requestListenerSettings, 'post', target.constructor.prototype, true);

  }

}

export const PutApiRequest = (requestListenerSettings: RoutergDecoratorSettings = {}) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: any, body?: any) => void>) => {

    addRequestListenerToPrototype(methodName, requestListenerSettings, 'put', target.constructor.prototype, true);

  }

}

export const DeleteApiRequest = (requestListenerSettings: RoutergDecoratorSettings = {}) => {

  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(request: ServerRequest, response: ServerResponse, user: ServerRequestUser, query?: any) => void>) => {

    addRequestListenerToPrototype(methodName, requestListenerSettings, 'delete', target.constructor.prototype, true);

  }

}