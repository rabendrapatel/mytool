import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'handy-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss']
})
export class HandyTableFiltersComponent implements OnInit {

  public expanded: boolean = false;

  constructor() { }

  public toggle(): void {

    this.expanded = !this.expanded;

  }

  ngOnInit(): void {
  }

}
