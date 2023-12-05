"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwaitSemaphore = void 0;
class AwaitSemaphore {
    constructor(params) {
        this.concurrency = params.concurrency;
        this.timeout = params.timeout;
        this.size = params.size;
        this.queue = [];
    }
    enter() {
        return new Promise((resolve, reject) => {
            if (this.concurrency > 0) {
                this.concurrency--;
                resolve();
                return;
            }
            if (this.queue.length >= this.size) {
                reject(new Error('Semaphore queue is full'));
                return;
            }
            const timer = setTimeout(() => {
                this.queue.shift();
                reject(new Error('Semaphore timeout'));
            }, this.timeout);
            this.queue.push({ resolve, timer });
        });
    }
    leave() {
        if (this.queue.length === 0) {
            this.concurrency++;
            return;
        }
        const item = this.queue.shift();
        if (item) {
            const { resolve, timer } = item;
            clearTimeout(timer);
            setTimeout(() => {
                resolve();
            }, 0);
        }
    }
    sizeQueue() {
        return this.queue.length;
    }
}
exports.AwaitSemaphore = AwaitSemaphore;
//# sourceMappingURL=semaphore.js.map