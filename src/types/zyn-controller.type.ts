/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * This software is subject to the LGPL 2.1 License, please find
 * the full license attached in LICENCE.md
 *
 * @date: 2022-10-07
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { ZynRouterCore } from "../core/zyn-router-core";

export interface IZynController {
	baseRoute?: string;
	initRoutes(routes: ZynRouterCore): Promise<void>;
}
