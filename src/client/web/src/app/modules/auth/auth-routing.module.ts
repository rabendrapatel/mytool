import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/forms/login/login.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { AuthMessageComponent } from './pages/auth-message/auth-message.component';
import { EmailRequestComponent } from './components/forms/email-request/email-request.component';
import { PasswordResetComponent } from './components/forms/password-reset/password-reset.component';
import { UserGuard } from 'src/app/guards/user.guard';
import { setRouteTitle } from '@handy-ng/services';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    data: {
      pageTitle: setRouteTitle({ title: 'Auth', preppendToProjName: true }),
    },
    children: [
      {
        path: 'login',
        canActivate: [UserGuard.condition({ notLoggedInOnly: true })],
        component: LoginComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'Login', preppendToProjName: true }),
        }
      },
      {
        path: 'register',
        canActivate: [UserGuard.condition({ notLoggedInOnly: true })],
        component: RegisterComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'Register', preppendToProjName: true }),
        }
      },
      {
        path: 'auth-msg',
        component: AuthMessageComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'Auth message' }),
        }
      },
      {
        path: 'email-request/:action',
        canActivate: [UserGuard.condition({ notLoggedInOnly: true })],
        component: EmailRequestComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'Auth request' }),
        }
      },
      {
        path: 'password-reset/:email/:hash',
        canActivate: [UserGuard.condition({ notLoggedInOnly: true })],
        component: PasswordResetComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'New password', preppendToProjName: true, projNameSeparator: 'for' }),
        }
      },
      {
        path: 'invitation-password-set/:email/:hash',
        canActivate: [UserGuard.condition({ notLoggedInOnly: true })],
        component: PasswordResetComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'New password', preppendToProjName: true, projNameSeparator: 'for' }),
        }
      },
      {
        path: 'logout',
        component: AuthMessageComponent,
        data: {
          action: 'logout',
          pageTitle: setRouteTitle({ title: 'Logout', preppendToProjName: true }),
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
