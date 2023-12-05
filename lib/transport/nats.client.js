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
exports.NatsClient = void 0;
const nats_1 = require("nats");
const tsyringe_1 = require("tsyringe");
let NatsClient = class NatsClient {
    constructor(url, idleHeartbeat) {
        this.url = url;
        this.idleHeartbeat = idleHeartbeat;
        this.connected = false;
    }
    async init() {
        if (this.connection)
            return;
        this.connection = await (0, nats_1.connect)({
            servers: this.url,
        });
        this.connected = true;
        this.js = this.connection.jetstream();
        this.jsm = await this.js.jetstreamManager();
    }
    async isAlive() {
        // eslint-disable-next-line no-restricted-syntax
        for await (const status of this.connection.status()) {
            if (status.type === 'disconnect') {
                this.connected = false;
            }
            if (status.type === 'reconnect') {
                this.connected = true;
            }
        }
    }
};
exports.NatsClient = NatsClient;
exports.NatsClient = NatsClient = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)('config.nats.url')),
    __param(1, (0, tsyringe_1.inject)('config.nats.idleHeartbeat'))
], NatsClient);
//# sourceMappingURL=nats.client.js.map