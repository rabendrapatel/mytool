import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DefaultConfigVariableDirective } from '../core/defaults/directives/config.directive';
import { HandyNgConfigService } from '../services/handy-ng-config.service';
import { PublicConfigData } from '@handy-ng/types';

@Directive({
  selector: '[conf]',
  exportAs: 'conf',  
  providers: [
    // TemplateRef
  ]
})
export class ConfigVariableDirective extends DefaultConfigVariableDirective {

  constructor (protected __cofnig: HandyNgConfigService) {

    super(__cofnig)

  }
  

}
