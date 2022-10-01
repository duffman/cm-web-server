/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { IZynActionResult }       from "../types/zyn-action-result.type";
import { ZynapticHttpStatusCode } from "../types/zyn-http-status.type";
import { Response }               from "express";
import { injectable }             from "tsyringe";

@injectable()
export class ZynControllerHelper {
	public sendActionResult(resp: Response, actionRes: IZynActionResult) {
		if (actionRes.success) {
			resp.status(200);
			resp.json(actionRes);
		}
		else {
			resp.json(
				{
					error: actionRes?.error?.code
				}
			);
		}
	}

	protected async send(resp: Response, statusCode: ZynapticHttpStatusCode, data?: any) {
	}

	protected async notFound(resp: Response): Promise<void> {

	}
}
