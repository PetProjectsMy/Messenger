import { EnumStoreEvents } from "store";

export function appIsInitedSetter(oldValue: boolean, newValue: boolean) {
  if (!oldValue && newValue) {
    const { route, path } = window.router.matchRouteByPath(
      window.location.pathname
    );

    this.eventBus.emit(EnumStoreEvents.AppInit, { route, path });
  }
}
