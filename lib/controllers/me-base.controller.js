"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-09-27 11:57
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeBaseController = void 0;
var MeBaseController = /** @class */ (function () {
    function MeBaseController() {
        this._baseRoute = "";
    }
    Object.defineProperty(MeBaseController.prototype, "baseRoute", {
        get: function () {
            return this._baseRoute;
        },
        set: function (value) {
            this._baseRoute = value;
        },
        enumerable: false,
        configurable: true
    });
    MeBaseController.prototype.initRoutes = function (routes) {
        return Promise.resolve(undefined);
    };
    MeBaseController.prototype.sendActionResult = function (resp, actionRes) {
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
    MeBaseController.prototype.sendError = function (resp, error) {
        resp.status(400);
        resp.json({
            success: false,
            error: error
        });
    };
    return MeBaseController;
}());
exports.MeBaseController = MeBaseController;
//# sourceMappingURL=me-base.controller.js.map