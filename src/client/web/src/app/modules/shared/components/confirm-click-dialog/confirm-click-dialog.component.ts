import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-click-dialog',
  templateUrl: './confirm-click-dialog.component.html',
  styleUrls: ['./confirm-click-dialog.component.scss']
})
export class ConfirmClickDialogComponent implements OnInit, OnDestroy {

  public title: string;
  public body: string;
  public confirmLabel: string;
  public cancelLabel: string;

  public refSub: Subscription;

  constructor (
    public dialogRef: MatDialogRef<ConfirmClickDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    let { title, body, confirmLabel, cancelBtnLabel } = this.data;
    this.title = title;
    this.body = body;
    this.confirmLabel = confirmLabel;
    this.cancelLabel = cancelBtnLabel;

  }

  ngOnInit() {

    this.refSub = this.dialogRef.backdropClick().subscribe(() => {
      this.cancel();
    })

  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    this.dialogRef.close(true)
  }

  public onClose(): void {
    this.cancel()
  }

  ngOnDestroy() {

    if (this.refSub) {
      this.refSub.unsubscribe();
    }

  }

}
