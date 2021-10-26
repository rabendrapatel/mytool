import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'form-actions-bar',
  templateUrl: './form-actions-bar.component.html',
  styleUrls: ['./form-actions-bar.component.scss']
})
export class FormActionsBarComponent implements OnInit {

  public _align: string = 'flex-end flex-end';
  @Input() public set align(align: string) {
    this._align = align;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
