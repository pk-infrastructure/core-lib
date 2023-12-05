import { BaseLogger } from './base.logger';
export declare class Log4jsLogger extends BaseLogger {
    private readonly name;
    private readonly logger;
    constructor(name: string);
    static buildByClassInstance(classForLogger: unknown): Log4jsLogger;
    info(message: any, ...args: any[]): void;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    fatal(message: any, ...args: any[]): void;
    mark(message: any, ...args: any[]): void;
}
