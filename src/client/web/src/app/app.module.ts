import { BrowserModule, HammerModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HandyCoreModule } from '@handy-ng/handy-core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';

import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HandyTrackingModule } from './handy/modules/handy-tracking/handy-tracking.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HandyCoreModule.forRoot(),
    BrowserAnimationsModule,
    HammerModule, 
    SharedModule,
    AppRoutingModule,
    HandyTrackingModule
  ],
  providers: [
    Title,
    Meta
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
