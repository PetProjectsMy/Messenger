import { CoreRouter } from "core/router";

export function withRouter<
  P extends ComponentCommonProps,
  S extends ComponentState
>(ComponentClass: BlockClass<P, S>) {
  return class WrappedComponent extends ComponentClass {
    private router: CoreRouter;

    protected _preInitHook() {
      super._preInitHook();
      this.router = window.router;
    }
  };
}
