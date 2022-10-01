"use strict";
/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynRouterCore = void 0;
var zyn_route_method_type_1 = require("../types/zyn-route-method.type");
var zyn_path_utils_1 = require("../utils/zyn-path.utils");
var path_1 = __importDefault(require("path"));
var tsyringe_1 = require("tsyringe");
var ZynRouterCore = /** @class */ (function () {
    function ZynRouterCore() {
        this.basePath = undefined;
        this.routesInfo = new Array();
    }
    /**
     * Set the servers absolute url to allow
     * links to appear when listing paths
     * @param {string} absUrl
     */
    ZynRouterCore.prototype.setSetAbsoluteBaseUrl = function (absUrl) {
        this.absoluteBaseUrl = zyn_path_utils_1.ZynPathUtils.ensureTrailingSlash(absUrl);
    };
    ZynRouterCore.prototype.setRouter = function (router) {
        this.router = router;
    };
    ZynRouterCore.prototype.addRouteInfo = function (method, route) {
        var name = this.parent.constructor.name;
        this.routesInfo.push({
            controllerName: name,
            method: method,
            fullroute: route
        });
    };
    ZynRouterCore.prototype.assignParent = function (parent) {
        this.parent = parent;
    };
    ZynRouterCore.prototype.setBasePath = function (path) {
        if (this.basePath) {
            throw new Error("BasePath cannot be re-assigned.");
        }
        else {
            path = zyn_path_utils_1.ZynPathUtils.stripTrailingAndLeadingSlashes(path);
            this.basePath = "/".concat(path, "/");
        }
    };
    ZynRouterCore.prototype.get = function (route, func) {
        return this.registerRoute(zyn_route_method_type_1.ZynRouteMethod.get, route, func);
    };
    ZynRouterCore.prototype.post = function (route, func) {
        return this.registerRoute(zyn_route_method_type_1.ZynRouteMethod.get, route, func);
    };
    ZynRouterCore.prototype.delete = function (route, func) {
        return this.registerRoute(zyn_route_method_type_1.ZynRouteMethod.delete, route, func);
    };
    ZynRouterCore.prototype.all = function (route, func) {
        return this.registerRoute(zyn_route_method_type_1.ZynRouteMethod.all, route, func);
    };
    ZynRouterCore.prototype.registerRoute = function (method, route, func) {
        if (!this.router) {
            throw new Error("No router Assigned");
        }
        if (!this.parent) {
            throw new Error("No parent Assigned");
        }
        if (this.basePath) {
            route = this.basePath + path_1.default;
        }
        if (!route.startsWith("/"))
            route = "/" + route;
        this.addRouteInfo(method, route);
        try {
            switch (method) {
                case zyn_route_method_type_1.ZynRouteMethod.get:
                    this.router.get(route, func.bind(this.parent));
                    break;
                case zyn_route_method_type_1.ZynRouteMethod.post:
                    this.router.post(route, func.bind(this.parent));
                    break;
                case zyn_route_method_type_1.ZynRouteMethod.delete:
                    this.router.delete(route, func.bind(this.parent));
                    break;
                case zyn_route_method_type_1.ZynRouteMethod.all:
                    this.router.all(route, func.bind(this.parent));
                    break;
            }
        }
        catch (e) {
            return false;
        }
        return true;
    };
    ZynRouterCore.prototype.showInfo = function () {
        var _a;
        var routeInfoTable = [];
        for (var _i = 0, _b = this.routesInfo; _i < _b.length; _i++) {
            var info = _b[_i];
            var baseUrl = !this.absoluteBaseUrl
                ? "http://".concat((_a = process.env.WI_HOST) !== null && _a !== void 0 ? _a : "localhost", ":").concat(process.env.WI_PORT)
                : this.absoluteBaseUrl;
            routeInfoTable.push({
                controller: info.controllerName,
                method: info.method,
                route: info.fullroute,
                url: "".concat(baseUrl).concat(info.fullroute)
            });
        }
        console.table(routeInfoTable);
    };
    ZynRouterCore = __decorate([
        (0, tsyringe_1.singleton)(),
        __metadata("design:paramtypes", [])
    ], ZynRouterCore);
    return ZynRouterCore;
}());
exports.ZynRouterCore = ZynRouterCore;
//# sourceMappingURL=zyn-router-core.js.map