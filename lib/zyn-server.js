"use strict";
/**
 * Copyright (c) 2022 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynServer = void 0;
var tsyringe_1 = require("tsyringe");
var zyn_action_result_1 = require("./core/zyn-action-result");
var zyn_router_core_1 = require("./core/zyn-router-core");
var zyn_middleware_1 = require("./middleware/zyn.middleware");
var zyn_request_middleware_1 = require("./middleware/zyn-request.middleware");
var bodyParser = __importStar(require("body-parser"));
var express_1 = require("express");
var express_2 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var ZynServer = /** @class */ (function () {
    function ZynServer(routerCore) {
        this.routerCore = routerCore;
        this.webRoutes = (0, express_1.Router)();
        this.controllers = new Array();
        this.serverApp = (0, express_2.default)();
        this.serverApp.disable('x-powered-by');
        this.serverApp.use(zyn_middleware_1.zynMiddleware);
        this.serverApp.use(zyn_request_middleware_1.zynRequestMiddleware);
        this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
        this.serverApp.use(this.webRoutes);
        routerCore.setRouter(this.webRoutes);
    }
    /**
     * Enable Cors header
     * @param {string} path
     * @returns {IZynServer}
     */
    ZynServer.prototype.setCors = function (path) {
        if (path === void 0) { path = "*"; }
        this.webRoutes.use((0, cors_1.default)());
        this.webRoutes.options(path, (0, cors_1.default)());
        return this;
    };
    ZynServer.prototype.json = function () {
        this.webRoutes.use(bodyParser.json());
        return this;
    };
    ZynServer.prototype.registerMiddleware = function (middleware) {
        this.serverApp.use(middleware);
        return this;
    };
    ZynServer.prototype.registerController = function (controller) {
        try {
            this.routerCore.assignParent(controller);
            controller.initRoutes(this.routerCore);
            this.controllers.push(controller);
        }
        catch (e) {
            console.error("Failed to register ZynapticController ::", e);
        }
        return this;
    };
    /**
     * Register multiple controllers
     * @param {IZynController[]} controllers
     */
    ZynServer.prototype.registerControllers = function (controllers) {
        for (var _i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
            var controller = controllers_1[_i];
            this.registerController(controller);
        }
        return this;
    };
    /**
     * Start server on given host and port
     * @param {string} host
     * @param port
     * @returns {Promise<ZynActionResult>}
     */
    ZynServer.prototype.start = function (host, port) {
        if (port === void 0) { port = 80; }
        return __awaiter(this, void 0, void 0, function () {
            var result, hostAndPort, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (isNaN(port)) {
                            return [2 /*return*/, zyn_action_result_1.ZynActionResult.new().setError("Invalid port")];
                        }
                        result = zyn_action_result_1.ZynActionResult.new();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        hostAndPort = "".concat(host, ":").concat(port);
                        _a = this;
                        return [4 /*yield*/, this.serverApp.listen(port, host)];
                    case 2:
                        _a.server = _b.sent();
                        result.setSuccess();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        result.setSuccess(false)
                            .setError("ZynServer bind failed on \"".concat(host, ":").concat(port, "\""), err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    ZynServer = __decorate([
        (0, tsyringe_1.singleton)(),
        __metadata("design:paramtypes", [zyn_router_core_1.ZynRouterCore])
    ], ZynServer);
    return ZynServer;
}());
exports.ZynServer = ZynServer;
//# sourceMappingURL=zyn-server.js.map