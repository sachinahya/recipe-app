// https://github.com/redux-utilities/flux-standard-action

export interface BasicAction<T extends string = string, M = undefined> {
  type: T;
  meta?: M;
}

export interface PayloadAction<T extends string = string, P = unknown, M = undefined>
  extends BasicAction<T, M> {
  payload: P;
}

export interface ErrorAction<T extends string = string, E = Error, M = undefined>
  extends PayloadAction<T, E, M> {
  error: true;
}

export type AnyAction<T extends string = string> = Partial<PayloadAction<T, any, any>>;

export const basicAction = <T extends string = string, M = undefined>(
  type: T,
  meta?: M
): BasicAction<T, M> => ({
  type,
  meta,
});

export const payloadAction = <T extends string = string, P = unknown, M = undefined>(
  type: T,
  payload: P,
  meta?: M
): PayloadAction<T, P, M> => ({ type, payload, meta });

export const errorAction = <T extends string = string, E = Error, M = undefined>(
  type: T,
  payload: E,
  meta?: M
): ErrorAction<T, E, M> => ({ type, payload, error: true, meta });
