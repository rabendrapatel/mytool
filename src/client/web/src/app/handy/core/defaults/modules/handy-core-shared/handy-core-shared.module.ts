import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportsModule } from '../../../../../modules/shared/material-imports/material-imports.module';
import { PlatformModule } from '@angular/cdk/platform';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HandyIconComponent } from './components/handy-icon/handy-icon.component';
import { ConfirmClickDialogComponent } from './components/confirm-click-dialog/confirm-click-dialog.component';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';
import { BasicBtnComponent } from './components/buttons/basic-btn/basic-btn.component';
import { RaisedBtnComponent } from './components/buttons/raised-btn/raised-btn.component';
import { StrokedBtnComponent } from './components/buttons/stroked-btn/stroked-btn.component';
import { FlatBtnComponent } from './components/buttons/flat-btn/flat-btn.component';
import { IconBtnComponent } from './components/buttons/icon-btn/icon-btn.component';
import { FabBtnComponent } from './components/buttons/fab-btn/fab-btn.component';
import { MiniFabBtnComponent } from './components/buttons/mini-fab-btn/mini-fab-btn.component';
import { FormActionsBarComponent } from './components/form-actions-bar/form-actions-bar.component';
import { FileThumbComponent } from './components/file-thumb/file-thumb.component';

import { DevEnvDirective } from '@handy-ng/directives/dev-env.directive';
import { StagEnvDirective } from '@handy-ng/directives/stag-env.directive';
import { ProdEnvDirective } from '@handy-ng/directives/prod-env.directive';
import { IsBrowserDirective } from '@handy-ng/directives/is-browser.directive';
import { IsServerDirective } from '@handy-ng/directives/is-server.directive';
import { IsAndroidDirective } from '@handy-ng/directives/is-android.directive';
import { IsIosDirective } from '@handy-ng/directives/is-ios.directive';
import { XsLayoutDirective } from '@handy-ng/directives/xs-layout.directive';
import { XlLayoutDirective } from '@handy-ng/directives/xl-layout.directive';
import { LgLayoutDirective } from '@handy-ng/directives/lg-layout.directive';
import { MdLayoutDirective } from '@handy-ng/directives/md-layout.directive';
import { SmLayoutDirective } from '@handy-ng/directives/sm-layout.directive';
import { IsMobileDirective } from '@handy-ng/directives/is-mobile.directive';
import { IsDesktopDirective } from '@handy-ng/directives/is-desktop.directive';
import { EnviromentsOnlyDirective } from '@handy-ng/directives/enviroments-only.directive';
import { BreakpointsOnlyDirective } from '@handy-ng/directives/breakpoints-only.directive';
import { GroupsOnlyDirective } from '@handy-ng/directives/groups-only.directive';
import { PermissionsOnlyDirective } from '@handy-ng/directives/permissions-only.directive';
import { RolesOnlyDirective } from '@handy-ng/directives/roles-only.directive';
import { LoggedInOnlyDirective } from '@handy-ng/directives/logged-in-only.directive';
import { NotLoggedInOnlyDirective } from '@handy-ng/directives/not-logged-in-only.directive';
import { HandyTimeZonePipe } from '@handy-ng/pipes/handy-timezone.pipe';
import { HandyDatePipe } from '@handy-ng/pipes/handy-date.pipe';
import { TruncatePipe } from '@handy-ng/pipes/truncate.pipe';
import { ConfirmClickDirective } from '@handy-ng/directives/confirm-click.directive';
import { HandyTimePipe } from '@handy-ng/pipes/handy-time.pipe';

@NgModule({
  declarations: [
    DevEnvDirective, StagEnvDirective, ProdEnvDirective, IsBrowserDirective,
    IsServerDirective, IsAndroidDirective, IsIosDirective, XsLayoutDirective,
    SmLayoutDirective, MdLayoutDirective, LgLayoutDirective, XlLayoutDirective,
    IsMobileDirective, IsDesktopDirective, EnviromentsOnlyDirective, BreakpointsOnlyDirective,
    LoggedInOnlyDirective, RolesOnlyDirective, PermissionsOnlyDirective, GroupsOnlyDirective,
    NotLoggedInOnlyDirective, HandyIconComponent, TruncatePipe, HandyDatePipe, HandyTimeZonePipe, 
    ConfirmClickDialogComponent, ConfirmClickDirective, HandyTimePipe, GlobalLoaderComponent,
    BasicBtnComponent, RaisedBtnComponent, StrokedBtnComponent, FlatBtnComponent, IconBtnComponent, 
    FabBtnComponent, MiniFabBtnComponent, FormActionsBarComponent, FileThumbComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    MaterialImportsModule,
    PlatformModule,
    LayoutModule,
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [
    MaterialImportsModule, DevEnvDirective, StagEnvDirective, ProdEnvDirective, IsBrowserDirective,
    IsServerDirective, IsAndroidDirective, IsIosDirective, XsLayoutDirective,
    SmLayoutDirective, MdLayoutDirective, LgLayoutDirective, XlLayoutDirective,
    IsMobileDirective, IsDesktopDirective, EnviromentsOnlyDirective, BreakpointsOnlyDirective,
    LoggedInOnlyDirective, RolesOnlyDirective, PermissionsOnlyDirective, GroupsOnlyDirective,
    NotLoggedInOnlyDirective, HandyIconComponent, TruncatePipe, HandyDatePipe, HandyTimeZonePipe, ConfirmClickDirective,
    HandyTimePipe, GlobalLoaderComponent, BasicBtnComponent, RaisedBtnComponent, StrokedBtnComponent,
    FlatBtnComponent, IconBtnComponent, FabBtnComponent, MiniFabBtnComponent,
    LayoutModule, FlexLayoutModule, FormActionsBarComponent, FileThumbComponent
  ]
})
export class HandyCoreSharedModule { }
