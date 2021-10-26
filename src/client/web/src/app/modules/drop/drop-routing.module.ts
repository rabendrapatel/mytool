import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropComponent } from './drop.component';
import { CreateDropComponent } from './pages/create-drop/create-drop.component';
import { ShowDropComponent } from './pages/show-drop/show-drop.component';

const routes: Routes = [
  {
    path: '',
    component: DropComponent,
    children: [
      {
        path: '',
        component: CreateDropComponent
      },
      {
        path: ':id',
        component: ShowDropComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropRoutingModule { }
