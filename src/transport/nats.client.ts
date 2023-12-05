import {
  connect, JetStreamClient, JetStreamManager, NatsConnection,
} from 'nats';
import { inject, singleton } from 'tsyringe';

@singleton()
export class NatsClient {
  private connected = false;

  public connection: NatsConnection;
  public js: JetStreamClient;
  public jsm: JetStreamManager;

  constructor(
    @inject('config.nats.url') private readonly url: string,
    @inject('config.nats.idleHeartbeat') private readonly idleHeartbeat: string,
  ) {}

  async init() {
    if (this.connection) return;

    this.connection = await connect({
      servers: this.url,
    });

    this.connected = true;

    this.js = this.connection.jetstream();
    this.jsm = await this.js.jetstreamManager();
  }

  async isAlive() {
    // eslint-disable-next-line no-restricted-syntax
    for await (const status of this.connection.status()) {
      if (status.type === 'disconnect') {
        this.connected = false;
      }

      if (status.type === 'reconnect') {
        this.connected = true;
      }
    }
  }
}
