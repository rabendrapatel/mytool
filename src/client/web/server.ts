import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';

export const ANG_BASE_HREF = APP_BASE_HREF;

export function engine() {
  return ngExpressEngine({
    bootstrap: AppServerModule,
  });
} 

export * from './src/main.server';
