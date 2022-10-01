"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynActionResult = void 0;
var ZynActionResult = /** @class */ (function () {
    function ZynActionResult(success, data, error) {
        if (success === void 0) { success = false; }
        this.success = success;
        this.data = data;
        this.error = error;
    }
    ZynActionResult.prototype.setMessage = function (value) {
        throw new Error("Method not implemented.");
    };
    ZynActionResult.prototype.setSuccess = function (value) {
        if (value === void 0) { value = true; }
        this.success = value;
        return this;
    };
    ZynActionResult.prototype.setData = function (data) {
        this.data = data;
        return this;
    };
    ZynActionResult.prototype.setError = function (message, code, error) {
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
    ZynActionResult.new = function (value) {
        return new ZynActionResult(value);
    };
    return ZynActionResult;
}());
exports.ZynActionResult = ZynActionResult;
//# sourceMappingURL=zyn-action-result.js.map