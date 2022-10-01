/**
 * Copyright (c) 2022 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NextFunction } from "express";
import { Response }     from "express";
import { Request }      from "express";

export function zynMiddleware(req: Request, resp: Response, next: NextFunction) {
	console.log(`${req.method} ${req.path}`);
	resp.setHeader('x-powered-by', 'Zynaptic')
	next();
}
