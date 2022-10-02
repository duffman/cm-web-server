/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * This software is subject to the LGPL 2.1 License, please find
 * the full license attached in LICENCE.md
 *
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { IZynLogEventData } from "../core/zyn-events";
import { ZynEventType }     from "../core/zyn-events";
import { IZynEvent }        from "../core/zyn-events";
import { IZynActionResult } from "./zyn-action-result.type";
import { IZynController }   from "./zyn-controller.type";
import { IZynError }        from "./zyn-error.type";
import { ZynMiddleware }    from "./zyn-middleware.type";

export interface IZynServer {
	setCors(path?: string): IZynServer;
	setViewEngine(name: string): IZynServer;
	setStaticRoot(rootPath: string): IZynServer;
	addStaticPathAlias(alias: string, path: string): IZynServer;
	registerMiddleware(middleware: ZynMiddleware): IZynServer;
	registerController(controller: IZynController): IZynServer;
	registerControllers(controllers: IZynController[]): IZynServer;
	utilizeMultiCoreCPU(value?: boolean): IZynServer;
	onError(eventHandler: (event: IZynError) => void): IZynServer;
	onLog(eventHandler: (event: IZynLogEventData) => void): IZynServer;
	start(host: string, port: any): Promise<IZynActionResult>;
}
