"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcSenderFactory = void 0;
const tsyringe_1 = require("tsyringe");
const rpc_sender_1 = require("./rpc.sender");
let RpcSenderFactory = class RpcSenderFactory {
    constructor(transport, loggerFactory) {
        this.transport = transport;
        this.loggerFactory = loggerFactory;
        this.logger = loggerFactory.buildByClassInstance(this);
    }
    createRequestSenderForRoute(route) {
        return new rpc_sender_1.RequestRpcSender(route, this.transport);
    }
};
exports.RpcSenderFactory = RpcSenderFactory;
exports.RpcSenderFactory = RpcSenderFactory = __decorate([
    __param(0, (0, tsyringe_1.inject)('transport')),
    __param(1, (0, tsyringe_1.inject)('loggerBuilder'))
], RpcSenderFactory);
//# sourceMappingURL=rpc-sender.factory.js.map