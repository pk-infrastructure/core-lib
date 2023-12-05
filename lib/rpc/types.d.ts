export type RequestRpc<T> = {
    id: number;
    type: 'request';
    method: string;
    authInfo: {
        token?: string;
        userId?: number;
        userRole?: string;
    };
    metadata: Record<string, unknown>;
    data: T;
};
export type BroadcastRpc<T> = {
    id: number;
    type: 'broadcast';
    method: string;
    metadata: Record<string, unknown>;
    data: T;
};
