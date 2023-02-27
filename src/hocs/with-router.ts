import { type PathRouter } from "core/router/path-router";

export function WithRouter<
  P extends ComponentTypings.CommonProps,
  S extends ComponentTypings.State
>(ComponentClass: ComponentTypings.BlockClass<P, S>) {
  return class WrappedComponent extends ComponentClass {
    public router: PathRouter;

    protected _beforePropsAssignHook() {
      this.router = window.router;

      super._beforePropsAssignHook();
    }
  };
}
