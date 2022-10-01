"use strict";
/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MePathUtils = void 0;
var MePathUtils = /** @class */ (function () {
    function MePathUtils() {
    }
    /**
     * Remove all trailing and leading slashes
     * @param {string} value
     * @returns {string}
     */
    MePathUtils.stripTrailingAndLeadingSlashes = function (value) {
        value = MePathUtils.stripLeadingSlashes(value);
        return MePathUtils.stripTrailingSlashes(value);
    };
    /**
     * Ensure that the given path ends with a /
     * @param {string} value
     * @returns {string}
     */
    MePathUtils.ensureTrailingSlash = function (value) {
        return MePathUtils.stripTrailingSlashes(value) + "/";
    };
    /**
     * Remove all trailing slashes
     * @param {string} value
     * @returns {string}
     */
    MePathUtils.stripTrailingSlashes = function (value) {
        return value.replace(/\/+$/, '');
    };
    /**
     * Remove all leading slashes
     * @param {string} value
     * @returns {string}
     */
    MePathUtils.stripLeadingSlashes = function (value) {
        return value.replace(/^\/+/g, '');
    };
    return MePathUtils;
}());
exports.MePathUtils = MePathUtils;
//# sourceMappingURL=me-path.utils.js.map