import { EnumStoreEvents } from "core/store/enum-store-events";

export function pageSetter(newPage: TAppPageClass) {
  this.eventBus.emit(EnumStoreEvents.PageChanged, newPage);
}
