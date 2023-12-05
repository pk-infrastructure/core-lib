export interface SemaphoreParams {
    concurrency: number;
    size: number;
    timeout: number;
}
export declare class AwaitSemaphore {
    private concurrency;
    private timeout;
    private size;
    private queue;
    constructor(params: SemaphoreParams);
    enter(): Promise<void>;
    leave(): void;
    sizeQueue(): number;
}
