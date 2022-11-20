import { type PathRouter } from "core/router/path-router";

export function WithRouter<
  P extends TComponentCommonProps,
  S extends TComponentState
>(ComponentClass: BlockClass<P, S>) {
  return class WrappedComponent extends ComponentClass {
    public router: PathRouter;

    protected _beforePropsAssignHook() {
      this.router = window.router;

      super._beforePropsAssignHook();
    }
  };
}
