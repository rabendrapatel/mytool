import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevComponent } from './dev.component';
import { UserGuard } from 'src/app/guards/user.guard';
import { SandboxComponent } from './pages/sandbox/sandbox.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    component: DevComponent,
    canActivate: [UserGuard.condition({ roles: ['superAdmin' ]})],
    canActivateChild: [UserGuard.condition({ roles: ['superAdmin'] })],
    children: [
      {
        path: 'sandbox',
        component: SandboxComponent
      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'testcrud',
        loadChildren: () => import('./modules/user-crud/user-crud.module').then(m => m.UserCrudModule),
      },
      {
        path: 'project',
        loadChildren: () => import('../../../modules/project-dev/project-dev.module').then(m => m.ProjectDevModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevRoutingModule { }
