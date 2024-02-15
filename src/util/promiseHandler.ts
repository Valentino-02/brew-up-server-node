async function promiseHandler<T>(promise: Promise<T>) {
  return promise.then(Array.of).catch((err) => [, err]) as Promise<
    [result?: T, error?: unknown]
  >;
}

export default promiseHandler;
