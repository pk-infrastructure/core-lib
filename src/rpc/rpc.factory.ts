import { BaseBroadcastRoute, BaseRequestRoute } from '@pk-infrastructure/schemas';
import { Static } from '@sinclair/typebox';
import { singleton } from 'tsyringe';
import { Semaphorize } from '../semaphore';
import { BroadcastRpc, RequestRpc } from './rpc.sender';

@singleton()
export class RpcFactory {
  private requestId = 0;

  @Semaphorize()
  getRequestId() {
    return this.requestId++;
  }

  createRequestMessage<T extends typeof BaseRequestRoute>(
    route: T,
    {
      authInfo, metadata, data, id,
    }: {
      id?: number;
      data: Static<T['requestSchema']>;
      authInfo?: RequestRpc<unknown>['authInfo'];
      metadata?: Record<string, unknown>;
    },
  ): RequestRpc<Static<T['requestSchema']>> {
    if (!id) {
      // eslint-disable-next-line no-param-reassign
      id = this.getRequestId();
    }

    return {
      id, authInfo: authInfo || {}, metadata: metadata || {}, data, method: route.method, type: 'request',
    };
  }

  createBroadcastMessage<T extends typeof BaseBroadcastRoute>(
    route: T,
    {
      metadata, data, id,
    }: {
      id?: number;
      data: Static<T['dataSchema']>;
      metadata?: Record<string, unknown>;
    },
  ): BroadcastRpc<Static<T['dataSchema']>> {
    if (!id) {
      // eslint-disable-next-line no-param-reassign
      id = this.getRequestId();
    }

    return {
      id, metadata: metadata || {}, data, method: route.method, type: 'broadcast',
    };
  }
}
