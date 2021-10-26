import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '@ng-shared/shared.module';
import { HandyFormModule } from '@handy-ng/modules/handy-form/handy-form.module';
import { CompleteRegistrationComponent } from './pages/complete-registration/complete-registration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';

@NgModule({
  declarations: [
    UserComponent,
    CompleteRegistrationComponent,
    UserProfileComponent,
    UserPreferencesComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    HandyFormModule,
    UserRoutingModule
  ],
})
export class UserModule { }
