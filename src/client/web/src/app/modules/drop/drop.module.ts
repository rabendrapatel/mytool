import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropRoutingModule } from './drop-routing.module';
import { DropComponent } from './drop.component';
import { CreateDropComponent } from './pages/create-drop/create-drop.component';
import { SharedModule } from '@ng-shared/shared.module';
import { HandyFormModule } from '@handy-ng/modules/handy-form/handy-form.module';
import { ShowDropComponent } from './pages/show-drop/show-drop.component';


@NgModule({
  declarations: [DropComponent, CreateDropComponent, ShowDropComponent],
  imports: [
    CommonModule,
    DropRoutingModule,
    SharedModule,
    HandyFormModule,
  ]
})
export class DropModule { }
