/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-08 00:34
 */

import { ZynErrorType } from "./zyn-error.type";
import { IZynError }    from "./zyn-error.type";

export default class ZynError extends Error implements IZynError {
	public errorType = ZynErrorType.Unknown;

	constructor(public message: string, public code?: number, public err?: Error) {
		super(message);
	}

	public static internalError(): ZynError {
		return new ZynError("_INTERNAL_ERROR_", 715);
	}

	public setType(errorType: ZynErrorType): ZynError {
		this.errorType = errorType;
		return this;
	}

	public throw(): void {
		throw this;
	}

	public toJsonStr(): string {
		return JSON.stringify(
			{
				errorType: this.errorType,
				message  : this.message,
				code     : this.code,
				error    : this.err
			}
		)
	}
}
