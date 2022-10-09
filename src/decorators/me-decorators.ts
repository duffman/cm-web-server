/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

/*
 export function ApiController<T extends {new(...args:any[]):{}}>(constructor:T) {
 return class extends constructor {
 newProperty = "new property";
 hello = "override";
 }
 }

 export function CmApiController(basePath: string) {
 return function (constructor: Function) {
 constructor.prototype.basePath = basePath;
 Reflect.set(constructor, "isCmApiController", true);

 console.log("AAAL ::",
 Reflect.getMetadataKeys(constructor)
 );


 let keys = Reflect.getOwnMetadataKeys(constructor);
 console.log("MY KEYS::", keys);
 }
 }

 export function ActionMethod(params?: any) {
 return function (
 target: Object,
 key: string | symbol,
 descriptor: PropertyDescriptor
 ) {
 const originalValue = descriptor.value;

 Object.defineProperty<IActionResult>(descriptor.value, "result", {
 writable: true,
 enumerable: true,
 value: new ActionResult()
 });



 descriptor.value = function(...args: any[]) {
 //result = new ActionResult();
 // "this" here will refer to the class instance
 console.log("in property:: ", this.constructor.name);

 //Reflect.defineMetadata(key, mVal, this);
 //Reflect.defineMetadata("kalle", mVal, this);
 //return originalValue.apply(this, args);
 }

 //Reflect.defineMetadata("kalle", mVal, target);
 //Reflect.set(target, key, mVal)

 console.log("CmApiGet ::", key);


 return descriptor;
 };
 }



 export function TypeRestrictedMethodDecorator(
 target: Object, // The prototype of the class
 propertyKey: string, // The name of the method
 descriptor: TypedPropertyDescriptor<(... p:any[]) => Promise<any>>
 ) {
 console.log("TypeRestrictedMethodDecorator called on: ", target, propertyKey, descriptor);
 }

 export function CmApiGet(path: string, omitBasePath?: boolean) {
 return function (
 target: Object,
 key: string | symbol,
 descriptor: PropertyDescriptor
 ) {
 const originalValue = descriptor.value;
 const mVal = { path: path, omitBasePath: omitBasePath };

 //Object.defineProperty<>()

 descriptor.value = function(...args: any[]): Promise<void> {
 // "this" here will refer to the class instance
 console.log("in property:: ", this.constructor.name);

 Reflect.defineMetadata(key, mVal, this);
 Reflect.defineMetadata("kalle", mVal, this);
 return originalValue.apply(this, args);
 }

 Reflect.defineMetadata("kalle", mVal, target);
 Reflect.set(target, key, mVal)

 console.log("CmApiGet ::", key);
 return descriptor;
 };
 }
 */
