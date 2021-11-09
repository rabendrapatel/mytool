import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HandyFormModule } from '@handy-ng/modules/handy-form/handy-form.module';
import { HandyTableModule } from '@handy-ng/modules/handy-table/handy-table.module';

import { StudentCrudRoutingModule } from './student-crud-routing.module';
import { StudentCrudComponent } from './student-crud.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    StudentCrudComponent,
    StudentComponent,
  ],
  imports: [
    HandyFormModule,
    HandyTableModule,
    CommonModule,
    SharedModule,
    StudentCrudRoutingModule
  ]
})
export class StudentCrudModule { }

/* -------------------------------------------------------------------------- */
/*                                Lazy loading                                */
/* -------------------------------------------------------------------------- */

/*
  {
    path: '',
    loadChildren: () => import('./modules/student-crud/student-crud.module').then(m => m.StudentCrudModule),
  },

*/
