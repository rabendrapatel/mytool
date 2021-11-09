import { ErrorComponent } from 'src/app/pages/error/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { setRouteTitle } from '@handy-ng/core';

import { MyDropComponent } from './my-drop.component';
import { MydropCrudTableComponent } from './mydrop-crud-table/mydrop-crud-table.component';

const routes: Routes = [
  {
    path: '',
    component: MyDropComponent,
    data: {
      pageTitle: setRouteTitle({ title: 'MyDrop management' })
    },
    children: [
      {
        path: '',
        component: MydropCrudTableComponent, 
        data: {
          pageTitle: setRouteTitle({ title: 'MyDrop table' })
        },
      },
    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDropRoutingModule { }