(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-user-crud-user-crud-module"],{

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

/***/ "./src/app/handy/modules/dev/modules/user-crud/user-crud-form/user-crud-form.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/handy/modules/dev/modules/user-crud/user-crud-form/user-crud-form.component.ts ***!
  \************************************************************************************************/
/*! exports provided: UserCrudFormComponent, UserCrudFormComponentResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCrudFormComponent", function() { return UserCrudFormComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCrudFormComponentResolver", function() { return UserCrudFormComponentResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-memory-state-form */ "./src/app/handy/extenders/handy-memory-state-form.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm2015/dialog.js");
/* harmony import */ var _ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/form-validators */ "./src/app/modules/shared/form-validators/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @handy-ng/models/user.ng-model */ "./src/app/handy/models/user.ng-model.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_form_components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../handy-form/components/handy-number-input/handy-number-input.component */ "./src/app/handy/modules/handy-form/components/handy-number-input/handy-number-input.component.ts");
/* harmony import */ var _handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../handy-form/components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _handy_form_components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../handy-form/components/handy-multi-select-input/handy-multi-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _handy_form_components_handy_check_box_input_handy_check_box_input_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../handy-form/components/handy-check-box-input/handy-check-box-input.component */ "./src/app/handy/modules/handy-form/components/handy-check-box-input/handy-check-box-input.component.ts");
/* harmony import */ var _modules_shared_components_form_actions_bar_form_actions_bar_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../../modules/shared/components/form-actions-bar/form-actions-bar.component */ "./src/app/modules/shared/components/form-actions-bar/form-actions-bar.component.ts");
/* harmony import */ var _modules_shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../../modules/shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _modules_shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../../modules/shared/components/buttons/basic-btn/basic-btn.component */ "./src/app/modules/shared/components/buttons/basic-btn/basic-btn.component.ts");























function UserCrudFormComponent_ng_template_0_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-text-input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserCrudFormComponent_ng_template_0_div_8_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const i_r8 = ctx.index; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r9.removeControlFromArray("groups", i_r8); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Remove control");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const fControl_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", fControl_r7);
} }
function UserCrudFormComponent_ng_template_0_form_actions_bar_13_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form-actions-bar");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "raised-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserCrudFormComponent_ng_template_0_form_actions_bar_13_Template_raised_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r11.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Submit ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r6.submitDisabled);
} }
function UserCrudFormComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-form", 3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("validSubmitEvent", function UserCrudFormComponent_ng_template_0_Template_handy_form_validSubmitEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.onValidSubmit($event); })("invalidSubmitEvent", function UserCrudFormComponent_ng_template_0_Template_handy_form_invalidSubmitEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15.onInvalidSubmit($event); })("submitDisabledChange", function UserCrudFormComponent_ng_template_0_Template_handy_form_submitDisabledChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.submitDisabledChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "handy-text-input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "handy-text-input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "handy-multi-select-input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "handy-multi-select-input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, UserCrudFormComponent_ng_template_0_div_8_Template, 4, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserCrudFormComponent_ng_template_0_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.addGroupsControl(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Add Company type control");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "handy-check-box", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Banned ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, UserCrudFormComponent_ng_template_0_form_actions_bar_13_Template, 3, 1, "form-actions-bar", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r1.formName)("formGroup", ctx_r1.form)("rememberState", ctx_r1.rememberFormState)("defaultResetBtn", true)("disablePin", ctx_r1.isUpdate);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("email"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("name"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx_r1.rolesSelectOptions)("hasEmptyOption", true)("formControl", ctx_r1.form.get("roles"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx_r1.permissionsSelectOptions)("hasEmptyOption", true)("formControl", ctx_r1.form.get("permissions"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.getArrayControls("groups"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("banned"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
} }
function UserCrudFormComponent_ng_container_2_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
const _c0 = function (a0) { return [a0]; };
function UserCrudFormComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "basic-btn", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Back to all");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, UserCrudFormComponent_ng_container_2_ng_container_5_Template, 1, 0, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, ctx_r2.isUpdate ? "../../" : "../"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
} }
function UserCrudFormComponent_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function UserCrudFormComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-dialog-content", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, UserCrudFormComponent_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-actions", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "basic-btn", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserCrudFormComponent_ng_container_3_Template_basic_btn_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r20.dialogRef.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "raised-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserCrudFormComponent_ng_container_3_Template_raised_btn_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r22.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r3.submitDisabled);
} }
class UserCrudFormComponent extends _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__["HandyMemoryStateForm"] {
    /* -------------------------------------------------------------------------- */
    /*                          Radio groups btns                                 */
    /* -------------------------------------------------------------------------- */
    constructor(route, dialogRef, dialogData, _handyNgUserService, handyNgUtilsService, __handyNgConfig, _model) {
        super(_handyNgUserService, handyNgUtilsService, dialogRef, dialogData, route);
        this.route = route;
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._handyNgUserService = _handyNgUserService;
        this.handyNgUtilsService = handyNgUtilsService;
        this.__handyNgConfig = __handyNgConfig;
        this._model = _model;
        this.formName = 'userCrudForm';
        this.rememberFormState = false;
        /* -------------------------------------------------------------------------- */
        /*                          Options for select inputs                         */
        /* -------------------------------------------------------------------------- */
        this.rolesSelectOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.permissionsSelectOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.initExtender();
    }
    ngOnInit() {
    }
    onValidSubmit(formData) {
        let promise = (this.isUpdate) ? this._updateEntry(formData) : this._createEntry(formData);
        promise.then(() => {
            // TODO Redirect or whatever needs to be done after update;
            this.closeDialog(Object.assign(Object.assign({}, formData), { _id: this.updateEntryId }));
        })
            .catch(err => {
            this._handyNgUserService.redirectToErrPageWithApiErr(err);
        });
    }
    onInvalidSubmit(formData) {
        // console.log(formData)
    }
    _createEntry(formData) {
        return new Promise((resolve, reject) => {
            this._model.createOne(Object.assign(Object.assign({}, formData), { registeredViaInvitation: true })).subscribe(result => {
                this.updateEntryId = result.data._id;
                return resolve();
            }, err => {
                return reject(err);
            });
        });
    }
    _updateEntry(formData) {
        return new Promise((resolve, reject) => {
            this._model.updatedOne({ _id: this.updateEntryId }, formData, { skipUpdateHistory: false, updateName: 'LoginComponent form update' }).subscribe(result => {
                return resolve();
            }, err => {
                return reject(err);
            });
        });
    }
    getFormInitData(resolverData) {
        return resolverData;
    }
    createForm(formInitData) {
        let fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.email, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Email is required')], [this._model.uniqueValidator('email', 'This email is taken', formInitData.email, 'all')]),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.name, [ /* Sync validators */], [ /* Async validators */]),
            roles: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.roles, [ /* Sync validators */], [ /* Async validators */]),
            permissions: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.permissions, [ /* Sync validators */], [ /* Async validators */]),
            groups: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]),
            banned: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.banned, [ /* Sync validators */], [ /* Async validators */]),
        });
        /* -------------------------------------------------------------------------- */
        /*                          Form arrays handling                              */
        /* -------------------------------------------------------------------------- */
        this.addBulkControlToFormArray(formInitData.groups, this.addGroupsControl.bind(this), fg);
        return fg;
    }
    /* -------------------------------------------------------------------------- */
    /*              Methods for adding controls to form arrays                    */
    /* -------------------------------------------------------------------------- */
    addGroupsControl(value = null, fg) {
        let control = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](value, [ /* Sync validators */], [ /* Async validators */]);
        this.addControlToFormArray('groups', control, fg);
    }
}
UserCrudFormComponent.fieldsToSelect = ['email', 'name', 'roles', 'permissions', 'groups', 'banned'];
UserCrudFormComponent.ɵfac = function UserCrudFormComponent_Factory(t) { return new (t || UserCrudFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUtilsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"])); };
UserCrudFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserCrudFormComponent, selectors: [["user-crud-form-form"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 3, consts: [["formContent", ""], [4, "ngIf"], [3, "ngModel", "ngModelChange"], [3, "formName", "formGroup", "rememberState", "defaultResetBtn", "disablePin", "validSubmitEvent", "invalidSubmitEvent", "submitDisabledChange"], ["formComp", ""], ["fxLayout", "row wrap", "fxLayoutGap", "8px"], ["fieldName", "userCrudForm_email", "label", "Email", "placeholder", "Email", 1, "handy-form-input", 3, "formControl"], ["fieldName", "userCrudForm_name", "label", "Name", "placeholder", "Name", 1, "handy-form-input", 3, "formControl"], ["emptyOptionLabel", "None", "fieldName", "userCrudForm_roles", "label", "Roles", "placeholder", "Roles", 1, "handy-form-input", 3, "options", "hasEmptyOption", "formControl"], ["emptyOptionLabel", "None", "fieldName", "userCrudForm_permissions", "label", "Permissions", "placeholder", "Permissions", 1, "handy-form-input", 3, "options", "hasEmptyOption", "formControl"], ["fxFlex", "100%"], [4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["labelPosition", "after", "fieldName", "userCrudForm_banned", 1, "handy-form-input", 3, "formControl"], ["fieldName", "userCrudForm_groups", "label", "Company type", "placeholder", "Company type", 3, "formControl"], ["mat-raised-button", "", "color", "warn", 3, "click"], ["color", "primary", 3, "disabled", "click"], [1, "handy-form-page-wrapper"], [1, "handy-form-wrapper"], ["icon", "chevron_left", 3, "routerLink"], [4, "ngTemplateOutlet"], [1, "mat-typography"], ["align", "end"], ["icon", "close", 3, "click"]], template: function UserCrudFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, UserCrudFormComponent_ng_template_0_Template, 14, 16, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, UserCrudFormComponent_ng_container_2_Template, 6, 4, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, UserCrudFormComponent_ng_container_3_Template, 8, 2, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "handy-number-input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UserCrudFormComponent_Template_handy_number_input_ngModelChange_4_listener($event) { return ctx.sample = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.sample);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _handy_form_components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyNumberInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgModel"], _handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_10__["HandyFormComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__["DefaultLayoutGapDirective"], _handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_12__["HandyTextInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _handy_form_components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_13__["HandyMultiSelectInputComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__["DefaultFlexDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButton"], _handy_form_components_handy_check_box_input_handy_check_box_input_component__WEBPACK_IMPORTED_MODULE_15__["HandyCheckBoxInputComponent"], _modules_shared_components_form_actions_bar_form_actions_bar_component__WEBPACK_IMPORTED_MODULE_16__["FormActionsBarComponent"], _modules_shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_17__["RaisedBtnComponent"], _modules_shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_18__["BasicBtnComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgTemplateOutlet"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9kZXYvbW9kdWxlcy91c2VyLWNydWQvdXNlci1jcnVkLWZvcm0vdXNlci1jcnVkLWZvcm0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDRSxjQUFBO0FBQ0giLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2Rldi9tb2R1bGVzL3VzZXItY3J1ZC91c2VyLWNydWQtZm9ybS91c2VyLWNydWQtZm9ybS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XHJcbiAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gfSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserCrudFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'user-crud-form-form',
                templateUrl: './user-crud-form.component.html',
                styleUrls: ['./user-crud-form.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUserService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUtilsService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgConfigService"] }, { type: _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"] }]; }, null); })();
/* -------------------------------------------------------------------------- */
/*                                Form resolver                               */
/* -------------------------------------------------------------------------- */
class UserCrudFormComponentResolver {
    constructor(_model) {
        this._model = _model;
    }
    // Can be used for modal integration
    getItemData(id) {
        if (id === undefined) {
            return Promise.resolve(null);
        }
        return new Promise((resolve, reject) => {
            this._model.findById(id, { selectType: 'select', fields: UserCrudFormComponent.fieldsToSelect })
                .subscribe(result => {
                if (result.data.foundRecord) {
                    return resolve(result.data.doc);
                }
                else {
                    return resolve(null);
                }
            }, err => {
                return resolve(null);
            });
        });
    }
    resolve(route, state) {
        return this.getItemData(+route.params['id']);
    }
}
UserCrudFormComponentResolver.ɵfac = function UserCrudFormComponentResolver_Factory(t) { return new (t || UserCrudFormComponentResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"])); };
UserCrudFormComponentResolver.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserCrudFormComponentResolver, factory: UserCrudFormComponentResolver.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserCrudFormComponentResolver, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"] }]; }, null); })();


/***/ }),

/***/ "./src/app/handy/modules/dev/modules/user-crud/user-crud-routing.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/handy/modules/dev/modules/user-crud/user-crud-routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: UserCrudRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCrudRoutingModule", function() { return UserCrudRoutingModule; });
/* harmony import */ var src_app_pages_error_error_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pages/error/error.component */ "./src/app/pages/error/error.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _user_crud_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-crud.component */ "./src/app/handy/modules/dev/modules/user-crud/user-crud.component.ts");
/* harmony import */ var _user_crud_table_user_crud_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-crud-table/user-crud-table.component */ "./src/app/handy/modules/dev/modules/user-crud/user-crud-table/user-crud-table.component.ts");
/* harmony import */ var _user_crud_form_user_crud_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-crud-form/user-crud-form.component */ "./src/app/handy/modules/dev/modules/user-crud/user-crud-form/user-crud-form.component.ts");








const routes = [
    {
        path: '',
        component: _user_crud_component__WEBPACK_IMPORTED_MODULE_3__["UserCrudComponent"],
        children: [
            {
                path: '',
                component: _user_crud_table_user_crud_table_component__WEBPACK_IMPORTED_MODULE_4__["UserCrudTableComponent"],
            },
            {
                path: 'new',
                component: _user_crud_form_user_crud_form_component__WEBPACK_IMPORTED_MODULE_5__["UserCrudFormComponent"],
            },
            {
                path: 'edit/:id',
                component: _user_crud_form_user_crud_form_component__WEBPACK_IMPORTED_MODULE_5__["UserCrudFormComponent"],
                resolve: {
                    formData: _user_crud_form_user_crud_form_component__WEBPACK_IMPORTED_MODULE_5__["UserCrudFormComponentResolver"]
                }
            },
        ]
    },
    { path: '**', component: src_app_pages_error_error_component__WEBPACK_IMPORTED_MODULE_0__["ErrorComponent"] }
];
class UserCrudRoutingModule {
}
UserCrudRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: UserCrudRoutingModule });
UserCrudRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function UserCrudRoutingModule_Factory(t) { return new (t || UserCrudRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](UserCrudRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](UserCrudRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/handy/modules/dev/modules/user-crud/user-crud-table/user-crud-table.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/handy/modules/dev/modules/user-crud/user-crud-table/user-crud-table.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: UserCrudTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCrudTableComponent", function() { return UserCrudTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/fesm2015/table.js");
/* harmony import */ var _handy_ng_extenders_handy_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-datatable */ "./src/app/handy/extenders/handy-datatable.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services_handy_ng_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/services/handy-ng-user.service */ "./src/app/handy/services/handy-ng-user.service.ts");
/* harmony import */ var _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/models/user.ng-model */ "./src/app/handy/models/user.ng-model.ts");
/* harmony import */ var _modules_shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../modules/shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../handy-form/components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _handy_form_components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../handy-form/components/handy-multi-select-input/handy-multi-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component.ts");
/* harmony import */ var _modules_shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../modules/shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _handy_table_components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../handy-table/components/table-filters/table-filters.component */ "./src/app/handy/modules/handy-table/components/table-filters/table-filters.component.ts");
/* harmony import */ var _handy_form_components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../handy-form/components/handy-select-input/handy-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-select-input/handy-select-input.component.ts");
/* harmony import */ var _handy_table_components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../handy-table/components/handy-table/handy-table.component */ "./src/app/handy/modules/handy-table/components/handy-table/handy-table.component.ts");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/fesm2015/sort.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/fesm2015/drag-drop.js");
/* harmony import */ var _handy_table_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../handy-table/components/handy-table-paginator/handy-table-paginator.component */ "./src/app/handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component.ts");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/esm2015/extended.js");
/* harmony import */ var _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../../../modules/shared/components/buttons/icon-btn/icon-btn.component */ "./src/app/modules/shared/components/buttons/icon-btn/icon-btn.component.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _modules_shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../../../modules/shared/components/buttons/basic-btn/basic-btn.component */ "./src/app/modules/shared/components/buttons/basic-btn/basic-btn.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _handy_ng_directives_confirm_click_directive__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @handy-ng/directives/confirm-click.directive */ "./src/app/handy/directives/confirm-click.directive.ts");



























function UserCrudTableComponent_mat_header_cell_35_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_35_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_cell_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r29 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r29._id);
} }
function UserCrudTableComponent_mat_header_cell_38_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_38_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_cell_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r31.email);
} }
function UserCrudTableComponent_mat_header_cell_41_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_41_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_cell_42_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r33.password);
} }
function UserCrudTableComponent_mat_header_cell_44_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_44_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_cell_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r35 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r35.name);
} }
function UserCrudTableComponent_mat_header_cell_47_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Roles");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_47_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Roles");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_cell_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r37 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r37.roles);
} }
function UserCrudTableComponent_mat_header_cell_50_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Permissions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_50_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Permissions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_cell_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r39.permissions);
} }
function UserCrudTableComponent_mat_header_cell_53_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Verified email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_53_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Verified email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_cell_54_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r41 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r41.hasVerifiedEmail);
} }
function UserCrudTableComponent_mat_header_cell_56_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "New email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_56_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_56_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "New email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_cell_57_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r43 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r43.newEmail);
} }
function UserCrudTableComponent_mat_header_cell_59_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Banned");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_59_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_59_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Banned");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_cell_60_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r45.banned);
} }
function UserCrudTableComponent_mat_header_cell_62_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UserCrudTableComponent_mat_header_cell_62_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserCrudTableComponent_mat_header_cell_62_span_1_Template, 3, 0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function (a0) { return [a0]; };
function UserCrudTableComponent_mat_cell_63_Template(rf, ctx) { if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "stroked-btn", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "stroked-btn", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("confirmClick", function UserCrudTableComponent_mat_cell_63_Template_stroked_btn_confirmClick_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r49); const element_r47 = ctx.$implicit; const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r48.removeEntryAction(element_r47._id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Remove ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r47 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, "./edit/" + element_r47._id));
} }
function UserCrudTableComponent_mat_header_row_64_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-header-row");
} }
function UserCrudTableComponent_mat_row_65_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-row");
} }
class UserCrudTableComponent extends _handy_ng_extenders_handy_datatable__WEBPACK_IMPORTED_MODULE_2__["HandyDataTable"] {
    constructor(_handyNgUserService, _model) {
        super(_handyNgUserService);
        this._handyNgUserService = _handyNgUserService;
        this._model = _model;
        this.modelFieldsToQuery = ['_id', 'email', 'name', 'roles', 'permissions', 'hasVerifiedEmail', 'banned',];
        this.displayedColumns = ['_id', 'email', 'name', 'roles', 'permissions', 'hasVerifiedEmail', 'banned', 'actions'];
        this.rememberTableState = true;
        this.tableName = 'userCrudTable_table';
        /* ---------------------------- Optional columns ---------------------------- */
        this.optionalColumns = [
            {
                value: 'email',
                displayValue: 'Email'
            },
            {
                value: 'name',
                displayValue: 'Name'
            },
            {
                value: 'roles',
                displayValue: 'Roles'
            },
            {
                value: 'permissions',
                displayValue: 'Permissions'
            },
            {
                value: 'hasVerifiedEmail',
                displayValue: 'Verified email'
            },
            {
                value: 'banned',
                displayValue: 'Banned'
            },
        ];
        /* ---------------------------- Searchable fileds --------------------------- */
        this.searchableFields = [
            {
                value: '_id',
                displayValue: 'Id'
            },
            {
                value: 'email',
                displayValue: 'Email'
            },
            {
                value: 'name',
                displayValue: 'Name'
            },
            {
                value: 'roles',
                displayValue: 'Roles'
            },
            {
                value: 'permissions',
                displayValue: 'Permissions'
            },
            {
                value: 'newEmail',
                displayValue: 'New email'
            },
        ];
        /* -------------------------------------------------------------------------- */
        /*                              Additional filter                             */
        /* -------------------------------------------------------------------------- */
        this._idFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.emailFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.passwordFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.nameFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.rolesFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.permissionsFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.hasVerifiedEmailFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.newEmailFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.bannedFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.initExtender();
    }
    createFilterForm(filterData) {
        this.filterForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            search: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.search),
            searchableFields: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.searchableFields),
            displayedColumns: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.displayedColumns),
            _id: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData._id),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.email),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.password),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.name),
            roles: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.roles),
            permissions: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.permissions),
            hasVerifiedEmail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.hasVerifiedEmail),
            newEmail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.newEmail),
            banned: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.banned),
        });
    }
    getData(filterData, page, limit, sort) {
        return new Promise((resolve, reject) => {
            let { search = '', searchableFields } = filterData;
            this._model.search(search, searchableFields, { selectType: 'select', fields: this.modelFieldsToQuery }, this.getFindOptions(page, limit, sort), this.getAdditionalSearchQueries(filterData), this.getAdditionalFilterQueries(filterData))
                .subscribe(result => {
                let { docs, paginationData } = result.data;
                return resolve({
                    dataSource: new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](docs),
                    pageIndex: paginationData.page,
                    itemsCount: paginationData.totalRecordsCount
                });
            }, err => {
                return reject(err);
            });
        });
    }
    // For queries that are not included in default handy model search functionality
    getAdditionalSearchQueries(filterData) {
        return [];
    }
    // For additional filters
    getAdditionalFilterQueries(filterData) {
        let additionalFilterQueries = [];
        let { _id, email, password, name, roles, permissions, hasVerifiedEmail, newEmail, banned, } = filterData;
        // Id filter
        if (_id !== null && _id !== undefined) {
            additionalFilterQueries.push({
                _id
            });
        }
        // Email filter
        if (email !== null && email !== undefined) {
            additionalFilterQueries.push({
                email
            });
        }
        // Password filter
        if (password !== null && password !== undefined) {
            additionalFilterQueries.push({
                password
            });
        }
        // Name filter
        if (name !== null && name !== undefined) {
            additionalFilterQueries.push({
                name
            });
        }
        // Roles filter
        if (roles !== null && roles !== undefined) {
            additionalFilterQueries.push({
                roles
            });
        }
        // Permissions filter
        if (permissions !== null && permissions !== undefined) {
            additionalFilterQueries.push({
                permissions
            });
        }
        // Verified email filter
        if (hasVerifiedEmail !== null && hasVerifiedEmail !== undefined) {
            additionalFilterQueries.push({
                hasVerifiedEmail
            });
        }
        // New email filter
        if (newEmail !== null && newEmail !== undefined) {
            additionalFilterQueries.push({
                newEmail
            });
        }
        // Banned filter
        if (banned !== null && banned !== undefined) {
            additionalFilterQueries.push({
                banned
            });
        }
        return additionalFilterQueries;
    }
    /* -------------------------------------------------------------------------- */
    /*                              Actions methods                               */
    /* -------------------------------------------------------------------------- */
    removeEntryAction(id) {
        this._model.deleteById(id).subscribe(deleteResult => {
            // TODO do whatever you need to do after removing
            this.refreshTableData();
            console.log(deleteResult);
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
UserCrudTableComponent.ɵfac = function UserCrudTableComponent_Factory(t) { return new (t || UserCrudTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services_handy_ng_user_service__WEBPACK_IMPORTED_MODULE_4__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_5__["UserNgModel"])); };
UserCrudTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserCrudTableComponent, selectors: [["user-crud-table-table"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 69, vars: 40, consts: [[1, "crud-table-page-wrapper"], [1, "crud-table-actions-bar"], ["icon", "add", "color", "primary", "routerLink", "./new"], [1, "crud-table-filters-form", 3, "hideFormOptions"], ["tableFilter", ""], [1, "crud-table-search-bar"], ["label", "Search", "placeholder", "Search", 1, "crud-table-search-input", 3, "formControl"], ["searchInput", ""], ["label", "Search fields", "placeholder", "Search fields", 1, "crud-table-searchable-fields-input", 3, "formControl"], ["searchableFieldsSelect", ""], [1, "crud-table-filters-btns-wrapper"], [1, "crud-table-filters-btns"], ["color", "primary", "icon", "filter_list"], ["filtersToggle", ""], ["color", "warn", "icon", "refresh"], ["clearFilters", ""], ["label", "Diplay columns", "placeholder", "Diplay columns", 1, "crud-table-filter-input", 3, "formControl"], ["optionalColumnsSelect", ""], ["label", "Id", "placeholder", "Id", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "Email", "placeholder", "Email", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "Password", "placeholder", "Password", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "Name", "placeholder", "Name", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "Roles", "placeholder", "Roles", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "Permissions", "placeholder", "Permissions", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "Verified email", "placeholder", "Verified email", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "New email", "placeholder", "New email", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "Banned", "placeholder", "Banned", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["matSort", "", "cdkDropList", "", "cdkDropListOrientation", "horizontal", 3, "dataSource", "cdkDropListDropped"], ["matColumnDef", "_id"], ["cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", "", 4, "matHeaderCellDef"], [4, "matCellDef"], ["matColumnDef", "email"], ["matColumnDef", "password"], ["matColumnDef", "name"], ["matColumnDef", "roles"], ["matColumnDef", "permissions"], ["matColumnDef", "hasVerifiedEmail"], ["matColumnDef", "newEmail"], ["matColumnDef", "banned"], ["matColumnDef", "actions"], ["class", "crud-table-actions-col", "cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", "", 4, "matHeaderCellDef"], ["class", "crud-table-actions-col", 4, "matCellDef"], [4, "matHeaderRowDef", "matHeaderRowDefSticky"], [4, "matRowDef", "matRowDefColumns"], ["fxHide.lt-lg", "", 1, "table-expand-btn"], [3, "matTooltip", "icon", "click"], ["cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", ""], [4, "cdkDragPreview"], ["icon", "swap_horiz"], ["cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", "", 1, "crud-table-actions-col"], [1, "crud-table-actions-col"], ["fxLayout", "row", "fxLayoutAlign", "flex-end center", "fxLayoutGap", "8px"], ["icon", "edit", "color", "primary", 3, "routerLink"], ["icon", "delete_forever", "color", "warn", 3, "confirmClick"]], template: function UserCrudTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "raised-btn", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "New entry");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "handy-form", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "handy-text-input", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "handy-multi-select-input", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "stroked-btn", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "stroked-btn", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Reset filters");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "handy-table-filters");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "handy-multi-select-input", 16, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "handy-select-input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "handy-select-input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "handy-select-input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "handy-select-input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "handy-select-input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "handy-select-input", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "handy-select-input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "handy-select-input", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "handy-select-input", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "handy-table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "mat-table", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkDropListDropped", function UserCrudTableComponent_Template_mat_table_cdkDropListDropped_33_listener($event) { return ctx.drop($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](34, 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, UserCrudTableComponent_mat_header_cell_35_Template, 3, 0, "mat-header-cell", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, UserCrudTableComponent_mat_cell_36_Template, 2, 1, "mat-cell", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](37, 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, UserCrudTableComponent_mat_header_cell_38_Template, 3, 0, "mat-header-cell", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, UserCrudTableComponent_mat_cell_39_Template, 2, 1, "mat-cell", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](40, 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](41, UserCrudTableComponent_mat_header_cell_41_Template, 3, 0, "mat-header-cell", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](42, UserCrudTableComponent_mat_cell_42_Template, 2, 1, "mat-cell", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](43, 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](44, UserCrudTableComponent_mat_header_cell_44_Template, 3, 0, "mat-header-cell", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](45, UserCrudTableComponent_mat_cell_45_Template, 2, 1, "mat-cell", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](46, 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](47, UserCrudTableComponent_mat_header_cell_47_Template, 3, 0, "mat-header-cell", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](48, UserCrudTableComponent_mat_cell_48_Template, 2, 1, "mat-cell", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](49, 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](50, UserCrudTableComponent_mat_header_cell_50_Template, 3, 0, "mat-header-cell", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](51, UserCrudTableComponent_mat_cell_51_Template, 2, 1, "mat-cell", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](52, 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](53, UserCrudTableComponent_mat_header_cell_53_Template, 3, 0, "mat-header-cell", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](54, UserCrudTableComponent_mat_cell_54_Template, 2, 1, "mat-cell", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](55, 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](56, UserCrudTableComponent_mat_header_cell_56_Template, 3, 0, "mat-header-cell", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](57, UserCrudTableComponent_mat_cell_57_Template, 2, 1, "mat-cell", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](58, 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](59, UserCrudTableComponent_mat_header_cell_59_Template, 3, 0, "mat-header-cell", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](60, UserCrudTableComponent_mat_cell_60_Template, 2, 1, "mat-cell", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](61, 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](62, UserCrudTableComponent_mat_header_cell_62_Template, 3, 0, "mat-header-cell", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](63, UserCrudTableComponent_mat_cell_63_Template, 6, 3, "mat-cell", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](64, UserCrudTableComponent_mat_header_row_64_Template, 1, 0, "mat-header-row", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](65, UserCrudTableComponent_mat_row_65_Template, 1, 0, "mat-row", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "handy-table-paginator");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "icon-btn", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserCrudTableComponent_Template_icon_btn_click_68_listener() { return ctx.toogleExpandedState(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.expanded ? "expanded-crud-table-wrapper" : "crud-table-wrapper");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hideFormOptions", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("search"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("searchableFields"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.filtersToggleState ? "Hide" : "Show", " filters");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("displayedColumns"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("_id"))("options", ctx._idFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("email"))("options", ctx.emailFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("password"))("options", ctx.passwordFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("name"))("options", ctx.nameFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("roles"))("options", ctx.rolesFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("permissions"))("options", ctx.permissionsFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("hasVerifiedEmail"))("options", ctx.hasVerifiedEmailFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("newEmail"))("options", ctx.newEmailFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("banned"))("options", ctx.bannedFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx.expanded ? "Shrink table" : "Expand table")("icon", ctx.expanded ? "west" : "east");
    } }, directives: [_modules_shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_6__["RaisedBtnComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterLink"], _handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_8__["HandyFormComponent"], _handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyTextInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlDirective"], _handy_form_components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyMultiSelectInputComponent"], _modules_shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_11__["StrokedBtnComponent"], _handy_table_components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_12__["HandyTableFiltersComponent"], _handy_form_components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_13__["HandySelectInputComponent"], _handy_table_components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_14__["HandyTableComponent"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTable"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__["MatSort"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["CdkDropList"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRowDef"], _handy_table_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_17__["HandyTablePaginatorComponent"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_18__["DefaultShowHideDirective"], _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_19__["IconBtnComponent"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__["MatTooltip"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCell"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["CdkDrag"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__["MatSortHeader"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["CdkDragPreview"], _modules_shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_21__["BasicBtnComponent"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCell"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__["DefaultLayoutGapDirective"], _handy_ng_directives_confirm_click_directive__WEBPACK_IMPORTED_MODULE_23__["ConfirmClickDirective"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRow"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9kZXYvbW9kdWxlcy91c2VyLWNydWQvdXNlci1jcnVkLXRhYmxlL3VzZXItY3J1ZC10YWJsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNFLGNBQUE7QUFDSCIsImZpbGUiOiJzcmMvYXBwL2hhbmR5L21vZHVsZXMvZGV2L21vZHVsZXMvdXNlci1jcnVkL3VzZXItY3J1ZC10YWJsZS91c2VyLWNydWQtdGFibGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xyXG4gICBkaXNwbGF5OiBibG9jaztcclxuIH0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserCrudTableComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'user-crud-table-table',
                templateUrl: './user-crud-table.component.html',
                styleUrls: ['./user-crud-table.component.scss']
            }]
    }], function () { return [{ type: _handy_ng_services_handy_ng_user_service__WEBPACK_IMPORTED_MODULE_4__["HandyNgUserService"] }, { type: _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_5__["UserNgModel"] }]; }, null); })();


/***/ }),

/***/ "./src/app/handy/modules/dev/modules/user-crud/user-crud.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/handy/modules/dev/modules/user-crud/user-crud.component.ts ***!
  \****************************************************************************/
/*! exports provided: UserCrudComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCrudComponent", function() { return UserCrudComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



class UserCrudComponent {
}
UserCrudComponent.ɵfac = function UserCrudComponent_Factory(t) { return new (t || UserCrudComponent)(); };
UserCrudComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserCrudComponent, selectors: [["user-crud"]], decls: 1, vars: 0, template: function UserCrudComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hhbmR5L21vZHVsZXMvZGV2L21vZHVsZXMvdXNlci1jcnVkL3VzZXItY3J1ZC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserCrudComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'user-crud',
                templateUrl: './user-crud.component.html',
                styleUrls: ['./user-crud.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/handy/modules/dev/modules/user-crud/user-crud.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/handy/modules/dev/modules/user-crud/user-crud.module.ts ***!
  \*************************************************************************/
/*! exports provided: UserCrudModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCrudModule", function() { return UserCrudModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ "./src/app/modules/shared/shared.module.ts");
/* harmony import */ var _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/modules/handy-form/handy-form.module */ "./src/app/handy/modules/handy-form/handy-form.module.ts");
/* harmony import */ var _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/modules/handy-table/handy-table.module */ "./src/app/handy/modules/handy-table/handy-table.module.ts");
/* harmony import */ var _user_crud_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-crud-routing.module */ "./src/app/handy/modules/dev/modules/user-crud/user-crud-routing.module.ts");
/* harmony import */ var _user_crud_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-crud.component */ "./src/app/handy/modules/dev/modules/user-crud/user-crud.component.ts");
/* harmony import */ var _user_crud_form_user_crud_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user-crud-form/user-crud-form.component */ "./src/app/handy/modules/dev/modules/user-crud/user-crud-form/user-crud-form.component.ts");
/* harmony import */ var _user_crud_table_user_crud_table_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user-crud-table/user-crud-table.component */ "./src/app/handy/modules/dev/modules/user-crud/user-crud-table/user-crud-table.component.ts");










class UserCrudModule {
}
UserCrudModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: UserCrudModule });
UserCrudModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function UserCrudModule_Factory(t) { return new (t || UserCrudModule)(); }, imports: [[
            _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__["HandyFormModule"],
            _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__["HandyTableModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _user_crud_routing_module__WEBPACK_IMPORTED_MODULE_5__["UserCrudRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](UserCrudModule, { declarations: [_user_crud_component__WEBPACK_IMPORTED_MODULE_6__["UserCrudComponent"],
        _user_crud_form_user_crud_form_component__WEBPACK_IMPORTED_MODULE_7__["UserCrudFormComponent"],
        _user_crud_table_user_crud_table_component__WEBPACK_IMPORTED_MODULE_8__["UserCrudTableComponent"]], imports: [_handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__["HandyFormModule"],
        _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__["HandyTableModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
        _user_crud_routing_module__WEBPACK_IMPORTED_MODULE_5__["UserCrudRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserCrudModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _user_crud_component__WEBPACK_IMPORTED_MODULE_6__["UserCrudComponent"],
                    _user_crud_form_user_crud_form_component__WEBPACK_IMPORTED_MODULE_7__["UserCrudFormComponent"],
                    _user_crud_table_user_crud_table_component__WEBPACK_IMPORTED_MODULE_8__["UserCrudTableComponent"],
                ],
                imports: [
                    _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__["HandyFormModule"],
                    _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__["HandyTableModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                    _user_crud_routing_module__WEBPACK_IMPORTED_MODULE_5__["UserCrudRoutingModule"]
                ]
            }]
    }], null, null); })();


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
//# sourceMappingURL=modules-user-crud-user-crud-module.js.map