import { type Block } from "core/dom/block";
import type { TEventHandler } from "core/event-bus";

declare global {
  export type BlockClass<
    P extends TComponentCommonProps,
    S extends TComponentState
  > = typeof Block<P, S>;

  export type ComponentEventHandler = TEventHandler;

  export type TComponentWrapper = {
    componentAlias: string;
    htmlWrapperTemplate: string;
  };

  export type ComponentOptionalProps = {
    events?: Record<string, ComponentEventHandler[]>;
    htmlClasses?: string[];
    htmlStyle?: {
      "background-image"?: any;
      display?: "none" | "block";
    };
    htmlWrapper?: TComponentWrapper;
  };

  type TCommonHtmlAtrributes = {
    htmlAttributes?: {
      name?: string;
      id?: string;
    };
  };

  export type WithCommonHtmlAttributes<THtmlAttrs> = TCommonHtmlAtrributes &
    THtmlAttrs;

  export type TComponentCommonProps = TCommonHtmlAtrributes &
    ComponentOptionalProps;

  export type WithComponentCommonProps<Tprops> = Tprops & TComponentCommonProps;

  export type TComponentChild = Block;

  export type TComponentChildArray = TComponentChild[];

  export type TComponentChildren = Record<
    string,
    TComponentChild | TComponentChildArray
  >;

  export type TComponentRefs = Record<string, Block>;

  export type TComponentState = Record<string, unknown>;

  export type TComponentHelpers = Record<string, unknown>;

  export type TEventListener = EventListener;
}

export {};
