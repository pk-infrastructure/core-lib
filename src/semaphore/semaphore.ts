interface Queue {
  resolve: () => void;
  timer: ReturnType<typeof setTimeout>;
}

export interface SemaphoreParams {
  concurrency: number;
  size: number;
  timeout: number;
}

export class AwaitSemaphore {
  private concurrency: number;
  private timeout: number;
  private size: number;
  private queue: Queue[];

  constructor(params: SemaphoreParams) {
    this.concurrency = params.concurrency;
    this.timeout = params.timeout;
    this.size = params.size;
    this.queue = [];
  }

  public enter(): Promise<void> {
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

  public leave(): void {
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

  public sizeQueue(): number {
    return this.queue.length;
  }
}
