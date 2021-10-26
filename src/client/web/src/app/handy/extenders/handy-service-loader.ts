import { DefaultHandyServiceLoadedHandler } from '@handy-ng/core/defaults/extenders';

export class HandyServiceLoadedHandler extends DefaultHandyServiceLoadedHandler {}

export function onStateLoadedResolverFactory(provider: any) {
  return () => provider.onStateLoadedPromise();
}