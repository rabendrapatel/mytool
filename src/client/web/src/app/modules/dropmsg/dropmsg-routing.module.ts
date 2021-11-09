import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropmsgComponent } from './dropmsg.component';
import { CreateDropMsgComponent } from './pages/create-drop-msg/create-drop-msg.component';
import { ShowDropMsgComponent } from './pages/show-drop-msg/show-drop-msg.component';

const routes: Routes = [
  {
    path: '',
    component: DropmsgComponent ,
    children : [
      {
        path : '',
        component : CreateDropMsgComponent
      },
      {
        path : ':id',
        component : ShowDropMsgComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropmsgRoutingModule { }
