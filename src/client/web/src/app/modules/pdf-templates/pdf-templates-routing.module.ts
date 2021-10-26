import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfTemplatesComponent } from './pdf-templates.component';
import { ExamplePdfTemplateComponent } from './templates/example-pdf-template/example-pdf-template.component';
import { setRouteTitle } from '@handy-ng/services';

const routes: Routes = [
  { 
    path: '', 
    component: PdfTemplatesComponent,
    data: {
      pageTitle: setRouteTitle({ title: 'Pdf templating sandbox' })
    },
    children: [
      {
        path: 'example',
        component: ExamplePdfTemplateComponent,
        data: {
          pageTitle: setRouteTitle({ title: 'Example PDF template' })
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfTemplatesRoutingModule { }
