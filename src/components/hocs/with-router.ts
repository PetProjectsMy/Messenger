import { CoreRouter, EnumAppRoutes } from "core/router";

export function WithRouter<
  P extends TComponentCommonProps,
  S extends TComponentState
>(ComponentClass: BlockClass<P, S>) {
  return class WrappedComponent extends ComponentClass {
    // @ts-ignore: 'router' is declared but its value is never read.
    protected router: CoreRouter<EnumAppRoutes>;

    protected _preInitHook() {
      super._preInitHook();
      this.router = window.router;
    }
  };
}
