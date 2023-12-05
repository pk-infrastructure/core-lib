"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log4jsLogger = void 0;
const log4js_1 = require("log4js");
const base_logger_1 = require("./base.logger");
class Log4jsLogger extends base_logger_1.BaseLogger {
    constructor(name) {
        super();
        this.name = name;
        this.logger = (0, log4js_1.getLogger)(name);
    }
    static buildByClassInstance(classForLogger) {
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
exports.Log4jsLogger = Log4jsLogger;
//# sourceMappingURL=log4js.logger.js.map