import { HandyNgConfigService } from '@handy-ng/services';
import { TemplateRef, ViewContainerRef, Input, Directive } from '@angular/core';

@Directive()
export class DefaultEnviromentsOnlyDirective {

  protected hasElement: boolean = false;

  @Input() set handyEnv(env: EnvType | EnvType[]) {

    let envs: EnvType[] = (Array.isArray(env)) ? env : [env]; 
    let envsLen: number = envs.length;
    let isMatch: boolean = false;

    for (let i = 0; i < envsLen; i++) {
      const sinleEnv: EnvType = envs[i];
      
      if (this._handyNgConfig.isEnv(sinleEnv)) {
        isMatch = true;
        break;
      }

    }

    if (isMatch && !this.hasElement) {
      this.vCref.createEmbeddedView(this.templateRef);
      this.hasElement = true;
      return;
    } 
    
    if (!isMatch && this.hasElement) {
      this.hasElement = false;
      this.vCref.clear();
    }

  }

  constructor (protected _handyNgConfig: HandyNgConfigService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) {}

}
