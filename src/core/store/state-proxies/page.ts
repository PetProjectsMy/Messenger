import { EnumStoreEvents } from "../enum-store-events";

export function pageSetter(oldValue: TAppPageClass, newValue: TAppPageClass) {
  this.eventBus.emit(EnumStoreEvents.PageChanged, newValue);
}
