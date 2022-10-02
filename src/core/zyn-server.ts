/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * This software is subject to the LGPL 2.1 License, please find
 * the full license attached in LICENCE.md
 *
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import EventEmitter             from "events";
import os, { CpuInfo }          from 'os';
import cluster, { Worker }      from 'cluster';
import { singleton }            from "tsyringe";
import { IZynError }            from "../types/zyn-error.type";
import { ZynActionResult }      from "./zyn-action-result";
import { IZynEventData }        from "./zyn-events";
import { IZynLogEventData }     from "./zyn-events";
import { ZynEventType }         from "./zyn-events";
import { ZynEventHandler }      from "./zyn-events";
import { IZynEvent }            from "./zyn-events";
import { ZynEventEmitter }      from "./zyn-events";
import { ZynRouterCore }        from "./zyn-router-core";
import { zynMiddleware }        from "../middleware/zyn.middleware";
import { zynRequestMiddleware } from "../middleware/zyn-request.middleware";
import { IZynController }       from "../types/zyn-controller.type";
import { ZynMiddleware }        from "../types/zyn-middleware.type";
import { IZynServer }           from "../types/zyn-server.type";
import * as bodyParser          from "body-parser";
import { Router }               from "express";
import express                  from "express";
import cors                     from "cors";

@singleton()
export class ZynServer extends EventEmitter implements IZynServer {
	serverApp: express.Application;
	server: any;
	webRoutes   = Router();
	controllers = new Array<IZynController>();

	private eventEmitter = new EventEmitter({
		captureRejections: false,
	});

	constructor(
		private routerCore: ZynRouterCore
	) {
		super();
		this.serverApp = express();
		this.serverApp.disable('x-powered-by');
		this.serverApp.use(zynMiddleware);
		this.serverApp.use(zynRequestMiddleware);
		this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
		this.serverApp.use(this.webRoutes);

		routerCore.setRouter(this.webRoutes);
	}

	public onError(eventHandler: (event: IZynError) => void): IZynServer {
		super.on(ZynEventType.Error, eventHandler);
		return this;
	}

	public onLog(eventHandler: (event: IZynLogEventData) => void): IZynServer {
		super.on(ZynEventType.Log, eventHandler);
		return this;
	}

	public onData(eventHandler: (event: IZynEventData) => void): IZynServer {
		super.on(ZynEventType.Data, eventHandler);
		return this;
	}

	public testEvent() {
		this.emit(ZynEventType.Log, "balle", "kalle", "skalle");
		this.emit(ZynEventType.Log, "balle", "kalle", "skalle");
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

	/**
	 * Assign root path for static assets
	 * @param {string} rootPath
	 * @returns {IZynServer}
	 */
	public setStaticRoot(rootPath: string): IZynServer {
		this.serverApp.use(express.static(rootPath));
		return this;
	}

	/**
	 * Add Static Path Alias (e.g "
	 * @param {string} alias
	 * @param {string} path
	 * @returns {IZynServer}
	 */
	public addStaticPathAlias(alias: string, path: string): IZynServer {
		this.serverApp.use(express.static('template'));
		this.serverApp.use(alias, express.static(path));
		return this;
	}

	public registerMiddleware(middleware: ZynMiddleware): IZynServer {
		this.serverApp.use(middleware);
		return this;
	}

	public registerController(controller: IZynController): IZynServer {
		try {
			this.routerCore.assignParent(controller);
			controller.initRoutes(this.routerCore);

			this.controllers.push(controller);
		}
		catch (e) {
			console.error("Failed to register ZynapticController ::", e);
		}

		return this;
	}

	/**
	 * Register multiple controllers
	 * @param {IZynController[]} controllers
	 */
	public registerControllers(controllers: IZynController[]): IZynServer {
		for (const controller of controllers) {
			this.registerController(controller);
		}

		return this;
	}

	public utilizeMultiCoreCPU(value?: boolean): IZynServer {
		this.emit(ZynEventType.Log, "BALLE");
		return this;
		var cluster = require('cluster');
		var http    = require('http');

		const cpuCores: CpuInfo = require('os').cpus();

		if (cluster.isPrimary) {
			for (let coreIndex in cpuCores) {
				const cpuCore = cpuCores[coreIndex];
				cluster.fork();
			}

			cluster.on('exit', (worker, code, signal) => {
				this.emit("eventType", 0);
			});
		}
		else {
			// Workers can share any TCP connection
			// In this case its a HTTP server
			http.createServer(function(req, res) {
				res.writeHead(200);
				res.end("hello world\n");
			}).listen(8000);
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
			this.server       = await this.serverApp.listen(port, host);
			result.setSuccess().setMessage(`ZynServer is listening on :: "${ host }:${ port }"`);
		}
		catch (err) {
			result.setSuccess(false)
				  .setError(`ZynServer bind failed on "${ host }:${ port }"`, err)
		}

		return result;
	}
}
