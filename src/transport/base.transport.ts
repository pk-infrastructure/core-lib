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
}

export type SubscribeToRequestParams = {
  topic: string;
  cb: SubscriptionToRequestCallbackType;
}

export type SendRequestParams = {
  topic: string;
  payload: Buffer;
  timeout?: number;
}

export abstract class BaseTransport {
  sendRequest(params: SendRequestParams): Buffer | Promise<Buffer> {
    return null;
  }

  subscribeToRequest(params: SubscribeToRequestParams): unknown {
    return null;
  }

  publishDurable(topic: string, message: string | Buffer): unknown {
    return null;
  }

  addDurableSubscription(params: SubscribeForTopicParams): unknown {
    return null;
  }
}
