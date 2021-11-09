(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-my-drop-my-drop-module"],{

/***/ "./src/app/handy/models/mydrop.ng-model.ts":
/*!*************************************************!*\
  !*** ./src/app/handy/models/mydrop.ng-model.ts ***!
  \*************************************************/
/*! exports provided: MydropNgModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MydropNgModel", function() { return MydropNgModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _handy_ng_extenders_handy_ng_model_extender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-ng-model-extender */ "./src/app/handy/extenders/handy-ng-model-extender.ts");
/* harmony import */ var _handy_ng_decorators_handy_ng_model_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/decorators/handy-ng-model.decorator */ "./src/app/handy/decorators/handy-ng-model.decorator.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _handy_ng_services_handy_ng_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/services/handy-ng-api.service */ "./src/app/handy/services/handy-ng-api.service.ts");
/* harmony import */ var _handy_ng_services_handy_ng_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/services/handy-ng-config.service */ "./src/app/handy/services/handy-ng-config.service.ts");







let MydropNgModel = class MydropNgModel extends _handy_ng_extenders_handy_ng_model_extender__WEBPACK_IMPORTED_MODULE_1__["HandyNgModelMethods"] {
    constructor(_handyApiService, _handyNgConfigService) {
        super(_handyApiService, _handyNgConfigService);
        this._handyApiService = _handyApiService;
        this._handyNgConfigService = _handyNgConfigService;
    }
};
MydropNgModel.ɵfac = function MydropNgModel_Factory(t) { return new (t || MydropNgModel)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_handy_ng_services_handy_ng_api_service__WEBPACK_IMPORTED_MODULE_4__["HandyNgApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_handy_ng_services_handy_ng_config_service__WEBPACK_IMPORTED_MODULE_5__["HandyNgConfigService"])); };
MydropNgModel.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: MydropNgModel, factory: MydropNgModel.ɵfac, providedIn: 'root' });
MydropNgModel = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_handy_ng_decorators_handy_ng_model_decorator__WEBPACK_IMPORTED_MODULE_2__["HandyNgModel"])({ name: 'mydrop' })
], MydropNgModel);

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](MydropNgModel, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: _handy_ng_services_handy_ng_api_service__WEBPACK_IMPORTED_MODULE_4__["HandyNgApiService"] }, { type: _handy_ng_services_handy_ng_config_service__WEBPACK_IMPORTED_MODULE_5__["HandyNgConfigService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/my-drop/my-drop-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/modules/my-drop/my-drop-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: MyDropRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyDropRoutingModule", function() { return MyDropRoutingModule; });
/* harmony import */ var src_app_pages_error_error_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pages/error/error.component */ "./src/app/pages/error/error.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");
/* harmony import */ var _my_drop_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./my-drop.component */ "./src/app/modules/my-drop/my-drop.component.ts");
/* harmony import */ var _mydrop_crud_table_mydrop_crud_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mydrop-crud-table/mydrop-crud-table.component */ "./src/app/modules/my-drop/mydrop-crud-table/mydrop-crud-table.component.ts");








const routes = [
    {
        path: '',
        component: _my_drop_component__WEBPACK_IMPORTED_MODULE_4__["MyDropComponent"],
        data: {
            pageTitle: Object(_handy_ng_core__WEBPACK_IMPORTED_MODULE_3__["setRouteTitle"])({ title: 'MyDrop management' })
        },
        children: [
            {
                path: '',
                component: _mydrop_crud_table_mydrop_crud_table_component__WEBPACK_IMPORTED_MODULE_5__["MydropCrudTableComponent"],
                data: {
                    pageTitle: Object(_handy_ng_core__WEBPACK_IMPORTED_MODULE_3__["setRouteTitle"])({ title: 'MyDrop table' })
                },
            },
        ]
    },
    { path: '**', component: src_app_pages_error_error_component__WEBPACK_IMPORTED_MODULE_0__["ErrorComponent"] }
];
class MyDropRoutingModule {
}
MyDropRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: MyDropRoutingModule });
MyDropRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function MyDropRoutingModule_Factory(t) { return new (t || MyDropRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MyDropRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MyDropRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/my-drop/my-drop.component.ts":
/*!******************************************************!*\
  !*** ./src/app/modules/my-drop/my-drop.component.ts ***!
  \******************************************************/
/*! exports provided: MyDropComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyDropComponent", function() { return MyDropComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class MyDropComponent {
}
MyDropComponent.ɵfac = function MyDropComponent_Factory(t) { return new (t || MyDropComponent)(); };
MyDropComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MyDropComponent, selectors: [["my-drop"]], decls: 1, vars: 0, template: function MyDropComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbXktZHJvcC9teS1kcm9wLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MyDropComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'my-drop',
                templateUrl: './my-drop.component.html',
                styleUrls: ['./my-drop.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/my-drop/my-drop.module.ts":
/*!***************************************************!*\
  !*** ./src/app/modules/my-drop/my-drop.module.ts ***!
  \***************************************************/
/*! exports provided: MyDropModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyDropModule", function() { return MyDropModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ "./src/app/modules/shared/shared.module.ts");
/* harmony import */ var _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/modules/handy-form/handy-form.module */ "./src/app/handy/modules/handy-form/handy-form.module.ts");
/* harmony import */ var _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/modules/handy-table/handy-table.module */ "./src/app/handy/modules/handy-table/handy-table.module.ts");
/* harmony import */ var _my_drop_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./my-drop-routing.module */ "./src/app/modules/my-drop/my-drop-routing.module.ts");
/* harmony import */ var _my_drop_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./my-drop.component */ "./src/app/modules/my-drop/my-drop.component.ts");
/* harmony import */ var _mydrop_crud_form_mydrop_crud_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mydrop-crud-form/mydrop-crud-form.component */ "./src/app/modules/my-drop/mydrop-crud-form/mydrop-crud-form.component.ts");
/* harmony import */ var _mydrop_crud_table_mydrop_crud_table_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mydrop-crud-table/mydrop-crud-table.component */ "./src/app/modules/my-drop/mydrop-crud-table/mydrop-crud-table.component.ts");










class MyDropModule {
}
MyDropModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: MyDropModule });
MyDropModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function MyDropModule_Factory(t) { return new (t || MyDropModule)(); }, imports: [[
            _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__["HandyFormModule"],
            _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__["HandyTableModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _my_drop_routing_module__WEBPACK_IMPORTED_MODULE_5__["MyDropRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MyDropModule, { declarations: [_my_drop_component__WEBPACK_IMPORTED_MODULE_6__["MyDropComponent"],
        _mydrop_crud_form_mydrop_crud_form_component__WEBPACK_IMPORTED_MODULE_7__["MydropCrudFormComponent"],
        _mydrop_crud_table_mydrop_crud_table_component__WEBPACK_IMPORTED_MODULE_8__["MydropCrudTableComponent"]], imports: [_handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__["HandyFormModule"],
        _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__["HandyTableModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
        _my_drop_routing_module__WEBPACK_IMPORTED_MODULE_5__["MyDropRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MyDropModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _my_drop_component__WEBPACK_IMPORTED_MODULE_6__["MyDropComponent"],
                    _mydrop_crud_form_mydrop_crud_form_component__WEBPACK_IMPORTED_MODULE_7__["MydropCrudFormComponent"],
                    _mydrop_crud_table_mydrop_crud_table_component__WEBPACK_IMPORTED_MODULE_8__["MydropCrudTableComponent"],
                ],
                imports: [
                    _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_3__["HandyFormModule"],
                    _handy_ng_modules_handy_table_handy_table_module__WEBPACK_IMPORTED_MODULE_4__["HandyTableModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                    _my_drop_routing_module__WEBPACK_IMPORTED_MODULE_5__["MyDropRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/my-drop/mydrop-crud-form/mydrop-crud-form.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/modules/my-drop/mydrop-crud-form/mydrop-crud-form.component.ts ***!
  \********************************************************************************/
/*! exports provided: MydropCrudFormComponent, MydropCrudFormComponentResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MydropCrudFormComponent", function() { return MydropCrudFormComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MydropCrudFormComponentResolver", function() { return MydropCrudFormComponentResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-memory-state-form */ "./src/app/handy/extenders/handy-memory-state-form.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/form-validators */ "./src/app/modules/shared/form-validators/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_ng_models_mydrop_ng_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @handy-ng/models/mydrop.ng-model */ "./src/app/handy/models/mydrop.ng-model.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_rte_input_handy_rte_input_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-rte-input/handy-rte-input.component */ "./src/app/handy/modules/handy-form/components/handy-rte-input/handy-rte-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-password-input/handy-password-input.component */ "./src/app/handy/modules/handy-form/components/handy-password-input/handy-password-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-date-input/handy-date-input.component */ "./src/app/handy/modules/handy-form/components/handy-date-input/handy-date-input.component.ts");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/divider.js");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../shared/components/buttons/basic-btn/basic-btn.component */ "./src/app/modules/shared/components/buttons/basic-btn/basic-btn.component.ts");





















function MydropCrudFormComponent_ng_template_0_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "raised-btn", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MydropCrudFormComponent_ng_template_0_div_6_Template_raised_btn_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Submit ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r5.submitDisabled);
} }
function MydropCrudFormComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-form", 2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("validSubmitEvent", function MydropCrudFormComponent_ng_template_0_Template_handy_form_validSubmitEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.onValidSubmit($event); })("invalidSubmitEvent", function MydropCrudFormComponent_ng_template_0_Template_handy_form_invalidSubmitEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.onInvalidSubmit($event); })("submitDisabledChange", function MydropCrudFormComponent_ng_template_0_Template_handy_form_submitDisabledChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.submitDisabledChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "handy-rte-input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "handy-password-input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "handy-date-input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MydropCrudFormComponent_ng_template_0_div_6_Template, 5, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r1.formName)("formGroup", ctx_r1.form)("rememberState", ctx_r1.rememberFormState)("defaultResetBtn", true)("disablePin", ctx_r1.isUpdate)("hideFormOptions", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("content"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("password"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("getTime", false)("showTimeZone", true)("selectableTimezone", false)("multiSelect", false)("formControl", ctx_r1.form.get("expireAt"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
} }
function MydropCrudFormComponent_ng_container_2_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
const _c0 = function (a0) { return [a0]; };
function MydropCrudFormComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "basic-btn", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Back to all");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, MydropCrudFormComponent_ng_container_2_ng_container_5_Template, 1, 0, "ng-container", 15);
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
function MydropCrudFormComponent_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function MydropCrudFormComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-dialog-content", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MydropCrudFormComponent_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-actions", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "basic-btn", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MydropCrudFormComponent_ng_container_3_Template_basic_btn_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.dialogRef.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "raised-btn", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MydropCrudFormComponent_ng_container_3_Template_raised_btn_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.triggerSubmit(); });
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
class MydropCrudFormComponent extends _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__["HandyMemoryStateForm"] {
    constructor(route, dialogRef, dialogData, _handyNgUserService, handyNgUtilsService, _model) {
        super(_handyNgUserService, handyNgUtilsService, dialogRef, dialogData, route);
        this.route = route;
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._handyNgUserService = _handyNgUserService;
        this.handyNgUtilsService = handyNgUtilsService;
        this._model = _model;
        this.formName = 'mydropCrudForm';
        this.rememberFormState = true;
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
            this._model.createOne(formData).subscribe(result => {
                this.updateEntryId = result.data._id;
                return resolve();
            }, err => {
                return reject(err);
            });
        });
    }
    _updateEntry(formData) {
        return new Promise((resolve, reject) => {
            this._model.updatedOne({ _id: this.updateEntryId }, formData, { skipUpdateHistory: false, updateName: 'MydropCrudFormComponent form update' }).subscribe(result => {
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
            content: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.content, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Content is required')], [ /* Async validators */]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.password, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Password is required')], [ /* Async validators */]),
            expireAt: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.expireAt, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Expiration is required')], [ /* Async validators */]),
        });
        return fg;
    }
}
MydropCrudFormComponent.fieldsToSelect = ['content', 'password', 'expireAt'];
MydropCrudFormComponent.ɵfac = function MydropCrudFormComponent_Factory(t) { return new (t || MydropCrudFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUtilsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_models_mydrop_ng_model__WEBPACK_IMPORTED_MODULE_7__["MydropNgModel"])); };
MydropCrudFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MydropCrudFormComponent, selectors: [["mydrop-crud-form-form"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 2, consts: [["formContent", ""], [4, "ngIf"], [3, "formName", "formGroup", "rememberState", "defaultResetBtn", "disablePin", "hideFormOptions", "validSubmitEvent", "invalidSubmitEvent", "submitDisabledChange"], ["formComp", ""], ["fxLayout", "row wrap", "fxLayoutGap", "8px"], ["fxFlex", "100%", "fieldName", "mydropCrudForm_content", "placeholder", "Content", 3, "formControl"], ["fieldName", "mydropCrudForm_password", "label", "Password", "placeholder", "Password", 1, "handy-form-input", 3, "formControl"], ["fieldName", "mydropCrudForm_expireAt", "label", "Expiration", "placeholder", "Expiration", 1, "handy-form-input", 3, "getTime", "showTimeZone", "selectableTimezone", "multiSelect", "formControl"], ["fxFlex", "100%", "fxLayout", "row wrap", "fxLayoutAlign", "flex-end flex-end", 4, "ngIf"], ["fxFlex", "100%", "fxLayout", "row wrap", "fxLayoutAlign", "flex-end flex-end"], ["fxFlex", "100%", 1, "handy-form-actions-divider"], ["color", "primary", 3, "disabled", "click"], [1, "handy-form-page-wrapper"], [1, "handy-form-wrapper"], ["icon", "chevron_left", 3, "routerLink"], [4, "ngTemplateOutlet"], [1, "mat-typography"], ["align", "end"], ["icon", "close", 3, "click"]], template: function MydropCrudFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MydropCrudFormComponent_ng_template_0_Template, 7, 14, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MydropCrudFormComponent_ng_container_2_Template, 6, 4, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MydropCrudFormComponent_ng_container_3_Template, 8, 2, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inDialog);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__["HandyFormComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutGapDirective"], _handy_modules_handy_form_components_handy_rte_input_handy_rte_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyRteInputComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultFlexDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_12__["HandyPasswordInputComponent"], _handy_modules_handy_form_components_handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_13__["HandyDateInputComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutAlignDirective"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__["MatDivider"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_15__["RaisedBtnComponent"], _shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_16__["BasicBtnComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgTemplateOutlet"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9teS1kcm9wL215ZHJvcC1jcnVkLWZvcm0vbXlkcm9wLWNydWQtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNFLGNBQUE7QUFDSCIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbXktZHJvcC9teWRyb3AtY3J1ZC1mb3JtL215ZHJvcC1jcnVkLWZvcm0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xyXG4gICBkaXNwbGF5OiBibG9jaztcclxuIH0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MydropCrudFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'mydrop-crud-form-form',
                templateUrl: './mydrop-crud-form.component.html',
                styleUrls: ['./mydrop-crud-form.component.scss']
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
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUserService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUtilsService"] }, { type: _handy_ng_models_mydrop_ng_model__WEBPACK_IMPORTED_MODULE_7__["MydropNgModel"] }]; }, null); })();
/* -------------------------------------------------------------------------- */
/*                                Form resolver                               */
/* -------------------------------------------------------------------------- */
class MydropCrudFormComponentResolver {
    constructor(_model) {
        this._model = _model;
    }
    // Can be used for modal integration
    getItemData(id) {
        if (id === undefined) {
            return Promise.resolve(null);
        }
        return new Promise((resolve, reject) => {
            this._model.findById(id, { selectType: 'select', fields: MydropCrudFormComponent.fieldsToSelect })
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
MydropCrudFormComponentResolver.ɵfac = function MydropCrudFormComponentResolver_Factory(t) { return new (t || MydropCrudFormComponentResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_handy_ng_models_mydrop_ng_model__WEBPACK_IMPORTED_MODULE_7__["MydropNgModel"])); };
MydropCrudFormComponentResolver.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MydropCrudFormComponentResolver, factory: MydropCrudFormComponentResolver.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MydropCrudFormComponentResolver, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _handy_ng_models_mydrop_ng_model__WEBPACK_IMPORTED_MODULE_7__["MydropNgModel"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/my-drop/mydrop-crud-table/mydrop-crud-table.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/modules/my-drop/mydrop-crud-table/mydrop-crud-table.component.ts ***!
  \**********************************************************************************/
/*! exports provided: MydropCrudTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MydropCrudTableComponent", function() { return MydropCrudTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
/* harmony import */ var _handy_ng_extenders_handy_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-datatable */ "./src/app/handy/extenders/handy-datatable.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _mydrop_crud_form_mydrop_crud_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mydrop-crud-form/mydrop-crud-form.component */ "./src/app/modules/my-drop/mydrop-crud-form/mydrop-crud-form.component.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _handy_ng_services_handy_ng_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @handy-ng/services/handy-ng-user.service */ "./src/app/handy/services/handy-ng-user.service.ts");
/* harmony import */ var _handy_ng_models_mydrop_ng_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @handy-ng/models/mydrop.ng-model */ "./src/app/handy/models/mydrop.ng-model.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component.ts");
/* harmony import */ var _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _handy_modules_handy_table_components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../handy/modules/handy-table/components/table-filters/table-filters.component */ "./src/app/handy/modules/handy-table/components/table-filters/table-filters.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../handy/modules/handy-form/components/handy-select-input/handy-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-select-input/handy-select-input.component.ts");
/* harmony import */ var _handy_modules_handy_table_components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../handy/modules/handy-table/components/handy-table/handy-table.component */ "./src/app/handy/modules/handy-table/components/handy-table/handy-table.component.ts");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sort.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/drag-drop.js");
/* harmony import */ var _handy_modules_handy_table_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component */ "./src/app/handy/modules/handy-table/components/handy-table-paginator/handy-table-paginator.component.ts");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/extended.js");
/* harmony import */ var _shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../shared/components/buttons/icon-btn/icon-btn.component */ "./src/app/modules/shared/components/buttons/icon-btn/icon-btn.component.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");
/* harmony import */ var _shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../shared/components/buttons/basic-btn/basic-btn.component */ "./src/app/modules/shared/components/buttons/basic-btn/basic-btn.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _handy_ng_directives_confirm_click_directive__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @handy-ng/directives/confirm-click.directive */ "./src/app/handy/directives/confirm-click.directive.ts");





























function MydropCrudTableComponent_mat_header_cell_27_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Content");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MydropCrudTableComponent_mat_header_cell_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MydropCrudTableComponent_mat_header_cell_27_span_1_Template, 3, 0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Content");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MydropCrudTableComponent_mat_cell_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r17.content);
} }
function MydropCrudTableComponent_mat_header_cell_30_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MydropCrudTableComponent_mat_header_cell_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MydropCrudTableComponent_mat_header_cell_30_span_1_Template, 3, 0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MydropCrudTableComponent_mat_cell_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r19.password);
} }
function MydropCrudTableComponent_mat_header_cell_33_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Expiration");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MydropCrudTableComponent_mat_header_cell_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MydropCrudTableComponent_mat_header_cell_33_span_1_Template, 3, 0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Expiration");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MydropCrudTableComponent_mat_cell_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](element_r21.expireAt);
} }
function MydropCrudTableComponent_mat_header_cell_36_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "basic-btn", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MydropCrudTableComponent_mat_header_cell_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MydropCrudTableComponent_mat_header_cell_36_span_1_Template, 3, 0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MydropCrudTableComponent_mat_cell_37_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "stroked-btn", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MydropCrudTableComponent_mat_cell_37_Template_stroked_btn_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); const element_r23 = ctx.$implicit; const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r24.editOrCreateAction(element_r23._id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "stroked-btn", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("confirmClick", function MydropCrudTableComponent_mat_cell_37_Template_stroked_btn_confirmClick_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); const element_r23 = ctx.$implicit; const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r26.removeEntryAction(element_r23._id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MydropCrudTableComponent_mat_header_row_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-header-row");
} }
function MydropCrudTableComponent_mat_row_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-row");
} }
class MydropCrudTableComponent extends _handy_ng_extenders_handy_datatable__WEBPACK_IMPORTED_MODULE_2__["HandyDataTable"] {
    constructor(dialog, formResolver, _handyNgUserService, _model) {
        super(_handyNgUserService);
        this.dialog = dialog;
        this.formResolver = formResolver;
        this._handyNgUserService = _handyNgUserService;
        this._model = _model;
        this.modelFieldsToQuery = ['content', 'password', 'expireAt',];
        this.displayedColumns = ['content', 'password', 'expireAt', 'actions'];
        this.rememberTableState = true;
        this.tableName = 'mydropCrudTable_table';
        /* ---------------------------- Optional columns ---------------------------- */
        this.optionalColumns = [
            {
                value: 'content',
                displayValue: 'Content'
            },
            {
                value: 'password',
                displayValue: 'Password'
            },
            {
                value: 'expireAt',
                displayValue: 'Expiration'
            },
        ];
        /* ---------------------------- Searchable fileds --------------------------- */
        this.searchableFields = [
            {
                value: '_id',
                displayValue: 'ID'
            },
            {
                value: 'content',
                displayValue: 'Content'
            },
            {
                value: 'expireAt',
                displayValue: 'Expiration'
            },
        ];
        /* -------------------------------------------------------------------------- */
        /*                              Additional filter                             */
        /* -------------------------------------------------------------------------- */
        this.expireAtFilterOptions = [
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
            expireAt: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](filterData.expireAt),
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
        let { expireAt, } = filterData;
        // Expiration filter
        if (expireAt !== null && expireAt !== undefined) {
            additionalFilterQueries.push({
                expireAt
            });
        }
        return additionalFilterQueries;
    }
    /* -------------------------------------------------------------------------- */
    /*                              Actions methods                               */
    /* -------------------------------------------------------------------------- */
    editOrCreateAction(id) {
        if (id) {
            this.formResolver.getItemData(id)
                .then(formData => {
                const dialogRef = this.dialog.open(_mydrop_crud_form_mydrop_crud_form_component__WEBPACK_IMPORTED_MODULE_4__["MydropCrudFormComponent"], {
                    data: { formData }
                });
                dialogRef.afterClosed().subscribe(result => {
                    console.log(`Dialog result: ${result}`);
                    this.refreshTableData();
                });
            });
            return;
        }
        const dialogRef = this.dialog.open(_mydrop_crud_form_mydrop_crud_form_component__WEBPACK_IMPORTED_MODULE_4__["MydropCrudFormComponent"]);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            this.refreshTableData();
        });
    }
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
MydropCrudTableComponent.ɵfac = function MydropCrudTableComponent_Factory(t) { return new (t || MydropCrudTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_mydrop_crud_form_mydrop_crud_form_component__WEBPACK_IMPORTED_MODULE_4__["MydropCrudFormComponentResolver"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services_handy_ng_user_service__WEBPACK_IMPORTED_MODULE_6__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_models_mydrop_ng_model__WEBPACK_IMPORTED_MODULE_7__["MydropNgModel"])); };
MydropCrudTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MydropCrudTableComponent, selectors: [["mydrop-crud-table-table"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 43, vars: 16, consts: [[1, "crud-table-page-wrapper"], [1, "crud-table-filters-form", 3, "hideFormOptions"], ["tableFilter", ""], [1, "crud-table-actions-bar"], ["icon", "add", "color", "primary", 3, "click"], [1, "crud-table-search-bar"], ["label", "Search", "placeholder", "Search", 1, "crud-table-search-input", 3, "formControl"], ["searchInput", ""], ["label", "Search fields", "placeholder", "Search fields", 1, "crud-table-searchable-fields-input", 3, "formControl"], ["searchableFieldsSelect", ""], [1, "crud-table-filters-btns-wrapper"], [1, "crud-table-filters-btns"], ["color", "primary", "icon", "filter_list"], ["filtersToggle", ""], ["color", "warn", "icon", "refresh"], ["clearFilters", ""], ["label", "Diplay columns", "placeholder", "Diplay columns", 1, "crud-table-filter-input", 3, "formControl"], ["optionalColumnsSelect", ""], ["label", "Expiration", "placeholder", "Expiration", "emptyOptionLabel", "Any", 1, "crud-table-filter-input", 3, "formControl", "options", "hasEmptyOption"], ["matSort", "", "cdkDropList", "", "cdkDropListOrientation", "horizontal", 3, "dataSource", "cdkDropListDropped"], ["matColumnDef", "content"], ["cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", "", 4, "matHeaderCellDef"], [4, "matCellDef"], ["matColumnDef", "password"], ["matColumnDef", "expireAt"], ["matColumnDef", "actions"], ["class", "crud-table-actions-col", "cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", "", 4, "matHeaderCellDef"], ["class", "crud-table-actions-col", 4, "matCellDef"], [4, "matHeaderRowDef", "matHeaderRowDefSticky"], [4, "matRowDef", "matRowDefColumns"], ["fxHide.lt-lg", "", 1, "table-expand-btn"], [3, "matTooltip", "icon", "click"], ["cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", ""], [4, "cdkDragPreview"], ["icon", "swap_horiz"], ["cdkDrag", "", "cdkDragLockAxis", "x", "mat-sort-header", "", 1, "crud-table-actions-col"], [1, "crud-table-actions-col"], ["fxLayout", "row", "fxLayoutAlign", "flex-end center", "fxLayoutGap", "8px"], ["icon", "edit", "color", "primary", 3, "click"], ["icon", "delete_otl", "color", "warn", 3, "confirmClick"]], template: function MydropCrudTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "handy-form", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "raised-btn", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MydropCrudTableComponent_Template_raised_btn_click_5_listener() { return ctx.editOrCreateAction(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "handy-table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "mat-table", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkDropListDropped", function MydropCrudTableComponent_Template_mat_table_cdkDropListDropped_25_listener($event) { return ctx.drop($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](26, 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, MydropCrudTableComponent_mat_header_cell_27_Template, 3, 0, "mat-header-cell", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, MydropCrudTableComponent_mat_cell_28_Template, 2, 1, "mat-cell", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](29, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, MydropCrudTableComponent_mat_header_cell_30_Template, 3, 0, "mat-header-cell", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, MydropCrudTableComponent_mat_cell_31_Template, 2, 1, "mat-cell", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](32, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, MydropCrudTableComponent_mat_header_cell_33_Template, 3, 0, "mat-header-cell", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, MydropCrudTableComponent_mat_cell_34_Template, 2, 1, "mat-cell", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](35, 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, MydropCrudTableComponent_mat_header_cell_36_Template, 3, 0, "mat-header-cell", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, MydropCrudTableComponent_mat_cell_37_Template, 6, 0, "mat-cell", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, MydropCrudTableComponent_mat_header_row_38_Template, 1, 0, "mat-header-row", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, MydropCrudTableComponent_mat_row_39_Template, 1, 0, "mat-row", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "handy-table-paginator");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "icon-btn", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MydropCrudTableComponent_Template_icon_btn_click_42_listener() { return ctx.toogleExpandedState(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.filterForm.get("expireAt"))("options", ctx.expireAtFilterOptions)("hasEmptyOption", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx.expanded ? "Shrink table" : "Expand table")("icon", ctx.expanded ? "west" : "east");
    } }, directives: [_handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_8__["HandyFormComponent"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_9__["RaisedBtnComponent"], _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyTextInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlDirective"], _handy_modules_handy_form_components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyMultiSelectInputComponent"], _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_12__["StrokedBtnComponent"], _handy_modules_handy_table_components_table_filters_table_filters_component__WEBPACK_IMPORTED_MODULE_13__["HandyTableFiltersComponent"], _handy_modules_handy_form_components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_14__["HandySelectInputComponent"], _handy_modules_handy_table_components_handy_table_handy_table_component__WEBPACK_IMPORTED_MODULE_15__["HandyTableComponent"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTable"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__["MatSort"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_17__["CdkDropList"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRowDef"], _handy_modules_handy_table_components_handy_table_paginator_handy_table_paginator_component__WEBPACK_IMPORTED_MODULE_18__["HandyTablePaginatorComponent"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_19__["DefaultShowHideDirective"], _shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_20__["IconBtnComponent"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_21__["MatTooltip"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCell"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_17__["CdkDrag"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__["MatSortHeader"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_17__["CdkDragPreview"], _shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_22__["BasicBtnComponent"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCell"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_23__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_23__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_23__["DefaultLayoutGapDirective"], _handy_ng_directives_confirm_click_directive__WEBPACK_IMPORTED_MODULE_24__["ConfirmClickDirective"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRow"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9teS1kcm9wL215ZHJvcC1jcnVkLXRhYmxlL215ZHJvcC1jcnVkLXRhYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBQ0UsY0FBQTtBQUNIIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9teS1kcm9wL215ZHJvcC1jcnVkLXRhYmxlL215ZHJvcC1jcnVkLXRhYmxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcclxuICAgZGlzcGxheTogYmxvY2s7XHJcbiB9Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MydropCrudTableComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'mydrop-crud-table-table',
                templateUrl: './mydrop-crud-table.component.html',
                styleUrls: ['./mydrop-crud-table.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] }, { type: _mydrop_crud_form_mydrop_crud_form_component__WEBPACK_IMPORTED_MODULE_4__["MydropCrudFormComponentResolver"] }, { type: _handy_ng_services_handy_ng_user_service__WEBPACK_IMPORTED_MODULE_6__["HandyNgUserService"] }, { type: _handy_ng_models_mydrop_ng_model__WEBPACK_IMPORTED_MODULE_7__["MydropNgModel"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=modules-my-drop-my-drop-module.js.map