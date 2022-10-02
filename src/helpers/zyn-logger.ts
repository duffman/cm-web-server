/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-02 04:11
 */

import EventEmitter  from "events";
import { singleton } from "tsyringe";

//@singleton()
export class ZynLogger extends EventEmitter {
	constructor() {
		super();
		this.emit('ready');
	}
}
