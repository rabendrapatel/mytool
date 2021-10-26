(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/modules/shared/form-validators/future-date.validator.ts":
/*!*************************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/future-date.validator.ts ***!
  \*************************************************************************/
/*! exports provided: futureDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "futureDate", function() { return futureDate; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class FutureDateValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value, secondsOffset = 0) {
        if (typeof value !== 'number') {
            return false;
        }
        let thisMoment = new Date().getTime() + (secondsOffset * 1000);
        return thisMoment > value;
    }
    static validate(errMsg = `This field can't be a passed date`, secondsOffset = 0) {
        return (control) => {
            let { value } = control;
            if (FutureDateValidator.emptyValueIsValid && FutureDateValidator.isEmpty(value)) {
                return null;
            }
            let invalid = FutureDateValidator.isInValidIf(value, secondsOffset);
            if (invalid) {
                return FutureDateValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const futureDate = FutureDateValidator.validate;
// import futureDate from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/modules/shared/form-validators/index.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/shared/form-validators/index.ts ***!
  \*********************************************************/
/*! exports provided: required, EmailRegex, email, PasswordValidator, password, IrlZipRegex, eirCode, irlPhoneNr, maxLength, timeSlot, futureDate, maxFiles, linkValidator, requiredOneOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/modules/handy-form/validators */ "./src/app/handy/modules/handy-form/validators/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "required", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["required"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmailRegex", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["EmailRegex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "email", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["email"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PasswordValidator", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["PasswordValidator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "password", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["password"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IrlZipRegex", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["IrlZipRegex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eirCode", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["eirCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "irlPhoneNr", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["irlPhoneNr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maxLength", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["maxLength"]; });

/* harmony import */ var _time_slot_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time-slot.validator */ "./src/app/modules/shared/form-validators/time-slot.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeSlot", function() { return _time_slot_validator__WEBPACK_IMPORTED_MODULE_1__["timeSlot"]; });

/* harmony import */ var _future_date_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./future-date.validator */ "./src/app/modules/shared/form-validators/future-date.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "futureDate", function() { return _future_date_validator__WEBPACK_IMPORTED_MODULE_2__["futureDate"]; });

/* harmony import */ var _max_files_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max-files.validator */ "./src/app/modules/shared/form-validators/max-files.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maxFiles", function() { return _max_files_validator__WEBPACK_IMPORTED_MODULE_3__["maxFiles"]; });

/* harmony import */ var _link_validator_validator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./link-validator.validator */ "./src/app/modules/shared/form-validators/link-validator.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "linkValidator", function() { return _link_validator_validator__WEBPACK_IMPORTED_MODULE_4__["linkValidator"]; });

/* harmony import */ var _required_one_of_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./required-one-of.validator */ "./src/app/modules/shared/form-validators/required-one-of.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requiredOneOf", function() { return _required_one_of_validator__WEBPACK_IMPORTED_MODULE_5__["requiredOneOf"]; });









/***/ }),

/***/ "./src/app/modules/shared/form-validators/link-validator.validator.ts":
/*!****************************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/link-validator.validator.ts ***!
  \****************************************************************************/
/*! exports provided: linkValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linkValidator", function() { return linkValidator; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class LinkValidatorValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value) {
        return !LinkValidatorValidator.reg.test(value);
    }
    static validate(errMsg = 'This field is invalid') {
        return (control) => {
            let { value } = control;
            if (LinkValidatorValidator.emptyValueIsValid && LinkValidatorValidator.isEmpty(value)) {
                return null;
            }
            let invalid = LinkValidatorValidator.isInValidIf(value);
            if (invalid) {
                return LinkValidatorValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
LinkValidatorValidator.reg = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm);
const linkValidator = LinkValidatorValidator.validate;
// import linkValidator from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/modules/shared/form-validators/max-files.validator.ts":
/*!***********************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/max-files.validator.ts ***!
  \***********************************************************************/
/*! exports provided: maxFiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maxFiles", function() { return maxFiles; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class MaxFilesValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value, maxFiles) {
        if (Array.isArray(value)) {
            return value.length > maxFiles;
        }
        return false;
    }
    static validate(maxFiles) {
        return (control) => {
            let { value } = control;
            if (MaxFilesValidator.emptyValueIsValid && MaxFilesValidator.isEmpty(value)) {
                return null;
            }
            let invalid = MaxFilesValidator.isInValidIf(value, maxFiles);
            if (invalid) {
                return MaxFilesValidator.returnError(`Max ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const maxFiles = MaxFilesValidator.validate;
// import maxFiles from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/modules/shared/form-validators/required-one-of.validator.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/required-one-of.validator.ts ***!
  \*****************************************************************************/
/*! exports provided: requiredOneOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requiredOneOf", function() { return requiredOneOf; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class RequiredOneOfValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value = {}, fields) {
        let fieldsLen = fields.length;
        for (let i = 0; i < fieldsLen; i++) {
            const fieldName = fields[i];
            let isEMpty = RequiredOneOfValidator.isEmpty(value[fieldName]);
            if (!isEMpty) {
                return false;
            }
        }
        return true;
    }
    static validate(fields = [], errMsg) {
        return (control) => {
            let { value } = control;
            if (RequiredOneOfValidator.emptyValueIsValid && RequiredOneOfValidator.isEmpty(value)) {
                return null;
            }
            let invalid = RequiredOneOfValidator.isInValidIf(value, fields);
            if (invalid) {
                return RequiredOneOfValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
RequiredOneOfValidator.emptyValueIsValid = false;
const requiredOneOf = RequiredOneOfValidator.validate;
// import requiredOnOf from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/modules/shared/form-validators/time-slot.validator.ts":
/*!***********************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/time-slot.validator.ts ***!
  \***********************************************************************/
/*! exports provided: timeSlot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeSlot", function() { return timeSlot; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class TimeSlotValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value, pairControl, thisFieldIs) {
        let otherValue = pairControl.value;
        let result = true;
        switch (thisFieldIs) {
            case 'from':
                result = (value + 1) > otherValue;
                break;
            default:
                result = (value - 1) < otherValue;
                break;
        }
        if (!pairControl.valid) {
            pairControl.updateValueAndValidity();
        }
        return result;
    }
    static validate(pairControl, thisFieldIs, errMsg = 'This field is invalid') {
        return (control) => {
            let { value } = control;
            let otherValue = pairControl.value;
            if (TimeSlotValidator.emptyValueIsValid && (TimeSlotValidator.isEmpty(value) || TimeSlotValidator.isEmpty(otherValue))) {
                return null;
            }
            let invalid = TimeSlotValidator.isInValidIf(value, pairControl, thisFieldIs);
            if (invalid) {
                return TimeSlotValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const timeSlot = TimeSlotValidator.validate;
// import timeSlot from '@ng-shared/form-validators';


/***/ })

}]);
//# sourceMappingURL=common.js.map