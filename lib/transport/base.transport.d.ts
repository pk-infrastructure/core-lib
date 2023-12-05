/// <reference types="node" />
import { JsMsg, Msg, NatsError } from 'nats';
export type DurableSubscriptionCallbackType = (msg: JsMsg) => void | Promise<void>;
export type SubscriptionToRequestCallbackType = (err: NatsError | null, msg: Msg) => Buffer;
export type SubscribeForTopicParams = {
    topic: string;
    cb: DurableSubscriptionCallbackType;
};
export type SubscribeDurableParams = {
    microserviceName: string;
    maxMessagesPerFetch: number;
    ackWait: number;
};
export type SubscribeToRequestParams = {
    topic: string;
    cb: SubscriptionToRequestCallbackType;
};
export type SendRequestParams = {
    topic: string;
    payload: Buffer;
    timeout?: number;
};
export declare abstract class BaseTransport {
    sendRequest(params: SendRequestParams): Buffer | Promise<Buffer>;
    subscribeToRequest(params: SubscribeToRequestParams): unknown;
    publishDurable(topic: string, message: string | Buffer): unknown;
    addDurableSubscription(params: SubscribeForTopicParams): unknown;
}
