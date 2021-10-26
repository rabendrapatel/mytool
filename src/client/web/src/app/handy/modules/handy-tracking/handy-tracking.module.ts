import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbVersionADirective } from './directives/a-version.directive';
import { AbVersionBDirective } from './directives/b-version.directive';
import { TrackClickDirective } from './directives/track-click.directive';
import { ConversionClickDirective } from './directives/conversion-click.directive';
import { GoalClickDirective } from './directives/goal-click.directive';

@NgModule({
  declarations: [
    AbVersionADirective,
    AbVersionBDirective,
    TrackClickDirective,
    ConversionClickDirective,
    GoalClickDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AbVersionADirective,
    AbVersionBDirective,
    TrackClickDirective,
    ConversionClickDirective,
    GoalClickDirective
  ]
})
export class HandyTrackingModule { }

/*

    <basic-btn trackClick="Click name" >Click</basic-btn>
    <basic-btn goalClick="Goal name" [goalValue]="50" >Click</basic-btn>
    <basic-btn conversionClick="Conversion name" [conversionValue]="100" >Click</basic-btn>


    <h1 *abVersionA>Shows only on A version</h1>
    <h1 *abVersionB>Shows only on B version</h1>

*/
