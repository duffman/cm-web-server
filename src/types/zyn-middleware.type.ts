/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { NextFunction } from "express";
import { Request }      from "express";
import { Response }     from "express";

export type ZynMiddleware = (req: Request, resp: Response, next: NextFunction) => Promise<void>;
