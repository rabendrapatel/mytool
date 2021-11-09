import { ErrorComponent } from 'src/app/pages/error/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { setRouteTitle } from '@handy-ng/core';

import { StudentCrudComponent } from './student-crud.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentCrudComponent,
    data: {
      pageTitle: setRouteTitle({ title: 'StudentCrud management' })
    },
    children: [
      {
        path: '',
        component: StudentComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'StudentCrud table' })
        },
      },
      {
        path: 'new',
        component: StudentComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'StudentCrud new' })
        },
      },
      {
        path: 'edit/:id',
        component: StudentComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'StudentCrud edit' })
        }
      },
    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentCrudRoutingModule { }
