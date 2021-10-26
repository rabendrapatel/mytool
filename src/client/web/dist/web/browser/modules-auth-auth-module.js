(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-auth-auth-module"],{

/***/ "./src/app/modules/auth/auth-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/auth/auth-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.component */ "./src/app/modules/auth/auth.component.ts");
/* harmony import */ var _components_forms_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/forms/login/login.component */ "./src/app/modules/auth/components/forms/login/login.component.ts");
/* harmony import */ var _components_forms_register_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/forms/register/register.component */ "./src/app/modules/auth/components/forms/register/register.component.ts");
/* harmony import */ var _pages_auth_message_auth_message_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/auth-message/auth-message.component */ "./src/app/modules/auth/pages/auth-message/auth-message.component.ts");
/* harmony import */ var _components_forms_email_request_email_request_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/forms/email-request/email-request.component */ "./src/app/modules/auth/components/forms/email-request/email-request.component.ts");
/* harmony import */ var _components_forms_password_reset_password_reset_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/forms/password-reset/password-reset.component */ "./src/app/modules/auth/components/forms/password-reset/password-reset.component.ts");
/* harmony import */ var src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/guards/user.guard */ "./src/app/guards/user.guard.ts");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");












const routes = [
    {
        path: '',
        component: _auth_component__WEBPACK_IMPORTED_MODULE_2__["AuthComponent"],
        data: {
            pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_9__["setRouteTitle"])({ title: 'Auth', preppendToProjName: true }),
        },
        children: [
            {
                path: 'login',
                canActivate: [src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_8__["UserGuard"].condition({ notLoggedInOnly: true })],
                component: _components_forms_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"],
                data: {
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_9__["setRouteTitle"])({ title: 'Login', preppendToProjName: true }),
                }
            },
            {
                path: 'register',
                canActivate: [src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_8__["UserGuard"].condition({ notLoggedInOnly: true })],
                component: _components_forms_register_register_component__WEBPACK_IMPORTED_MODULE_4__["RegisterComponent"],
                data: {
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_9__["setRouteTitle"])({ title: 'Register', preppendToProjName: true }),
                }
            },
            {
                path: 'auth-msg',
                component: _pages_auth_message_auth_message_component__WEBPACK_IMPORTED_MODULE_5__["AuthMessageComponent"],
                data: {
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_9__["setRouteTitle"])({ title: 'Auth message' }),
                }
            },
            {
                path: 'email-request/:action',
                canActivate: [src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_8__["UserGuard"].condition({ notLoggedInOnly: true })],
                component: _components_forms_email_request_email_request_component__WEBPACK_IMPORTED_MODULE_6__["EmailRequestComponent"],
                data: {
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_9__["setRouteTitle"])({ title: 'Auth request' }),
                }
            },
            {
                path: 'password-reset/:email/:hash',
                canActivate: [src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_8__["UserGuard"].condition({ notLoggedInOnly: true })],
                component: _components_forms_password_reset_password_reset_component__WEBPACK_IMPORTED_MODULE_7__["PasswordResetComponent"],
                data: {
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_9__["setRouteTitle"])({ title: 'New password', preppendToProjName: true, projNameSeparator: 'for' }),
                }
            },
            {
                path: 'invitation-password-set/:email/:hash',
                canActivate: [src_app_guards_user_guard__WEBPACK_IMPORTED_MODULE_8__["UserGuard"].condition({ notLoggedInOnly: true })],
                component: _components_forms_password_reset_password_reset_component__WEBPACK_IMPORTED_MODULE_7__["PasswordResetComponent"],
                data: {
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_9__["setRouteTitle"])({ title: 'New password', preppendToProjName: true, projNameSeparator: 'for' }),
                }
            },
            {
                path: 'logout',
                component: _pages_auth_message_auth_message_component__WEBPACK_IMPORTED_MODULE_5__["AuthMessageComponent"],
                data: {
                    action: 'logout',
                    pageTitle: Object(_handy_ng_services__WEBPACK_IMPORTED_MODULE_9__["setRouteTitle"])({ title: 'Logout', preppendToProjName: true }),
                }
            }
        ]
    }
];
class AuthRoutingModule {
}
AuthRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AuthRoutingModule });
AuthRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AuthRoutingModule_Factory(t) { return new (t || AuthRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AuthRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/auth/auth.component.ts":
/*!************************************************!*\
  !*** ./src/app/modules/auth/auth.component.ts ***!
  \************************************************/
/*! exports provided: AuthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthComponent", function() { return AuthComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm2015/card.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");





class AuthComponent {
    constructor() { }
    ngOnInit() {
    }
}
AuthComponent.ɵfac = function AuthComponent_Factory(t) { return new (t || AuthComponent)(); };
AuthComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AuthComponent, selectors: [["app-auth"]], decls: 9, vars: 0, consts: [[1, "auth-page", "mat-app-background"], [1, "auth-card"], [1, ""], [1, "logo-side-nav"], ["src", "/assets/logo.png", "alt", "logo"], ["color", "primary", "icon", "home", "routerLink", "/", 1, "auth-home-page"]], template: function AuthComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "stroked-btn", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Go to Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_1__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_1__["MatCardContent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"], _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_3__["StrokedBtnComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], styles: [".auth-page[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 50000;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  padding-bottom: 2rem;\n  padding-top: 2rem;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n}\n.auth-page[_ngcontent-%COMP%]   .logo-side-nav[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  padding: 0.2rem;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.auth-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.auth-page[_ngcontent-%COMP%] {\n  min-width: 310px;\n  max-width: 380px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.xs-auth-content[_ngcontent-%COMP%] {\n  width: 90%;\n}\n@media only screen and (max-width: 500px) {\n  .auth-page[_ngcontent-%COMP%] {\n    position: static;\n    margin-top: 1rem;\n  }\n}\n@media only screen and (max-width: 400px) {\n  .auth-page[_ngcontent-%COMP%] {\n    padding: 2rem 0.6rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9hdXRoL2F1dGguY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBRUEsb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFERjtBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFBSjtBQU1BO0VBRUUsV0FBQTtBQUpGO0FBS0U7RUFDRSxlQUFBO0FBSEo7QUFPQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBSkY7QUFPQTtFQUNFLFVBQUE7QUFKRjtBQVNBO0VBQ0E7SUFDRSxnQkFBQTtJQUNBLGdCQUFBO0VBTkE7QUFDRjtBQVNBO0VBQ0U7SUFFRSxvQkFBQTtFQVJGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL2F1dGgvYXV0aC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hdXRoLXBhZ2Uge1xyXG4gIC8vIGhlaWdodDogMTAwJTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgei1pbmRleDogNTAwMDA7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIC8vIG1hcmdpbi10b3A6IDZyZW07XHJcbiAgcGFkZGluZy1ib3R0b206IDJyZW07XHJcbiAgcGFkZGluZy10b3A6IDJyZW0gO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC5sb2dvLXNpZGUtbmF2e1xyXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAuMnJlbTtcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcbi8vIC5hdXRoLWNhcmQsXHJcbi5hdXRoLWNhcmR7XHJcbiAgLy8gbWluLXdpZHRoOiAzMjBweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXQtY2FyZC1jb250ZW50e1xyXG4gICAgcGFkZGluZzogMS41cmVtO1xyXG4gIH1cclxuXHJcbn1cclxuLmF1dGgtcGFnZSB7XHJcbiAgbWluLXdpZHRoOiAzMTBweDtcclxuICBtYXgtd2lkdGg6IDM4MHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIG1hcmdpbi1yaWdodDogYXV0bztcclxufVxyXG5cclxuLnhzLWF1dGgtY29udGVudCB7XHJcbiAgd2lkdGg6IDkwJTtcclxufVxyXG5cclxuXHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KSB7XHJcbi5hdXRoLXBhZ2Uge1xyXG4gIHBvc2l0aW9uOiBzdGF0aWM7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxufVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQwMHB4KSB7XHJcbiAgLmF1dGgtcGFnZSB7XHJcblxyXG4gICAgcGFkZGluZzogMnJlbSAuNnJlbTtcclxuICB9XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-auth',
                templateUrl: './auth.component.html',
                styleUrls: ['./auth.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/modules/auth/auth.module.ts":
/*!*********************************************!*\
  !*** ./src/app/modules/auth/auth.module.ts ***!
  \*********************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-routing.module */ "./src/app/modules/auth/auth-routing.module.ts");
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.component */ "./src/app/modules/auth/auth.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/modules/shared/shared.module.ts");
/* harmony import */ var _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/modules/handy-form/handy-form.module */ "./src/app/handy/modules/handy-form/handy-form.module.ts");
/* harmony import */ var _components_forms_login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/forms/login/login.component */ "./src/app/modules/auth/components/forms/login/login.component.ts");
/* harmony import */ var _components_forms_register_register_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/forms/register/register.component */ "./src/app/modules/auth/components/forms/register/register.component.ts");
/* harmony import */ var _pages_auth_message_auth_message_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/auth-message/auth-message.component */ "./src/app/modules/auth/pages/auth-message/auth-message.component.ts");
/* harmony import */ var _components_forms_email_request_email_request_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/forms/email-request/email-request.component */ "./src/app/modules/auth/components/forms/email-request/email-request.component.ts");
/* harmony import */ var _components_forms_password_reset_password_reset_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/forms/password-reset/password-reset.component */ "./src/app/modules/auth/components/forms/password-reset/password-reset.component.ts");












class AuthModule {
}
AuthModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AuthModule });
AuthModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AuthModule_Factory(t) { return new (t || AuthModule)(); }, imports: [[
            _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_5__["HandyFormModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
            _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AuthModule, { declarations: [_auth_component__WEBPACK_IMPORTED_MODULE_3__["AuthComponent"],
        _components_forms_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
        _components_forms_register_register_component__WEBPACK_IMPORTED_MODULE_7__["RegisterComponent"],
        _pages_auth_message_auth_message_component__WEBPACK_IMPORTED_MODULE_8__["AuthMessageComponent"],
        _components_forms_email_request_email_request_component__WEBPACK_IMPORTED_MODULE_9__["EmailRequestComponent"],
        _components_forms_password_reset_password_reset_component__WEBPACK_IMPORTED_MODULE_10__["PasswordResetComponent"]], imports: [_handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_5__["HandyFormModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
        _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _auth_component__WEBPACK_IMPORTED_MODULE_3__["AuthComponent"],
                    _components_forms_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                    _components_forms_register_register_component__WEBPACK_IMPORTED_MODULE_7__["RegisterComponent"],
                    _pages_auth_message_auth_message_component__WEBPACK_IMPORTED_MODULE_8__["AuthMessageComponent"],
                    _components_forms_email_request_email_request_component__WEBPACK_IMPORTED_MODULE_9__["EmailRequestComponent"],
                    _components_forms_password_reset_password_reset_component__WEBPACK_IMPORTED_MODULE_10__["PasswordResetComponent"]
                ],
                imports: [
                    _handy_ng_modules_handy_form_handy_form_module__WEBPACK_IMPORTED_MODULE_5__["HandyFormModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                    _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"]
                ],
                entryComponents: [
                    _components_forms_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                    _components_forms_register_register_component__WEBPACK_IMPORTED_MODULE_7__["RegisterComponent"],
                    _components_forms_email_request_email_request_component__WEBPACK_IMPORTED_MODULE_9__["EmailRequestComponent"],
                    _components_forms_password_reset_password_reset_component__WEBPACK_IMPORTED_MODULE_10__["PasswordResetComponent"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/auth/components/forms/email-request/email-request.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/modules/auth/components/forms/email-request/email-request.component.ts ***!
  \****************************************************************************************/
/*! exports provided: EmailRequestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailRequestComponent", function() { return EmailRequestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-memory-state-form */ "./src/app/handy/extenders/handy-memory-state-form.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm2015/dialog.js");
/* harmony import */ var _ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/form-validators */ "./src/app/modules/shared/form-validators/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @handy-ng/models/user.ng-model */ "./src/app/handy/models/user.ng-model.ts");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/components/buttons/flat-btn/flat-btn.component */ "./src/app/modules/shared/components/buttons/flat-btn/flat-btn.component.ts");
















function EmailRequestComponent_ng_template_0_raised_btn_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "raised-btn", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EmailRequestComponent_ng_template_0_raised_btn_5_Template_raised_btn_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Send");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r5.submitDisabled);
} }
function EmailRequestComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "handy-form", 3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("validSubmitEvent", function EmailRequestComponent_ng_template_0_Template_handy_form_validSubmitEvent_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.onValidSubmit($event); })("invalidSubmitEvent", function EmailRequestComponent_ng_template_0_Template_handy_form_invalidSubmitEvent_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.onInvalidSubmit($event); })("submitDisabledChange", function EmailRequestComponent_ng_template_0_Template_handy_form_submitDisabledChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.submitDisabledChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "handy-text-input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, EmailRequestComponent_ng_template_0_raised_btn_5_Template, 2, 1, "raised-btn", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.headline[ctx_r1.action], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r1.formName)("formGroup", ctx_r1.form)("rememberState", ctx_r1.rememberFormState)("defaultResetBtn", false)("disablePin", true)("hideFormOptions", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("accountEmail"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
} }
function EmailRequestComponent_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function EmailRequestComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, EmailRequestComponent_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
} }
function EmailRequestComponent_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function EmailRequestComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-dialog-content", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, EmailRequestComponent_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-actions", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "flat-btn", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EmailRequestComponent_ng_container_3_Template_flat_btn_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.dialogRef.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "raised-btn", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EmailRequestComponent_ng_container_3_Template_raised_btn_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Send");
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
class EmailRequestComponent extends _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__["HandyMemoryStateForm"] {
    constructor(dialogRef, dialogData, _route, _router, _userModel, _handyNgUserService, handyNgUtilsService) {
        super(_handyNgUserService, handyNgUtilsService);
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._route = _route;
        this._router = _router;
        this._userModel = _userModel;
        this._handyNgUserService = _handyNgUserService;
        this.handyNgUtilsService = handyNgUtilsService;
        this.formName = 'emailRequest';
        this.rememberFormState = false;
        this.actionsList = [
            'passwordReset', 'unlock', 'verify'
        ];
        this.headline = {
            passwordReset: 'Password reset link',
            unlock: 'Unlock account link',
            verify: 'Verify email link'
        };
        this.initExtender();
        let action = this._route.snapshot.params['action'];
        if (!this.actionsList.includes(action)) {
            this._handyNgUserService.redirectToErrPage('404');
        }
        this.action = action;
    }
    ngOnInit() {
        if (this.form.get('accountEmail').value) {
            setTimeout(() => {
                this.showErrs();
            }, 1500);
        }
    }
    onValidSubmit(formData) {
        let { accountEmail } = formData;
        this._handyNgUserService.requestAuthEmail(accountEmail, this.action)
            .then(() => {
            this._router.navigate(['auth-msg'], { queryParams: { email: accountEmail, action: this.action } });
        })
            .catch(err => {
            this._handyNgUserService.redirectToErrPageWithApiErr(err);
        });
    }
    onInvalidSubmit(formData) {
        // console.log(formData)
    }
    getFormInitData() {
        return {
            accountEmail: this._route.snapshot.queryParams['email']
        };
    }
    createForm(formInitData) {
        let fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            accountEmail: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.accountEmail, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["email"])(), Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Email is required')], [this._userModel.mustExistValidator('email', 'Unknown account')])
        });
        return fg;
    }
}
EmailRequestComponent.ɵfac = function EmailRequestComponent_Factory(t) { return new (t || EmailRequestComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_6__["UserNgModel"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_7__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_7__["HandyNgUtilsService"])); };
EmailRequestComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EmailRequestComponent, selectors: [["email-request-form"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 2, consts: [["formContent", ""], [4, "ngIf"], [1, "handy-form-title"], [3, "formName", "formGroup", "rememberState", "defaultResetBtn", "disablePin", "hideFormOptions", "validSubmitEvent", "invalidSubmitEvent", "submitDisabledChange"], ["formComp", ""], ["placeholder", "account@email.com", "label", "Account email", 3, "formControl"], ["color", "primary", "icon", "send", "class", "handy-single-button-form", 3, "disabled", "click", 4, "ngIf"], ["color", "primary", "icon", "send", 1, "handy-single-button-form", 3, "disabled", "click"], [4, "ngTemplateOutlet"], [1, "mat-typography"], ["align", "end"], [3, "click"], ["color", "primary", "icon", "send", 3, "disabled", "click"]], template: function EmailRequestComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, EmailRequestComponent_ng_template_0_Template, 6, 9, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, EmailRequestComponent_ng_container_2_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, EmailRequestComponent_ng_container_3_Template, 8, 2, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inDialog);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__["HandyFormComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyTextInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_11__["RaisedBtnComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgTemplateOutlet"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"], _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_12__["FlatBtnComponent"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9hdXRoL2NvbXBvbmVudHMvZm9ybXMvZW1haWwtcmVxdWVzdC9lbWFpbC1yZXF1ZXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBQ0UsY0FBQTtBQUNIIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9hdXRoL2NvbXBvbmVudHMvZm9ybXMvZW1haWwtcmVxdWVzdC9lbWFpbC1yZXF1ZXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcclxuICAgZGlzcGxheTogYmxvY2s7XHJcbiB9Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EmailRequestComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'email-request-form',
                templateUrl: './email-request.component.html',
                styleUrls: ['./email-request.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
            }] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }, { type: _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_6__["UserNgModel"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_7__["HandyNgUserService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_7__["HandyNgUtilsService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/auth/components/forms/login/login.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/modules/auth/components/forms/login/login.component.ts ***!
  \************************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-memory-state-form */ "./src/app/handy/extenders/handy-memory-state-form.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm2015/dialog.js");
/* harmony import */ var _ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/form-validators */ "./src/app/modules/shared/form-validators/index.ts");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-password-input/handy-password-input.component */ "./src/app/handy/modules/handy-form/components/handy-password-input/handy-password-input.component.ts");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/esm2015/extended.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _handy_ng_pipes_handy_time_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @handy-ng/pipes/handy-time.pipe */ "./src/app/handy/pipes/handy-time.pipe.ts");




















function LoginComponent_ng_template_0_mat_error_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5.loginErrMsg);
} }
function LoginComponent_ng_template_0_mat_error_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "handyTime");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Account is locked for next ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r6.unlockCountDown), "");
} }
function LoginComponent_ng_template_0_raised_btn_9_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "raised-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_ng_template_0_raised_btn_9_Template_raised_btn_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r13.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r7.submitDisabled);
} }
const _c0 = function (a0) { return { email: a0 }; };
function LoginComponent_ng_template_0_a_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Forgot Your Password?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx_r8.form.get("email").value));
} }
function LoginComponent_ng_template_0_stroked_btn_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "stroked-btn", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Unlock Account ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx_r9.form.get("email").value));
} }
function LoginComponent_ng_template_0_stroked_btn_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "stroked-btn", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Verify Account Email ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx_r10.form.get("email").value));
} }
function LoginComponent_ng_template_0_a_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Create a New Account");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx_r11.form.get("email").value));
} }
function LoginComponent_ng_template_0_a_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Forgot Your Password?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx_r12.form.get("email").value));
} }
const _c1 = function (a0) { return [a0]; };
function LoginComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "handy-form", 3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function LoginComponent_ng_template_0_Template_handy_form_valueChange_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15.clearMessages(); })("validSubmitEvent", function LoginComponent_ng_template_0_Template_handy_form_validSubmitEvent_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.onValidSubmit($event); })("invalidSubmitEvent", function LoginComponent_ng_template_0_Template_handy_form_invalidSubmitEvent_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r18.onInvalidSubmit($event); })("submitDisabledChange", function LoginComponent_ng_template_0_Template_handy_form_submitDisabledChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.submitDisabledChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "handy-text-input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "handy-password-input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, LoginComponent_ng_template_0_mat_error_6_Template, 2, 1, "mat-error", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, LoginComponent_ng_template_0_mat_error_7_Template, 3, 3, "mat-error", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, LoginComponent_ng_template_0_raised_btn_9_Template, 2, 1, "raised-btn", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, LoginComponent_ng_template_0_a_10_Template, 2, 3, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, LoginComponent_ng_template_0_stroked_btn_11_Template, 2, 3, "stroked-btn", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, LoginComponent_ng_template_0_stroked_btn_12_Template, 2, 3, "stroked-btn", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, LoginComponent_ng_template_0_a_14_Template, 2, 3, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, LoginComponent_ng_template_0_a_15_Template, 2, 3, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r1.formName)("formGroup", ctx_r1.form)("rememberState", ctx_r1.rememberFormState)("defaultResetBtn", false)("disablePin", true)("hideFormOptions", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("email"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("password"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.loginErrMsg);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.unlockCountDown);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.requestEmail !== "unlock" && ctx_r1.requestEmail !== "verifyEmail");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.requestEmail === "unlock");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.requestEmail === "verifyEmail");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](17, _c1, ctx_r1.requestEmail === "unlock" || ctx_r1.requestEmail === "verifyEmail" ? "handy-form-action-login-footer-many" : " def"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.openRegistration);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.requestEmail === "unlock" || ctx_r1.requestEmail === "verifyEmail");
} }
function LoginComponent_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function LoginComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, LoginComponent_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
} }
function LoginComponent_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function LoginComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-dialog-content", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, LoginComponent_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-actions", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_ng_container_3_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r22.dialogRef.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_ng_container_3_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r24.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Log in");
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
class LoginComponent extends _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__["HandyMemoryStateForm"] {
    constructor(dialogRef, dialogData, _ngConfig, _handyNgUserService, _route, handyNgUtilsService) {
        super(_handyNgUserService, handyNgUtilsService);
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._ngConfig = _ngConfig;
        this._handyNgUserService = _handyNgUserService;
        this._route = _route;
        this.handyNgUtilsService = handyNgUtilsService;
        this.formName = 'login';
        this.rememberFormState = false;
        this.requestEmail = false;
        this.openRegistration = this._ngConfig.data.userRegistration.openRegistration;
        this.initExtender();
    }
    ngOnInit() {
    }
    onValidSubmit(formData) {
        let { email, password } = formData;
        this._handyNgUserService.login(email, password)
            .then(loginResult => {
            let { failReason = null, lockTimeLeft } = loginResult;
            if (failReason) {
                switch (failReason) {
                    case 'unverified':
                        this.loginErrMsg = `This account has not been verified yet. Check your email or request verification email.`;
                        this.requestEmail = 'verifyEmail';
                        this.unlockCountDown = null;
                        break;
                    case 'locked':
                        this.loginErrMsg = `This account is locked due too many failed login attempts.`;
                        this.requestEmail = 'unlock';
                        this._startCountDown(lockTimeLeft);
                        break;
                    case 'banned':
                        this.loginErrMsg = `This account is banned.`;
                        this.requestEmail = false;
                        this.unlockCountDown = null;
                        break;
                    default:
                        this.loginErrMsg = 'Invalid login credential.';
                        this.requestEmail = false;
                        this.unlockCountDown = null;
                        break;
                }
                return;
            }
            this._handyNgUserService.redirectToDashboard();
            this.clearMessages();
        })
            .catch(err => {
            console.log(err);
            this._handyNgUserService.redirectToErrPageWithApiErr(err);
        });
    }
    onInvalidSubmit(formData) {
        // console.log(formData)
    }
    _startCountDown(initial) {
        this._coutDownSub = this.handyNgUtilsService.countDown(Math.floor(initial)).subscribe(step => {
            let { timeLeft, complete } = step;
            this.unlockCountDown = timeLeft;
            if (complete) {
                this.clearMessages();
            }
        });
    }
    clearMessages() {
        this.unlockCountDown = null;
        this.loginErrMsg = null;
        this.requestEmail = false;
        if (this._coutDownSub) {
            this._coutDownSub.unsubscribe();
        }
    }
    getFormInitData() {
        return {
            email: this._route.snapshot.queryParams['email']
        };
    }
    createForm(formInitData) {
        let fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.email, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["email"])(), Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Email is required')]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Password is required')])
        });
        return fg;
    }
    ngOnDestroy() {
        this.clearMessages();
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["login-form"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 2, consts: [["formContent", ""], [4, "ngIf"], [1, "handy-form-title"], [3, "formName", "formGroup", "rememberState", "defaultResetBtn", "disablePin", "hideFormOptions", "valueChange", "validSubmitEvent", "invalidSubmitEvent", "submitDisabledChange"], ["formComp", ""], ["label", "Email", "placeholder", "your@email.com", 3, "formControl"], ["label", "Password", 3, "formControl"], ["class", "handy-form-unlockCountDown", 4, "ngIf"], [1, "handy-form-action-login"], ["color", "primary", "icon", "login", "class", "handy-btn-form-action", 3, "disabled", "click", 4, "ngIf"], ["routerLink", "/email-request/passwordReset", 3, "queryParams", 4, "ngIf"], ["routerLink", "/email-request/unlock", "color", "primary", "icon", "lock_open", 3, "queryParams", 4, "ngIf"], ["routerLink", "/email-request/verify", "color", "primary", "icon", "email", 3, "queryParams", 4, "ngIf"], [1, "handy-form-action-login-footer", 3, "ngClass"], ["routerLink", "/register", 3, "queryParams", 4, "ngIf"], [1, "handy-form-unlockCountDown"], ["color", "primary", "icon", "login", 1, "handy-btn-form-action", 3, "disabled", "click"], ["routerLink", "/email-request/passwordReset", 3, "queryParams"], ["routerLink", "/email-request/unlock", "color", "primary", "icon", "lock_open", 3, "queryParams"], ["routerLink", "/email-request/verify", "color", "primary", "icon", "email", 3, "queryParams"], ["routerLink", "/register", 3, "queryParams"], [4, "ngTemplateOutlet"], [1, "mat-typography"], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-button", "", "color", "warn", 3, "disabled", "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, LoginComponent_ng_template_0_Template, 16, 19, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, LoginComponent_ng_container_2_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, LoginComponent_ng_container_3_Template, 8, 2, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inDialog);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_8__["HandyFormComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyTextInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyPasswordInputComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_11__["DefaultClassDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatError"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_13__["RaisedBtnComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLinkWithHref"], _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_14__["StrokedBtnComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgTemplateOutlet"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_15__["MatButton"]], pipes: [_handy_ng_pipes_handy_time_pipe__WEBPACK_IMPORTED_MODULE_16__["HandyTimePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\na[_ngcontent-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9hdXRoL2NvbXBvbmVudHMvZm9ybXMvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDRSxjQUFBO0FBQ0g7O0FBRUM7RUFFRSxjQUFBO0FBQUgiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL2F1dGgvY29tcG9uZW50cy9mb3Jtcy9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XHJcbiAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gfVxyXG5cclxuIGF7XHJcbiAgLy8gIGNvbG9yOiAjZmZmZmVkO1xyXG4gICBkaXNwbGF5OiBibG9jaztcclxuIH1cclxuXHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'login-form',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgConfigService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/auth/components/forms/password-reset/password-reset.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/modules/auth/components/forms/password-reset/password-reset.component.ts ***!
  \******************************************************************************************/
/*! exports provided: PasswordResetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetComponent", function() { return PasswordResetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-memory-state-form */ "./src/app/handy/extenders/handy-memory-state-form.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm2015/dialog.js");
/* harmony import */ var _ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/form-validators */ "./src/app/modules/shared/form-validators/index.ts");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-password-input/handy-password-input.component */ "./src/app/handy/modules/handy-form/components/handy-password-input/handy-password-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/password-hint/password-hint.component */ "./src/app/handy/modules/handy-form/components/password-hint/password-hint.component.ts");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/components/buttons/flat-btn/flat-btn.component */ "./src/app/modules/shared/components/buttons/flat-btn/flat-btn.component.ts");
















function PasswordResetComponent_ng_template_0_raised_btn_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "raised-btn", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordResetComponent_ng_template_0_raised_btn_6_Template_raised_btn_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r5.submitDisabled);
} }
function PasswordResetComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "handy-form", 3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("validSubmitEvent", function PasswordResetComponent_ng_template_0_Template_handy_form_validSubmitEvent_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.onValidSubmit($event); })("invalidSubmitEvent", function PasswordResetComponent_ng_template_0_Template_handy_form_invalidSubmitEvent_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.onInvalidSubmit($event); })("submitDisabledChange", function PasswordResetComponent_ng_template_0_Template_handy_form_submitDisabledChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.submitDisabledChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "handy-password-input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("passwordStrength", function PasswordResetComponent_ng_template_0_Template_handy_password_input_passwordStrength_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.passwordStrengthHelp = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "password-hint", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("generatedPassword", function PasswordResetComponent_ng_template_0_Template_password_hint_generatedPassword_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.asignGeneratedPassword($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, PasswordResetComponent_ng_template_0_raised_btn_6_Template, 2, 1, "raised-btn", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Password reset for ", ctx_r1.email, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r1.formName)("formGroup", ctx_r1.form)("rememberState", ctx_r1.rememberFormState)("defaultResetBtn", false)("disablePin", true)("hideFormOptions", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autofill", false)("formControl", ctx_r1.form.get("newPassword"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("passwordStrengt", ctx_r1.passwordStrengthHelp);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
} }
function PasswordResetComponent_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function PasswordResetComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PasswordResetComponent_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
} }
function PasswordResetComponent_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function PasswordResetComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-dialog-content", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PasswordResetComponent_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-actions", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "flat-btn", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordResetComponent_ng_container_3_Template_flat_btn_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.dialogRef.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "raised-btn", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordResetComponent_ng_container_3_Template_raised_btn_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r18.triggerSubmit(); });
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
class PasswordResetComponent extends _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__["HandyMemoryStateForm"] {
    constructor(dialogRef, dialogData, _handyNgUserService, _route, _router, handyNgUtilsService) {
        super(_handyNgUserService, handyNgUtilsService);
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._handyNgUserService = _handyNgUserService;
        this._route = _route;
        this._router = _router;
        this.handyNgUtilsService = handyNgUtilsService;
        this.formName = 'passwordReset';
        this.rememberFormState = false;
        this.isInvitation = false;
        this.initExtender();
        this.isInvitation = this._router.url.includes('invitation-password-set');
        let { email, hash } = this._route.snapshot.params;
        this.email = email;
        this._hash = hash;
    }
    ngOnInit() {
    }
    onValidSubmit(formData) {
        let { newPassword } = formData;
        this._handyNgUserService.resetPassword(this.email, newPassword, this._hash)
            .then(result => {
            if (result.success) {
                let redirectTo = '/auth-msg';
                let queryParams = { email: this.email, action: 'afterPasswordReset' };
                this._router.navigate([redirectTo], { queryParams });
                return;
            }
            else {
                this._handyNgUserService.redirectToErrPage('500');
            }
        })
            .catch(err => {
            this._handyNgUserService.redirectToErrPageWithApiErr(err);
        });
    }
    onInvalidSubmit(formData) {
        // console.log(formData)
    }
    getFormInitData() {
        return {};
    }
    createForm(formInitData) {
        let fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            newPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('New password is required'), Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["password"])(this.handyNgUtilsService)])
        });
        return fg;
    }
    asignGeneratedPassword(newPassword) {
        this.form.get('newPassword').setValue(newPassword);
    }
}
PasswordResetComponent.ɵfac = function PasswordResetComponent_Factory(t) { return new (t || PasswordResetComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"])); };
PasswordResetComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PasswordResetComponent, selectors: [["password-reset-form"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 2, consts: [["formContent", ""], [4, "ngIf"], [1, "handy-form-title"], [3, "formName", "formGroup", "rememberState", "defaultResetBtn", "disablePin", "hideFormOptions", "validSubmitEvent", "invalidSubmitEvent", "submitDisabledChange"], ["formComp", ""], ["label", "New password", "placeholder", "Strong password", 3, "autofill", "formControl", "passwordStrength"], [1, "handy-form-password-hint", 3, "passwordStrengt", "generatedPassword"], ["color", "primary", "class", "handy-single-button-form", 3, "disabled", "click", 4, "ngIf"], ["color", "primary", 1, "handy-single-button-form", 3, "disabled", "click"], [4, "ngTemplateOutlet"], [1, "mat-typography"], ["align", "end"], [3, "click"], ["color", "primary", 3, "disabled", "click"]], template: function PasswordResetComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, PasswordResetComponent_ng_template_0_Template, 7, 11, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PasswordResetComponent_ng_container_2_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, PasswordResetComponent_ng_container_3_Template, 8, 2, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inDialog);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_8__["HandyFormComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyPasswordInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _handy_modules_handy_form_components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_10__["PasswordHintComponent"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_11__["RaisedBtnComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgTemplateOutlet"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"], _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_12__["FlatBtnComponent"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9hdXRoL2NvbXBvbmVudHMvZm9ybXMvcGFzc3dvcmQtcmVzZXQvcGFzc3dvcmQtcmVzZXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDRSxjQUFBO0FBQ0giLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL2F1dGgvY29tcG9uZW50cy9mb3Jtcy9wYXNzd29yZC1yZXNldC9wYXNzd29yZC1yZXNldC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XHJcbiAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gfSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PasswordResetComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'password-reset-form',
                templateUrl: './password-reset.component.html',
                styleUrls: ['./password-reset.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/auth/components/forms/register/register.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/modules/auth/components/forms/register/register.component.ts ***!
  \******************************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @handy-ng/extenders/handy-memory-state-form */ "./src/app/handy/extenders/handy-memory-state-form.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm2015/dialog.js");
/* harmony import */ var _ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/form-validators */ "./src/app/modules/shared/form-validators/index.ts");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @handy-ng/models/user.ng-model */ "./src/app/handy/models/user.ng-model.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/handy-password-input/handy-password-input.component */ "./src/app/handy/modules/handy-form/components/handy-password-input/handy-password-input.component.ts");
/* harmony import */ var _handy_modules_handy_form_components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../handy/modules/handy-form/components/password-hint/password-hint.component */ "./src/app/handy/modules/handy-form/components/password-hint/password-hint.component.ts");
/* harmony import */ var _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../shared/components/buttons/flat-btn/flat-btn.component */ "./src/app/modules/shared/components/buttons/flat-btn/flat-btn.component.ts");



















function RegisterComponent_ng_template_0_raised_btn_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "raised-btn", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RegisterComponent_ng_template_0_raised_btn_8_Template_raised_btn_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Create account");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r5.submitDisabled);
} }
function RegisterComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Create account");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "handy-form", 3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("validSubmitEvent", function RegisterComponent_ng_template_0_Template_handy_form_validSubmitEvent_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.onValidSubmit($event); })("invalidSubmitEvent", function RegisterComponent_ng_template_0_Template_handy_form_invalidSubmitEvent_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.onInvalidSubmit($event); })("submitDisabledChange", function RegisterComponent_ng_template_0_Template_handy_form_submitDisabledChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.submitDisabledChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "handy-text-input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "handy-password-input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("passwordStrength", function RegisterComponent_ng_template_0_Template_handy_password_input_passwordStrength_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.passwordStrengthHelp = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "password-hint", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("generatedPassword", function RegisterComponent_ng_template_0_Template_password_hint_generatedPassword_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.asignGeneratedPassword($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, RegisterComponent_ng_template_0_raised_btn_8_Template, 2, 1, "raised-btn", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "stroked-btn", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Login ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r1.formName)("formGroup", ctx_r1.form)("rememberState", ctx_r1.rememberFormState)("defaultResetBtn", false)("disablePin", true)("hideFormOptions", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r1.form.get("registrationEmail"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autofill", false)("formControl", ctx_r1.form.get("password"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("passwordStrengt", ctx_r1.passwordStrengthHelp);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.inDialog);
} }
function RegisterComponent_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function RegisterComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RegisterComponent_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
} }
function RegisterComponent_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function RegisterComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-dialog-content", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegisterComponent_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-actions", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "flat-btn", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RegisterComponent_ng_container_3_Template_flat_btn_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.dialogRef.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "raised-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RegisterComponent_ng_container_3_Template_raised_btn_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r18.triggerSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Create account ");
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
class RegisterComponent extends _handy_ng_extenders_handy_memory_state_form__WEBPACK_IMPORTED_MODULE_2__["HandyMemoryStateForm"] {
    constructor(dialogRef, dialogData, _handyNgUserService, _handyNgConfigService, _route, _router, _userModel, handyNgUtilsService) {
        super(_handyNgUserService, handyNgUtilsService);
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this._handyNgUserService = _handyNgUserService;
        this._handyNgConfigService = _handyNgConfigService;
        this._route = _route;
        this._router = _router;
        this._userModel = _userModel;
        this.handyNgUtilsService = handyNgUtilsService;
        this.formName = 'register';
        this.rememberFormState = false;
        this.initExtender();
    }
    ngOnInit() {
    }
    onValidSubmit(formData) {
        let { registrationEmail, password } = formData;
        let redirectTo = '/auth-msg';
        let queryParams = { email: registrationEmail, action: 'afterRegister' };
        this._handyNgUserService.register(registrationEmail, password)
            .then(result => {
            if (result.success && !this._handyNgConfigService.data.userRegistration.verifyEmail) {
                redirectTo = '/dashboard';
                queryParams = null;
                return this._handyNgUserService.login(registrationEmail, password);
            }
            return Promise.resolve();
        })
            .then(() => {
            this._router.navigate([redirectTo], { queryParams });
        })
            .catch(err => {
            this._handyNgUserService.redirectToErrPageWithApiErr(err);
        });
    }
    onInvalidSubmit(formData) {
        // console.log(formData)
    }
    getFormInitData() {
        return {
            registrationEmail: (this._route.snapshot.queryParams.email) ? this._route.snapshot.queryParams.email : null
        };
    }
    createForm(formInitData) {
        let fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            registrationEmail: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](formInitData.registrationEmail, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["email"])(), Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Email is required')], [this._userModel.uniqueValidator('email', 'This email is already taken')]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["required"])('Password is required'), Object(_ng_shared_form_validators__WEBPACK_IMPORTED_MODULE_4__["password"])(this.handyNgUtilsService)])
        });
        return fg;
    }
    asignGeneratedPassword(newPassword) {
        this.form.get('password').setValue(newPassword);
    }
}
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) { return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"])); };
RegisterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RegisterComponent, selectors: [["register-form"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 2, consts: [["formContent", ""], [4, "ngIf"], [1, "handy-form-title"], [3, "formName", "formGroup", "rememberState", "defaultResetBtn", "disablePin", "hideFormOptions", "validSubmitEvent", "invalidSubmitEvent", "submitDisabledChange"], ["formComp", ""], ["fieldName", "registration-email", "label", "Account Email", "placeholder", "your@email.com", 3, "formControl"], ["label", "Password", 3, "autofill", "formControl", "passwordStrength"], ["color", "primary", 1, "handy-form-password-hint", 3, "passwordStrengt", "generatedPassword"], [1, "handy-form-register-actions"], ["color", "primary", "icon", "person_add", "class", "handy-single-button-form", 3, "disabled", "click", 4, "ngIf"], ["routerLink", "/login", "color", "primary", "icon", "login", 1, "handy-single-button-form"], ["color", "primary", "icon", "person_add", 1, "handy-single-button-form", 3, "disabled", "click"], [4, "ngTemplateOutlet"], [1, "mat-typography"], ["align", "end"], [3, "click"], ["color", "primary", "icon", "person_add", 3, "disabled", "click"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, RegisterComponent_ng_template_0_Template, 11, 11, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegisterComponent_ng_container_2_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, RegisterComponent_ng_container_3_Template, 8, 2, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.inDialog);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inDialog);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _handy_modules_handy_form_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__["HandyFormComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _handy_modules_handy_form_components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyTextInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _handy_modules_handy_form_components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyPasswordInputComponent"], _handy_modules_handy_form_components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_12__["PasswordHintComponent"], _shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_13__["StrokedBtnComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLink"], _shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_14__["RaisedBtnComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgTemplateOutlet"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"], _shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_15__["FlatBtnComponent"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.handy-form-register-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9hdXRoL2NvbXBvbmVudHMvZm9ybXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDRSxjQUFBO0FBQ0g7O0FBRUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQUNBIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9hdXRoL2NvbXBvbmVudHMvZm9ybXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xyXG4gICBkaXNwbGF5OiBibG9jaztcclxuIH1cclxuXHJcbi5oYW5keS1mb3JtLXJlZ2lzdGVyLWFjdGlvbnN7XHJcbmRpc3BsYXk6IGZsZXg7XHJcbmp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegisterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'register-form',
                templateUrl: './register.component.html',
                styleUrls: ['./register.component.scss'],
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgConfigService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }, { type: _handy_ng_models_user_ng_model__WEBPACK_IMPORTED_MODULE_7__["UserNgModel"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUtilsService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/modules/auth/pages/auth-message/auth-message.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/modules/auth/pages/auth-message/auth-message.component.ts ***!
  \***************************************************************************/
/*! exports provided: AuthMessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthMessageComponent", function() { return AuthMessageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_ng_pipes_handy_time_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/pipes/handy-time.pipe */ "./src/app/handy/pipes/handy-time.pipe.ts");






function AuthMessageComponent_p_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.messages[ctx_r0.action]);
} }
function AuthMessageComponent_p_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "handyTime");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", ctx_r1.redirects[ctx_r1.action].msg, " ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r1.countDown), "");
} }
class AuthMessageComponent {
    constructor(handyNguserService, _route, _router, _handyNgUtilsService) {
        this.handyNguserService = handyNguserService;
        this._route = _route;
        this._router = _router;
        this._handyNgUtilsService = _handyNgUtilsService;
        this.actions = [
            'afterRegister',
            'emailVerified',
            'unlock',
            'verify',
            'passwordReset',
            'accountUnlocked',
            'afterPasswordReset',
            'logout'
        ];
        this.headlines = {
            afterRegister: 'Your registration was sucessful',
            emailVerified: 'Your email was verified',
            unlock: 'Unlock link was sent',
            passwordReset: 'Password reset link was sent',
            verify: 'Verification email was sent',
            accountUnlocked: 'Your account was unlocked',
            afterPasswordReset: 'Your new password was saved',
            logout: `You've logged out`
        };
        this.messages = {
            afterRegister: 'Check your email for account verification',
            emailVerified: 'You can login',
            unlock: 'Check your inbox and follow the instructions in sent email',
            passwordReset: 'Check your inbox and follow the instructions in sent email',
            verify: 'Check your inbox and follow the instructions in sent email',
            accountUnlocked: 'You can login',
            afterPasswordReset: 'You can login',
            logout: ''
        };
        this._redirectActions = [
            'emailVerified', 'accountUnlocked', 'afterPasswordReset', 'logout'
        ];
        this.redirects = {
            emailVerified: {
                msg: 'You will be redirected to Log in page in',
                link: '/login',
                coutDownMs: 5000,
                queryParms: null
            },
            accountUnlocked: {
                msg: 'You will be redirected to Log in page in',
                link: '/login',
                coutDownMs: 5000,
                queryParms: null
            },
            afterPasswordReset: {
                msg: 'You will be redirected to Log in page in',
                link: '/login',
                coutDownMs: 5000,
                queryParms: null
            },
            logout: {
                msg: 'You will be redirected to Home page in',
                link: '/',
                coutDownMs: 5000,
                queryParms: null
            }
        };
        this.countDown = 0;
        this._parseRoute();
    }
    _parseRoute() {
        let { email = null, action = null } = this._route.snapshot.queryParams;
        if (!action) {
            action = this._route.snapshot.data.action;
        }
        if (!action || !this.actions.includes(action)) {
            this.handyNguserService.redirectToErrPage('404');
            return;
        }
        this.email = email;
        this.action = action;
        if (this.action === 'logout') {
            this.handyNguserService.logout(true);
        }
        switch (this.action) {
            case 'emailVerified':
            case 'accountUnlocked':
            case 'afterPasswordReset':
            case 'logout':
                if (this.email) {
                    this.redirects[this.action].queryParms = { email: this.email };
                }
                break;
            default:
                break;
        }
        if (this._redirectActions.includes(action)) {
            this.startCountDown();
        }
    }
    ngOnInit() {
    }
    startCountDown() {
        this._countDownSub = this._handyNgUtilsService.countDown(this.redirects[this.action].coutDownMs, 1000).subscribe(step => {
            let { timeLeft, complete } = step;
            this.countDown = timeLeft;
            if (complete) {
                this._router.navigate([this.redirects[this.action].link], { queryParams: this.redirects[this.action].queryParms });
            }
        });
    }
    ngOnDestroy() {
        if (this._countDownSub) {
            this._countDownSub.unsubscribe();
        }
    }
}
AuthMessageComponent.ɵfac = function AuthMessageComponent_Factory(t) { return new (t || AuthMessageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgUtilsService"])); };
AuthMessageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AuthMessageComponent, selectors: [["app-auth-message"]], decls: 4, vars: 3, consts: [[4, "ngIf"]], template: function AuthMessageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AuthMessageComponent_p_2_Template, 2, 1, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AuthMessageComponent_p_3_Template, 3, 4, "p", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.headlines[ctx.action]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messages[ctx.action]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.redirects[ctx.action]);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], pipes: [_handy_ng_pipes_handy_time_pipe__WEBPACK_IMPORTED_MODULE_4__["HandyTimePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\nh1[_ngcontent-%COMP%], p[_ngcontent-%COMP%] {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9hdXRoL3BhZ2VzL2F1dGgtbWVzc2FnZS9hdXRoLW1lc3NhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0Y7O0FBQ0E7O0VBRUUsa0JBQUE7QUFFRiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvYXV0aC9wYWdlcy9hdXRoLW1lc3NhZ2UvYXV0aC1tZXNzYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbmgxLFxyXG5we1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthMessageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-auth-message',
                templateUrl: './auth-message.component.html',
                styleUrls: ['./auth-message.component.scss']
            }]
    }], function () { return [{ type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgUserService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgUtilsService"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=modules-auth-auth-module.js.map