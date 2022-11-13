import { EnumStoreEvents } from "../enum-store-events";

export function pageSetter(oldValue: TAppPageClass, newValue: TAppPageClass) {
  if (oldValue !== newValue) {
    this.eventBus.emit(EnumStoreEvents.PageChanged, newValue);
  }
}
