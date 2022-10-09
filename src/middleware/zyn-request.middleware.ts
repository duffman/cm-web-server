/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { NextFunction } from "express";
import { Response }     from "express";
import { Request }      from "express";

export const zynRequestMiddleware = (req: Request, resp: Response, next: NextFunction) => {
	resp.setHeader('x-powered-by', 'Zynaptic')

	req.paramData = new Map<string, any>();

	if (req.params) {
		for (const param in req.params) {
			if (req.params.hasOwnProperty(param))
				req.paramData.set(param, req.params[ param ]);
		}
	}

	if (req.query) {
		for (const param in req.query) {
			if (req.query.hasOwnProperty(param))
				req.paramData.set(param, req.query[ param ]);
		}
	}

	req.getParam = function <T>(name: string, def?: T): T {
		return req.paramData.get(name) as T ?? def;
	}

	req.getParamStr = function(name: string, def?: string): string {
		return req.getParam<string>(name, def);
	}

	req.setParamData = function(key: string, value: any): void {
		req.paramData.set(key, value)
	}

	next();
}
