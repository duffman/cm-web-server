/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-09-28 10:49
 */

import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 }                    from "uuid";

export const zynLoggerMiddleware = (req: Request, resp: Response, next: NextFunction) => {
	const id  = uuidv4();
	const now = new Date();

	function blue(value: string): string {
		return value
	}

	function blueBright(value: string): string {
		return value
	}

	function green(value: string): string {
		return value
	}

	function red(value: string): string {
		return value
	}

	const getProcessingTimeInMS = (time: [ number, number ]): string => {
		return `${ ( time[ 0 ] * 1000 + time[ 1 ] / 1e6 ).toFixed(2) }ms`;
	}

	const timestamp = [
		now.getMonth() + 1,
		"-",
		now.getDate(),
		"-",
		now.getDay(),
		" ",
		now.getHours(),
		":",
		now.getMinutes(),
		":",
		now.getSeconds(),
	].join("");

	// get api endpoint
	let { method, url } = req;
	url                 = decodeURI(url);

	// log start of the execution process
	const start         = process.hrtime();
	const startText     = green(`START:${ getProcessingTimeInMS(start) }`);
	const idText        = blue(`[${ id }]`);
	const timeStampText = blueBright(`[${ timestamp }]`);
	console.log(`${ idText }${ timeStampText } ${ method }:${ url } ${ startText }`);

	// trigger once a response is sent to the client
	resp.once("finish", () => {
		// log end of the execution process
		const end     = process.hrtime(start);
		const endText = red(`END:${ getProcessingTimeInMS(end) }`);
		console.log(`${ idText }${ timeStampText } ${ method }:${ url } ${ resp.statusCode } ${ endText }`);
	});

	next();
}
