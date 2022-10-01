"use strict";
/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynPathUtils = void 0;
var ZynPathUtils = /** @class */ (function () {
    function ZynPathUtils() {
    }
    /**
     * Remove all trailing and leading slashes
     * @param {string} value
     * @returns {string}
     */
    ZynPathUtils.stripTrailingAndLeadingSlashes = function (value) {
        value = ZynPathUtils.stripLeadingSlashes(value);
        return ZynPathUtils.stripTrailingSlashes(value);
    };
    /**
     * Ensure that the given path ends with a /
     * @param {string} value
     * @returns {string}
     */
    ZynPathUtils.ensureTrailingSlash = function (value) {
        return ZynPathUtils.stripTrailingSlashes(value) + "/";
    };
    /**
     * Remove all trailing slashes
     * @param {string} value
     * @returns {string}
     */
    ZynPathUtils.stripTrailingSlashes = function (value) {
        return value.replace(/\/+$/, '');
    };
    /**
     * Remove all leading slashes
     * @param {string} value
     * @returns {string}
     */
    ZynPathUtils.stripLeadingSlashes = function (value) {
        return value.replace(/^\/+/g, '');
    };
    return ZynPathUtils;
}());
exports.ZynPathUtils = ZynPathUtils;
//# sourceMappingURL=zyn-path.utils.js.map