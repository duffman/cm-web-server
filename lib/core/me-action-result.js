"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeActionResult = void 0;
var MeActionResult = /** @class */ (function () {
    function MeActionResult(success, data, error) {
        if (success === void 0) { success = false; }
        this.success = success;
        this.data = data;
        this.error = error;
    }
    MeActionResult.prototype.setMessage = function (value) {
        this.message = value;
        return this;
    };
    MeActionResult.prototype.setSuccess = function (value) {
        if (value === void 0) { value = true; }
        this.success = value;
        return this;
    };
    MeActionResult.prototype.setData = function (data) {
        this.data = data;
        return this;
    };
    MeActionResult.prototype.setError = function (message, code, error) {
        if (code === void 0) { code = -1; }
        this.error = {
            code: code,
            message: message,
            error: error
        };
        return this;
    };
    /**
     * Initialize action result object
     * @param {boolean} value
     * @returns {ActionResult<T>}
     * @constructor
     */
    MeActionResult.new = function (value) {
        return new MeActionResult(value);
    };
    return MeActionResult;
}());
exports.MeActionResult = MeActionResult;
//# sourceMappingURL=me-action-result.js.map