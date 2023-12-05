import { BaseRequestRoute } from '@pk-infrastructure/schemas';
import { Static } from '@sinclair/typebox';
import { BaseTransport } from '../transport';
import { RequestRpc } from './types';

export class RequestRpcSender<T extends typeof BaseRequestRoute> {
  constructor(
    private readonly route: T,
    private readonly transport: BaseTransport,
  ) {}

  async sendRequest(payload: RequestRpc<Static<T['requestSchema']>>): Promise<Static<T['responseSchema']>> {
    const response = await this.transport.sendRequest({
      topic: this.route.topic,
      payload: Buffer.from(JSON.stringify(payload), 'utf-8'),
    });

    return JSON.parse(response.toString('utf-8'));
  }
}
