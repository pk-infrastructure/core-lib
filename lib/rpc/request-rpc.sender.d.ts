import { BaseRequestRoute } from '@pk-infrastructure/schemas';
import { Static } from '@sinclair/typebox';
import { BaseTransport } from '../transport';
import { RequestRpc } from './types';
export declare class RequestRpcSender<T extends typeof BaseRequestRoute> {
    private readonly route;
    private readonly transport;
    constructor(route: T, transport: BaseTransport);
    sendRequest(payload: RequestRpc<Static<T['requestSchema']>>): Promise<Static<T['responseSchema']>>;
}
