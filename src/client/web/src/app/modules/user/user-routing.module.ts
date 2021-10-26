import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserGuard } from 'src/app/guards/user.guard';
import { CompleteRegistrationComponent } from './pages/complete-registration/complete-registration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';
import { CompletRegistrationGuardCondition } from 'src/app/guards/condition-functions/complete-registration';
import { setRouteTitle } from '@handy-ng/services';

const routes: Routes = [
  { 
    path: '', 
    component: UserComponent,
    canActivate: [UserGuard],
    canActivateChild: [UserGuard],
    data: {
      pageTitle: setRouteTitle({ title: 'User settings' })
    },
    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'User profile' })
        },
      },
      {
        path: 'preferences',
        component: UserPreferencesComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'User preferences' })
        },
      },
    ]
  },
  {
    path: 'complete-registration',
    component: CompleteRegistrationComponent,
    canActivate: [UserGuard.condition({ fn: CompletRegistrationGuardCondition })],
    data: {
      pageTitle: setRouteTitle({ title: 'Complete your registration', preppendToProjName: true, projNameSeparator: 'on' })
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
