import { type Block } from "core/dom";
import type { TEventHandler } from "core/event-bus";

declare global {
  export type BlockClass<
    P extends TComponentCommonProps = TComponentCommonProps,
    S extends TComponentState = TComponentState
  > = typeof Block<P, S>;

  export type TComponentEventHandler = TEventHandler;

  export type TComponentWrapper = {
    componentAlias: string;
    htmlWrapperTemplate: string;
  };

  export type TComponentOptionalProps = {
    events?: Record<string, TComponentEventHandler[]>;
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
    TComponentOptionalProps;

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
