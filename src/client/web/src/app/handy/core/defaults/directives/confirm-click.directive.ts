import { MatDialog } from '@angular/material/dialog';
import { Directive, EventEmitter, Input } from '@angular/core';
import { ConfirmClickDialogComponent } from '@ng-shared/components/confirm-click-dialog/confirm-click-dialog.component';

@Directive()
export abstract class DefaultConfirmClickDirective {

  public abstract confirmedEvent: EventEmitter<void>;

  protected _title: string = 'Are you sure?';
  @Input() public set confirmTitle(title: string) {
    this._title = title;
  };

  protected _body: string = 'This operation cannot be reversed.';
  @Input() public set confirmBody(body: string) {
    this._body = body;
  };
  
  protected _confirmBtnLabel: string = 'Yes';
  @Input() public set confirmBtnLabel(confirmBtnLabel: string) {
    this._confirmBtnLabel = confirmBtnLabel;
  };
  
  protected _cancelBtnLabel: string = 'Cancel';
  @Input() public set cancelBtnLabel(cancelBtnLabel: string) {
    this._cancelBtnLabel = cancelBtnLabel;
  };

  constructor (public dialog: MatDialog) { }

  onClick() {

    const dialogRef = this.dialog.open(ConfirmClickDialogComponent, {
      data: {
        title: this._title,
        body: this._body,
        confirmLabel: this._confirmBtnLabel,
        cancelBtnLabel: this._cancelBtnLabel
      },
    });

    dialogRef.afterClosed().subscribe(confirmed => {

      if (confirmed) {
        this.confirmedEvent.emit();
      }

    });

  }

}
