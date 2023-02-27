import { Store } from "core/store";

export function WithStore<
  P extends ComponentTypings.CommonProps,
  S extends ComponentTypings.State
>(ComponentClass: ComponentTypings.BlockClass<P, S>) {
  class WithStoreComponent extends ComponentClass {
    public store: Store;

    protected _beforePropsAssignHook() {
      this.store = window.store;

      super._beforePropsAssignHook();
    }
  }

  return WithStoreComponent;
}
