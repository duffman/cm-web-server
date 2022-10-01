"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-09-27 11:57
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynBaseController = void 0;
var ZynBaseController = /** @class */ (function () {
    function ZynBaseController() {
        this._baseRoute = "";
    }
    Object.defineProperty(ZynBaseController.prototype, "baseRoute", {
        get: function () {
            return this._baseRoute;
        },
        set: function (value) {
            this._baseRoute = value;
        },
        enumerable: false,
        configurable: true
    });
    ZynBaseController.prototype.initRoutes = function (routes) {
        return Promise.resolve(undefined);
    };
    ZynBaseController.prototype.sendActionResult = function (resp, actionRes) {
        var _a;
        if (actionRes.success) {
            resp.status(200);
            resp.json(actionRes);
        }
        else {
            resp.json({
                error: (_a = actionRes === null || actionRes === void 0 ? void 0 : actionRes.error) === null || _a === void 0 ? void 0 : _a.code
            });
        }
    };
    ZynBaseController.prototype.sendError = function (resp, error) {
        resp.status(400);
        resp.json({
            success: false,
            error: error
        });
    };
    return ZynBaseController;
}());
exports.ZynBaseController = ZynBaseController;
//# sourceMappingURL=zyn-base.controller.js.map