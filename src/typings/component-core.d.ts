import Block from "core/block";

declare global {
  export type ComponentEventListener = (...args: any[]) => void;

  export type ComponentWrapper = {
    componentAlias: string;
    htmlWrapperTemplate: string;
  };

  export type ComponentOptionalProps = {
    name?: string;
    htmlWrapper?: ComponentWrapper;
    events?: Record<string, ComponentEventListener>;
  };

  type HTMLElementProps = {
    htmlClass?: string;
    htmlId?: string;
    htmlName?: string;
  };
  type WithHTMLProps<PropsType> = PropsType & HTMLElementProps;

  export type ComponentCommonProps = WithHTMLProps<ComponentOptionalProps>;

  type ComponentPropsBase = {
    [prop: string]: string | Function | ComponentPropsBase;
  };

  export type ComponentProps = ComponentPropsBase & ComponentCommonProps;

  export type ComponentChildren = Record<string, Block | Block[]>;

  export type ComponentRefs =
    | Record<string, Block>
    | { mainPage?: Nullable<PageProxy> };

  export type PageProxy = { component: Nullable<Block> };
}

export {};
