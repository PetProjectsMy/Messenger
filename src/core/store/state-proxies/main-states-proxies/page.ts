import { EnumStoreEvents } from "core/store/enum-store-events";
import { type Store } from "core/store/store";
import { type EnumAppPages } from "pages/enum-app-pages";

export function pageSetter(this: Store, newPage: EnumAppPages) {
  console.log(`SETTER: ${this.constructor.name}`);
  this.emitEvent(EnumStoreEvents.PageChanged, newPage);
}
