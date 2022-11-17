import { EnumStoreEvents } from "store";

export function pageSetter(oldValue: TAppPageClass, newValue: TAppPageClass) {
  this.eventBus.emit(EnumStoreEvents.PageChanged, newValue);
}
