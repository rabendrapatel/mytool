import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { HandyFormModule } from '@handy-ng/modules/handy-form/handy-form.module';
import { LoginComponent } from './components/forms/login/login.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { AuthMessageComponent } from './pages/auth-message/auth-message.component';
import { EmailRequestComponent } from './components/forms/email-request/email-request.component';
import { PasswordResetComponent } from './components/forms/password-reset/password-reset.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    AuthMessageComponent,
    EmailRequestComponent,
    PasswordResetComponent
  ],
  imports: [
    HandyFormModule,
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    EmailRequestComponent,
    PasswordResetComponent
  ]
})
export class AuthModule { }
