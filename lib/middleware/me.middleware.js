"use strict";
/**
 * Copyright (c) 2022 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.meMiddleware = void 0;
function meMiddleware(req, resp, next) {
    console.log("".concat(req.method, " ").concat(req.path));
    resp.setHeader('x-powered-by', 'Zynaptic');
    next();
}
exports.meMiddleware = meMiddleware;
//# sourceMappingURL=me.middleware.js.map