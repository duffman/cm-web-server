/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { Router }         from "express";
import path               from "path";
import { singleton }      from "tsyringe";
import { IZynRouteInfo }  from "../types";
import { ZynRouteMethod } from "../types";
import { IZynController } from "../types";
import { ZynPathUtils }   from "../utils/zyn-path.utils";

@singleton()
export class ZynRouterCore {
	router: Router;
	routesInfo                    = new Array<IZynRouteInfo>();
	absoluteBaseUrl: string;
	private parent: any;
	private routeBasePath: string = undefined;

	constructor() {
	}

	public get basePath(): string {
		return this.routeBasePath;
	}

	/**
	 * Set the BASE_PATH/ of the currently assigned controller
	 * @param {string} value
	 */
	public set basePath(value: string) {
		value              = ZynPathUtils.stripTrailingAndLeadingSlashes(value);
		this.routeBasePath = `/${ path }/`;
	}

	/**
	 * Set the servers absolute url to allow
	 * links to appear when listing paths
	 * @param {string} absUrl
	 */
	public setSetAbsoluteBaseUrl(absUrl: string): void {
		this.absoluteBaseUrl = ZynPathUtils.stripTrailingSlashes(absUrl);
	}

	public setRouter(router: Router): void {
		this.router = router;
	}

	public assignController(parent: IZynController): void {
		this.parent = parent;
	}

	public get(route: string, func: Function): boolean {
		return this.registerRoute(ZynRouteMethod.Get, route, func);
	}

	public post(route: string, func: Function): boolean {
		return this.registerRoute(ZynRouteMethod.Get, route, func);
	}

	public delete(route: string, func: Function): boolean {
		return this.registerRoute(ZynRouteMethod.Delete, route, func);
	}

	public all(route: string, func: Function): boolean {
		return this.registerRoute(ZynRouteMethod.Any, route, func);
	}

	public registerRoute(method: ZynRouteMethod, route: string, func: Function): boolean {
		if (!this.router) {
			throw new Error("No router Assigned");
		}

		if (!this.parent) {
			throw new Error("No parent Assigned");
		}

		if (this.basePath) {
			route = this.basePath + path;
		}

		if (!route.startsWith("/")) route = "/" + route;

		this.addRouteInfo(method, route);

		try {
			switch (method) {
				case ZynRouteMethod.Get:
					this.router.get(route, func.bind(this.parent));
					break;

				case ZynRouteMethod.Post:
					this.router.post(route, func.bind(this.parent));
					break;

				case ZynRouteMethod.Delete:
					this.router.delete(route, func.bind(this.parent));
					break;

				case ZynRouteMethod.Any:
					this.router.all(route, func.bind(this.parent));
					break;
			}
		}
		catch (e) {
			return false;
		}
		return true;
	}

	public showInfo(): void {
		let routeInfoTable = [];

		for (let info of this.routesInfo) {
			const baseUrl = !this.absoluteBaseUrl
							? `http://${ process.env.WI_HOST ?? "localhost" }:${ process.env.WI_PORT }`
							: this.absoluteBaseUrl;

			routeInfoTable.push(
				{
					controller: info.controllerName,
					method    : info.method,
					route     : info.fullroute,
					url       : `${ baseUrl }${ info.fullroute }`
				}
			)
		}

		console.table(routeInfoTable);
	}

	private addRouteInfo(method: ZynRouteMethod, route: string): void {
		const name = this.parent.constructor.name;

		this.routesInfo.push(
			{
				controllerName: name,
				method        : method,
				fullroute     : route
			}
		);
	}

}
