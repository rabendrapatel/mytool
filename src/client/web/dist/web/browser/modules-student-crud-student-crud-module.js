(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-student-crud-student-crud-module"],{

/***/ "./src/app/handy/models/student.ng-model.ts":
/*!**************************************************!*\
  !*** ./src/app/handy/models/student.ng-model.ts ***!
  \**************************************************/
/*! exports provided: StudentNgModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentNgModel", function() { return StudentNgModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _handy_ng_extenders_handy_ng_model_extender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-ng-model-extender */ "./src/app/handy/extenders/handy-ng-model-extender.ts");
/* harmony import */ var _handy_ng_decorators_handy_ng_model_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/decorators/handy-ng-model.decorator */ "./src/app/handy/decorators/handy-ng-model.decorator.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _handy_ng_services_handy_ng_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/services/handy-ng-api.service */ "./src/app/handy/services/handy-ng-api.service.ts");
/* harmony import */ var _handy_ng_services_handy_ng_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/services/handy-ng-config.service */ "./src/app/handy/services/handy-ng-config.service.ts");







let StudentNgModel = class StudentNgModel extends _handy_ng_extenders_handy_ng_model_extender__WEBPACK_IMPORTED_MODULE_1__["HandyNgModelMethods"] {
    constructor(_handyApiService, _handyNgConfigService) {
        super(_handyApiService, _handyNgConfigService);
        this._handyApiService = _handyApiService;
        this._handyNgConfigService = _handyNgConfigService;
    }
};
StudentNgModel.ɵfac = function StudentNgModel_Factory(t) { return new (t || StudentNgModel)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_handy_ng_services_handy_ng_api_service__WEBPACK_IMPORTED_MODULE_4__["HandyNgApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_handy_ng_services_handy_ng_config_service__WEBPACK_IMPORTED_MODULE_5__["HandyNgConfigService"])); };
StudentNgModel.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: StudentNgModel, factory: StudentNgModel.ɵfac, providedIn: 'root' });
StudentNgModel = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_handy_ng_decorators_handy_ng_model_decorator__WEBPACK_IMPORTED_MODULE_2__["HandyNgModel"])({ name: 'student' })
], StudentNgModel);

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](StudentNgModel, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: _handy_ng_services_handy_ng_api_service__WEBPACK_IMPORTED_MODULE_4__["HandyNgApiService"] }, { type: _handy_ng_services_handy_ng_config_service__WEBPACK_IMPORTED_MODULE_5__["HandyNgConfigService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/student-crud/student-crud-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/modules/student-crud/student-crud-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: StudentCrudRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentCrudRoutingModule", function() { return StudentCrudRoutingModule; });
/* harmony import */ var src_app_pages_error_error_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pages/error/error.component */ "./src/app/pages/error/error.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");
/* harmony import */ var _student_crud_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./student-crud.component */ "./src/app/modules/student-crud/student-crud.component.ts");
/* harmony import */ var _student_student_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./student/student.component */ "./src/app/modules/student-crud/student/student.component.ts");








const routes = [
    {
        path: '',
        component: _student_crud_component__WEBPACK_IMPORTED_MODULE_4__["StudentCrudComponent"],
        data: {
            pageTitle: Object(_handy_ng_core__WEBPACK_IMPORTED_MODULE_3__["setRouteTitle"])({ title: 'StudentCrud management' })
        },
        children: [
            {
                path: '',
                component: _student_student_component__WEBPACK_IMPORTED_MODULE_5__["StudentComponent"],
                data: {
                    pageTitle: Object(_handy_ng_core__WEBPACK_IMPORTED_MODULE_3__["setRouteTitle"])({ title: 'StudentCrud table' })
                },
            },
            {
                path: 'new',
                component: _student_student_component__WEBPACK_IMPORTED_MODULE_5__["StudentComponent"],
                data: {
                    pageTitle: Object(_handy_ng_core__WEBPACK_IMPORTED_MODULE_3__["setRouteTitle"])({ title: 'StudentCrud new' })
                },
            },
            {
                path: 'edit/:id',
                component: _student_student_component__WEBPACK_IMPORTED_MODULE_5__["StudentComponent"],
                data: {
                    pageTitle: Object(_handy_ng_core__WEBPACK_IMPORTED_MODULE_3__["setRouteTitle"])({ title: 'StudentCrud edit' })
                }
            },
        ]
    },
    { path: '**', component: src_app_pages_error_error_component__WEBPACK_IMPORTED_MODULE_0__["ErrorComponent"] }
];
class StudentCrudRoutingModule {
}
StudentCrudRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: StudentCrudRoutingModule });
StudentCrudRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function StudentCrudRoutingModule_Factory(t) { return new (t || StudentCrudRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](StudentCrudRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](StudentCrudRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/student-crud/student-crud.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/modules/student-crud/student-crud.component.ts ***!
  \****************************************************************/
/*! exports provided: StudentCrudComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentCrudComponent", function() { return StudentCrudComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class StudentCrudComponent {
}
StudentCrudComponent.ɵfac = function StudentCrudComponent_Factory(t) { return new (t || StudentCrudComponent)(); };
StudentCrudComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StudentCrudComponent, selectors: [["student-crud"]], decls: 1, vars: 0, template: function StudentCrudComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvc3R1ZGVudC1jcnVkL3N0dWRlbnQtY3J1ZC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StudentCrudComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'student-crud',
                templateUrl: './student-crud.component.html',
                styleUrls: ['./student-crud.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/student-crud/student-crud.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/modules/student-crud/student-crud.module.ts ***!
  \*************************************************************/
/*! exports provided: StudentCrudModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentCrudModule", function() { return StudentCrudModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ "./src/app/modules/shared/shared.module.ts");
/* harmony import */ var _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/modules/handy-form/handy-form.module */ "./src/app/handy/modules/handy-form/handy-form.module.ts");
/* harmony import */ var _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/modules/handy-table/handy-table.module */ "./src/app/handy/modules/handy-table/handy-table.module.ts");
/* harmony import */ var _student_crud_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./student-crud-routing.module */ "./src/app/modules/student-crud/student-crud-routing.module.ts");
/* harmony import */ var _student_crud_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./student-crud.component */ "./src/app/modules/student-crud/student-crud.component.ts");
/* harmony import */ var _student_student_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./student/student.component */ "./src/app/modules/student-crud/student/student.component.ts");









class StudentCrudModule {
}
StudentCrudModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: StudentCrudModule });
StudentCrudModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function StudentCrudModule_Factory(t) { return new (t || StudentCrudModule)(); }, imports: [[
            _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__["HandyFormModule"],
            _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__["HandyTableModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _student_crud_routing_module__WEBPACK_IMPORTED_MODULE_5__["StudentCrudRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](StudentCrudModule, { declarations: [_student_crud_component__WEBPACK_IMPORTED_MODULE_6__["StudentCrudComponent"],
        _student_student_component__WEBPACK_IMPORTED_MODULE_7__["StudentComponent"]], imports: [_handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__["HandyFormModule"],
        _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__["HandyTableModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
        _student_crud_routing_module__WEBPACK_IMPORTED_MODULE_5__["StudentCrudRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StudentCrudModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _student_crud_component__WEBPACK_IMPORTED_MODULE_6__["StudentCrudComponent"],
                    _student_student_component__WEBPACK_IMPORTED_MODULE_7__["StudentComponent"],
                ],
                imports: [
                    _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__["HandyFormModule"],
                    _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__["HandyTableModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                    _student_crud_routing_module__WEBPACK_IMPORTED_MODULE_5__["StudentCrudRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/student-crud/student/student.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/modules/student-crud/student/student.component.ts ***!
  \*******************************************************************/
/*! exports provided: StudentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentComponent", function() { return StudentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
/* harmony import */ var _handy_ng_extenders_handy_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-datatable */ "./src/app/handy/extenders/handy-datatable.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services_handy_ng_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/services/handy-ng-user.service */ "./src/app/handy/services/handy-ng-user.service.ts");
/* harmony import */ var _handy_ng_models_student_ng_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/models/student.ng-model */ "./src/app/handy/models/student.ng-model.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component.ts");
/* harmony import */ var _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _handy_modules_handy_table_components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../handy/modules/handy-table/components/table-filters/table-filters.component */ "./src/app/handy/modules/handy-table/components/table-filters/table-filters.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-select-input/handy-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-select-input/handy-select-input.component.ts");
/* harmony import */ var _handy_modules_handy_table_components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../handy/modules/handy-table/components/handy-table/handy-table.component */ "./src/app/handy/modules/handy-table/components/handy-table/handy-table.component.ts");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sort.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/drag-drop.js");
/* harmony import */ var _handy_modules_handy_table_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component */ "./src/app/handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component.ts");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/extended.js");
/* harmony import */ var _shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../shared/components/buttons/icon-btn/icon-btn.component */ "./src/app/modules/shared/components/buttons/icon-btn/icon-btn.component.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");
/* harmony import */ var _shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../shared/components/buttons/basic-btn/basic-btn.component */ "./src/app/modules/shared/components/buttons/basic-btn/basic-btn.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _handy_ng_directives_confirm_click_directive__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @handy-ng/directives/confirm-click.directive */ "./src/app/handy/directives/confirm-click.directive.ts");



























function StudentComponent_mat_header_cell_29_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_header_cell_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, StudentComponent_mat_header_cell_29_span_1_Template, 3, 0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_cell_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r23 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r23._id);
} }
function StudentComponent_mat_header_cell_32_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Student Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_header_cell_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, StudentComponent_mat_header_cell_32_span_1_Template, 3, 0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Student Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_cell_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r25 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r25.studentName);
} }
function StudentComponent_mat_header_cell_35_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Full Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_header_cell_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, StudentComponent_mat_header_cell_35_span_1_Template, 3, 0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Full Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_cell_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r27.studentAddress);
} }
function StudentComponent_mat_header_cell_38_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Course");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_header_cell_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, StudentComponent_mat_header_cell_38_span_1_Template, 3, 0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Course");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_cell_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r29 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r29.studentCourse);
} }
function StudentComponent_mat_header_cell_41_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Mobile No");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_header_cell_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, StudentComponent_mat_header_cell_41_span_1_Template, 3, 0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Mobile No");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_cell_42_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r31.studentMobile);
} }
function StudentComponent_mat_header_cell_44_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_header_cell_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, StudentComponent_mat_header_cell_44_span_1_Template, 3, 0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_cell_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r33.studentEmail);
} }
function StudentComponent_mat_header_cell_47_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function StudentComponent_mat_header_cell_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, StudentComponent_mat_header_cell_47_span_1_Template, 3, 0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function (a0) { return [a0]; };
function StudentComponent_mat_cell_48_Template(rf, ctx) { if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "stroked-btn", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "stroked-btn", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("confirmClick", function StudentComponent_mat_cell_48_Template_stroked_btn_confirmClick_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r37); const element_r35 = ctx.$implicit; const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r36.removeEntryAction(element_r35._id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r35 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, "./edit/" + element_r35._id));
} }
function StudentComponent_mat_header_row_49_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-header-row");
} }
function StudentComponent_mat_row_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-row");
} }
class StudentComponent extends _handy_ng_extenders_handy_datatable__WEBPACK_IMPORTED_MODULE_2__["HandyDataTable"] {
    constructor(_handyNgUserService, _model) {
        super(_handyNgUserService);
        this._handyNgUserService = _handyNgUserService;
        this._model = _model;
        this.modelFieldsToQuery = ['_id', 'studentName', 'studentAddress', 'studentCourse', 'studentMobile', 'studentEmail',];
        this.displayedColumns = ['_id', 'studentName', 'studentAddress', 'studentCourse', 'studentMobile', 'studentEmail', 'actions'];
        this.rememberTableState = true;
        this.tableName = 'student_table';
        /* ---------------------------- Optional columns ---------------------------- */
        this.optionalColumns = [
            {
                value: 'studentName',
                displayValue: 'Student Name'
            },
            {
                value: 'studentAddress',
                displayValue: 'Full Address'
            },
            {
                value: 'studentCourse',
                displayValue: 'Course'
            },
            {
                value: 'studentMobile',
                displayValue: 'Mobile No'
            },
        ];
        /* ---------------------------- Searchable fileds --------------------------- */
        this.searchableFields = [
            {
                value: '_id',
                displayValue: 'ID'
            },
            {
                value: 'studentName',
                displayValue: 'Student Name'
            },
            {
                value: 'studentCourse',
                displayValue: 'Course'
            },
            {
                value: 'studentMobile',
                displayValue: 'Mobile No'
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
        this.studentAddressFilterOptions = [
            {
                value: null,
                displayValue: 'Example value'
            },
        ];
        this.studentEmailFilterOptions = [
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
            studentAddress: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.studentAddress),
            studentEmail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.studentEmail),
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
        let { _id, studentAddress, studentEmail, } = filterData;
        // Id filter
        if (_id !== null && _id !== undefined) {
            additionalFilterQueries.push({
                _id
            });
        }
        // Full Address filter
        if (studentAddress !== null && studentAddress !== undefined) {
            additionalFilterQueries.push({
                studentAddress
            });
        }
        // Email filter
        if (studentEmail !== null && studentEmail !== undefined) {
            additionalFilterQueries.push({
                studentEmail
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
StudentComponent.ɵfac = function StudentComponent_Factory(t) { return new (t || StudentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services_handy_ng_user_service__WEBPACK_IMPORTED_MODULE_4__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_models_student_ng_model__WEBPACK_IMPORTED_MODULE_5__["StudentNgModel"])); };
StudentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StudentComponent, selectors: [["student-table"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 54, vars: 22, consts: [[1, "crud-table-page-wrapper"], [1, "crud-table-filters-form", 3, "hideFormOptions"], ["tableFilter", ""], [1, "crud-table-actions-bar"], ["icon", "add", "color", "primary", "routerLink", "./new"], [1, "crud-table-search-bar"], ["label", "Search", "placeholder", "Search", 1, "crud-table-search-input", 3, "formControl"], ["searchInput", ""], ["label", "Search fields", "placeholder", "Search fields", 1, "crud-table-searchable-fields-input", 3, "formControl"], ["searchableFieldsSelect", ""], [1, "crud-table-filters-btns-wrapper"], [1, "crud-table-filters-btns"], ["color", "primary", "icon", "filter_list"], ["filtersToggle", ""], ["color", "warn", "icon", "refresh"], ["clearFilters", ""], ["label", "Diplay columns", "placeholder", "Diplay columns", 1, "crud-table-filter-input", 3, "formControl"], ["optionalColumnsSelect", ""], ["label", "Id", "placeholder", "Id", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "Full Address", "placeholder", "Full Address", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["label", "Email", "placeholder", "Email", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["matSort", "", "cdkDropList", "", "cdkDropListOrientation", "horizontal", 3, "dataSource", "cdkDropListDropped"], ["matColumnDef", "_id"], ["cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", "", 4, "matHeaderCellDef"], [4, "matCellDef"], ["matColumnDef", "studentName"], ["matColumnDef", "studentAddress"], ["matColumnDef", "studentCourse"], ["matColumnDef", "studentMobile"], ["matColumnDef", "studentEmail"], ["matColumnDef", "actions"], ["class", "crud-table-actions-col", "cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", "", 4, "matHeaderCellDef"], ["class", "crud-table-actions-col", 4, "matCellDef"], [4, "matHeaderRowDef", "matHeaderRowDefSticky"], [4, "matRowDef", "matRowDefColumns"], ["fxHide.lt-lg", "", 1, "table-expand-btn"], [3, "matTooltip", "icon", "click"], ["cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", ""], [4, "cdkDragPreview"], ["icon", "swap_horiz"], ["cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", "", 1, "crud-table-actions-col"], [1, "crud-table-actions-col"], ["fxLayout", "row", "fxLayoutAlign", "flex-end center", "fxLayoutGap", "8px"], ["icon", "edit", "color", "primary", 3, "routerLink"], ["icon", "delete_otl", "color", "warn", 3, "confirmClick"]], template: function StudentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "handy-form", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "raised-btn", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "New entry");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "handy-text-input", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "handy-multi-select-input", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "handy-table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "mat-table", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkDropListDropped", function StudentComponent_Template_mat_table_cdkDropListDropped_27_listener($event) { return ctx.drop($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](28, 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, StudentComponent_mat_header_cell_29_Template, 3, 0, "mat-header-cell", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, StudentComponent_mat_cell_30_Template, 2, 1, "mat-cell", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](31, 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, StudentComponent_mat_header_cell_32_Template, 3, 0, "mat-header-cell", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, StudentComponent_mat_cell_33_Template, 2, 1, "mat-cell", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](34, 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, StudentComponent_mat_header_cell_35_Template, 3, 0, "mat-header-cell", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, StudentComponent_mat_cell_36_Template, 2, 1, "mat-cell", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](37, 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, StudentComponent_mat_header_cell_38_Template, 3, 0, "mat-header-cell", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, StudentComponent_mat_cell_39_Template, 2, 1, "mat-cell", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](40, 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](41, StudentComponent_mat_header_cell_41_Template, 3, 0, "mat-header-cell", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](42, StudentComponent_mat_cell_42_Template, 2, 1, "mat-cell", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](43, 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](44, StudentComponent_mat_header_cell_44_Template, 3, 0, "mat-header-cell", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](45, StudentComponent_mat_cell_45_Template, 2, 1, "mat-cell", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](46, 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](47, StudentComponent_mat_header_cell_47_Template, 3, 0, "mat-header-cell", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](48, StudentComponent_mat_cell_48_Template, 6, 3, "mat-cell", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](49, StudentComponent_mat_header_row_49_Template, 1, 0, "mat-header-row", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](50, StudentComponent_mat_row_50_Template, 1, 0, "mat-row", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "handy-table-paginator");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "icon-btn", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function StudentComponent_Template_icon_btn_click_53_listener() { return ctx.toogleExpandedState(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.expanded ? "expanded-crud-table-wrapper" : "crud-table-wrapper");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hideFormOptions", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("studentAddress"))("options", ctx.studentAddressFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("studentEmail"))("options", ctx.studentEmailFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx.expanded ? "Shrink table" : "Expand table")("icon", ctx.expanded ? "west" : "east");
    } }, directives: [_handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_6__["HandyFormComponent"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_7__["RaisedBtnComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterLink"], _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyTextInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlDirective"], _handy_modules_handy_form_components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyMultiSelectInputComponent"], _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_11__["StrokedBtnComponent"], _handy_modules_handy_table_components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_12__["HandyTableFiltersComponent"], _handy_modules_handy_form_components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_13__["HandySelectInputComponent"], _handy_modules_handy_table_components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_14__["HandyTableComponent"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTable"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__["MatSort"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["CdkDropList"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRowDef"], _handy_modules_handy_table_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_17__["HandyTablePaginatorComponent"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_18__["DefaultShowHideDirective"], _shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_19__["IconBtnComponent"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__["MatTooltip"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCell"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["CdkDrag"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__["MatSortHeader"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["CdkDragPreview"], _shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_21__["BasicBtnComponent"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCell"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_22__["DefaultLayoutGapDirective"], _handy_ng_directives_confirm_click_directive__WEBPACK_IMPORTED_MODULE_23__["ConfirmClickDirective"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRow"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9zdHVkZW50LWNydWQvc3R1ZGVudC9zdHVkZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBQ0UsY0FBQTtBQUNIIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9zdHVkZW50LWNydWQvc3R1ZGVudC9zdHVkZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcclxuICAgZGlzcGxheTogYmxvY2s7XHJcbiB9Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StudentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'student-table',
                templateUrl: './student.component.html',
                styleUrls: ['./student.component.scss']
            }]
    }], function () { return [{ type: _handy_ng_services_handy_ng_user_service__WEBPACK_IMPORTED_MODULE_4__["HandyNgUserService"] }, { type: _handy_ng_models_student_ng_model__WEBPACK_IMPORTED_MODULE_5__["StudentNgModel"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=modules-student-crud-student-crud-module.js.map