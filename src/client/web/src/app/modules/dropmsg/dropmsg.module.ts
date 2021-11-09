import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropmsgRoutingModule } from './dropmsg-routing.module';
import { DropmsgComponent } from './dropmsg.component';
import { CreateDropMsgComponent } from './pages/create-drop-msg/create-drop-msg.component';
import { SharedModule } from '@ng-shared/shared.module';
import { HandyFormModule } from '@handy-ng/modules/handy-form/handy-form.module';
import { ShowDropMsgComponent } from './pages/show-drop-msg/show-drop-msg.component';


@NgModule({
  declarations: [DropmsgComponent, CreateDropMsgComponent, ShowDropMsgComponent],
  imports: [
    CommonModule,
    SharedModule,
    HandyFormModule,
    DropmsgRoutingModule
  ]
})
export class DropmsgModule { }
