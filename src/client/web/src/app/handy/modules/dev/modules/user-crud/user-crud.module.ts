import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HandyFormModule } from '@handy-ng/modules/handy-form/handy-form.module';
import { HandyTableModule } from '@handy-ng/modules/handy-table/handy-table.module';

import { UserCrudRoutingModule } from './user-crud-routing.module';
import { UserCrudComponent } from './user-crud.component';
import { UserCrudFormComponent } from './user-crud-form/user-crud-form.component';
import { UserCrudTableComponent } from './user-crud-table/user-crud-table.component';

@NgModule({
  declarations: [
    UserCrudComponent,
    UserCrudFormComponent,
    UserCrudTableComponent,
  ],
  imports: [
    HandyFormModule,
    HandyTableModule,
    CommonModule,
    SharedModule,
    UserCrudRoutingModule
  ]
})
export class UserCrudModule { }

/* -------------------------------------------------------------------------- */
/*                                Lazy loading                                */
/* -------------------------------------------------------------------------- */

/*
  {
    path: '',
    loadChildren: () => import('path to this file ending with: /user-crud/user-crud.module').then(m => m.UserCrudModule),
  },

*/