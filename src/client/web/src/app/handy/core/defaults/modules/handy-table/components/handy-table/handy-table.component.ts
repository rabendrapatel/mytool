import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'handy-table',
  templateUrl: './handy-table.component.html',
  styleUrls: ['./handy-table.component.scss']
})
export class HandyTableComponent implements OnInit {

  @Input() public loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
