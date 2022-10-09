/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-09-29 23:26
 */

export enum ZynErrorType {
	InternalError,
	ParserError,
	Unknown
}

export interface IZynError {
	errorType?: ZynErrorType;
	code?: number;
	message?: string;
	error?: Error | any;
}
