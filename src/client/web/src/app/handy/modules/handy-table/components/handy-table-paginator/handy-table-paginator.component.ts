import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'handy-table-paginator',
  templateUrl: './handy-table-paginator.component.html',
  styleUrls: ['./handy-table-paginator.component.scss']
})
export class HandyTablePaginatorComponent implements OnInit, OnDestroy {

  public _pageSizeOptions: number[] = [5, 10, 25, 50, 100, 500];
  @Input() public set pageSizeOptions(options: number[]) {
    this._pageSizeOptions = options;
  }
  
  public _length: number = 100;
  @Input() public set itemsCount(itemsCount: number) {

    if (this._length === itemsCount) {
      return;
    }

    this._length = itemsCount;
  }
  
  public _pageSize: number = 25;
  @Input() public set pageSize(pageSize: number) {

    if (this._pageSize === pageSize) {
      return;
    }

    this._pageSize = pageSize;
  }
  
  public _pageIndex: number = 0;
  @Input() public set pageIndex(pageIndex: number) {

    if (this._pageIndex === pageIndex) {
      return;
    }

    this._pageIndex = pageIndex;

  }
  
  public _isDisabled: boolean = false;
  @Input() public set disabled(disabled: boolean) {

    if (this._isDisabled === disabled) {
      return;
    }

    this._isDisabled = disabled;

  }

  @Output('change') public paginatorChangeEvent: EventEmitter<PageEvent> = new EventEmitter();

  public paginatorChange(event: PageEvent): void {

    let { pageIndex, pageSize, length } = event;

    this.itemsCount = length;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;

    this.paginatorChangeEvent.emit(event);
    
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    this.paginatorChangeEvent.complete();

  }

}
