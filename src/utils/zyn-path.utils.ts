/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

export class ZynPathUtils {
	/**
	 * Remove all trailing and leading slashes
	 * @param {string} value
	 * @returns {string}
	 */
	public static stripTrailingAndLeadingSlashes(value: string): string {
		value = ZynPathUtils.stripLeadingSlashes(value);
		return ZynPathUtils.stripTrailingSlashes(value);
	}

	/**
	 * Ensure that the given path ends with a /
	 * @param {string} value
	 * @returns {string}
	 */
	public static ensureTrailingSlash(value: string): string {
		return ZynPathUtils.stripTrailingSlashes(value) + "/";
	}

	/**
	 * Remove all trailing slashes
	 * @param {string} value
	 * @returns {string}
	 */
	public static stripTrailingSlashes(value: string): string {
		return value.replace(/\/+$/, '');
	}

	/**
	 * Remove all leading slashes
	 * @param {string} value
	 * @returns {string}
	 */
	public static stripLeadingSlashes(value: string): string {
		return value.replace(/^\/+/g, '');
	}
}
