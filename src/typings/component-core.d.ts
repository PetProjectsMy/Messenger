declare global {
  export type ComponentEventListener = (...args: any[]) => void;

  type ComponentOptionalProps = {
    name?: string;
    events?: Record<string, ComponentEventListener>;
  };

  type ComponentPropsBase = {
    [prop: string]: string | Function | ComponentPropsBase;
  };

  export type ComponentProps = ComponentOptionalProps & ComponentPropsBase;

  type HTMLElementProps = {
    htmlElementClass?: string;
    htmlElementID?: string;
  };
  export type WithHTMLProps<PropsType> = PropsType & HTMLElementProps;
}

export {};
