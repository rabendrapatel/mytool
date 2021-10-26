(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-pdf-templates-pdf-templates-module"],{

/***/ "./src/app/modules/pdf-templates/components/pdf-generator-options/pdf-generator-options.component.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/app/modules/pdf-templates/components/pdf-generator-options/pdf-generator-options.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: PdfGeneratorOptionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PdfGeneratorOptionsComponent", function() { return PdfGeneratorOptionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-memory-state-form */ "./src/app/handy/extenders/handy-memory-state-form.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm2015/dialog.js");
/* harmony import */ var _ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/form-validators */ "./src/app/modules/shared/form-validators/index.ts");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/handy-select-input/handy-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-select-input/handy-select-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_slide_toggle_input_handy_slide_toggle_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/handy-slide-toggle-input/handy-slide-toggle-input.component */ "./src/app/handy/modules/handy-form/components/handy-slide-toggle-input/handy-slide-toggle-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/handy-number-input/handy-number-input.component */ "./src/app/handy/modules/handy-form/components/handy-number-input/handy-number-input.component.ts");
/* harmony import */ var _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../shared/components/buttons/basic-btn/basic-btn.component */ "./src/app/modules/shared/components/buttons/basic-btn/basic-btn.component.ts");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");


















function PdfGeneratorOptionsComponent_ng_template_0_stroked_btn_18_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "stroked-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PdfGeneratorOptionsComponent_ng_template_0_stroked_btn_18_Template_stroked_btn_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.emitOutputChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Reflect changes");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r5.submitDisabled);
} }
function PdfGeneratorOptionsComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-form", 2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("validSubmitEvent", function PdfGeneratorOptionsComponent_ng_template_0_Template_handy_form_validSubmitEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.onValidSubmit($event); })("invalidSubmitEvent", function PdfGeneratorOptionsComponent_ng_template_0_Template_handy_form_invalidSubmitEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.onInvalidSubmit($event); })("submitDisabledChange", function PdfGeneratorOptionsComponent_ng_template_0_Template_handy_form_submitDisabledChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.submitDisabledChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Paper options");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "handy-select-input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "handy-slide-toggle", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Landscape orientation");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "handy-slide-toggle", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Print header and footer");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "h3", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Margins in cm");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "handy-number-input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "handy-number-input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "handy-number-input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "handy-number-input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, PdfGeneratorOptionsComponent_ng_template_0_stroked_btn_18_Template, 2, 1, "stroked-btn", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r1.formName)("formGroup", ctx_r1.form)("rememberState", true)("defaultResetBtn", true)("disablePin", true)("allowFullScreen", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("format"))("hasEmptyOption", false)("options", ctx_r1.formatOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("landscape"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("displayHeaderFooter"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("step", 0.1)("min", ctx_r1.form.get("displayHeaderFooter").value === true ? 0.7 : 0)("max", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("step", 0.1)("min", ctx_r1.form.get("displayHeaderFooter").value === true ? 0.7 : 0)("max", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("step", 0.1)("min", 0)("max", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("step", 0.1)("min", 0)("max", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
} }
function PdfGeneratorOptionsComponent_ng_container_2_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function PdfGeneratorOptionsComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, PdfGeneratorOptionsComponent_ng_container_2_ng_container_3_Template, 1, 0, "ng-container", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
} }
function PdfGeneratorOptionsComponent_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function PdfGeneratorOptionsComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-dialog-content", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PdfGeneratorOptionsComponent_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-actions", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "basic-btn", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PdfGeneratorOptionsComponent_ng_container_3_Template_basic_btn_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.dialogRef.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "raised-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PdfGeneratorOptionsComponent_ng_container_3_Template_raised_btn_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.triggerSubmit(); });
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
class PdfGeneratorOptionsComponent extends _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__["HandyMemoryStateForm"] {
    constructor(dialogRef, dialogData, _handyNgUserService, handyNgUtilsService) {
        super(_handyNgUserService, handyNgUtilsService);
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._handyNgUserService = _handyNgUserService;
        this.handyNgUtilsService = handyNgUtilsService;
        this.formName = 'pdfGeneratorOptions';
        this.rememberFormState = true;
        this.defaultFormStateVal = {
            format: 'A4',
            landscape: false,
            margin: {
                left: 1,
                right: 1,
                top: 1,
                bottom: 1
            },
            displayHeaderFooter: false
        };
        this.emitChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.formatOptions = [
            {
                value: 'A0',
                displayValue: 'A0'
            },
            {
                value: 'A1',
                displayValue: 'A1'
            },
            {
                value: 'A2',
                displayValue: 'A2'
            },
            {
                value: 'A3',
                displayValue: 'A3'
            },
            {
                value: 'A4',
                displayValue: 'A4'
            },
            {
                value: 'A5',
                displayValue: 'A5'
            },
            {
                value: 'A6',
                displayValue: 'A6'
            },
            {
                value: 'Ledger',
                displayValue: 'Ledger'
            },
            {
                value: 'Letter',
                displayValue: 'Letter'
            },
            {
                value: 'Legal',
                displayValue: 'Legal'
            },
            {
                value: 'Tabloid',
                displayValue: 'Tabloid'
            },
        ];
        this.initExtender();
    }
    ngOnInit() {
        this.emitOutputChange();
    }
    onValidSubmit(formData) {
        // console
    }
    onInvalidSubmit(formData) {
        // console.log(formData)
    }
    getFormInitData() {
        return {};
    }
    emitOutputChange() {
        if (!this.form.valid) {
            return;
        }
        this.emitChange.emit(this.form.getRawValue());
    }
    createForm(formInitData) {
        let fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            format: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.format, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])()]),
            landscape: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.landscape),
            displayHeaderFooter: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.displayHeaderFooter),
            margin: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                left: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.margin.left, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])()]),
                right: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.margin.right, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])()]),
                top: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.margin.top, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])()]),
                bottom: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.margin.bottom, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])()]),
            })
        });
        return fg;
    }
}
PdfGeneratorOptionsComponent.ɵfac = function PdfGeneratorOptionsComponent_Factory(t) { return new (t || PdfGeneratorOptionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"])); };
PdfGeneratorOptionsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PdfGeneratorOptionsComponent, selectors: [["pdf-generator-options-form"]], outputs: { emitChange: "reflect" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 2, consts: [["formContent", ""], [4, "ngIf"], [3, "formName", "formGroup", "rememberState", "defaultResetBtn", "disablePin", "allowFullScreen", "validSubmitEvent", "invalidSubmitEvent", "submitDisabledChange"], ["formComp", ""], ["fxLayout", "column wrap", "fxLayoutAlign", "center center", "fxLayoutGap", "8px", 2, "width", "500px"], ["fxLayout", "column wrap", "fxLayoutAlign", "center center", "fxLayoutGap", "8px"], [2, "text-align", "center"], ["label", "Paper size", 3, "formControl", "hasEmptyOption", "options"], [3, "formControl"], ["fxLayout", "row wrap", "fxLayoutAlign", "center center", "fxLayoutGap", "8px", "formGroupName", "margin"], ["fxFlex", "100%", 2, "text-align", "center"], ["formControlName", "top", "label", "Top", 3, "step", "min", "max"], ["formControlName", "bottom", "label", "Bottom", 3, "step", "min", "max"], ["formControlName", "left", "label", "Left", 3, "step", "min", "max"], ["formControlName", "right", "label", "Right", 3, "step", "min", "max"], ["color", "primary", 3, "disabled", "click", 4, "ngIf"], ["color", "primary", 3, "disabled", "click"], [1, "handy-form-page-wrapper"], [1, "handy-form-wrapper"], [4, "ngTemplateOutlet"], [1, "mat-typography"], ["align", "end"], ["icon", "close", 3, "click"]], template: function PdfGeneratorOptionsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, PdfGeneratorOptionsComponent_ng_template_0_Template, 19, 24, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PdfGeneratorOptionsComponent_ng_container_2_Template, 4, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, PdfGeneratorOptionsComponent_ng_container_3_Template, 8, 2, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inDialog);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_7__["HandyFormComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_8__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_8__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_8__["DefaultLayoutGapDirective"], _handy_modules_handy_form_components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_9__["HandySelectInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _handy_modules_handy_form_components_handy_slide_toggle_input_handy_slide_toggle_input_component__WEBPACK_IMPORTED_MODULE_10__["HandySlideToggleInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupName"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_8__["DefaultFlexDirective"], _handy_modules_handy_form_components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyNumberInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_12__["StrokedBtnComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgTemplateOutlet"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"], _shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_13__["BasicBtnComponent"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_14__["RaisedBtnComponent"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9wZGYtdGVtcGxhdGVzL2NvbXBvbmVudHMvcGRmLWdlbmVyYXRvci1vcHRpb25zL3BkZi1nZW5lcmF0b3Itb3B0aW9ucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNFLGNBQUE7QUFDSCIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvcGRmLXRlbXBsYXRlcy9jb21wb25lbnRzL3BkZi1nZW5lcmF0b3Itb3B0aW9ucy9wZGYtZ2VuZXJhdG9yLW9wdGlvbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xyXG4gICBkaXNwbGF5OiBibG9jaztcclxuIH0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PdfGeneratorOptionsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'pdf-generator-options-form',
                templateUrl: './pdf-generator-options.component.html',
                styleUrls: ['./pdf-generator-options.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"] }]; }, { emitChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['reflect']
        }] }); })();


/***/ }),

/***/ "./src/app/modules/pdf-templates/pdf-templates-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/modules/pdf-templates/pdf-templates-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: PdfTemplatesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PdfTemplatesRoutingModule", function() { return PdfTemplatesRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _pdf_templates_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pdf-templates.component */ "./src/app/modules/pdf-templates/pdf-templates.component.ts");
/* harmony import */ var _templates_example_pdf_template_example_pdf_template_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates/example-pdf-template/example-pdf-template.component */ "./src/app/modules/pdf-templates/templates/example-pdf-template/example-pdf-template.component.ts");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");







const routes = [
    {
        path: '',
        component: _pdf_templates_component__WEBPACK_IMPORTED_MODULE_2__["PdfTemplatesComponent"],
        data: {
            pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_4__["setRouteTitle"])({ title: 'Pdf templating sandbox' })
        },
        children: [
            {
                path: 'example',
                component: _templates_example_pdf_template_example_pdf_template_component__WEBPACK_IMPORTED_MODULE_3__["ExamplePdfTemplateComponent"],
                data: {
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_4__["setRouteTitle"])({ title: 'Example PDF template' })
                },
            }
        ]
    }
];
class PdfTemplatesRoutingModule {
}
PdfTemplatesRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PdfTemplatesRoutingModule });
PdfTemplatesRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PdfTemplatesRoutingModule_Factory(t) { return new (t || PdfTemplatesRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PdfTemplatesRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PdfTemplatesRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/pdf-templates/pdf-templates.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/modules/pdf-templates/pdf-templates.component.ts ***!
  \******************************************************************/
/*! exports provided: PdfTemplatesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PdfTemplatesComponent", function() { return PdfTemplatesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _services_pdf_template_helper_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/pdf-template-helper.service */ "./src/app/modules/pdf-templates/services/pdf-template-helper.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _shared_components_handy_nav_layout_handy_nav_layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/components/handy-nav-layout/handy-nav-layout.component */ "./src/app/modules/shared/components/handy-nav-layout/handy-nav-layout.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _components_pdf_generator_options_pdf_generator_options_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/pdf-generator-options/pdf-generator-options.component */ "./src/app/modules/pdf-templates/components/pdf-generator-options/pdf-generator-options.component.ts");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm2015/card.js");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/esm2015/extended.js");












function PdfTemplatesComponent_handy_nav_layout_0_a_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", ctx_r5.generatedFile, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5.generatedFile);
} }
function PdfTemplatesComponent_handy_nav_layout_0_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
const _c0 = function (a0) { return { "width": a0, "height": "100%" }; };
const _c1 = function (a0, a1, a2, a3) { return { "margin-top": a0, "margin-bottom": a1, "width": a2, "min-height": a3 }; };
function PdfTemplatesComponent_handy_nav_layout_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-nav-layout");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "pdf-generator-options-form", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("reflect", function PdfTemplatesComponent_handy_nav_layout_0_Template_pdf_generator_options_form_reflect_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.reflectPaperChanges($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "For page break use \"page-break\" class on element after which page should break");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "raised-btn", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PdfTemplatesComponent_handy_nav_layout_0_Template_raised_btn_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.generateTestPdf(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Generate testing pdf");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, PdfTemplatesComponent_handy_nav_layout_0_a_11_Template, 2, 2, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-card", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, PdfTemplatesComponent_handy_nav_layout_0_ng_container_18_Template, 1, 0, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.generatedFile);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c0, ctx_r0.margin.left + "cm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction4"](7, _c1, ctx_r0.margin.top + "cm", ctx_r0.margin.bottom + "cm", ctx_r0.paperWidth + "mm", "calc(" + ctx_r0.paperHeight + "mm - " + ctx_r0.margin.top + "cm - " + ctx_r0.margin.bottom + "cm)"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](12, _c0, ctx_r0.margin.right + "cm"));
} }
function PdfTemplatesComponent_div_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
const _c2 = function (a1) { return { "border": "none !important", "width": a1, "padding": "0 !Important" }; };
function PdfTemplatesComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PdfTemplatesComponent_div_1_ng_container_1_Template, 1, 0, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c2, ctx_r1.paperWidth + "mm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r3);
} }
function PdfTemplatesComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx_r2.printId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.printId);
} }
function PdfTemplatesComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
} }
class PdfTemplatesComponent {
    constructor(_route, _router, _handyNgConfigService, _handyNgUserService, _pdfHelper) {
        this._route = _route;
        this._router = _router;
        this._handyNgConfigService = _handyNgConfigService;
        this._handyNgUserService = _handyNgUserService;
        this._pdfHelper = _pdfHelper;
        this.format = 'A4';
        this._defaultMargin = 1;
        this.margin = {
            left: this._defaultMargin,
            right: this._defaultMargin,
            top: this._defaultMargin,
            bottom: this._defaultMargin,
        };
        this.landscape = false;
        this.rulerPages = new Array(10);
        this.displayHeaderFooter = false;
        let { format = 'A4', landscape, marginLeft = this._defaultMargin, marginRight = this._defaultMargin, marginBottom = this._defaultMargin, marginTop = this._defaultMargin } = this._route.snapshot.queryParams;
        this.format = format;
        this.landscape = (landscape === 'true') ? true : false;
        this._parseMargins(marginLeft, marginRight, marginTop, marginBottom);
        this._asignPaperSize();
    }
    ngOnInit() {
        this._createLoadedIndicator();
    }
    generateTestPdf() {
        this._pdfHelper.generateTestingPdf({
            url: this._router.url,
            originalFileName: 'Testing.pdf',
            margin: this.margin,
            format: this.format,
            landscape: !!this.landscape,
            displayHeaderFooter: this.displayHeaderFooter
        }).subscribe(result => {
            this.generatedFile = result.data.url;
            this._handyNgUserService.notify.simpleMsgNotification({
                headline: 'Testing file was generated',
                msg: [
                    result.data.url
                ]
            });
        }, err => {
            this._handyNgUserService.notify.apiErrNotification(err);
        });
    }
    reflectPaperChanges(data) {
        let { format, landscape = false, margin, displayHeaderFooter = false } = Object.assign({}, data);
        this.format = format;
        this.landscape = landscape;
        this.displayHeaderFooter = displayHeaderFooter;
        let { left, right, top, bottom } = margin;
        this._parseMargins(left, right, top, bottom);
        this._asignPaperSize();
    }
    _asignPaperSize() {
        let { width, height } = this._pdfHelper.getPaperDimensionsInMM(this.format, !!this.landscape);
        this.paperHeight = height;
        this.paperWidth = width;
    }
    _parseMargins(marginLeft, marginRight, marginTop, marginBottom) {
        this.margin = {
            left: (typeof marginLeft === 'string') ? parseFloat(marginLeft) : marginLeft,
            right: (typeof marginRight === 'string') ? parseFloat(marginRight) : marginRight,
            top: (typeof marginTop === 'string') ? parseFloat(marginTop) : marginTop,
            bottom: (typeof marginBottom === 'string') ? parseFloat(marginBottom) : marginBottom,
        };
    }
    _createLoadedIndicator() {
        if (this._handyNgConfigService.isPlatform('server')) {
            return;
        }
        let { printId } = this._route.snapshot.queryParams;
        if (!printId) {
            if (!this._handyNgUserService.hasRole('superAdmin')) {
                this._handyNgUserService.redirectToErrPage('404');
            }
        }
        this.printId = printId;
    }
}
PdfTemplatesComponent.ɵfac = function PdfTemplatesComponent_Factory(t) { return new (t || PdfTemplatesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_2__["HandyNgConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_2__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_pdf_template_helper_service__WEBPACK_IMPORTED_MODULE_3__["PdfTemplateHelperService"])); };
PdfTemplatesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PdfTemplatesComponent, selectors: [["app-pdf-templates"]], decls: 5, vars: 3, consts: [[4, "ngIf"], [3, "ngStyle", 4, "ngIf"], ["class", "no-print", 3, "id", 4, "ngIf"], ["printContent", ""], ["fxLayout", "row wrap", "fxLayoutAlign", "center", 1, "no-print"], ["fxFlex", "100%", "fxLayout", "", "fxLayoutAlign", "center", 2, "padding-top", "20px"], [3, "reflect"], ["fxFlex", "100%", "fxLayout", "column", "fxLayoutAlign", "center center", 2, "padding-top", "20px"], [2, "height", "10px"], ["icon", "picture_as_pdf", "color", "primary", 3, "click"], ["target", "_blanc", 3, "href", 4, "ngIf"], ["fxLayout", "row wrap", "fxLayoutAlign", "center flex-start", 1, "mat-elevation-z12"], ["fxLayout", "row", "fxLayoutAlign", "center flex-start"], [3, "ngStyle"], ["preview", ""], [4, "ngTemplateOutlet"], ["target", "_blanc", 3, "href"], [1, "no-print", 3, "id"]], template: function PdfTemplatesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, PdfTemplatesComponent_handy_nav_layout_0_Template, 20, 14, "handy-nav-layout", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PdfTemplatesComponent_div_1_Template, 2, 4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PdfTemplatesComponent_span_2_Template, 2, 2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, PdfTemplatesComponent_ng_template_3_Template, 1, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.printId);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.printId);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.printId);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _shared_components_handy_nav_layout_handy_nav_layout_component__WEBPACK_IMPORTED_MODULE_5__["HandyNavLayoutComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_6__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_6__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_6__["DefaultFlexDirective"], _components_pdf_generator_options_pdf_generator_options_component__WEBPACK_IMPORTED_MODULE_7__["PdfGeneratorOptionsComponent"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_8__["RaisedBtnComponent"], _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCard"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgStyle"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_10__["DefaultStyleDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgTemplateOutlet"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n@media print {\n  .no-print[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .page-break[_ngcontent-%COMP%] {\n    page-break-after: always;\n  }\n}\n\n.ruler[_ngcontent-%COMP%] {\n  width: 30px;\n  min-height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9wZGYtdGVtcGxhdGVzL3BkZi10ZW1wbGF0ZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGFBQUE7RUFDRjs7RUFPQTtJQUNFLHdCQUFBO0VBSkY7QUFDRjs7QUEyQkE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7QUF6QkYiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL3BkZi10ZW1wbGF0ZXMvcGRmLXRlbXBsYXRlcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuQG1lZGlhIHByaW50IHtcclxuICAubm8tcHJpbnQge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcblxyXG4gIC8vIC5wcmludCB7XHJcbiAgLy8gICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcclxuICAvLyAgIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcclxuICAvLyB9XHJcbiAgXHJcbiAgLnBhZ2UtYnJlYWsge1xyXG4gICAgcGFnZS1icmVhay1hZnRlcjogYWx3YXlzO1xyXG4gIH1cclxuICBcclxuICAvLyAuQTQge1xyXG4gIC8vICAgbWFyZ2luLXRvcDogLTFjbSAhaW1wb3J0YW50OyAvLyBUT0RPIGJlY2F1c2Ugb2YgdGhlIHByaW50IG1hcmdpbiwgaGFzIHRvIGJlIGR5bmFtaWMgYW5kIHNldCB3aXRoIHRoZSBjYWxsLi4uXHJcbiAgLy8gICBwYWRkaW5nOiAxY20gIWltcG9ydGFudDtcclxuICAvLyB9XHJcblxyXG59XHJcblxyXG4vLyAucHJpbnQge1xyXG4gIFxyXG4vLyAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcclxuLy8gICBtYXJnaW4tdG9wOiAxY207XHJcblxyXG4vLyB9XHJcblxyXG4vLyAvLyBJbnNldGFkIG9mIGZvcm1hdFxyXG4vLyAuQTQge1xyXG4vLyAgIHdpZHRoOiAyMTBtbTtcclxuLy8gICBtaW4taGVpZ2h0OiAyOTdtbTtcclxuLy8gICBwYWRkaW5nOiBjYWxjKDFjbSAtIDJweCk7XHJcbi8vIH1cclxuXHJcbi5ydWxlciB7XHJcbiAgd2lkdGg6IDMwcHg7IFxyXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi8vIC5ydWxlci5yaWdodCB7XHJcbi8vICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmVkO1xyXG4vLyAgIGJvcmRlci1sZWZ0OiBub25lO1xyXG4vLyB9XHJcblxyXG4vLyAucnVsZXItcGFnZSB7XHJcbi8vICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHJlZDtcclxuLy8gICB3aWR0aDogMzBweDsgIFxyXG4vLyAgIGhlaWdodDogY2FsYygyODdtbSAtIDNweCk7IC8vIHdpbGwgYmUgZHluYW1pY1xyXG4vLyB9XHJcblxyXG4vLyAucnVsZXItcGFnZS5ueHQge1xyXG4vLyAgIGhlaWdodDogY2FsYygyOTdtbSAtIDIuNWNtICsgM3B4KTsgLy8gd2lsbCBiZSBkeW5hbWljXHJcbi8vIH1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PdfTemplatesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pdf-templates',
                templateUrl: './pdf-templates.component.html',
                styleUrls: ['./pdf-templates.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_2__["HandyNgConfigService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_2__["HandyNgUserService"] }, { type: _services_pdf_template_helper_service__WEBPACK_IMPORTED_MODULE_3__["PdfTemplateHelperService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/pdf-templates/pdf-templates.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/modules/pdf-templates/pdf-templates.module.ts ***!
  \***************************************************************/
/*! exports provided: PdfTemplatesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PdfTemplatesModule", function() { return PdfTemplatesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _pdf_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pdf-templates-routing.module */ "./src/app/modules/pdf-templates/pdf-templates-routing.module.ts");
/* harmony import */ var _pdf_templates_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pdf-templates.component */ "./src/app/modules/pdf-templates/pdf-templates.component.ts");
/* harmony import */ var _components_pdf_generator_options_pdf_generator_options_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/pdf-generator-options/pdf-generator-options.component */ "./src/app/modules/pdf-templates/components/pdf-generator-options/pdf-generator-options.component.ts");
/* harmony import */ var _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-shared/shared.module */ "./src/app/modules/shared/shared.module.ts");
/* harmony import */ var _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @handy-ng/modules/handy-form/handy-form.module */ "./src/app/handy/modules/handy-form/handy-form.module.ts");
/* harmony import */ var _templates_example_pdf_template_example_pdf_template_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./templates/example-pdf-template/example-pdf-template.component */ "./src/app/modules/pdf-templates/templates/example-pdf-template/example-pdf-template.component.ts");









class PdfTemplatesModule {
}
PdfTemplatesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PdfTemplatesModule });
PdfTemplatesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PdfTemplatesModule_Factory(t) { return new (t || PdfTemplatesModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
            _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_6__["HandyFormModule"],
            _pdf_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__["PdfTemplatesRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PdfTemplatesModule, { declarations: [_pdf_templates_component__WEBPACK_IMPORTED_MODULE_3__["PdfTemplatesComponent"], _components_pdf_generator_options_pdf_generator_options_component__WEBPACK_IMPORTED_MODULE_4__["PdfGeneratorOptionsComponent"], _templates_example_pdf_template_example_pdf_template_component__WEBPACK_IMPORTED_MODULE_7__["ExamplePdfTemplateComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
        _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_6__["HandyFormModule"],
        _pdf_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__["PdfTemplatesRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PdfTemplatesModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _pdf_templates_component__WEBPACK_IMPORTED_MODULE_3__["PdfTemplatesComponent"], _components_pdf_generator_options_pdf_generator_options_component__WEBPACK_IMPORTED_MODULE_4__["PdfGeneratorOptionsComponent"], _templates_example_pdf_template_example_pdf_template_component__WEBPACK_IMPORTED_MODULE_7__["ExamplePdfTemplateComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                    _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_6__["HandyFormModule"],
                    _pdf_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__["PdfTemplatesRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/pdf-templates/services/pdf-template-helper.service.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/modules/pdf-templates/services/pdf-template-helper.service.ts ***!
  \*******************************************************************************/
/*! exports provided: PdfTemplateHelperService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PdfTemplateHelperService", function() { return PdfTemplateHelperService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");



class PdfTemplateHelperService {
    constructor(_handyNgApiService) {
        this._handyNgApiService = _handyNgApiService;
        this.paperSizes = {
            A0: {
                width: 841,
                height: 1189
            },
            A1: {
                width: 594,
                height: 841
            },
            A2: {
                width: 420,
                height: 594
            },
            A3: {
                width: 297,
                height: 420
            },
            A4: {
                width: 210,
                height: 297
            },
            A5: {
                width: 148,
                height: 210
            },
            A6: {
                width: 105,
                height: 148
            },
            Ledger: {
                width: 432,
                height: 279
            },
            Legal: {
                width: 216,
                height: 356
            },
            Letter: {
                width: 216,
                height: 279
            },
            Tabloid: {
                width: 279,
                height: 432
            },
        };
    }
    getPaperDimensionsInMM(format, landscape = false) {
        if (!landscape) {
            return this.paperSizes[format];
        }
        let { width, height } = this.paperSizes[format];
        // ? switched because of landscape
        return {
            width: height,
            height: width
        };
    }
    generateTestingPdf(pdfData) {
        return this._handyNgApiService.postRequest('service/handyPdf/testPdf', pdfData);
    }
}
PdfTemplateHelperService.ɵfac = function PdfTemplateHelperService_Factory(t) { return new (t || PdfTemplateHelperService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgApiService"])); };
PdfTemplateHelperService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PdfTemplateHelperService, factory: PdfTemplateHelperService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PdfTemplateHelperService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgApiService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/pdf-templates/templates/example-pdf-template/example-pdf-template.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/modules/pdf-templates/templates/example-pdf-template/example-pdf-template.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: ExamplePdfTemplateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExamplePdfTemplateComponent", function() { return ExamplePdfTemplateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


class ExamplePdfTemplateComponent {
    constructor() { }
    ngOnInit() {
    }
}
ExamplePdfTemplateComponent.ɵfac = function ExamplePdfTemplateComponent_Factory(t) { return new (t || ExamplePdfTemplateComponent)(); };
ExamplePdfTemplateComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ExamplePdfTemplateComponent, selectors: [["app-example-pdf-template"]], decls: 2, vars: 0, template: function ExamplePdfTemplateComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse quibusdam minus accusantium qui facere repellendus labore ex doloribus, aperiam, alias possimus, est ipsa molestiae totam sapiente eaque id at delectus eius animi ut dolores! Rerum omnis explicabo molestias quisquam perspiciatis sunt temporibus ipsa amet placeat odio, dolore suscipit debitis libero inventore, sit unde. Vero sint impedit ipsa. Harum, praesentium debitis reprehenderit provident esse suscipit aperiam dignissimos qui aliquam facere quam perspiciatis nulla nobis magnam impedit accusamus, nisi sit voluptatum, a unde laudantium! Corporis ipsam aliquid aperiam recusandae neque facilis fugiat deserunt aut fugit saepe non voluptatibus, iste quisquam eius reiciendis temporibus harum? Deleniti incidunt id voluptatum omnis minima sapiente a facere quidem adipisci. Eaque, ut quasi! Quidem illum sed fugiat dolores similique reiciendis ipsa totam, earum nam nesciunt veritatis voluptate sit iure ea natus? Velit porro doloribus ipsam placeat architecto, aliquid quam beatae culpa hic obcaecati iusto quis quaerat ducimus deserunt numquam fuga harum earum vitae at sunt repellendus omnis. Odio facilis fugit, sapiente culpa officiis provident mollitia quae adipisci error modi iste doloremque recusandae delectus nesciunt veniam. Nihil quisquam, reiciendis natus illum, incidunt possimus, consequatur ad facilis expedita magni nisi minus? Porro alias magni tempore ullam numquam! Mollitia assumenda, numquam sequi unde sint officiis, magni suscipit officia sed libero eius vero molestias facere, quia quos quasi ab at incidunt minima odit dolorum praesentium. Culpa consectetur ullam perferendis nobis quibusdam? Dolores magnam veritatis velit iste id aliquam voluptatem, assumenda veniam saepe nesciunt obcaecati consectetur rem quos illum quam. Consequatur, maxime fugit? Sed iste debitis voluptate eaque nam nulla facere quo possimus quaerat atque itaque neque assumenda, quos id officiis impedit quam deserunt nisi earum aspernatur voluptatibus exercitationem voluptates. Inventore hic doloremque ducimus earum minima dolor qui, impedit odit alias sapiente officia voluptates! Consequuntur a quos accusantium eveniet, modi consectetur quas unde facere officiis, quia sunt error doloribus perferendis voluptate nobis minima temporibus voluptatem suscipit accusamus, officia fugiat. Harum unde assumenda quia vel. Suscipit, voluptates odio? Sequi laboriosam fugiat a voluptatem assumenda dolore sunt quae similique at? Saepe, a! Mollitia, quaerat praesentium? Rerum fugiat distinctio temporibus. Sint aperiam laboriosam est! Dolore voluptas voluptatibus corporis commodi suscipit qui harum voluptates beatae laboriosam a tenetur, rerum dolorem repellendus autem ipsa omnis molestiae aspernatur rem voluptate deserunt reiciendis culpa natus quia labore! Omnis quis eum placeat quod quas quaerat tempore dignissimos, vitae reprehenderit ex culpa veritatis? Minus architecto itaque eos quae ut esse eius, ducimus ab odio provident, repellat sed labore soluta cumque? Deserunt nesciunt ad dolor provident dignissimos eaque maxime aperiam non, esse cupiditate vero assumenda iste id aliquam voluptatibus alias architecto iure voluptas. Accusamus explicabo eius, aut praesentium soluta deleniti necessitatibus culpa fugiat distinctio nostrum rerum quaerat ab. Veniam ratione quis ullam blanditiis unde culpa, beatae aliquam quas. Distinctio possimus obcaecati repellat porro nemo sunt. Dignissimos, quidem. Sit non aut, corporis libero voluptate minus culpa voluptas beatae harum eum repellat quaerat deleniti vitae quam explicabo nisi quae numquam soluta hic laborum modi similique eius amet. Rerum autem saepe eligendi ipsum repudiandae! Adipisci itaque quia a, repudiandae alias dicta sint illum maiores corporis exercitationem qui. Dolores accusantium est consequuntur nemo iste, debitis dolor earum amet? Molestias voluptatum placeat dignissimos itaque voluptatem repudiandae cupiditate quaerat iure doloribus libero voluptate officia recusandae nostrum, dolorum maiores, deleniti inventore expedita cumque magni ipsa quibusdam excepturi ducimus? Soluta tempora repellendus cumque? Consequatur deleniti aliquid quos, autem quae ducimus, eaque harum, cumque dolorum voluptatem hic! Perspiciatis minima corporis aliquam ex commodi. Consectetur nostrum placeat enim soluta aliquid ea possimus eos dolorum, corporis porro quod aperiam iusto mollitia doloribus libero laboriosam, fugiat deserunt iste dolorem eligendi, adipisci natus velit nihil? Id vero eius in inventore, molestias, reprehenderit error impedit explicabo nihil, laboriosam tempore quasi magnam. Laborum, quia. Deserunt expedita ad at corrupti, accusantium labore praesentium assumenda, magni eum vitae tempora? Corporis a illo vitae dolores, sit nisi quis repudiandae, provident dolorum sapiente delectus repellendus. Atque debitis autem, quod quisquam a eos voluptates vel esse, nostrum sed, inventore aut illum architecto. Amet, quasi tenetur? Unde quod minima atque accusamus sed! Dolores aperiam ipsa architecto aliquam dignissimos, repellendus provident culpa beatae placeat voluptatibus atque similique inventore cum earum, harum eligendi illum eum laudantium tenetur corporis. Facere cupiditate deserunt ex, sit in dignissimos.\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9wZGYtdGVtcGxhdGVzL3RlbXBsYXRlcy9leGFtcGxlLXBkZi10ZW1wbGF0ZS9leGFtcGxlLXBkZi10ZW1wbGF0ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvcGRmLXRlbXBsYXRlcy90ZW1wbGF0ZXMvZXhhbXBsZS1wZGYtdGVtcGxhdGUvZXhhbXBsZS1wZGYtdGVtcGxhdGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ExamplePdfTemplateComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-example-pdf-template',
                templateUrl: './example-pdf-template.component.html',
                styleUrls: ['./example-pdf-template.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ })

}]);
//# sourceMappingURL=modules-pdf-templates-pdf-templates-module.js.map