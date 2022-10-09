/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * This software is subject to the LGPL 2.1 License, please find
 * the full license attached in LICENCE.md
 *
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import * as bodyParser          from "body-parser";
import cors                     from "cors";
import EventEmitter             from "events";
import { Express }              from "express";
import { Router }               from "express";
import express                  from "express";
import { Server }               from "net";
import { CpuInfo }              from 'os';
import { singleton }            from "tsyringe";
import { zynMiddleware }        from "../middleware";
import { zynRequestMiddleware } from "../middleware";
import { IZynError }            from "../types";
import { IZynController }       from "../types";
import { ZynMiddleware }        from "../types";
import { IZynServer }           from "../types";
import ZynError                 from "../types/zyn-error";
import { ZynErrorType }         from "../types/zyn-error.type";
import { ZynActionResult }      from "./zyn-action-result";
import { IZynEventData }        from "./zyn-events";
import { IZynLogEventData }     from "./zyn-events";
import { ZynEventType }         from "./zyn-events";
import { ZynRouterCore }        from "./zyn-router-core";

@singleton()
export class ZynServer extends EventEmitter implements IZynServer {
	protected serverApp: express.Application;
	protected server: Server;
	protected webRoutes   = Router();
	//routerCores = new Map<>();
	protected controllers = new Array<IZynController>();
	protected eventEmitter = new EventEmitter(
		{
			captureRejections: false,
		}
	);

	public useAccessLog?: boolean;

	constructor(
		protected routerCore?: ZynRouterCore
	) {
		super();

		this.serverApp = this.createServer();

		/*
		 this.serverApp = express();
		 this.serverApp.disable('x-powered-by');
		 this.serverApp.use(zynMiddleware);
		 this.serverApp.use(zynRequestMiddleware);
		 this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
		 this.serverApp.use(this.webRoutes);
		 routerCore.setRouter(this.webRoutes);
		 */
	}

	private createServer(): Express {
		if (!this.routerCore) {
			new ZynError("No RouterCore have been assigned.")
				.setType(ZynErrorType.InternalError).throw();
		}

		let server = express();
		server.disable('x-powered-by');
		server.use(zynRequestMiddleware);
		server.use(bodyParser.urlencoded({ extended: true }));
		server.use(this.webRoutes);
		this.routerCore.setRouter(this.webRoutes);

		return server;
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

	public enableAccessLogger(): IZynServer {
		this.useAccessLog = true;
		this.serverApp.use(zynMiddleware);
		return this;
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
			this.routerCore.assignController(controller);
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
		this.emit(ZynEventType.Log, "utilizeMultiCoreCPU");
		const cluster = require('cluster');
		const http    = require('http');

		const cpuCores: CpuInfo = require('os').cpus();

		if (cluster.isPrimary) {
			for (let coreIndex in cpuCores) {
				const cpuCore = cpuCores[ coreIndex ];
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
			this.server       = this.serverApp.listen(port, host);
			result.setSuccess().setMessage(`ZynServer is listening on :: "${ host }:${ port }"`);
		}
		catch (err) {
			result.setSuccess(false)
				  .setError(`ZynServer bind failed on "${ host }:${ port }"`, err)
		}

		return result;
	}
}
