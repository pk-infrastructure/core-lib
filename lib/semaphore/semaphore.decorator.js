"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Semaphorize = void 0;
const _1 = require(".");
const semaphoresPerClassInstance = new Map();
const Semaphorize = (params) => (target, memberName, descriptor) => {
    let methodsMap = semaphoresPerClassInstance.get(this);
    if (!methodsMap) {
        methodsMap = new Map();
        semaphoresPerClassInstance.set(this, methodsMap);
    }
    let semaphore = methodsMap.get(params.semaphoreKey || memberName);
    if (!semaphore) {
        semaphore = new _1.AwaitSemaphore(params);
        methodsMap.set(params.semaphoreKey || memberName, semaphore);
    }
    const oldFunc = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async (...args) => {
        await semaphore.enter();
        try {
            return await oldFunc.apply(this, args);
        }
        finally {
            semaphore.leave();
        }
    };
};
exports.Semaphorize = Semaphorize;
//# sourceMappingURL=semaphore.decorator.js.map