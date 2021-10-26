import { DefaultModelsRoutingRestrinctions, ServerRequest, ServerResponse } from "@handy/types";

export const defaultModelsMethodsRoutingRestrinctions: DefaultModelsRoutingRestrinctions = {

  default: {
    // permissions: ['second'],
    // groups: ['free'],
    // env: ['dev', 'prod'],
    // publicRoute: false,
    // apiVersions: ['1'],
  },
  // actions: {
  //   create: {
  //     default: {
  //       // apiVersions: ['2-5'],
  //       publicRoute: false,
  //     },
  //     createMany: {
        
  //       // accessValidationfn(request: ServerRequest, response: ServerResponse)
  //       requiredParams: { body: ['docs'] }
  //     }
  //   }
  // }

}