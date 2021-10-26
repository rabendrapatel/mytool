import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@ng-shared/shared.module';
import { HandyPieChartComponent } from './components/handy-pie-chart/handy-pie-chart.component';
import { HandyLineChartComponent } from './components/handy-line-chart/handy-line-chart.component';
import { HandyAreaChartComponent } from './components/handy-area-chart/handy-area-chart.component';
import { HandyBarChartComponent } from './components/handy-bar-chart/handy-bar-chart.component';
import { HandyColumnChartComponent } from './components/handy-column-chart/handy-column-chart.component';

@NgModule({
  declarations: [
    HandyPieChartComponent,
    HandyLineChartComponent,
    HandyAreaChartComponent,
    HandyBarChartComponent,
    HandyColumnChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HandyPieChartComponent,
    HandyLineChartComponent,
    HandyAreaChartComponent,
    HandyBarChartComponent,
    HandyColumnChartComponent
  ]
})
export class HandyChartsModule { }
