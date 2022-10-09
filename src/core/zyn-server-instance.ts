/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * This software is subject to the LGPL 2.1 License, please find
 * the full license attached in LICENCE.md
 *
 * @desc: Singleton implementation for use without depencency-injection
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-08 00:21
 */

import { ZynRouterCore } from "./zyn-router-core";
import { ZynServer }     from "./zyn-server";

export class ZynServerInstance extends ZynServer {
	protected static instance: ZynServerInstance;

	private constructor() {
		super();

		this.routerCore = new ZynRouterCore();

		console.log("constructor called!");
	}

	public static getInstance(): ZynServerInstance {
		if (!ZynServerInstance.instance) {
			ZynServerInstance.instance = new ZynServerInstance();
		}

		return ZynServerInstance.instance;
	}

	public logic() {
		console.log("my logic!");
	}
}

