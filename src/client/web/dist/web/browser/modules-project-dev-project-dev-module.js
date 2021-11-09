(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-project-dev-project-dev-module"],{

/***/ "./src/app/modules/project-dev/project-dev-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/modules/project-dev/project-dev-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: ProjectDevRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectDevRoutingModule", function() { return ProjectDevRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _project_dev_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-dev.component */ "./src/app/modules/project-dev/project-dev.component.ts");





const routes = [
    {
        path: '',
        component: _project_dev_component__WEBPACK_IMPORTED_MODULE_2__["ProjectDevComponent"],
    }
];
class ProjectDevRoutingModule {
}
ProjectDevRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ProjectDevRoutingModule });
ProjectDevRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ProjectDevRoutingModule_Factory(t) { return new (t || ProjectDevRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ProjectDevRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectDevRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/project-dev/project-dev.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/modules/project-dev/project-dev.component.ts ***!
  \**************************************************************/
/*! exports provided: ProjectDevComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectDevComponent", function() { return ProjectDevComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class ProjectDevComponent {
    constructor() { }
    ngOnInit() {
    }
}
ProjectDevComponent.ɵfac = function ProjectDevComponent_Factory(t) { return new (t || ProjectDevComponent)(); };
ProjectDevComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectDevComponent, selectors: [["app-project-dev"]], decls: 2, vars: 0, template: function ProjectDevComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "project-dev works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9wcm9qZWN0LWRldi9wcm9qZWN0LWRldi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvcHJvamVjdC1kZXYvcHJvamVjdC1kZXYuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectDevComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-project-dev',
                templateUrl: './project-dev.component.html',
                styleUrls: ['./project-dev.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/modules/project-dev/project-dev.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/modules/project-dev/project-dev.module.ts ***!
  \***********************************************************/
/*! exports provided: ProjectDevModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectDevModule", function() { return ProjectDevModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _project_dev_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-dev-routing.module */ "./src/app/modules/project-dev/project-dev-routing.module.ts");
/* harmony import */ var _project_dev_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project-dev.component */ "./src/app/modules/project-dev/project-dev.component.ts");
/* harmony import */ var _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-shared/shared.module */ "./src/app/modules/shared/shared.module.ts");






class ProjectDevModule {
}
ProjectDevModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ProjectDevModule });
ProjectDevModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ProjectDevModule_Factory(t) { return new (t || ProjectDevModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
            _project_dev_routing_module__WEBPACK_IMPORTED_MODULE_2__["ProjectDevRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ProjectDevModule, { declarations: [_project_dev_component__WEBPACK_IMPORTED_MODULE_3__["ProjectDevComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
        _project_dev_routing_module__WEBPACK_IMPORTED_MODULE_2__["ProjectDevRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectDevModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_project_dev_component__WEBPACK_IMPORTED_MODULE_3__["ProjectDevComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _ng_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                    _project_dev_routing_module__WEBPACK_IMPORTED_MODULE_2__["ProjectDevRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=modules-project-dev-project-dev-module.js.map