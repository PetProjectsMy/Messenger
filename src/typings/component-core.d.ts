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
  };

  type HTMLElementProps = {
    htmlWrapper?: TComponentWrapper;
    hmtlWrapped?: boolean;
    htmlClass?: string;
    htmlId?: string;
    htmlName?: string;
    htmlStyle?: string;
    backgroundImage?: string;
  };
  type WithHTMLProps<PropsType> = PropsType & HTMLElementProps;

  export type TComponentCommonProps = WithHTMLProps<ComponentOptionalProps>;

  export type WithComponentCommonProps<Tprops> = Tprops & TComponentCommonProps;

  export type TComponentProps = {
    [prop: string]:
      | string
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
