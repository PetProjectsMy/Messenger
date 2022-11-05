declare global {
  export type Nullable<T> = T | null | undefined;

  export type Keys<T extends Record<string, unknown>> = keyof T;

  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  type Split<T, K extends keyof T> = K extends unknown
    ? { [I in keyof T]: I extends K ? T[I] : never }
    : never;
  type Explode<T> = Split<T, keyof T>;
  export type AtMostOnePick<T> = Explode<Partial<T>>;
  export type AtLeastOnePick<
    T,
    U = { [K in keyof T]: Pick<T, K> }
  > = Partial<T> & U[keyof U];
  export type ExactlyOnePick<T> = AtMostOnePick<T> & AtLeastOnePick<T>;
}
export {};
