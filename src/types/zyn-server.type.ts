/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import express              from "express";
import { IZynActionResult } from "./zyn-action-result.type";
import { IMeController } from "./zyn-controller.type";
import { ZynMiddleware } from "./zyn-middleware.type";

export interface IZynServer {
	setCors(path: string): IZynServer;
	setViewEngine(name: string): IZynServer;
	setStaticRoot(rootPath: string): IZynServer;
	setStaticAlias(alias: string, path: string): IZynServer;
	registerMiddleware(middleware: ZynMiddleware): IZynServer;
	registerController(controller: IMeController): IZynServer;
	registerControllers(controllers: IMeController[]): IZynServer;
	start(host: string, port: any): Promise<IZynActionResult>;
}
