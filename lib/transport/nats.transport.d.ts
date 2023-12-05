/// <reference types="node" />
import { LoggerBuilder } from '../logger/base.logger';
import { BaseTransport, SendRequestParams, SubscribeDurableParams, SubscribeForTopicParams, SubscribeToRequestParams } from './base.transport';
import { NatsClient } from './nats.client';
export declare class NatsTransport extends BaseTransport {
    private readonly natsClient;
    private readonly ackWait;
    private readonly requestTimeout;
    private readonly microserviceName;
    private readonly loggerFactory;
    private readonly logger;
    private readonly durableSubscriptionCallbacks;
    constructor(natsClient: NatsClient, ackWait: string, requestTimeout: string, microserviceName: string, loggerFactory: LoggerBuilder);
    sendRequest(params: SendRequestParams): Promise<Buffer>;
    subscribeToRequest(params: SubscribeToRequestParams): any;
    publishDurable(topic: string, message: string | Buffer): any;
    addDurableSubscription(params: SubscribeForTopicParams): void;
    subscribeDurable(params: SubscribeDurableParams): Promise<any>;
    createStreamAndConsumerForMicroserviceIfNotExist(topicName: string): Promise<{
        stream: any;
        consumer: any;
    }>;
    createStreamIfNotExists(streamName: string, topics: string[]): Promise<any>;
    createConsumerForStreamIfNotExists(streamName: string, durableName?: string): Promise<any>;
}
