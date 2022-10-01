/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-09-29 23:26
 */

export interface IZynError {
	code?: number,
	message?: string,
	error?: Error | any
}
