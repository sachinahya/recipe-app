declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

type Dictionary<T> = { [member: string]: T };

type AsyncOrSync<T> = T | Promise<T>;

type ReactRenderProp<T extends {}> = (props: T) => React.ReactElement;

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONArray = JSONValue[];
type JSONObject = { [member: string]: JSONValue };

interface ReactValueHandler<TValue = string, TElementType = Element> {
  value: TValue;
  onChange(evt: React.ChangeEvent<TElementType>): void;
}
