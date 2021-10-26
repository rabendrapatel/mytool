(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-user-user-module"],{

/***/ "./src/app/guards/condition-functions/complete-registration.ts":
/*!*********************************************************************!*\
  !*** ./src/app/guards/condition-functions/complete-registration.ts ***!
  \*********************************************************************/
/*! exports provided: CompletRegistrationGuardCondition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletRegistrationGuardCondition", function() { return CompletRegistrationGuardCondition; });
const CompletRegistrationGuardCondition = (userService, next, state, router) => {
    let { completeProfile } = userService.userData;
    if (!completeProfile) {
        return true;
    }
    return router.parseUrl('/error?code=403');
};


/***/ }),

/***/ "./src/app/modules/user/components/user-profile/user-profile.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/modules/user/components/user-profile/user-profile.component.ts ***!
  \********************************************************************************/
/*! exports provided: UserProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileComponent", function() { return UserProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-memory-state-form */ "./src/app/handy/extenders/handy-memory-state-form.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm2015/dialog.js");
/* harmony import */ var _ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/form-validators */ "./src/app/modules/shared/form-validators/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @handy-ng/models/user.ng-model */ "./src/app/handy/models/user.ng-model.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/handy-password-input/handy-password-input.component */ "./src/app/handy/modules/handy-form/components/handy-password-input/handy-password-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/password-hint/password-hint.component */ "./src/app/handy/modules/handy-form/components/password-hint/password-hint.component.ts");
/* harmony import */ var _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _shared_components_form_actions_bar_form_actions_bar_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../shared/components/form-actions-bar/form-actions-bar.component */ "./src/app/modules/shared/components/form-actions-bar/form-actions-bar.component.ts");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../shared/components/buttons/flat-btn/flat-btn.component */ "./src/app/modules/shared/components/buttons/flat-btn/flat-btn.component.ts");





















function UserProfileComponent_ng_template_0_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "stroked-btn", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserProfileComponent_ng_template_0_div_7_Template_stroked_btn_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r7.sendVerificationEmail(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Resend verification email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "stroked-btn", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserProfileComponent_ng_template_0_div_7_Template_stroked_btn_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r9.cancelEmailChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Cancel email change");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r5.newEmail, " has to be verified before being used as your account email.");
} }
function UserProfileComponent_ng_template_0_form_actions_bar_12_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form-actions-bar");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "raised-btn", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserProfileComponent_ng_template_0_form_actions_bar_12_Template_raised_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r10.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Update profile ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r6.submitDisabled);
} }
function UserProfileComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-form", 2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("validSubmitEvent", function UserProfileComponent_ng_template_0_Template_handy_form_validSubmitEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.onValidSubmit($event); })("invalidSubmitEvent", function UserProfileComponent_ng_template_0_Template_handy_form_invalidSubmitEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.onInvalidSubmit($event); })("submitDisabledChange", function UserProfileComponent_ng_template_0_Template_handy_form_submitDisabledChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15.submitDisabledChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h3", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Your profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "handy-text-input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, UserProfileComponent_ng_template_0_div_7_Template, 8, 1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "handy-password-input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("passwordStrength", function UserProfileComponent_ng_template_0_Template_handy_password_input_passwordStrength_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.passwordStrengthHelp = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "password-hint", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("generatedPassword", function UserProfileComponent_ng_template_0_Template_password_hint_generatedPassword_10_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.asignGeneratedPassword($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "handy-text-input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, UserProfileComponent_ng_template_0_form_actions_bar_12_Template, 3, 1, "form-actions-bar", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r1.formName)("formGroup", ctx_r1.form)("rememberState", ctx_r1.rememberFormState)("allowFullScreen", true)("defaultResetBtn", false)("disablePin", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.newEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autofill", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("passwordStrengt", ctx_r1.passwordStrengthHelp);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
} }
function UserProfileComponent_ng_container_2_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function UserProfileComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, UserProfileComponent_ng_container_2_ng_container_3_Template, 1, 0, "ng-container", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
} }
function UserProfileComponent_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function UserProfileComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-dialog-content", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, UserProfileComponent_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-actions", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "flat-btn", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserProfileComponent_ng_container_3_Template_flat_btn_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r20.dialogRef.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "raised-btn", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserProfileComponent_ng_container_3_Template_raised_btn_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r22.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Update profile");
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
class UserProfileComponent extends _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__["HandyMemoryStateForm"] {
    constructor(dialogRef, dialogData, _router, _route, _handyNgUserService, handyNgUtilsService, _model) {
        super(_handyNgUserService, handyNgUtilsService);
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._router = _router;
        this._route = _route;
        this._handyNgUserService = _handyNgUserService;
        this.handyNgUtilsService = handyNgUtilsService;
        this._model = _model;
        this.formName = 'userProfile';
        this.rememberFormState = false;
        this.initExtender();
        this._userChangeSub = this._handyNgUserService.userChange().subscribe(() => {
            this._refreshFormData();
        });
    }
    _refreshFormData() {
        this.form.setValue(this.getFormInitData());
    }
    onValidSubmit(formData) {
        let { email, password = null, name } = formData;
        let DTO = {
            email,
            name
        };
        if (password) {
            DTO.password = password;
        }
        this._model.updatedOne({ _id: this.updateEntryId }, DTO, { skipUpdateHistory: false, updateName: 'UserProfile form update' })
            .subscribe(result => {
            this._handyNgUserService.refreshUserData(() => {
                if (!this.inDialog) {
                    this._refreshFormData();
                    this._handyNgUserService.notify.simpleMsgNotification({ headline: 'Your profile was updated' });
                }
                this.closeDialog(Object.assign(Object.assign({}, formData), { _id: this.updateEntryId }));
            });
        }, err => {
            this._handyNgUserService.notify.apiErrNotification(err, 'Profile upload');
        });
    }
    getFormInitData() {
        let { email, name, newEmail, _id } = this._handyNgUserService.userData;
        this.updateEntryId = _id;
        this.newEmail = newEmail;
        return {
            email,
            name,
            password: null
        };
    }
    createForm(formInitData) {
        let fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.email, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Email is required'), Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["email"])()], [this._model.uniqueValidator('email', 'This email is taken', formInitData.email, 'all')]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["password"])(this.handyNgUtilsService)], [ /* Async validators */]),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.name, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Name is required')], [ /* Async validators */]),
        });
        return fg;
    }
    asignGeneratedPassword(newPassword) {
        this.form.get('password').setValue(newPassword);
    }
    sendVerificationEmail() {
        this._handyNgUserService.requestAuthEmail(this.newEmail, 'verify')
            .then(() => {
            this._handyNgUserService.notify.simpleMsgNotification({
                headline: 'Verification email sent',
                msg: `Check ${this.newEmail} inbox to verify your new account email`
            });
        })
            .catch(err => {
            this._handyNgUserService.notify.apiErrNotification(err, 'Verification email');
        });
    }
    cancelEmailChange() {
        this._model.updatedOne({ _id: this.updateEntryId }, { newEmail: null, emailVerificationHash: null }, { skipUpdateHistory: false, updateName: 'Email change cancelation' })
            .subscribe(result => {
            this._handyNgUserService.refreshUserData(() => {
                if (!this.inDialog) {
                    this._refreshFormData();
                    this._handyNgUserService.notify.simpleMsgNotification({ headline: 'Email change was canceled' });
                }
            });
        }, err => {
            this._handyNgUserService.notify.apiErrNotification(err, 'Canceling email change');
        });
    }
    ngOnDestroy() {
        this.handyNgUtilsService.unsubscribeAll([
            this._userChangeSub
        ]);
    }
}
UserProfileComponent.ɵfac = function UserProfileComponent_Factory(t) { return new (t || UserProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUtilsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"])); };
UserProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserProfileComponent, selectors: [["user-profile-form"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 2, consts: [["formContent", ""], [4, "ngIf"], [3, "formName", "formGroup", "rememberState", "allowFullScreen", "defaultResetBtn", "disablePin", "validSubmitEvent", "invalidSubmitEvent", "submitDisabledChange"], ["formComp", ""], ["fxLayout", "row wrap", "fxLayoutGap", "8px"], ["fxFlex", "100%"], ["formControlName", "email", "fieldName", "userProfile_email", "label", "Email", "placeholder", "Email", 1, "handy-form-input"], ["fxFlex", "100%", "fxLayout", "row wrap", "fxLayoutGap.gt-xs", "16px", "fxLayoutAlign", "flex-start flex-start"], ["fieldName", "userProfile_password", "formControlName", "password", "label", "New password", "placeholder", "Strong password", 1, "handy-form-input", 3, "autofill", "passwordStrength"], [3, "passwordStrengt", "generatedPassword"], ["formControlName", "name", "fieldName", "userProfile_name", "label", "Name", "placeholder", "Name"], ["fxLayout", "", "fxLayoutGap", "8px"], ["icon", "send", 3, "click"], ["color", "warn", "icon", "close", 3, "click"], ["color", "primary", 3, "disabled", "click"], [1, "handy-form-page-wrapper"], [1, "handy-form-wrapper"], [4, "ngTemplateOutlet"], [1, "mat-typography"], ["align", "end"], [3, "click"]], template: function UserProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, UserProfileComponent_ng_template_0_Template, 13, 10, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, UserProfileComponent_ng_container_2_Template, 4, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, UserProfileComponent_ng_container_3_Template, 8, 2, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inDialog);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__["HandyFormComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutGapDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultFlexDirective"], _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyTextInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutAlignDirective"], _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_12__["HandyPasswordInputComponent"], _handy_modules_handy_form_components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_13__["PasswordHintComponent"], _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_14__["StrokedBtnComponent"], _shared_components_form_actions_bar_form_actions_bar_component__WEBPACK_IMPORTED_MODULE_15__["FormActionsBarComponent"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_16__["RaisedBtnComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgTemplateOutlet"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"], _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_17__["FlatBtnComponent"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy91c2VyL2NvbXBvbmVudHMvdXNlci1wcm9maWxlL3VzZXItcHJvZmlsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvdXNlci9jb21wb25lbnRzL3VzZXItcHJvZmlsZS91c2VyLXByb2ZpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserProfileComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'user-profile-form',
                templateUrl: './user-profile.component.html',
                styleUrls: ['./user-profile.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
            }] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUserService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_6__["HandyNgUtilsService"] }, { type: _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/user/pages/complete-registration/complete-registration.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/modules/user/pages/complete-registration/complete-registration.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: CompleteRegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleteRegistrationComponent", function() { return CompleteRegistrationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-memory-state-form */ "./src/app/handy/extenders/handy-memory-state-form.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm2015/dialog.js");
/* harmony import */ var _ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/form-validators */ "./src/app/modules/shared/form-validators/index.ts");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @handy-ng/models/user.ng-model */ "./src/app/handy/models/user.ng-model.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/fesm2015/stepper.js");
/* harmony import */ var _components_user_preferences_user_preferences_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/user-preferences/user-preferences.component */ "./src/app/modules/user/components/user-preferences/user-preferences.component.ts");
/* harmony import */ var _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../shared/components/buttons/flat-btn/flat-btn.component */ "./src/app/modules/shared/components/buttons/flat-btn/flat-btn.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../handy/modules/handy-form/components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");




















function CompleteRegistrationComponent_ng_template_0_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, "Preferences");
} }
function CompleteRegistrationComponent_ng_template_0_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, "Profile details");
} }
function CompleteRegistrationComponent_ng_template_0_flat_btn_21_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "flat-btn", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CompleteRegistrationComponent_ng_template_0_flat_btn_21_Template_flat_btn_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r10.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Complete registration");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r8.submitDisabled);
} }
function CompleteRegistrationComponent_ng_template_0_stroked_btn_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "stroked-btn", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Log out");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function CompleteRegistrationComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "handy-form", 2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("validSubmitEvent", function CompleteRegistrationComponent_ng_template_0_Template_handy_form_validSubmitEvent_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.onValidSubmit($event); })("invalidSubmitEvent", function CompleteRegistrationComponent_ng_template_0_Template_handy_form_invalidSubmitEvent_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.onInvalidSubmit($event); })("submitDisabledChange", function CompleteRegistrationComponent_ng_template_0_Template_handy_form_submitDisabledChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15.submitDisabledChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h1", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Complete your registration");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-vertical-stepper", 6, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectionChange", function CompleteRegistrationComponent_ng_template_0_Template_mat_vertical_stepper_selectionChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.stepChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-step", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, CompleteRegistrationComponent_ng_template_0_ng_template_9_Template, 1, 0, "ng-template", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "user-preferences-form", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "flat-btn", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CompleteRegistrationComponent_ng_template_0_Template_flat_btn_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7); return _r5.next(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Next step");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-step", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, CompleteRegistrationComponent_ng_template_0_ng_template_15_Template, 1, 0, "ng-template", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "handy-text-input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "flat-btn", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CompleteRegistrationComponent_ng_template_0_Template_flat_btn_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7); return _r5.previous(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Step back");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, CompleteRegistrationComponent_ng_template_0_flat_btn_21_Template, 2, 1, "flat-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, CompleteRegistrationComponent_ng_template_0_stroked_btn_23_Template, 2, 0, "stroked-btn", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r1.formName)("formGroup", ctx_r1.form)("rememberState", ctx_r1.rememberFormState)("defaultResetBtn", false)("disablePin", true)("hideFormOptions", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selectedIndex", ctx_r1.stepIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("stepControl", ctx_r1.form.get("preferences"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isInCompleteRegistrationsSteps", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("stepControl", ctx_r1.form.get("userProfile"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
} }
function CompleteRegistrationComponent_ng_container_2_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function CompleteRegistrationComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CompleteRegistrationComponent_ng_container_2_ng_container_3_Template, 1, 0, "ng-container", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
} }
function CompleteRegistrationComponent_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function CompleteRegistrationComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-dialog-content", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, CompleteRegistrationComponent_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-actions", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "raised-btn", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CompleteRegistrationComponent_ng_container_3_Template_raised_btn_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r21.dialogRef.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Log out");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "raised-btn", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CompleteRegistrationComponent_ng_container_3_Template_raised_btn_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r23.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Complete registration");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r3.submitDisabled);
} }
class CompleteRegistrationComponent extends _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__["HandyMemoryStateForm"] {
    constructor(dialogRef, dialogData, _handyNgUserService, handyNgUtilsService, handyNgLayoutService, _router, _model) {
        super(_handyNgUserService, handyNgUtilsService);
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._handyNgUserService = _handyNgUserService;
        this.handyNgUtilsService = handyNgUtilsService;
        this.handyNgLayoutService = handyNgLayoutService;
        this._router = _router;
        this._model = _model;
        this.formName = 'completeRegistration';
        this.rememberFormState = true;
        this.defaultFormStateVal = {
            preferences: {
                preferences: null
            },
            userProfile: {
                name: this._handyNgUserService.userData.name
            }
        };
        this._stepperStateName = 'completeRegistrationComponent_stepper_index';
        this.stepIndex = this._handyNgUserService.getStateVal(this._stepperStateName, 0);
        this.initExtender();
    }
    ngOnInit() {
    }
    onValidSubmit(formData) {
        // ? Preferrences are updated via HandyNgLayoutService...
        let { userProfile } = formData;
        let DTU = {
            completeProfile: true,
            name: formData.userProfile.name,
        };
        this._model.updatedOne({ _id: this._handyNgUserService.userData._id }, DTU, { skipUpdateHistory: false, updateName: 'CompleteRegistration form update' })
            .subscribe(result => {
            this._handyNgUserService.refreshUserData(() => {
                this._handyNgUserService.resetStateVal(this._stepperStateName);
                this._router.navigate(['/dashboard']);
                this.closeDialog(Object.assign(Object.assign({}, formData), { _id: this._handyNgUserService.userData._id }));
                this._handyNgUserService.notify.simpleMsgNotification({
                    msg: 'Your registration was completed'
                });
            });
        }, err => {
            this._handyNgUserService.redirectToErrPageWithApiErr(err);
        });
    }
    getFormInitData(resolverData) {
        return {};
    }
    createForm(formInitData) {
        let { userProfile } = formInitData;
        let fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            // Just an placeholder, stepper needs control...
            preferences: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null),
            userProfile: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](userProfile.name, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Name is required')], [ /* Async validators */]),
            })
        });
        return fg;
    }
    stepChange(event) {
        this._handyNgUserService.saveStateVal(this._stepperStateName, event.selectedIndex);
    }
}
CompleteRegistrationComponent.ɵfac = function CompleteRegistrationComponent_Factory(t) { return new (t || CompleteRegistrationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgLayoutService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"])); };
CompleteRegistrationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CompleteRegistrationComponent, selectors: [["complete-registration-form"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 2, consts: [["formContent", ""], [4, "ngIf"], [3, "formName", "formGroup", "rememberState", "defaultResetBtn", "disablePin", "hideFormOptions", "validSubmitEvent", "invalidSubmitEvent", "submitDisabledChange"], ["formComp", ""], ["fxLayout", "column", "fxLayoutGap", "8px", 1, "handy-complete-reg-form-content"], [1, "handy-complete-reg-form-title"], ["linear", "", 3, "selectedIndex", "selectionChange"], ["stepper", ""], [3, "stepControl"], ["matStepLabel", ""], [3, "isInCompleteRegistrationsSteps"], ["icon", "chevron_right", 3, "click"], ["formGroupName", "userProfile", 3, "stepControl"], ["formControlName", "name", "fieldName", "completeRegistration_name", "label", "Name", "placeholder", "Name"], [1, "handy-complet-registration-form-actions"], ["icon", "chevron_left", 3, "click"], ["icon", "check_circle", "color", "primary", 3, "disabled", "click", 4, "ngIf"], ["fxLayout", "row", "fxLayoutAlign", "center center"], ["icon", "exit_to_app", "color", "warn", "routerLink", "/logout", "class", "auth-home-page", 4, "ngIf"], ["icon", "check_circle", "color", "primary", 3, "disabled", "click"], ["icon", "exit_to_app", "color", "warn", "routerLink", "/logout", 1, "auth-home-page"], ["fxLayout", "row", "fxLayoutAlign", "center center", 1, "complete-registration-page-wrapper"], [1, "complete-registration-form-wrapper"], [4, "ngTemplateOutlet"], [1, "mat-typography"], ["align", "end"], ["icon", "exit_to_app", "color", "warn", "routerLink", "/logout", 3, "click"]], template: function CompleteRegistrationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CompleteRegistrationComponent_ng_template_0_Template, 24, 12, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, CompleteRegistrationComponent_ng_container_2_Template, 4, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CompleteRegistrationComponent_ng_container_3_Template, 9, 2, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inDialog);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__["HandyFormComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutGapDirective"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatVerticalStepper"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStep"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStepLabel"], _components_user_preferences_user_preferences_component__WEBPACK_IMPORTED_MODULE_12__["UserPreferencesComponent"], _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_13__["FlatBtnComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupName"], _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_14__["HandyTextInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutAlignDirective"], _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_15__["StrokedBtnComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgTemplateOutlet"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_16__["RaisedBtnComponent"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.complete-registration-form-wrapper[_ngcontent-%COMP%] {\n  max-width: 500px;\n  width: 100%;\n  margin: 16px;\n}\n\n.xsmall-layout[_ngcontent-%COMP%]   .complete-registration-form-wrapper[_ngcontent-%COMP%] {\n  margin: 8px;\n}\n\n.complete-registration-page-wrapper[_ngcontent-%COMP%] {\n  height: 100vh;\n}\n\n.handy-complet-registration-form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.handy-complet-registration-form-actions[_ngcontent-%COMP%]   flat-btn[_ngcontent-%COMP%] {\n  margin-top: 0.8rem;\n}\n\n.handy-complet-registration-form-actions[_ngcontent-%COMP%]   flat-btn[_ngcontent-%COMP%]:first-of-type {\n  margin-right: 0.8rem;\n}\n\n@media only screen and (max-width: 500px) {\n  .complete-registration-page-wrapper[_ngcontent-%COMP%] {\n    height: 100%;\n    padding: 2rem 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy91c2VyL3BhZ2VzL2NvbXBsZXRlLXJlZ2lzdHJhdGlvbi9jb21wbGV0ZS1yZWdpc3RyYXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUE7RUFFRSxhQUFBO0VBQ0EsZUFBQTtBQUFGOztBQUNFO0VBQ0Usa0JBQUE7QUFDSjs7QUFBSTtFQUNFLG9CQUFBO0FBRU47O0FBSUE7RUFDRTtJQUNFLFlBQUE7SUFDQSxlQUFBO0VBREY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvdXNlci9wYWdlcy9jb21wbGV0ZS1yZWdpc3RyYXRpb24vY29tcGxldGUtcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uY29tcGxldGUtcmVnaXN0cmF0aW9uLWZvcm0td3JhcHBlciB7XHJcbiAgbWF4LXdpZHRoOiA1MDBweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXJnaW46IDE2cHg7XHJcbn1cclxuXHJcbi54c21hbGwtbGF5b3V0IC5jb21wbGV0ZS1yZWdpc3RyYXRpb24tZm9ybS13cmFwcGVyIHtcclxuICBtYXJnaW46IDhweDtcclxufVxyXG5cclxuLmNvbXBsZXRlLXJlZ2lzdHJhdGlvbi1wYWdlLXdyYXBwZXIge1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbn1cclxuXHJcbi5oYW5keS1jb21wbGV0LXJlZ2lzdHJhdGlvbi1mb3JtLWFjdGlvbnN7XHJcbiAgXHJcbiAgZGlzcGxheTogIGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGZsYXQtYnRue1xyXG4gICAgbWFyZ2luLXRvcDogLjhyZW07XHJcbiAgICAmOmZpcnN0LW9mLXR5cGV7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogLjhyZW07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MDBweCkge1xyXG4gIC5jb21wbGV0ZS1yZWdpc3RyYXRpb24tcGFnZS13cmFwcGVyIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDJyZW0gMDtcclxuICB9XHJcblxyXG59XHJcbi8vIC5mb3JtLXdyYXBwLW5ldy1saWZlIHtcclxuLy8gICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbi8vICAgLmNvbXBsZXRlLXJlZ2lzdHJhdGlvbi1mb3JtLXdyYXBwZXJ7XHJcbi8vICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgICB0b3A6IDA7XHJcbi8vICAgICBib3R0b206IDA7XHJcbi8vICAgICBsZWZ0OiAwO1xyXG4vLyAgICAgcmlnaHQ6IDA7XHJcbi8vICAgICBtYXJnaW46IGF1dG87XHJcbi8vICAgfVxyXG4vLyB9Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CompleteRegistrationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'complete-registration-form',
                templateUrl: './complete-registration.component.html',
                styleUrls: ['./complete-registration.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgLayoutService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }, { type: _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/user/user-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/user/user-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: UserRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoutingModule", function() { return UserRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _user_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.component */ "./src/app/modules/user/user.component.ts");
/* harmony import */ var src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/guards/user.guard */ "./src/app/guards/user.guard.ts");
/* harmony import */ var _pages_complete_registration_complete_registration_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/complete-registration/complete-registration.component */ "./src/app/modules/user/pages/complete-registration/complete-registration.component.ts");
/* harmony import */ var _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/user-profile/user-profile.component */ "./src/app/modules/user/components/user-profile/user-profile.component.ts");
/* harmony import */ var _components_user_preferences_user_preferences_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/user-preferences/user-preferences.component */ "./src/app/modules/user/components/user-preferences/user-preferences.component.ts");
/* harmony import */ var src_app_guards_condition_functions_complete_registration__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/guards/condition-functions/complete-registration */ "./src/app/guards/condition-functions/complete-registration.ts");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");











const routes = [
    {
        path: '',
        component: _user_component__WEBPACK_IMPORTED_MODULE_2__["UserComponent"],
        canActivate: [src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_3__["UserGuard"]],
        canActivateChild: [src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_3__["UserGuard"]],
        data: {
            pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["setRouteTitle"])({ title: 'User settings' })
        },
        children: [
            {
                path: 'profile',
                component: _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_5__["UserProfileComponent"],
                data: {
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["setRouteTitle"])({ title: 'User profile' })
                },
            },
            {
                path: 'preferences',
                component: _components_user_preferences_user_preferences_component__WEBPACK_IMPORTED_MODULE_6__["UserPreferencesComponent"],
                data: {
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["setRouteTitle"])({ title: 'User preferences' })
                },
            },
        ]
    },
    {
        path: 'complete-registration',
        component: _pages_complete_registration_complete_registration_component__WEBPACK_IMPORTED_MODULE_4__["CompleteRegistrationComponent"],
        canActivate: [src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_3__["UserGuard"].condition({ fn: src_app_guards_condition_functions_complete_registration__WEBPACK_IMPORTED_MODULE_7__["CompletRegistrationGuardCondition"] })],
        data: {
            pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["setRouteTitle"])({ title: 'Complete your registration', preppendToProjName: true, projNameSeparator: 'on' })
        },
    }
];
class UserRoutingModule {
}
UserRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: UserRoutingModule });
UserRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function UserRoutingModule_Factory(t) { return new (t || UserRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](UserRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/user/user.component.ts":
/*!************************************************!*\
  !*** ./src/app/modules/user/user.component.ts ***!
  \************************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_components_handy_nav_layout_handy_nav_layout_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/components/handy-nav-layout/handy-nav-layout.component */ "./src/app/modules/shared/components/handy-nav-layout/handy-nav-layout.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




class UserComponent {
    constructor() { }
    ngOnInit() {
    }
}
UserComponent.ɵfac = function UserComponent_Factory(t) { return new (t || UserComponent)(); };
UserComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserComponent, selectors: [["app-user"]], decls: 2, vars: 0, template: function UserComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-nav-layout");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_components_handy_nav_layout_handy_nav_layout_component__WEBPACK_IMPORTED_MODULE_1__["HandyNavLayoutComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy91c2VyL3VzZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL3VzZXIvdXNlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-user',
                templateUrl: './user.component.html',
                styleUrls: ['./user.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/modules/user/user.module.ts":
/*!*********************************************!*\
  !*** ./src/app/modules/user/user.module.ts ***!
  \*********************************************/
/*! exports provided: UserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _user_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-routing.module */ "./src/app/modules/user/user-routing.module.ts");
/* harmony import */ var _user_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.component */ "./src/app/modules/user/user.component.ts");
/* harmony import */ var _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/shared.module */ "./src/app/modules/shared/shared.module.ts");
/* harmony import */ var _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/modules/handy-form/handy-form.module */ "./src/app/handy/modules/handy-form/handy-form.module.ts");
/* harmony import */ var _pages_complete_registration_complete_registration_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/complete-registration/complete-registration.component */ "./src/app/modules/user/pages/complete-registration/complete-registration.component.ts");
/* harmony import */ var _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/user-profile/user-profile.component */ "./src/app/modules/user/components/user-profile/user-profile.component.ts");
/* harmony import */ var _components_user_preferences_user_preferences_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/user-preferences/user-preferences.component */ "./src/app/modules/user/components/user-preferences/user-preferences.component.ts");










class UserModule {
}
UserModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: UserModule });
UserModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function UserModule_Factory(t) { return new (t || UserModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
            _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_5__["HandyFormModule"],
            _user_routing_module__WEBPACK_IMPORTED_MODULE_2__["UserRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](UserModule, { declarations: [_user_component__WEBPACK_IMPORTED_MODULE_3__["UserComponent"],
        _pages_complete_registration_complete_registration_component__WEBPACK_IMPORTED_MODULE_6__["CompleteRegistrationComponent"],
        _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_7__["UserProfileComponent"],
        _components_user_preferences_user_preferences_component__WEBPACK_IMPORTED_MODULE_8__["UserPreferencesComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
        _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_5__["HandyFormModule"],
        _user_routing_module__WEBPACK_IMPORTED_MODULE_2__["UserRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _user_component__WEBPACK_IMPORTED_MODULE_3__["UserComponent"],
                    _pages_complete_registration_complete_registration_component__WEBPACK_IMPORTED_MODULE_6__["CompleteRegistrationComponent"],
                    _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_7__["UserProfileComponent"],
                    _components_user_preferences_user_preferences_component__WEBPACK_IMPORTED_MODULE_8__["UserPreferencesComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                    _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_5__["HandyFormModule"],
                    _user_routing_module__WEBPACK_IMPORTED_MODULE_2__["UserRoutingModule"]
                ],
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=modules-user-user-module.js.map