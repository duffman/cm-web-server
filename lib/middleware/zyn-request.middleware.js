"use strict";
/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.zynRequestMiddleware = void 0;
function zynRequestMiddleware(req, response, next) {
    req.paramData = new Map();
    if (req.params) {
        for (var param in req.params) {
            if (req.params.hasOwnProperty(param))
                req.paramData.set(param, req.params[param]);
        }
    }
    if (req.query) {
        for (var param in req.query) {
            if (req.query.hasOwnProperty(param))
                req.paramData.set(param, req.query[param]);
        }
    }
    req.getParam = function (name, def) {
        var _a;
        return (_a = req.paramData.get(name)) !== null && _a !== void 0 ? _a : def;
    };
    req.getParamStr = function (name, def) {
        return req.getParam(name, def);
    };
    req.setParamData = function (key, value) {
        req.paramData.set(key, value);
    };
    next();
}
exports.zynRequestMiddleware = zynRequestMiddleware;
//# sourceMappingURL=zyn-request.middleware.js.map