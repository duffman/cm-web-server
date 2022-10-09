/**
 * Copyright (c) 2022 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export {};

declare global {
	namespace Express {
		export interface Request {
			paramData: Map<string, any>;
			getParam<T>(name: string, def?: T): T;
			getParamStr(name: string, def?: string): string;
			setParamData(name: string, value: any): void;
			validateParams(): IValidationResult;
		}
	}
}
