/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { IZynError } from "./zyn-error.type";

export interface IZynActionResult<T = void> {
	success: boolean;
	message: string;
	data?: T;
	error?: IZynError | undefined;

	setSuccess(value: boolean): IZynActionResult<T>;
	setMessage(value: string): IZynActionResult<T>;
	setData(data: any): IZynActionResult<T>;
	setError(message: string, error: any, code?: number): IZynActionResult<T>;
}
