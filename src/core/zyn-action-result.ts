/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>

 */
import { IZynError }        from "../types/zyn-error.type";
import { IZynActionResult } from "../types/zyn-action-result.type";

export class ZynActionResult<T = void> implements IZynActionResult<T> {
	message: string;

	constructor(
		public success: boolean = false,
		public data?: T,
		public error?: IZynError,
	) {}

    public setMessage(value: string): IZynActionResult<T> {
        this.message = value;
        return this;
    }

	public setSuccess(value: boolean = true): IZynActionResult<T> {
		this.success = value;
		return this;
	}

	public setData(data: T): IZynActionResult<T> {
		this.data = data;
		return this;
	}

	public setError(message: string, code: number = -1, error?: any): IZynActionResult<T> {
		this.error = {
			code   : code,
			message: message,
			error  : error
		}

		return this;
	}

	/**
	 * Initialize action result object
	 * @param {boolean} value
	 * @returns {ActionResult<T>}
	 * @constructor
	 */
	public static new<T = void>(value?: boolean): ZynActionResult<T> {
		return new ZynActionResult<T>(value);
	}
}
