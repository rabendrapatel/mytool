import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { HandyNgUserService } from '@handy-ng/services';
import { ViewChild, OnInit, OnDestroy, ElementRef, Directive } from '@angular/core';
import { HandyTablePaginatorComponent } from 'src/app/handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component';
import { Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HandyDataTableResult, HandyNgDataTableState, MongooseSortingOptions, HandyNgSelectOptionsData, HandyNgSelectOptions, HandyMongooseModelPublicFindOpts, MongooseModelInterfaces, FilterQuery } from '@handy-ng/types';
import { HandyTableComponent } from 'src/app/handy/modules/handy-table/components/handy-table/handy-table.component';
import { Sort, MatSort } from '@angular/material/sort';
import { HandyFormComponent } from 'src/app/handy/modules/handy-form/components/handy-form/handy-form.component';
import { HandyTextInputComponent } from 'src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component';
import { HandyTableFiltersComponent } from 'src/app/handy/modules/handy-table/components/table-filters/table-filters.component';
import { HandyMultiSelectInputComponent } from 'src/app/handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Directive()
export abstract class DefultHandyNgDataTable<TableDataType = any, FilterDataType = any, ModelInterface extends MongooseModelInterfaces = any> implements OnInit, OnDestroy {

  protected abstract tableName: string;
  protected abstract rememberTableState: boolean;
  protected abstract displayedColumns: string[];
  protected rememberTablePageState: boolean = true;
  public rememberTableColumnsInState: boolean = true;

  protected optionalColumns: HandyNgSelectOptions[];
  protected _allOptionalColumnsHolder: string[];

  protected searchableFields: HandyNgSelectOptions[];
  protected _allSearchableFieldsHolder: string[];

  protected _requiredColumns: string[];
  protected _allColumnsHolder: string[] = [];

  public filterForm: FormGroup;

  public dataSource: MatTableDataSource<TableDataType>;

  public loading: boolean = false;
  protected loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loadingDebounceTime: number = 400;

  public pageIndex: number = 1;
  public pageSize: number = 20;
  public itemsCount: number;
  public pageSizeOptions: number[] = [10, 20, 50, 100, 500];

  public sort: MongooseSortingOptions<TableDataType> = { field: null, direction: null };

  public paginatorChange: Subscription;
  public filterChange: Subscription;
  public sortChange: Subscription;
  public searchChange: Subscription;
  public optionalColumnsChange: Subscription;
  public clearSearchClick: Subscription;

  protected _afterFilterFormInit: boolean = false;

  public filtersToggleState: boolean = false;
  public expanded: boolean = false;

  public defaultPageSize: number = 20;

  @ViewChild(HandyTableComponent, { static: true }) protected tableComponent: HandyTableComponent;
  @ViewChild(HandyTablePaginatorComponent, { static: true }) protected paginator: HandyTablePaginatorComponent;
  @ViewChild(MatSort, { static: true }) protected sortHeader: MatSort;
  @ViewChild(HandyTableFiltersComponent, { static: true }) protected tableFilters: HandyTableFiltersComponent;
  @ViewChild('tableFilter', { static: true }) protected tableFilterForm: HandyFormComponent;
  @ViewChild('searchInput', { static: true }) protected searchInput: HandyTextInputComponent;
  @ViewChild('searchableFieldsSelect', { static: true }) protected searchableFieldsSelect: HandyMultiSelectInputComponent;
  @ViewChild('optionalColumnsSelect', { static: true }) protected optionalColumnsSelect: HandyMultiSelectInputComponent;
  @ViewChild('filtersToggle', { static: true, read: ElementRef }) protected filtersToggleElm: ElementRef;
  @ViewChild('clearFilters', { static: true, read: ElementRef }) protected clearFiltersElm: ElementRef;

  constructor (protected _handyNgUserService: HandyNgUserService) { }

  public ngOnInit(): void {

    if (this.tableComponent) {
      this.tableComponent.loading = this.loading;
    }

    this.loadingSubject.pipe(debounceTime(this.loadingDebounceTime)).subscribe((state: boolean) => {
      this._handleLoadingChange(state);
    })

    this._handleFiltersInit();
    this._handlePaginatorInit();
    this._handleSortInit();
    this._hadnleOptionalColumnsInit();
    this._handleSearchableFieldsInit();

  }

  protected _handlePaginatorInit(): void {

    if (this.paginator) {

      this.paginator.pageSize = this.pageSize;
      this.paginator.itemsCount = this.itemsCount;
      this.paginator.pageSizeOptions = this.pageSizeOptions;
      this.paginator.pageIndex = this.pageIndex;

      this.paginator.disabled = this.loading;

      this.paginatorChange = this.paginator.paginatorChangeEvent.pipe(debounceTime(400)).subscribe(paginatorData => {

        let { pageSize, pageIndex } = paginatorData;

        this.pageSize = pageSize;
        this.pageIndex = pageIndex;

        this.innerHandler(false);

      })

    }

  }

  protected _handleSortInit(): void {

    if (this.sortHeader) {

      this.sortHeader.disabled = this.loading;

      let { field = null, direction = null } = this.sort as any;

      if (field && direction) {

        this.sortHeader.active = field as any;
        this.sortHeader.direction = direction as any;

      }

      this.sortChange = this.sortHeader.sortChange.subscribe((sortVal: Sort) => {

        let { active = null, direction = null } = sortVal;

        if (active && direction) {

          this.sort = {
            field: active as any,
            direction: direction as any
          }

        } else {

          this.sort = { field: null, direction: null };

        }
        this.pageIndex = 0;
        this.innerHandler(false);

      })

    }

  }

  protected _hadnleOptionalColumnsInit(): void {

    if (this.optionalColumns && this.optionalColumnsSelect) {

      // this._allColumnsHolder = this.displayedColumns;

      let alllColsLen: number = this._allColumnsHolder.length;
      let optionalColsLen: number = this.optionalColumns.length;
      this._allOptionalColumnsHolder = [];

      // ? Just transfering optionals to sinple string array
      for (let i = 0; i < optionalColsLen; i++) {

        const column = this.optionalColumns[i];
        this._allOptionalColumnsHolder.push(column.value);

      }

      this._requiredColumns = [];

      for (let i = 0; i < alllColsLen; i++) {

        const column = this._allColumnsHolder[i];

        if (!this._allOptionalColumnsHolder.includes(column)) {
          this._requiredColumns.push(column);
        }

      }

      this.optionalColumnsSelect.hasEmptyOption = false;
      this.optionalColumnsSelect.options = (<any>this.optionalColumns);

      this.optionalColumnsChange = this.optionalColumnsSelect.valueChange.subscribe(() => {

        if (!this.optionalColumnsSelect._value) {
          this.optionalColumnsSelect._value = [];
        }

        this.displayedColumns = this._dropDisplayColumnsOrder([...this._requiredColumns, ...this.optionalColumnsSelect._value]);

      })

      this.optionalColumnsSelect.addOnFormResetHoook(() => {

        this.displayedColumns = this._allColumnsHolder;
        this.optionalColumnsSelect._value = this._allOptionalColumnsHolder;

      });

      let selectVal = this.displayedColumns.filter(displayedCol => {

        return this._allOptionalColumnsHolder.includes(displayedCol);

      })

      if (!selectVal) {
        selectVal = [];
      }

      this.displayedColumns = this._dropDisplayColumnsOrder([...this._requiredColumns, ...selectVal]);

      setTimeout(() => {

        if (!this.optionalColumnsSelect._value && selectVal) {
          this.optionalColumnsSelect.ngControl.control.setValue(selectVal);
        }

      })

    }

  }

  protected _handleSearchableFieldsInit(): void {

    if (this.searchableFields && this.searchableFieldsSelect) {

      this.searchableFieldsSelect.atLeastOne = true;

      this.searchableFieldsSelect.hasEmptyOption = false;
      this.searchableFieldsSelect.options = (<any>this.searchableFields);

      this._allSearchableFieldsHolder = [];

      let alllFieldsLen: number = this.searchableFields.length;

      // ? Just transfering fields to sinple string array
      for (let i = 0; i < alllFieldsLen; i++) {

        const field = this.searchableFields[i];
        this._allSearchableFieldsHolder.push(field.value);

      }

      this.searchableFieldsSelect.addOnFormResetHoook(() => {

        this.searchableFieldsSelect._value = this._allSearchableFieldsHolder;

      });

    }

  }

  protected _handleFiltersInit(): void {

    if (this.tableFilterForm) {

      this.tableFilterForm.disablePin = true;
      this.tableFilterForm.defaultResetBtn = false;

      if (this.filterForm) {
        this.tableFilterForm.formGroup = this.filterForm;

        if (this.searchInput) {

          this.searchChange = this.searchInput.valueChange.subscribe(() => {

            this.searchInput.sufixIcon = this.searchInput._value ? 'clear' : null;

          })

          setTimeout(() => {
            this.searchInput.sufixIcon = this.searchInput._value ? 'clear' : null;
            this.searchInput.prefixIcon = 'search';
          });

          this.clearSearchClick = this.searchInput.sufixClick.subscribe(() => {

            this.searchInput.writeValue(null);

          })

        }

      }

    }

    if (this.tableFilters) {

      this.tableFilters.expanded = this.filtersToggleState;

      if (this.filtersToggleElm) {

        this.filtersToggleElm.nativeElement.addEventListener('click', () => {

          this.filtersToggleState = !this.filtersToggleState;
          this.tableFilters.expanded = this.filtersToggleState;

          this._setState();

        })

      }

    }

    if (this.clearFiltersElm) {

      this.clearFiltersElm.nativeElement.addEventListener('click', () => {

        this.tableFilterForm.triggerReset();

      })

    }

    if (this.filterForm) {

      this.filterChange = this.filterForm.valueChanges.pipe(debounceTime(400)).subscribe(() => {

        if (this._afterFilterFormInit) {
          this.pageIndex = 0;
          this.innerHandler(false);
        } else {
          this._afterFilterFormInit = true;
        }

      })

    }

  }

  protected abstract getData(filterData: FilterDataType, page: number, limit: number, sort: MongooseSortingOptions<TableDataType>): Promise<HandyDataTableResult<TableDataType>>;
  protected abstract createFilterForm(stateFilterData: FilterDataType): void;

  protected initExtender(): void {

    let { filterData = {}, paginatorData, sort, filtersToggleState, displayedColumns = [], expanded = this.expanded } = this._getState();

    this.pageIndex = paginatorData.pageIndex;
    this.pageSize = paginatorData.pageSize;
    this.sort = sort;
    this.filtersToggleState = filtersToggleState;
    this.expanded = expanded;

    // ? displayed columns memory state
    if (this.rememberTableColumnsInState) {

      this._allColumnsHolder = this.displayedColumns;

      // ? Fixture in case the table changes its possible columns
      let stateDisplayedLen: number = displayedColumns.length;
      if (stateDisplayedLen > 0) {

        let temp: string[] = [];
        for (let i = 0; i < stateDisplayedLen; i++) {
          const savedCol = displayedColumns[i];

          if (this._allColumnsHolder.includes(savedCol)) {
            temp.push(savedCol);
          }
        }

        this.displayedColumns = temp;

      }

    }


    if (this.searchableFields && (!filterData.searchableFields || (Array.isArray(filterData.searchableFields) && filterData.searchableFields.length < 1))) {

      filterData.searchableFields = [];
      let searchableLen: number = this.searchableFields.length;
      for (let i = 0; i < searchableLen; i++) {
        const singleSearchableField = this.searchableFields[i];
        filterData.searchableFields.push(singleSearchableField.value);
      }

    }

    this.createFilterForm(filterData as FilterDataType);
    this.innerHandler(true);

  }

  protected _setState(): void {

    if (!this.rememberTableState) {
      return;
    }

    let filterData: any = this.getFilterData();

    this._handyNgUserService.saveDataTableStateVal(this.tableName, {
      filterData,
      paginatorData: {
        pageIndex: (this.rememberTablePageState) ? this.pageIndex : 0,
        pageSize: this.pageSize,
      },
      sort: this.sort,
      filtersToggleState: this.filtersToggleState,
      displayedColumns: this.displayedColumns,
      expanded: this.expanded
    })

  }

  protected _getState(): HandyNgDataTableState {

    let defaultState: HandyNgDataTableState = {
      filterData: {},
      paginatorData: {
        pageIndex: 0,
        pageSize: this.defaultPageSize
      },
      sort: this.sort,
      filtersToggleState: this.filtersToggleState,
      expanded: this.expanded,
      displayedColumns: [],
    };

    if (this.rememberTableState) {
      return this._handyNgUserService.getDataTableStateVal(this.tableName, defaultState);
    } else {
      return defaultState;
    }

  }

  protected innerHandler(initial: boolean = false, silent: boolean = false): void {

    if (!silent) {
      this.setLoadingState(true);
    }

    this.getData(this.getFilterData(), this.pageIndex, this.pageSize, this.sort).then(result => {

      let { dataSource, pageIndex, itemsCount } = result;

      this.dataSource = dataSource;

      this.pageIndex = (pageIndex > 0) ? pageIndex - 1 : 0;
      this.itemsCount = itemsCount;

      this.setPaginator();

      if (!silent) {
        this.setLoadingState();
      }

    })
      .catch(err => {

        if (!silent) {
          this.setLoadingState();
        }

      })

    if (!initial) {
      this._setState();
    }

  }

  public toogleExpandedState(): void {
    this.expanded = !this.expanded;
    this._setState();
  }

  public refreshTableData(silent: boolean = false): void {
    this.innerHandler(false, silent);
  }

  protected setLoadingState(state: boolean = false): void {

    if (state) {
      this._handleLoadingChange(true);
      return;
    }

    this.loadingSubject.next(state);
  }

  protected _handleLoadingChange(state: boolean): void {

    this.loading = state;

    if (this.tableComponent) {
      this.tableComponent.loading = state;
    }

    if (this.paginator) {
      this.paginator.disabled = state;
    }

    if (this.sortHeader) {
      this.sortHeader.disabled = state;
    }

  }

  protected setPaginator(): void {

    this.paginator.pageSize = this.pageSize;
    this.paginator.itemsCount = this.itemsCount;
    this.paginator.pageIndex = this.pageIndex;

  }

  public getFilterData(): FilterDataType {

    let filterData: any = {};

    if (this.filterForm) {
      filterData = this.filterForm.getRawValue();
    }

    return filterData;

  }

  protected getFindOptions(page: number, limit: number, sort: any): HandyMongooseModelPublicFindOpts<ModelInterface['allFields']> {

    let result: HandyMongooseModelPublicFindOpts<ModelInterface['allFields']> = {
      pagination: true,
      exactPaginationCount: true,
      page: page + 1,
      limit,
      sort,
    }

    return result;

  }

  protected getAdditionalSearchQueries(filterData: FilterDataType): FilterQuery<ModelInterface['fullModelShape']>[] {

    return [];

  }

  protected getAdditionalFilterQueries(filterData: FilterDataType): FilterQuery<ModelInterface['fullModelShape']>[] {

    return [];

  }

  protected getFindQuery(filterData: FilterDataType): FilterQuery<ModelInterface['fullModelShape']> {

    return {};

  }

  public drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    this._setState();

  }

  protected _dropDisplayColumnsOrder(toShow: string[]): string[] {

    let actual: string[] = [...this.displayedColumns];

    let toShowLen: number = toShow.length;
    for (let i = 0; i < toShowLen; i++) {
      const singleColToShow = toShow[i];

      if (!actual.includes(singleColToShow)) {
        actual.push(singleColToShow)
      }

    }

    let final: string[] = [];

    let actualLen: number = actual.length;
    for (let i = 0; i < actualLen; i++) {
      const toCheck = actual[i];

      if (toShow.includes(toCheck)) {
        final.push(toCheck);
      }
    }

    return final;

  }

  public ngOnDestroy(): void {

    if (this.filterChange) {
      this.filterChange.unsubscribe();
    }

    if (this.sortChange) {
      this.sortChange.unsubscribe();
    }

    if (this.paginatorChange) {
      this.paginatorChange.unsubscribe();
    }

    if (this.searchChange) {
      this.searchChange.unsubscribe();
    }

    if (this.clearSearchClick) {
      this.clearSearchClick.unsubscribe();
    }

    if (this.optionalColumnsChange) {
      this.optionalColumnsChange.unsubscribe();
    }

  }

}