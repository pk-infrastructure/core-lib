import { SemaphoreParams } from '.';
export declare const Semaphorize: (params?: SemaphoreParams & {
    semaphoreKey?: string;
}) => (target: unknown, memberName: string, descriptor: TypedPropertyDescriptor<(...args: unknown[]) => void>) => void;
