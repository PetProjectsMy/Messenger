import { InputValidator } from "components";
import Block from "core/block";

declare global {
  export type ComponentEventListener = EventListener | InputValidator;

  export type ComponentWrapper = {
    componentAlias: string;
    htmlWrapperTemplate: string;
  };

  export type ComponentOptionalProps = {
    componentName?: string;
    htmlWrapper?: ComponentWrapper;
    hmtlWrapped?: boolean;
    events?: Record<string, ComponentEventListener[]>;
    refs?: ComponentRefs;
    state?: ComponentState;
  };

  type HTMLElementProps = {
    htmlClass?: string;
    htmlId?: string;
    htmlName?: string;
  };
  type WithHTMLProps<PropsType> = PropsType & HTMLElementProps;

  export type ComponentCommonProps = WithHTMLProps<ComponentOptionalProps>;

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
