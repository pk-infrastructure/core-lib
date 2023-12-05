import { JetStreamClient, JetStreamManager, NatsConnection } from 'nats';
export declare class NatsClient {
    private readonly url;
    private readonly idleHeartbeat;
    private connected;
    connection: NatsConnection;
    js: JetStreamClient;
    jsm: JetStreamManager;
    constructor(url: string, idleHeartbeat: string);
    init(): Promise<void>;
    isAlive(): Promise<void>;
}
