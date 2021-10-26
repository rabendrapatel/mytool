import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfTemplatesRoutingModule } from './pdf-templates-routing.module';
import { PdfTemplatesComponent } from './pdf-templates.component';
import { PdfGeneratorOptionsComponent } from './components/pdf-generator-options/pdf-generator-options.component';
import { SharedModule } from '@ng-shared/shared.module';
import { HandyFormModule } from '@handy-ng/modules/handy-form/handy-form.module';
import { ExamplePdfTemplateComponent } from './templates/example-pdf-template/example-pdf-template.component';


@NgModule({
  declarations: [
    PdfTemplatesComponent, PdfGeneratorOptionsComponent, ExamplePdfTemplateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HandyFormModule,
    PdfTemplatesRoutingModule
  ]
})
export class PdfTemplatesModule { }
