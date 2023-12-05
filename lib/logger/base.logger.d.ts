export declare abstract class BaseLogger {
    static buildByClassInstance(classForLogger: unknown): BaseLogger;
    abstract trace(message: unknown, ...args: unknown[]): void;
    abstract debug(message: unknown, ...args: unknown[]): void;
    abstract info(message: unknown, ...args: unknown[]): void;
    abstract warn(message: unknown, ...args: unknown[]): void;
    abstract error(message: unknown, ...args: unknown[]): void;
    abstract fatal(message: unknown, ...args: unknown[]): void;
    abstract mark(message: unknown, ...args: unknown[]): void;
}
export type LoggerBuilder = {
    buildByClassInstance(classForLogger: unknown): BaseLogger;
};
