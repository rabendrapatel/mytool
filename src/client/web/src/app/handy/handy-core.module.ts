import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { HandyNgCoreService } from './services';
import { onStateLoadedResolverFactory } from './extenders';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserTransferStateModule,
    HttpClientXsrfModule.disable(),
    HttpClientModule
  ]
})
export class HandyCoreModule {
  static forRoot(): ModuleWithProviders<HandyCoreModule> {
    return {
      ngModule: HandyCoreModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: onStateLoadedResolverFactory,
          deps: [HandyNgCoreService],
          multi: true,
        }
      ]
    };
  }
}
