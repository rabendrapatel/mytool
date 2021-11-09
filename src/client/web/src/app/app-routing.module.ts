// import { ErrorComponent } from './pages/error/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from 'src/app/pages/error/error.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserGuard } from './guards/user.guard';
import { HomePageGuardCondition } from './guards/condition-functions/home-page';
import { setRouteTitle } from '@handy-ng/services';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        // ? Guard for avoinding redirect flicker from homepage to dashboard...
        canActivate: [UserGuard.condition({ fn: HomePageGuardCondition })],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [UserGuard],
        data: {
          pageTitle: setRouteTitle({ title: 'Dashboard' })
        },
      },
      {
        path: '',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'dev',
    loadChildren: () => import('./handy/modules/dev/dev.module').then(m => m.DevModule),
    data: {
      pageTitle: setRouteTitle({ title: 'Dev module' })
    },
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      pageTitle: setRouteTitle({ title: 'Error', preppendToProjName: true })
    },
  },
  // {
  //   path: 'drop',
  //   loadChildren: () => import('./modules/drop-crud/drop-crud.module').then(m => m.DropCrudModule),
  //   data: {
  //     pageTitle: setRouteTitle({ title: 'Dead drop' })
  //   },
  // },
  {
    path: 'pdf-templates',
    loadChildren: () => import('./modules/pdf-templates/pdf-templates.module').then(m => m.PdfTemplatesModule)
  },
  {
    path: 'drop',
    loadChildren: () => import('./modules/drop/drop.module').then(m => m.DropModule),
    data: {
      pageTitle: setRouteTitle({ title: 'Dead drop' })
    },
  },
  {
    path: 'mydrop',
    loadChildren: () => import('./modules/my-drop/my-drop.module').then(m => m.MyDropModule),
    data: {
      pageTitle: setRouteTitle({ title: 'My Dead drop' })
    },
  },
  {
    path: 'dropmsg',
    loadChildren: () => import('./modules/dropmsg/dropmsg.module').then(m => m.DropmsgModule) ,
    data: {
      pageTitle: setRouteTitle({ title: 'Dead drop Msg' })
    },
  },
  {
    path: 'student',
    loadChildren: () => import('./modules/student-crud/student-crud.module').then(m => m.StudentCrudModule),
  },
  {
    path: '**',
    component: ErrorComponent,
    data: {
      code: '404'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // ! needed for Universal...
    initialNavigation: 'enabled',

    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
