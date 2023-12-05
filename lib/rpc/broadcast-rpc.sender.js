"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastRpcSender = void 0;
class BroadcastRpcSender {
    constructor(route, transport) {
        this.route = route;
        this.transport = transport;
    }
    async publish(payload) {
        await this.transport.publishDurable(this.route.topic, Buffer.from(JSON.stringify(payload), 'utf-8'));
    }
}
exports.BroadcastRpcSender = BroadcastRpcSender;
//# sourceMappingURL=broadcast-rpc.sender.js.map