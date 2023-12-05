import { AwaitSemaphore, SemaphoreParams } from '.';

const semaphoresPerClassInstance = new Map<unknown, Map<string, AwaitSemaphore>>();

export const Semaphorize = (params?: SemaphoreParams & { semaphoreKey?: string; }) => (
  target: unknown,
  memberName: string,
  descriptor: TypedPropertyDescriptor<(...args: unknown[])=> void>,
): void => {
  let methodsMap = semaphoresPerClassInstance.get(this);

  if (!methodsMap) {
    methodsMap = new Map();

    semaphoresPerClassInstance.set(this, methodsMap);
  }

  let semaphore = methodsMap.get(params.semaphoreKey || memberName);

  if (!semaphore) {
    semaphore = new AwaitSemaphore(params);

    methodsMap.set(params.semaphoreKey || memberName, semaphore);
  }

  const oldFunc = descriptor.value;
  // eslint-disable-next-line no-param-reassign
  descriptor.value = async (...args: unknown[]) => {
    await semaphore.enter();
    try {
      return await oldFunc.apply(this, args);
    } finally {
      semaphore.leave();
    }
  };
};
