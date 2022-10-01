/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { ZynRouterCore } from "../core/zyn-router-core";

export interface IMeController {
	baseRoute?: string;
	initRoutes(routes: ZynRouterCore): Promise<void>;
}
