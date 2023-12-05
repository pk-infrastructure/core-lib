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
exports.NatsTransport = void 0;
const nats_1 = require("nats");
const tsyringe_1 = require("tsyringe");
const helpers_1 = require("../../../helpers");
const base_transport_1 = require("./base.transport");
let NatsTransport = class NatsTransport extends base_transport_1.BaseTransport {
    constructor(natsClient, ackWait, requestTimeout, microserviceName, loggerFactory) {
        super();
        this.natsClient = natsClient;
        this.ackWait = ackWait;
        this.requestTimeout = requestTimeout;
        this.microserviceName = microserviceName;
        this.loggerFactory = loggerFactory;
        this.durableSubscriptionCallbacks = new Map();
        this.logger = loggerFactory.buildByClassInstance(this);
    }
    async sendRequest(params) {
        const { data } = await this.natsClient.connection
            .request(params.topic, params.payload, { timeout: params.timeout || +this.requestTimeout });
        return Buffer.from(data);
    }
    subscribeToRequest(params) {
        return this.natsClient.connection.subscribe(params.topic, {
            queue: this.microserviceName,
            callback: params.cb,
        });
    }
    publishDurable(topic, message) {
        return this.natsClient.js.publish(topic, message);
    }
    addDurableSubscription(params) {
        this.durableSubscriptionCallbacks.set(params.topic, params.cb);
    }
    async subscribeDurable(params) {
        const { consumer } = await this.createStreamAndConsumerForMicroserviceIfNotExist(params.microserviceName);
        while (true) {
            const messages = await consumer.consume({ max_messages: params.maxMessagesPerFetch });
            for await (const message of messages) {
                try {
                    const topic = message.subject;
                    const callback = this.durableSubscriptionCallbacks.get(topic);
                    if (!callback) {
                        this.logger.warn('Got message without handler: ', message.subject, (0, helpers_1.fromBinaryArrayToString)(message.data));
                        return message.ack();
                    }
                    await callback(message);
                    message.ack();
                }
                catch (e) {
                    this.logger
                        .error('Error during processing the message: ', message.subject, (0, helpers_1.fromBinaryArrayToString)(message.data));
                }
            }
        }
    }
    async createStreamAndConsumerForMicroserviceIfNotExist(topicName) {
        const stream = await this.createStreamIfNotExists(topicName, [`${topicName}.>`]);
        const consumer = await this.createConsumerForStreamIfNotExists(topicName);
        return { stream, consumer };
    }
    async createStreamIfNotExists(streamName, topics) {
        let stream;
        try {
            stream = await this.natsClient.jsm.streams.get(streamName);
        }
        catch (e) {
            if (e instanceof nats_1.NatsError && e.isJetStreamError() && e.message === 'stream not found') {
                await this.natsClient.jsm.streams.add({
                    subjects: topics,
                    name: streamName,
                });
                return this.natsClient.jsm.streams.get(streamName);
            }
            throw e;
        }
        return stream;
    }
    async createConsumerForStreamIfNotExists(streamName, durableName) {
        let consumer;
        try {
            consumer = await this.natsClient.js.consumers.get(streamName, durableName || this.microserviceName);
        }
        catch (e) {
            if (e instanceof nats_1.NatsError && e.isJetStreamError() && e.message === 'consumer not found') {
                await this.natsClient.jsm.consumers.add(streamName, {
                    durable_name: durableName || this.microserviceName,
                    deliver_group: durableName || this.microserviceName,
                    deliver_policy: nats_1.DeliverPolicy.New,
                    ack_wait: +this.ackWait,
                    ack_policy: nats_1.AckPolicy.All,
                });
                return this.natsClient.js.consumers.get(streamName, durableName || this.microserviceName);
            }
            throw e;
        }
        return consumer;
    }
};
exports.NatsTransport = NatsTransport;
exports.NatsTransport = NatsTransport = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(1, (0, tsyringe_1.inject)('config.nats.ackWait')),
    __param(2, (0, tsyringe_1.inject)('config.nats.requestTimeout')),
    __param(3, (0, tsyringe_1.inject)('config.microserviceName')),
    __param(4, (0, tsyringe_1.inject)('loggerBuilder'))
], NatsTransport);
//# sourceMappingURL=nats.transport.js.map