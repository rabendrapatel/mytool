import { ErrorComponent } from 'src/app/pages/error/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCrudComponent } from './user-crud.component';
import { UserCrudTableComponent } from './user-crud-table/user-crud-table.component';
import { UserCrudFormComponent, UserCrudFormComponentResolver } from './user-crud-form/user-crud-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserCrudComponent,
    children: [
      {
        path: '',
        component: UserCrudTableComponent, 
      },
      {
        path: 'new', 
        component: UserCrudFormComponent,
      },     
      {
        path: 'edit/:id',
        component: UserCrudFormComponent,
        resolve: {
          formData: UserCrudFormComponentResolver
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
export class UserCrudRoutingModule { }