import { MatDialog } from '@angular/material/dialog';
import { Directive, HostListener, EventEmitter, Output } from '@angular/core';
import { DefaultConfirmClickDirective } from '@handy-ng/core/defaults/directives/confirm-click.directive';

@Directive({
  selector: '[confirmClick]',
  inputs: [
    'confirmTitle',
    'confirmBody',
    'confirmBtnLabel',
    'cancelBtnLabel'
  ]
})
export class ConfirmClickDirective extends DefaultConfirmClickDirective {

  @Output('confirmClick') public confirmedEvent: EventEmitter<void> = new EventEmitter();

  constructor (public dialog: MatDialog) {

    super(dialog);

  }

  @HostListener('click', ['$event.target'])
  onClick() {

    super.onClick();

  }

}
