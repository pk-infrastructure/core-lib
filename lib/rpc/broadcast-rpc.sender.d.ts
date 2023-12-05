import { BaseBroadcastRoute } from '@pk-infrastructure/schemas';
import { Static } from '@sinclair/typebox';
import { BaseTransport } from '../transport';
import { BroadcastRpc } from './types';
export declare class BroadcastRpcSender<T extends typeof BaseBroadcastRoute> {
    private readonly route;
    private readonly transport;
    constructor(route: T, transport: BaseTransport);
    publish(payload: BroadcastRpc<Static<T['dataSchema']>>): Promise<void>;
}
