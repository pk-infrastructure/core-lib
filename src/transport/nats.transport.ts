import {
  AckPolicy, Consumer, DeliverPolicy, NatsError, Stream,
} from 'nats';
import { inject, singleton } from 'tsyringe';
import { fromBinaryArrayToString } from '../helpers';
import { BaseLogger, LoggerBuilder } from '../logger/base.logger';
import {
  BaseTransport,
  DurableSubscriptionCallbackType, SendRequestParams, SubscribeDurableParams, SubscribeForTopicParams,
  SubscribeToRequestParams,
} from './base.transport';
import { NatsClient } from './nats.client';

@singleton()
export class NatsTransport extends BaseTransport {
  private readonly logger: BaseLogger;

  private readonly durableSubscriptionCallbacks = new Map<string, DurableSubscriptionCallbackType>();

  constructor(
    private readonly natsClient: NatsClient,
    @inject('config.nats.ackWait') private readonly ackWait: string,
    @inject('config.nats.requestTimeout') private readonly requestTimeout: string,
    @inject('config.microserviceName') private readonly microserviceName: string,
    @inject('loggerBuilder') private readonly loggerFactory: LoggerBuilder,
  ) {
    super();

    this.logger = loggerFactory.buildByClassInstance(this);
  }

  async sendRequest(params: SendRequestParams) {
    const { data } = await this.natsClient.connection
      .request(params.topic, params.payload, { timeout: params.timeout || +this.requestTimeout });

    return Buffer.from(data);
  }

  subscribeToRequest(params: SubscribeToRequestParams) {
    return this.natsClient.connection.subscribe(params.topic, {
      queue: this.microserviceName,
      callback: params.cb,
    });
  }

  publishDurable(topic: string, message: string | Buffer) {
    return this.natsClient.js.publish(topic, message);
  }

  addDurableSubscription(params: SubscribeForTopicParams) {
    this.durableSubscriptionCallbacks.set(params.topic, params.cb);
  }

  async subscribeDurable(params: SubscribeDurableParams) {
    const { consumer } = await this.createStreamAndConsumerForMicroserviceIfNotExist(params.microserviceName);

    while (true) {
      const messages = await consumer.consume({ max_messages: params.maxMessagesPerFetch });

      // eslint-disable-next-line no-restricted-syntax
      for await (const message of messages) {
        try {
          const topic = message.subject;

          const callback = this.durableSubscriptionCallbacks.get(topic);

          if (!callback) {
            this.logger.warn('Got message without handler: ', message.subject, fromBinaryArrayToString(message.data));
            return message.ack();
          }

          await callback(message);

          message.ack();
        } catch (e) {
          this.logger
            .error('Error during processing the message: ', message.subject, fromBinaryArrayToString(message.data));
        }
      }
    }
  }

  async createStreamAndConsumerForMicroserviceIfNotExist(topicName: string) {
    const stream = await this.createStreamIfNotExists(topicName, [`${topicName}.>`]);
    const consumer = await this.createConsumerForStreamIfNotExists(topicName);

    return { stream, consumer };
  }

  async createStreamIfNotExists(streamName: string, topics: string[]) {
    let stream: Stream;

    try {
      stream = await this.natsClient.jsm.streams.get(streamName);
    } catch (e) {
      if (e instanceof NatsError && e.isJetStreamError() && e.message === 'stream not found') {
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

  async createConsumerForStreamIfNotExists(streamName: string, durableName?: string) {
    let consumer: Consumer;

    try {
      consumer = await this.natsClient.js.consumers.get(streamName, durableName || this.microserviceName);
    } catch (e) {
      if (e instanceof NatsError && e.isJetStreamError() && e.message === 'consumer not found') {
        await this.natsClient.jsm.consumers.add(streamName, {
          durable_name: durableName || this.microserviceName,
          deliver_group: durableName || this.microserviceName,
          deliver_policy: DeliverPolicy.New,
          ack_wait: +this.ackWait,
          ack_policy: AckPolicy.All,
        });

        return this.natsClient.js.consumers.get(streamName, durableName || this.microserviceName);
      }

      throw e;
    }

    return consumer;
  }
}
