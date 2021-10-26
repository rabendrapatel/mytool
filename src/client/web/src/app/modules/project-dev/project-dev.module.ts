import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDevRoutingModule } from './project-dev-routing.module';
import { ProjectDevComponent } from './project-dev.component';
import { SharedModule } from '@ng-shared/shared.module';


@NgModule({
  declarations: [ProjectDevComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectDevRoutingModule
  ]
})
export class ProjectDevModule { }
