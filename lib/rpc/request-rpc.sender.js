"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRpcSender = void 0;
class RequestRpcSender {
    constructor(route, transport) {
        this.route = route;
        this.transport = transport;
    }
    async sendRequest(payload) {
        const response = await this.transport.sendRequest({
            topic: this.route.topic,
            payload: Buffer.from(JSON.stringify(payload), 'utf-8'),
        });
        return JSON.parse(response.toString('utf-8'));
    }
}
exports.RequestRpcSender = RequestRpcSender;
//# sourceMappingURL=request-rpc.sender.js.map