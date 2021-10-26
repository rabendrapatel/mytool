(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~modules-drop-crud-drop-crud-module~modules-user-crud-user-crud-module"],{

/***/ "./src/app/handy/core/defaults/extenders/handy-ng-datatable.ts":
/*!*********************************************************************!*\
  !*** ./src/app/handy/core/defaults/extenders/handy-ng-datatable.ts ***!
  \*********************************************************************/
/*! exports provided: DefultHandyNgDataTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefultHandyNgDataTable", function() { return DefultHandyNgDataTable; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_handy_modules_handy_table_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component */ "./src/app/handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_app_handy_modules_handy_table_components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/handy/modules/handy-table/components/handy-table/handy-table.component */ "./src/app/handy/modules/handy-table/components/handy-table/handy-table.component.ts");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/fesm2015/sort.js");
/* harmony import */ var src_app_handy_modules_handy_table_components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/handy/modules/handy-table/components/table-filters/table-filters.component */ "./src/app/handy/modules/handy-table/components/table-filters/table-filters.component.ts");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/fesm2015/drag-drop.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");










const _c0 = ["tableFilter"];
const _c1 = ["searchInput"];
const _c2 = ["searchableFieldsSelect"];
const _c3 = ["optionalColumnsSelect"];
const _c4 = ["filtersToggle"];
const _c5 = ["clearFilters"];
class DefultHandyNgDataTable {
    constructor(_handyNgUserService) {
        this._handyNgUserService = _handyNgUserService;
        this.rememberTablePageState = true;
        this.rememberTableColumnsInState = true;
        this._allColumnsHolder = [];
        this.loading = false;
        this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.loadingDebounceTime = 400;
        this.pageIndex = 1;
        this.pageSize = 20;
        this.pageSizeOptions = [10, 20, 50, 100, 500];
        this.sort = { field: null, direction: null };
        this._afterFilterFormInit = false;
        this.filtersToggleState = false;
        this.expanded = false;
        this.defaultPageSize = 20;
    }
    ngOnInit() {
        if (this.tableComponent) {
            this.tableComponent.loading = this.loading;
        }
        this.loadingSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(this.loadingDebounceTime)).subscribe((state) => {
            this._handleLoadingChange(state);
        });
        this._handleFiltersInit();
        this._handlePaginatorInit();
        this._handleSortInit();
        this._hadnleOptionalColumnsInit();
        this._handleSearchableFieldsInit();
    }
    _handlePaginatorInit() {
        if (this.paginator) {
            this.paginator.pageSize = this.pageSize;
            this.paginator.itemsCount = this.itemsCount;
            this.paginator.pageSizeOptions = this.pageSizeOptions;
            this.paginator.pageIndex = this.pageIndex;
            this.paginator.disabled = this.loading;
            this.paginatorChange = this.paginator.paginatorChangeEvent.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(400)).subscribe(paginatorData => {
                let { pageSize, pageIndex } = paginatorData;
                this.pageSize = pageSize;
                this.pageIndex = pageIndex;
                this.innerHandler(false);
            });
        }
    }
    _handleSortInit() {
        if (this.sortHeader) {
            this.sortHeader.disabled = this.loading;
            let { field = null, direction = null } = this.sort;
            if (field && direction) {
                this.sortHeader.active = field;
                this.sortHeader.direction = direction;
            }
            this.sortChange = this.sortHeader.sortChange.subscribe((sortVal) => {
                let { active = null, direction = null } = sortVal;
                if (active && direction) {
                    this.sort = {
                        field: active,
                        direction: direction
                    };
                }
                else {
                    this.sort = { field: null, direction: null };
                }
                this.pageIndex = 0;
                this.innerHandler(false);
            });
        }
    }
    _hadnleOptionalColumnsInit() {
        if (this.optionalColumns && this.optionalColumnsSelect) {
            // this._allColumnsHolder = this.displayedColumns;
            let alllColsLen = this._allColumnsHolder.length;
            let optionalColsLen = this.optionalColumns.length;
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
            this.optionalColumnsSelect.options = this.optionalColumns;
            this.optionalColumnsChange = this.optionalColumnsSelect.valueChange.subscribe(() => {
                if (!this.optionalColumnsSelect._value) {
                    this.optionalColumnsSelect._value = [];
                }
                this.displayedColumns = this._dropDisplayColumnsOrder([...this._requiredColumns, ...this.optionalColumnsSelect._value]);
            });
            this.optionalColumnsSelect.addOnFormResetHoook(() => {
                this.displayedColumns = this._allColumnsHolder;
                this.optionalColumnsSelect._value = this._allOptionalColumnsHolder;
            });
            let selectVal = this.displayedColumns.filter(displayedCol => {
                return this._allOptionalColumnsHolder.includes(displayedCol);
            });
            if (!selectVal) {
                selectVal = [];
            }
            this.displayedColumns = this._dropDisplayColumnsOrder([...this._requiredColumns, ...selectVal]);
            setTimeout(() => {
                if (!this.optionalColumnsSelect._value && selectVal) {
                    this.optionalColumnsSelect.ngControl.control.setValue(selectVal);
                }
            });
        }
    }
    _handleSearchableFieldsInit() {
        if (this.searchableFields && this.searchableFieldsSelect) {
            this.searchableFieldsSelect.atLeastOne = true;
            this.searchableFieldsSelect.hasEmptyOption = false;
            this.searchableFieldsSelect.options = this.searchableFields;
            this._allSearchableFieldsHolder = [];
            let alllFieldsLen = this.searchableFields.length;
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
    _handleFiltersInit() {
        if (this.tableFilterForm) {
            this.tableFilterForm.disablePin = true;
            this.tableFilterForm.defaultResetBtn = false;
            if (this.filterForm) {
                this.tableFilterForm.formGroup = this.filterForm;
                if (this.searchInput) {
                    this.searchChange = this.searchInput.valueChange.subscribe(() => {
                        this.searchInput.sufixIcon = this.searchInput._value ? 'clear' : null;
                    });
                    setTimeout(() => {
                        this.searchInput.sufixIcon = this.searchInput._value ? 'clear' : null;
                        this.searchInput.prefixIcon = 'search';
                    });
                    this.clearSearchClick = this.searchInput.sufixClick.subscribe(() => {
                        this.searchInput.writeValue(null);
                    });
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
                });
            }
        }
        if (this.clearFiltersElm) {
            this.clearFiltersElm.nativeElement.addEventListener('click', () => {
                this.tableFilterForm.triggerReset();
            });
        }
        if (this.filterForm) {
            this.filterChange = this.filterForm.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(400)).subscribe(() => {
                if (this._afterFilterFormInit) {
                    this.pageIndex = 0;
                    this.innerHandler(false);
                }
                else {
                    this._afterFilterFormInit = true;
                }
            });
        }
    }
    initExtender() {
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
            let stateDisplayedLen = displayedColumns.length;
            if (stateDisplayedLen > 0) {
                let temp = [];
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
            let searchableLen = this.searchableFields.length;
            for (let i = 0; i < searchableLen; i++) {
                const singleSearchableField = this.searchableFields[i];
                filterData.searchableFields.push(singleSearchableField.value);
            }
        }
        this.createFilterForm(filterData);
        this.innerHandler(true);
    }
    _setState() {
        if (!this.rememberTableState) {
            return;
        }
        let filterData = this.getFilterData();
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
        });
    }
    _getState() {
        let defaultState = {
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
        }
        else {
            return defaultState;
        }
    }
    innerHandler(initial = false, silent = false) {
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
        });
        if (!initial) {
            this._setState();
        }
    }
    toogleExpandedState() {
        this.expanded = !this.expanded;
        this._setState();
    }
    refreshTableData(silent = false) {
        this.innerHandler(false, silent);
    }
    setLoadingState(state = false) {
        if (state) {
            this._handleLoadingChange(true);
            return;
        }
        this.loadingSubject.next(state);
    }
    _handleLoadingChange(state) {
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
    setPaginator() {
        this.paginator.pageSize = this.pageSize;
        this.paginator.itemsCount = this.itemsCount;
        this.paginator.pageIndex = this.pageIndex;
    }
    getFilterData() {
        let filterData = {};
        if (this.filterForm) {
            filterData = this.filterForm.getRawValue();
        }
        return filterData;
    }
    getFindOptions(page, limit, sort) {
        let result = {
            pagination: true,
            exactPaginationCount: true,
            page: page + 1,
            limit,
            sort,
        };
        return result;
    }
    getAdditionalSearchQueries(filterData) {
        return [];
    }
    getAdditionalFilterQueries(filterData) {
        return [];
    }
    getFindQuery(filterData) {
        return {};
    }
    drop(event) {
        Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__["moveItemInArray"])(this.displayedColumns, event.previousIndex, event.currentIndex);
        this._setState();
    }
    _dropDisplayColumnsOrder(toShow) {
        let actual = [...this.displayedColumns];
        let toShowLen = toShow.length;
        for (let i = 0; i < toShowLen; i++) {
            const singleColToShow = toShow[i];
            if (!actual.includes(singleColToShow)) {
                actual.push(singleColToShow);
            }
        }
        let final = [];
        let actualLen = actual.length;
        for (let i = 0; i < actualLen; i++) {
            const toCheck = actual[i];
            if (toShow.includes(toCheck)) {
                final.push(toCheck);
            }
        }
        return final;
    }
    ngOnDestroy() {
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
DefultHandyNgDataTable.ɵfac = function DefultHandyNgDataTable_Factory(t) { return new (t || DefultHandyNgDataTable)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["HandyNgUserService"])); };
DefultHandyNgDataTable.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: DefultHandyNgDataTable, viewQuery: function DefultHandyNgDataTable_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](src_app_handy_modules_handy_table_components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_4__["HandyTableComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](src_app_handy_modules_handy_table_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_1__["HandyTablePaginatorComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](src_app_handy_modules_handy_table_components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_6__["HandyTableFiltersComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c1, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c2, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c3, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c4, true, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c5, true, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.sortHeader = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableFilters = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableFilterForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.searchInput = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.searchableFieldsSelect = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.optionalColumnsSelect = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.filtersToggleElm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.clearFiltersElm = _t.first);
    } } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DefultHandyNgDataTable, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"]
    }], function () { return [{ type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["HandyNgUserService"] }]; }, { tableComponent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [src_app_handy_modules_handy_table_components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_4__["HandyTableComponent"], { static: true }]
        }], paginator: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [src_app_handy_modules_handy_table_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_1__["HandyTablePaginatorComponent"], { static: true }]
        }], sortHeader: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"], { static: true }]
        }], tableFilters: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [src_app_handy_modules_handy_table_components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_6__["HandyTableFiltersComponent"], { static: true }]
        }], tableFilterForm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['tableFilter', { static: true }]
        }], searchInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['searchInput', { static: true }]
        }], searchableFieldsSelect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['searchableFieldsSelect', { static: true }]
        }], optionalColumnsSelect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['optionalColumnsSelect', { static: true }]
        }], filtersToggleElm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['filtersToggle', { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]
        }], clearFiltersElm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['clearFilters', { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/extenders/handy-datatable.ts":
/*!****************************************************!*\
  !*** ./src/app/handy/extenders/handy-datatable.ts ***!
  \****************************************************/
/*! exports provided: HandyDataTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyDataTable", function() { return HandyDataTable; });
/* harmony import */ var _handy_ng_core_defaults_extenders_handy_ng_datatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core/defaults/extenders/handy-ng-datatable */ "./src/app/handy/core/defaults/extenders/handy-ng-datatable.ts");

class HandyDataTable extends _handy_ng_core_defaults_extenders_handy_ng_datatable__WEBPACK_IMPORTED_MODULE_0__["DefultHandyNgDataTable"] {
    constructor(_handyNgUserService) {
        super(_handyNgUserService);
        this._handyNgUserService = _handyNgUserService;
    }
}


/***/ }),

/***/ "./src/app/handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component.ts ***!
  \***************************************************************************************************************/
/*! exports provided: HandyTablePaginatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyTablePaginatorComponent", function() { return HandyTablePaginatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/fesm2015/paginator.js");



class HandyTablePaginatorComponent {
    constructor() {
        this._pageSizeOptions = [5, 10, 25, 50, 100, 500];
        this._length = 100;
        this._pageSize = 25;
        this._pageIndex = 0;
        this._isDisabled = false;
        this.paginatorChangeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    set pageSizeOptions(options) {
        this._pageSizeOptions = options;
    }
    set itemsCount(itemsCount) {
        if (this._length === itemsCount) {
            return;
        }
        this._length = itemsCount;
    }
    set pageSize(pageSize) {
        if (this._pageSize === pageSize) {
            return;
        }
        this._pageSize = pageSize;
    }
    set pageIndex(pageIndex) {
        if (this._pageIndex === pageIndex) {
            return;
        }
        this._pageIndex = pageIndex;
    }
    set disabled(disabled) {
        if (this._isDisabled === disabled) {
            return;
        }
        this._isDisabled = disabled;
    }
    paginatorChange(event) {
        let { pageIndex, pageSize, length } = event;
        this.itemsCount = length;
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.paginatorChangeEvent.emit(event);
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.paginatorChangeEvent.complete();
    }
}
HandyTablePaginatorComponent.ɵfac = function HandyTablePaginatorComponent_Factory(t) { return new (t || HandyTablePaginatorComponent)(); };
HandyTablePaginatorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyTablePaginatorComponent, selectors: [["handy-table-paginator"]], inputs: { pageSizeOptions: "pageSizeOptions", itemsCount: "itemsCount", pageSize: "pageSize", pageIndex: "pageIndex", disabled: "disabled" }, outputs: { paginatorChangeEvent: "change" }, decls: 1, vars: 5, consts: [["showFirstLastButtons", "", 3, "pageSizeOptions", "pageSize", "length", "pageIndex", "disabled", "page"]], template: function HandyTablePaginatorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-paginator", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("page", function HandyTablePaginatorComponent_Template_mat_paginator_page_0_listener($event) { return ctx.paginatorChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("pageSizeOptions", ctx._pageSizeOptions)("pageSize", ctx._pageSize)("length", ctx._length)("pageIndex", ctx._pageIndex)("disabled", ctx._isDisabled);
    } }, directives: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS10YWJsZS9jb21wb25lbnRzL2hhbmR5LXRhYmxlLXBhZ2luYXRvci9oYW5keS10YWJsZS1wYWdpbmF0b3IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LXRhYmxlL2NvbXBvbmVudHMvaGFuZHktdGFibGUtcGFnaW5hdG9yL2hhbmR5LXRhYmxlLXBhZ2luYXRvci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyTablePaginatorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-table-paginator',
                templateUrl: './handy-table-paginator.component.html',
                styleUrls: ['./handy-table-paginator.component.scss']
            }]
    }], function () { return []; }, { pageSizeOptions: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], itemsCount: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], pageSize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], pageIndex: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], disabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], paginatorChangeEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['change']
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-table/components/handy-table/handy-table.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-table/components/handy-table/handy-table.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: HandyTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyTableComponent", function() { return HandyTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");




function HandyTableComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = ["*"];
class HandyTableComponent {
    constructor() {
        this.loading = false;
    }
    ngOnInit() {
    }
}
HandyTableComponent.ɵfac = function HandyTableComponent_Factory(t) { return new (t || HandyTableComponent)(); };
HandyTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyTableComponent, selectors: [["handy-table"]], inputs: { loading: "loading" }, ngContentSelectors: _c0, decls: 4, vars: 1, consts: [[1, "example-container"], ["class", "example-loading-shade", 4, "ngIf"], [1, "example-table-container"], [1, "example-loading-shade"]], template: function HandyTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTableComponent_div_1_Template, 2, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_2__["MatSpinner"]], styles: [".example-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 300px;\n}\n.example-table-container[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: auto;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.example-loading-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.15);\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS10YWJsZS9jb21wb25lbnRzL2hhbmR5LXRhYmxlL2hhbmR5LXRhYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQUE7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7QUFDRjtBQUVBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0FBQ0Y7QUFHQTtFQUNFLFdBQUE7QUFBRjtBQUdBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsK0JBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFBRjtBQUdBO0VBQ0UsY0FBQTtBQUFGIiwiZmlsZSI6InNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS10YWJsZS9jb21wb25lbnRzL2hhbmR5LXRhYmxlL2hhbmR5LXRhYmxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogU3RydWN0dXJlICovXHJcbi5leGFtcGxlLWNvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS10YWJsZS1jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBvdmVyZmxvdzogYXV0bztcclxuICAvLyBtYXgtaGVpZ2h0OiA0MHZoO1xyXG59XHJcblxyXG50YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5leGFtcGxlLWxvYWRpbmctc2hhZGUge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICBib3R0b206IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICB6LWluZGV4OiAxO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyTableComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-table',
                templateUrl: './handy-table.component.html',
                styleUrls: ['./handy-table.component.scss']
            }]
    }], function () { return []; }, { loading: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-table/components/table-filters/table-filters.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-table/components/table-filters/table-filters.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: HandyTableFiltersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyTableFiltersComponent", function() { return HandyTableFiltersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/fesm2015/expansion.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");




const _c0 = ["*"];
class HandyTableFiltersComponent {
    constructor() {
        this.expanded = false;
    }
    toggle() {
        this.expanded = !this.expanded;
    }
    ngOnInit() {
    }
}
HandyTableFiltersComponent.ɵfac = function HandyTableFiltersComponent_Factory(t) { return new (t || HandyTableFiltersComponent)(); };
HandyTableFiltersComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyTableFiltersComponent, selectors: [["handy-table-filters"]], ngContentSelectors: _c0, decls: 7, vars: 1, consts: [[1, "mat-elevation-z0", 3, "expanded"], ["fxFlex", "100%", "fxLayout", "column", "fxLayoutAlign", "flex-start stretch"], [1, "filters-headline"], ["fxLayout", "row wrap", "fxLayoutGap", "1%", "fxLayoutGap.sm", "1.25%", "fxLayoutGap.md", "2.5%"]], template: function HandyTableFiltersComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-accordion");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Advanced filters");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("expanded", ctx.expanded);
    } }, directives: [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_1__["MatAccordion"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_1__["MatExpansionPanel"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultFlexDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutGapDirective"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n  margin-top: 8px;\n  width: 100%;\n}\n\n.filters-content[_ngcontent-%COMP%] {\n  width: 100%;\n  display: inline-flex;\n  flex-wrap: wrap;\n  gap: 1%;\n}\n\nmat-expansion-panel[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.filters-headline[_ngcontent-%COMP%] {\n  padding-top: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS10YWJsZS9jb21wb25lbnRzL3RhYmxlLWZpbHRlcnMvdGFibGUtZmlsdGVycy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLE9BQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LXRhYmxlL2NvbXBvbmVudHMvdGFibGUtZmlsdGVycy90YWJsZS1maWx0ZXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmZpbHRlcnMtY29udGVudCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGdhcDogMSU7XHJcbn1cclxuXHJcbm1hdC1leHBhbnNpb24tcGFuZWwge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uZmlsdGVycy1oZWFkbGluZSB7XHJcbiAgcGFkZGluZy10b3A6IDhweDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyTableFiltersComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-table-filters',
                templateUrl: './table-filters.component.html',
                styleUrls: ['./table-filters.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-table/handy-table.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/handy/modules/handy-table/handy-table.module.ts ***!
  \*****************************************************************/
/*! exports provided: HandyTableModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyTableModule", function() { return HandyTableModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/handy-table-paginator/handy-table-paginator.component */ "./src/app/handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component.ts");
/* harmony import */ var _components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/handy-table/handy-table.component */ "./src/app/handy/modules/handy-table/components/handy-table/handy-table.component.ts");
/* harmony import */ var _components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/table-filters/table-filters.component */ "./src/app/handy/modules/handy-table/components/table-filters/table-filters.component.ts");
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ "./src/app/modules/shared/shared.module.ts");







class HandyTableModule {
}
HandyTableModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: HandyTableModule });
HandyTableModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function HandyTableModule_Factory(t) { return new (t || HandyTableModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](HandyTableModule, { declarations: [_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_2__["HandyTablePaginatorComponent"],
        _components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_3__["HandyTableComponent"],
        _components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_4__["HandyTableFiltersComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]], exports: [_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_2__["HandyTablePaginatorComponent"],
        _components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_3__["HandyTableComponent"],
        _components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_4__["HandyTableFiltersComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyTableModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_2__["HandyTablePaginatorComponent"],
                    _components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_3__["HandyTableComponent"],
                    _components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_4__["HandyTableFiltersComponent"],
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]
                ],
                exports: [
                    _components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_2__["HandyTablePaginatorComponent"],
                    _components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_3__["HandyTableComponent"],
                    _components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_4__["HandyTableFiltersComponent"],
                ]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=default~modules-drop-crud-drop-crud-module~modules-user-crud-user-crud-module.js.map