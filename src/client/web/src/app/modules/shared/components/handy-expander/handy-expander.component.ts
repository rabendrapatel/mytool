import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'handy-expander',
  templateUrl: './handy-expander.component.html',
  styleUrls: ['./handy-expander.component.scss']
})
export class HandyExpanderComponent implements OnInit {

  public _expanded: boolean;

  @Input('expanded') public set expanded(val: boolean) {
    this._expanded = val;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
