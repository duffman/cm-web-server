import EventEmitter     from "events";
import { NextFunction } from "express";
import { Response }     from "express";
import { Request }      from "express";
import { IZynError }    from "../types/zyn-error.type";

/*
 interface SignalBindingAsync<S, T> {
 listener?: string;
 handler: (source: S, data: T) => Promise<void>;
 }

 interface IAsyncSignal<S,T> {
 bind(listener: string, handler: (source: S, data: T) => Promise<void>): void;
 unbind(listener: string): void;
 }

 class AsyncSignal<S, T> implements IAsyncSignal<S,T> {
 private handlers: Array<SignalBindingAsync<S, T>> = [];

 public bind(
 listener: string,
 handler: (source: S, data: T) => Promise<void>,
 ): void {
 if (this.contains(listener)) {
 this.unbind(listener);
 }
 this.handlers.push({ listener, handler });
 }

 public unbind(listener: string): void {
 this.handlers = this.handlers.filter(h => h.listener !== listener);
 }

 public async trigger(source: S, data: T): Promise<void> {
 // Duplicate the array to avoid side effects during iteration.
 this.handlers.slice(0).map(h => h.handler(source, data));
 }

 public async triggerAwait(source: S, data: T): Promise<void> {
 // Duplicate the array to avoid side effects during iteration.
 const promises = this.handlers.slice(0).map(h => h.handler(source, data));
 await Promise.all(promises);
 }

 public contains(listener: string): boolean {
 return _.some(this.handlers, h => h.listener === listener);
 }

 public expose(): IAsyncSignal<S,T> {
 return this
 }
 }

 class Dog {
 private readonly onBark = new AsyncSignal<Dog, string>();

 constructor(readonly name: string) {}

 public get BarkEvent(): IAsyncSignal<Dog, string> {
 return this.onBark.expose();
 }

 public sayWof() {
 this.onBark.trigger(this, "WOF!");
 }

 public sayAnything(message: string) {
 this.onBark.trigger(this, message);
 }
 }

 class DogListener {

 constructor(dog: Dog) {
 let dogBarkHandler = async (s: Dog, bark: string) => {
 console.log(`Listener: Dog "${dog.name}" barked: ${bark}`);
 return;
 }

 dog.BarkEvent.bind("dogBark", dogBarkHandler);

 // NOW I MAKE THE DOG BARK!
 // This cannot compile!
 // dog.BarkEvent.trigger(dog, "FAKE WOOF!")
 }

 }
 */

/*
 const apollo = new Dog("Apollo");
 const apolloListener = new DogListener(apollo);
 apollo.sayWof();
 */

/*
 type EventMap = Record<string, any>;

 type EventKey<T extends EventMap> = string & keyof T;
 type EventReceiver<T> = (params: T) => void;

 interface Emitter<T extends EventMap> {
 on<K extends EventKey<T>>
 (eventName: K, fn: EventReceiver<T[K]>): void;
 off<K extends EventKey<T>>
 (eventName: K, fn: EventReceiver<T[K]>): void;
 emit<K extends EventKey<T>>
 (eventName: K, params: T[K]): void;
 }

 export class ZynEventEmitter<T extends EventMap> implements Emitter<T> {
 private emitter = new EventEmitter();
 on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
 this.emitter.on(eventName, fn);
 }

 off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
 this.emitter.off(eventName, fn);
 }

 emit<K extends EventKey<T>>(eventName: K, params: T[K]) {
 this.emitter.emit(eventName, params);
 }
 }
 */

export enum ZynEventType {
	Log   = "log",
	Error = "error",
	Data  = "Data"
}

export enum ZynLogEventType {
	Info      = "info",
	Warning   = "warn",
	Error     = "error",
	Fatal     = "fatal",
	Debug     = "debug",
	Verbose   = "verbose",
}

export interface IZynEvent<T = any> {
	type: ZynEventType
	time?: number;
	source?: any;
	data: IZynEventData<T>;

	emit(event: IZynEvent<T>): void;
}

export interface IZynEventError extends IZynError {
	error?: IZynEventError;
}

export class ZynEvent<T> implements IZynEvent<T> {
	public time: number = Date.now();
	public source?: any = this;

	constructor(
		protected emitter: ZynEventEmitter,
		public type: ZynEventType,
		public data: IZynEventData<T>
	) { }

	public emit(event): void {
		if (!this.emitter) {
			throw new Error("ERROR :: ZynEvent :: No emitter assigned");
		}

		this.emitter.emit(this.type, this);
	}
}

export type ZynEventHandler = (event: IZynEvent) => void;


export interface IZynEventData<T = any> {
	data: T
}

//

export interface IZynLogEventData extends IZynEventData {
	logType: ZynLogEventType;
	message: string;
}

export class ZynLogEvent extends ZynEvent<IZynLogEventData> implements IZynEvent<IZynLogEventData> {
	public type = ZynEventType.Log;

	constructor(
		protected emitter: ZynEventEmitter,
		public data: IZynLogEventData,
	) {
		super(emitter, ZynEventType.Log, data);
	}

	public emit(): void {
		super.emit(this);
	}
}


//

export class ZynEventEmitter extends EventEmitter {
	constructor() {
		super();
	}


	/**
	 * Overriding the inherited emit method,
	 * restricting it to eventName and event
	 * @param {string} eventName - The name of the event
	 * @param {IZynEvent} event - The event data object
	 * @returns {boolean} - Result of the event emit
	 */
	public emit<T>(eventName: string, event: IZynEvent<T>): boolean {
		return super.emit(eventName, event);
	}

	public triggerLogEvent(logEventType: ZynLogEventType, logEventMessage: string) {
		let event: ZynLogEvent = new ZynLogEvent(this, {
			logType: logEventType,
			message: logEventMessage,
			data: undefined
		});
	}
}
