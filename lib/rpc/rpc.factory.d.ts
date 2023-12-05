import { BaseBroadcastRoute, BaseRequestRoute } from '@pk-infrastructure/schemas';
import { Static } from '@sinclair/typebox';
import { BroadcastRpc, RequestRpc } from './rpc.sender';
export declare class RpcFactory {
    private requestId;
    getRequestId(): number;
    createRequestMessage<T extends typeof BaseRequestRoute>(route: T, { authInfo, metadata, data, id, }: {
        id?: number;
        data: Static<T['requestSchema']>;
        authInfo?: RequestRpc<unknown>['authInfo'];
        metadata?: Record<string, unknown>;
    }): RequestRpc<Static<T['requestSchema']>>;
    createBroadcastMessage<T extends typeof BaseBroadcastRoute>(route: T, { metadata, data, id, }: {
        id?: number;
        data: Static<T['dataSchema']>;
        metadata?: Record<string, unknown>;
    }): BroadcastRpc<Static<T['dataSchema']>>;
}
