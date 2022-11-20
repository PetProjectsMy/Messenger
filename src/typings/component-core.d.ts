import { Block } from "core/dom";
import type { EventHandler } from "core/event-bus";

declare global {
  export type ComponentEventHandler = EventHandler;

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
