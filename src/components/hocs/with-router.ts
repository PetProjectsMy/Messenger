import { CoreRouter, EnumAppRoutes } from "core/router";

export function withRouter<
  P extends ComponentCommonProps,
  S extends ComponentState
>(ComponentClass: BlockClass<P, S>) {
  return class WrappedComponent extends ComponentClass {
    // @ts-ignore: 'router' is declared but its value is never read.
    private router: CoreRouter<EnumAppRoutes>;

    protected _preInitHook() {
      super._preInitHook();
      this.router = window.router;
    }
  };
}
