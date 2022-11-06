import * as Components from "components";
import { Block } from "core/dom";

declare global {
  export type BlockClass<
    P extends ComponentCommonProps,
    S extends ComponentState
  > = typeof Block<P, S>;

  export type PageComponent =
    | Components.Button
    | Components.ImageElement
    | Components.Input
    | Components.Link
    | Components.TextElement;

  export type PageComponentClass =
    | typeof Components.Button
    | typeof Components.ImageElement
    | typeof Components.Input
    | typeof Components.Link
    | typeof Components.TextElement;
}

export {};
