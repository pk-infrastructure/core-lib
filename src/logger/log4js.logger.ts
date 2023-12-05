import { getLogger, Logger } from 'log4js';
import { BaseLogger } from './base.logger';

export class Log4jsLogger extends BaseLogger {
  private readonly logger: Logger;

  constructor(private readonly name: string) {
    super();

    this.logger = getLogger(name);
  }

  static buildByClassInstance(classForLogger: unknown): Log4jsLogger {
    return new this(`(${classForLogger.constructor.name})`);
  }

  info(message, ...args) {
    this.logger.info(message, ...args);
  }

  trace(message, ...args) {
    this.logger.trace(message, ...args);
  }

  debug(message, ...args) {
    this.logger.debug(message, ...args);
  }

  warn(message, ...args) {
    this.logger.warn(message, ...args);
  }

  error(message, ...args) {
    this.logger.error(message, ...args);
  }

  fatal(message, ...args) {
    this.logger.fatal(message, ...args);
  }

  mark(message, ...args) {
    this.logger.mark(message, ...args);
  }
}
