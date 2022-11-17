import { EnumStoreEvents } from "core/store";

export function pageSetter(newPage: TAppPageClass) {
  this.eventBus.emit(EnumStoreEvents.PageChanged, newPage);
}
