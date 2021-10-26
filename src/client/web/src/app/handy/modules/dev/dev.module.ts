import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevRoutingModule } from './dev-routing.module';
import { DevComponent } from './dev.component';
import { SharedModule } from '@ng-shared/shared.module';
import { SandboxComponent } from './pages/sandbox/sandbox.component';
import { UploadComponent } from './pages/upload/upload.component';
import { HandyFormModule } from '../handy-form/handy-form.module';

@NgModule({
  declarations: [DevComponent, SandboxComponent, UploadComponent],
  imports: [
    CommonModule,
    SharedModule,
    HandyFormModule,
    DevRoutingModule
  ]
})
export class DevModule { }
