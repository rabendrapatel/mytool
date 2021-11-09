import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HandyFormModule } from '@handy-ng/modules/handy-form/handy-form.module';
import { HandyTableModule } from '@handy-ng/modules/handy-table/handy-table.module';

import { MyDropRoutingModule } from './my-drop-routing.module';
import { MyDropComponent } from './my-drop.component';
import { MydropCrudFormComponent } from './mydrop-crud-form/mydrop-crud-form.component';
import { MydropCrudTableComponent } from './mydrop-crud-table/mydrop-crud-table.component';

@NgModule({
  declarations: [
    MyDropComponent,
    MydropCrudFormComponent,
    MydropCrudTableComponent,
  ],
  imports: [
    HandyFormModule,
    HandyTableModule,
    CommonModule,
    SharedModule,
    MyDropRoutingModule
  ]
})
export class MyDropModule { }

/* -------------------------------------------------------------------------- */
/*                                Lazy loading                                */
/* -------------------------------------------------------------------------- */

/*
  {
    path: '',
    loadChildren: () => import('./modules/my-drop/my-drop.module').then(m => m.MyDropModule),
  },

*/