import { HandyFormComponent } from './../handy-form/handy-form.component';
import { HandyNgUserService } from '@handy-ng/services';
import { Component, Optional, Self, OnInit, OnDestroy } from '@angular/core';
import { HandyFormControl } from '@handy-ng/extenders/handy-form-contol';
import { ControlValueAccessor, NgControl } from '@angular/forms';

// import * as Quill from 'quill';
// var icons = Quill.import('ui/icons');
// icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';

@Component({
  selector: 'handy-rte-input',
  templateUrl: './handy-rte-input.component.html',
  styleUrls: ['./handy-rte-input.component.scss'],
  inputs: [
    'placeholder', 'disabled',
    'debounceTime', 'fieldName',
    'pinningValue', 'disableFieldPin',
  ],
  outputs: [
    'valueChange', 'statusChange'
  ]
})
export class HandyRteInputComponent extends HandyFormControl implements ControlValueAccessor, OnInit, OnDestroy {

  constructor (@Optional() @Self() public ngControl: NgControl, public _handyNgUserService: HandyNgUserService, @Optional() protected _parentFormComponent: HandyFormComponent) {
    super(ngControl, _handyNgUserService, _parentFormComponent);

  }

  quillModules = {
    'toolbar': [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'header': [1, 2, 3, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link'],                         // link and image, video

    ],
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
