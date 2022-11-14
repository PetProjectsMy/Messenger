import { Block } from "core/dom";
import type { EventHandler } from "core/event-bus";

declare global {
  export type ComponentEventHandler = EventHandler;

  export type TComponentWrapper = {
    componentAlias: string;
    htmlWrapperTemplate: string;
  };

  export type ComponentOptionalProps = {
    componentName?: string;
    events?: Record<string, ComponentEventHandler[]>;
    htmlClasses?: string[];
    htmlStyle?: {
      backgroundImage?: any;
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

  type THTMLElementProps = {
    htmlAttributes?: {
      name?: string;
      id?: string;
      href?: string;
      value?: string;
      placeholder?: string;
      type?: string;
      accept?: string;
      src?: string;
      alt?: string;
    };
  };

  export type TComponentCommonProps = TCommonHtmlAtrributes &
    ComponentOptionalProps;

  export type WithComponentCommonProps<Tprops> = Tprops & TComponentCommonProps;

  export type TComponentProps = {
    [prop: string]:
      | string
      | unknown[]
      | boolean
      | Record<string, Function[] | Function>
      | TComponentRefs
      | TComponentState
      | TComponentProps;
  };

  export type TComponentChildren = Record<string, Block | Block[]>;

  export type TComponentRefs = Record<string, Block>;

  export type TComponentState = Record<string, unknown>;

  export type TComponentHelpers = Record<string, unknown>;

  export type TPageProxy = { component: Nullable<Block> };
}

export {};
