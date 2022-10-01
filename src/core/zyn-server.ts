/**
 * Copyright (c) 2022 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { singleton }       from "tsyringe";
import { ZynActionResult } from "./zyn-action-result";
import { ZynRouterCore }       from "./zyn-router-core";
import { zynMiddleware }        from "../middleware/zyn.middleware";
import { zynRequestMiddleware } from "../middleware/zyn-request.middleware";
import { IMeController } from "../types/zyn-controller.type";
import { ZynMiddleware } from "../types/zyn-middleware.type";
import { IZynServer }    from "../types/zyn-server.type";
import * as bodyParser   from "body-parser";
import { Router }               from "express";
import express                  from "express";
import cors                     from "cors";

@singleton()
export class ZynServer implements IZynServer {
	serverApp: express.Application;
	server: any;
	webRoutes   = Router();
	controllers = new Array<IMeController>();

	constructor(
		private routerCore: ZynRouterCore
	) {
		this.serverApp = express();
		this.serverApp.disable('x-powered-by');
		this.serverApp.use(zynMiddleware);
		this.serverApp.use(zynRequestMiddleware);
		this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
		this.serverApp.use(this.webRoutes);

		routerCore.setRouter(this.webRoutes);
	}

	/**
	 * Enable Cors header
	 * @param {string} path
	 * @returns {IZynServer}
	 */
	public setCors(path: string = "*"): IZynServer {
		this.webRoutes.use(cors());
		this.webRoutes.options(path, cors());
		return this;
	}

	public json(): IZynServer {
		this.webRoutes.use(bodyParser.json());
		return this;
	}

	public setViewEngine(name: string): IZynServer {
		this.serverApp.set("view engine", name);
		return this;
	}

	public setStaticRoot(rootPath: string): IZynServer {
		this.serverApp.use(express.static(rootPath));
		return this;
	}

	public setStaticAlias(alias: string, path: string): IZynServer {
		this.serverApp.use(express.static('template'));
		this.serverApp.use(alias, express.static(path));
		return this;
	}

	public registerMiddleware(middleware: ZynMiddleware): IZynServer {
		this.serverApp.use(middleware);
		return this;
	}

	public registerController(controller: IMeController): IZynServer {
		try {
			this.routerCore.assignParent(controller);
			controller.initRoutes(this.routerCore);

			this.controllers.push(controller);
		} catch (e) {
			console.error("Failed to register ZynapticController ::", e);
		}

		return this;
	}

	/**
	 * Register multiple controllers
	 * @param {IMeController[]} controllers
	 */
	public registerControllers(controllers: IMeController[]): IZynServer {
		for (const controller of controllers) {
			this.registerController(controller);
		}

		return this;
	}

	/**
	 * Start server on given host and port
	 * @param {string} host
	 * @param port
	 * @returns {Promise<ZynActionResult>}
	 */
	public async start(host: string, port: any = 80): Promise<ZynActionResult> {
		if (isNaN(port)) {
			return ZynActionResult.new().setError("Invalid port");
		}

		let result: ZynActionResult = ZynActionResult.new();

		this.routerCore.setSetAbsoluteBaseUrl(`http://${ host }:${ port }`);
		this.routerCore.showInfo();

		try {
			const hostAndPort = `${ host }:${ port }`;
			this.server = await this.serverApp.listen(port, host);
			result.setSuccess().setMessage(`ZynServer is listening on :: "${ host }:${ port }"`);
		}
		catch (err) {
			result.setSuccess(false)
				  .setError(`ZynServer bind failed on "${ host }:${ port }"`, err)
		}

		return result;
	}
}
