import { BaseBroadcastRoute } from '@pk-infrastructure/schemas';
import { Static } from '@sinclair/typebox';
import { BaseTransport } from '../transport';
import { BroadcastRpc } from './types';

export class BroadcastRpcSender<T extends typeof BaseBroadcastRoute> {
  constructor(
    private readonly route: T,
    private readonly transport: BaseTransport,
  ) {}

  async publish(payload: BroadcastRpc<Static<T['dataSchema']>>): Promise<void> {
    await this.transport.publishDurable(
      this.route.topic,
      Buffer.from(JSON.stringify(payload), 'utf-8'),
    );
  }
}
