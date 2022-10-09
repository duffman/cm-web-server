/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-07 10:17
 */

export enum ZynContentType {
	appIgniter = "application/json+igniter",
	textHtml   = "text/html",
	appJson    = "text/html",
	appJs      = "application/javascript"
}

export interface ZynAction {
	method: string,
	path: string,
	contentType?: ZynContentType,
	md5Checksum?: boolean			// Insert a Content-MD5 header (RFC 1864)
}

export class Class {

	@ZynAction(
		{
			method: "Get",
			path  : "/olle"
		}
	)
	public index() {

	}

}

function ZynAction(zynAction: ZynAction) {
	return function(
		target: Object,
		key: string | symbol,
		descriptor: PropertyDescriptor
	) {
		var classConstructor = target.constructor;
		console.log('property target: ', classConstructor);

		const childFunction = descriptor.value;
		descriptor.value    = (...args: any[]) => {
		};
		return descriptor;
	}
}

/*
 function injectable<T>(): (target: constructor<T>) => void {
 return function(target: constructor<T>): void {
 typeInfo.set(target, getParamInfo(target));
 };
 }

 export default injectable;
 */
