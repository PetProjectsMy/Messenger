import Block from "./block";

declare global {
  export type ComponentChildren = Record<string, Block | Block[]>;

  export type ComponentPropsAndChildren = Record<
    string,
    Values<ComponentPropsBase> | Block | Block[]
  > &
    ComponentOptionalProps;
}

export {};
