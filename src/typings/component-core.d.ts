import { Block } from "core/dom";
import type { EventHandler } from "core/event-bus";

declare global {
  export type ComponentEventHandler = EventHandler;

  export type ComponentWrapper = {
    componentAlias: string;
    htmlWrapperTemplate: string;
  };

  export type ComponentOptionalProps = {
    componentName?: string;
    events?: Record<string, ComponentEventHandler[]>;
  };

  type HTMLElementProps = {
    htmlWrapper?: ComponentWrapper;
    hmtlWrapped?: boolean;
    htmlClass?: string;
    htmlId?: string;
    htmlName?: string;
  };
  type WithHTMLProps<PropsType> = PropsType & HTMLElementProps;

  export type ComponentCommonProps = WithHTMLProps<ComponentOptionalProps>;

  export type WithCommonProps<Tprops> = Tprops & ComponentCommonProps;

  export type ComponentProps = {
    [prop: string]:
      | string
      | boolean
      | Record<string, Function[] | Function>
      | ComponentRefs
      | ComponentState
      | ComponentProps;
  };

  export type ComponentChildren = Record<string, Block | Block[]>;

  export type ComponentRefs = Record<string, Block>;

  export type ComponentState = Record<string, unknown>;

  export type PageProxy = { component: Nullable<Block> };
}

export {};
