"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcFactory = void 0;
const tsyringe_1 = require("tsyringe");
const semaphore_1 = require("../semaphore");
let RpcFactory = class RpcFactory {
    constructor() {
        this.requestId = 0;
    }
    getRequestId() {
        return this.requestId++;
    }
    createRequestMessage(route, { authInfo, metadata, data, id, }) {
        if (!id) {
            // eslint-disable-next-line no-param-reassign
            id = this.getRequestId();
        }
        return {
            id, authInfo: authInfo || {}, metadata: metadata || {}, data, method: route.method, type: 'request',
        };
    }
    createBroadcastMessage(route, { metadata, data, id, }) {
        if (!id) {
            // eslint-disable-next-line no-param-reassign
            id = this.getRequestId();
        }
        return {
            id, metadata: metadata || {}, data, method: route.method, type: 'broadcast',
        };
    }
};
exports.RpcFactory = RpcFactory;
__decorate([
    (0, semaphore_1.Semaphorize)()
], RpcFactory.prototype, "getRequestId", null);
exports.RpcFactory = RpcFactory = __decorate([
    (0, tsyringe_1.singleton)()
], RpcFactory);
//# sourceMappingURL=rpc.factory.js.map