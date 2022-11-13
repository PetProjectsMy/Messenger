import { EnumStoreEvents } from "../enum-store-events";

export function appIsInitedSetter(oldValue: boolean, newValue: boolean) {
  if (!oldValue && newValue) {
    const { route, path } = window.router.matchRouteByPath(
      window.location.pathname
    );

    this.eventBus.emit(EnumStoreEvents.AppInit, { route, path });
  }
}
