/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-09-27 11:57
 */

import { Response }         from "express";
import { ZynRouterCore }    from "../core/zyn-router-core";
import { IZynActionResult } from "../types/zyn-action-result.type";
import { IZynController }   from "../types/zyn-controller.type";

export abstract class ZynBaseController implements IZynController {
	private _baseRoute: string = "";

	public get baseRoute(): string {
		return this._baseRoute;
	}

	public set baseRoute(value: string) {
		this._baseRoute = value;
	}

	public initRoutes(routes: ZynRouterCore): Promise<void> {
		return Promise.resolve(undefined);
	}

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

	public sendError(resp: Response, error?: any) {
		resp.status(400);
		resp.json(
			{
				success: false,
				error  : error
			}
		);
	}
}

