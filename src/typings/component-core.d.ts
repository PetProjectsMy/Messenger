declare global {
  export type ComponentNotEventsProps = {
    [prop: string]: string | Function | ComponentNotEventsProps;
  };

  export type ComponentEventListener = (...args: any[]) => void;

  export type ComponentEventsProp = {
    events?: Record<string, ComponentEventListener>;
  };

  export type ComponentProps = ComponentNotEventsProps & ComponentEventsProp;
}
