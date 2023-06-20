export type PropGetArgs = {
  pathString?: string;
  isLogNeeded?: boolean;
};

export type PropSetArgs = {
  pathString: string;
  value: unknown;
  isLogNeeded?: boolean;
};

export type ComponentUpdateArgs<TProps, TState> = {
  oldPropsOrState: Partial<TProps> | Partial<TState> | unknown;
  newPropsOrState: Partial<TProps> | Partial<TState> | unknown;
};
