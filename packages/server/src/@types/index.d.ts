declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

type Dictionary<T> = { [key: string]: T };

type AsyncOrSync<T> = T | Promise<T>;
