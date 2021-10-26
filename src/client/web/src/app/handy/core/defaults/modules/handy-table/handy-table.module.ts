import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandyTablePaginatorComponent } from './components/handy-table-paginator/handy-table-paginator.component';
import { HandyTableComponent } from './components/handy-table/handy-table.component';
import { HandyTableFiltersComponent } from './components/table-filters/table-filters.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    HandyTablePaginatorComponent,
    HandyTableComponent,
    HandyTableFiltersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HandyTablePaginatorComponent,
    HandyTableComponent,
    HandyTableFiltersComponent,
  ]
})
export class HandyTableModule { }
