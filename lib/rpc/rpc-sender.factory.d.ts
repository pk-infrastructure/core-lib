import { BaseRequestRoute } from '@pk-infrastructure/schemas';
import { LoggerBuilder } from '../logger/base.logger';
import { BaseTransport } from '../transport';
import { RequestRpcSender } from './rpc.sender';
export declare class RpcSenderFactory {
    private readonly transport;
    private readonly loggerFactory;
    private route;
    private readonly logger;
    constructor(transport: BaseTransport, loggerFactory: LoggerBuilder);
    createRequestSenderForRoute<T extends typeof BaseRequestRoute>(route: T): RequestRpcSender<T>;
}
