import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { HandyNgConfigService } from '../../../services/handy-ng-config.service';
import { PublicConfigData } from '@handy-ng/types';

// @Directive()
export class DefaultConfigVariableDirective {

  public data: PublicConfigData;

  constructor (protected __cofnig: HandyNgConfigService) {

    this.data = this.__cofnig.data;

  }

}
