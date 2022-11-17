import * as Components from "components";
import { Block } from "core/dom";

declare global {
  export type BlockClass<
    P extends TComponentCommonProps,
    S extends TComponentState
  > = typeof Block<P, S>;

  export type PageComponent =
    | Components.Button
    | Components.ImageComponent
    | Components.Input
    | Components.Link
    | Components.TextComponent;

  export type PageComponentClass =
    | typeof Components.Button
    | typeof Components.ImageComponent
    | typeof Components.Input
    | typeof Components.Link
    | typeof Components.TextComponent;
}

export {};
