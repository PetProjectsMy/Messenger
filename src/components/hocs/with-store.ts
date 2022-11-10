import { Store } from "core/store";

export function WithStore<
  P extends TComponentCommonProps,
  S extends TComponentState
>(ComponentClass: BlockClass<P, S>) {
  return class WrappedComponent extends ComponentClass {
    protected store: Store;

    protected _beforePropsAssignHook() {
      this.store = window.store;
      super._beforePropsAssignHook();
    }
  };
}
