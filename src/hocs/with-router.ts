import { CoreRouter, EnumAppRoutes } from "core/router";

export function WithRouter<
  P extends TComponentCommonProps,
  S extends TComponentState
>(ComponentClass: BlockClass<P, S>) {
  return class WrappedComponent extends ComponentClass {
    protected router: CoreRouter<EnumAppRoutes>;

    protected _beforePropsAssignHook() {
      this.router = window.router;
      super._beforePropsAssignHook();
    }
  };
}
