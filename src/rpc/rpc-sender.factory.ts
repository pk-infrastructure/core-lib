import { BaseRequestRoute } from '@pk-infrastructure/schemas';
import { inject } from 'tsyringe';
import { BaseLogger, LoggerBuilder } from '../logger/base.logger';
import { BaseTransport } from '../transport';
import { RequestRpcSender } from './rpc.sender';

export class RpcSenderFactory {
  private route: BaseRequestRoute;

  private readonly logger: BaseLogger;

  constructor(
    @inject('transport') private readonly transport: BaseTransport,
    @inject('loggerBuilder') private readonly loggerFactory: LoggerBuilder,
  ) {
    this.logger = loggerFactory.buildByClassInstance(this);
  }

  createRequestSenderForRoute<T extends typeof BaseRequestRoute>(route: T): RequestRpcSender<T> {
    return new RequestRpcSender<T>(route, this.transport);
  }
}
