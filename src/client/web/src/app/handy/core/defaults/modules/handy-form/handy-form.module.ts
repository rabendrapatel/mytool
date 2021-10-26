import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandyFormComponent } from './components/handy-form/handy-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HandyTextInputComponent } from './components/handy-text-input/handy-text-input.component';
import { HandyPasswordInputComponent } from './components/handy-password-input/handy-password-input.component';
import { HandyNumberInputComponent } from './components/handy-number-input/handy-number-input.component';
import { HandyMobileNumpadComponent } from './components/handy-mobile-numpad/handy-mobile-numpad.component';
import { HandyTextAreaInputComponent } from './components/handy-textarea-input/handy-textarea-input.component';
import { HandySelectInputComponent } from './components/handy-select-input/handy-select-input.component';
import { HandyMultiSelectInputComponent } from './components/handy-multi-select-input/handy-multi-select-input.component';
import { HandyRadioGroupInputComponent } from './components/handy-radio-group-input/handy-radio-group-input.component';
import { HandyCheckBoxInputComponent } from './components/handy-check-box-input/handy-check-box-input.component';
import { HandySlideToggleInputComponent } from './components/handy-slide-toggle-input/handy-slide-toggle-input.component';
import { HandySliderInputComponent } from './components/handy-slider-input/handy-slider-input.component';
import { HandyDateInputComponent } from './components/handy-date-input/handy-date-input.component';
import { InputCalendarComponent } from './components/handy-date-input/input-calendar/input-calendar.component';
import { HandyTimeInputComponent } from './components/handy-time-input/handy-time-input.component';
import { HandyDateRangeInputComponent } from './components/handy-date-range-input/handy-date-range-input.component';
import { QuillModule } from 'ngx-quill'
import { HandyRteInputComponent } from './components/handy-rte-input/handy-rte-input.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PasswordValidator } from './validators';
import { PasswordHintComponent } from './components/password-hint/password-hint.component';
import { FileUploadDirective } from './directives/file-upload.directive';
import { UploadDragDirective } from './directives/upload-drag.directive';
import { HandyFileInputComponent } from './components/handy-file-input/handy-file-input.component'

@NgModule({
  declarations: [
    HandyFormComponent,
    HandyTextInputComponent,
    HandyPasswordInputComponent,
    HandyNumberInputComponent,
    HandyMobileNumpadComponent,
    HandyTextAreaInputComponent,
    HandySelectInputComponent,
    HandyMultiSelectInputComponent,
    HandyRadioGroupInputComponent,
    HandyCheckBoxInputComponent,
    HandySlideToggleInputComponent,
    HandySliderInputComponent,
    HandyDateInputComponent,
    InputCalendarComponent,
    HandyTimeInputComponent,
    HandyDateRangeInputComponent,
    HandyRteInputComponent,
    PasswordHintComponent,
    FileUploadDirective,
    UploadDragDirective,
    HandyFileInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    QuillModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HandyFormComponent,
    HandyTextInputComponent,
    HandyPasswordInputComponent,
    HandyNumberInputComponent,
    HandyTextAreaInputComponent,
    HandySelectInputComponent,
    HandyMultiSelectInputComponent,
    HandyRadioGroupInputComponent,
    HandyCheckBoxInputComponent,
    HandySlideToggleInputComponent,
    HandySliderInputComponent,
    HandyDateInputComponent,
    HandyTimeInputComponent,
    HandyDateRangeInputComponent,
    HandyRteInputComponent,
    PasswordHintComponent,
    FileUploadDirective,
    UploadDragDirective, 
    HandyFileInputComponent
  ],
  providers: [
    PasswordValidator
  ],
  entryComponents: [
    InputCalendarComponent
  ],
})
export class HandyFormModule { }
