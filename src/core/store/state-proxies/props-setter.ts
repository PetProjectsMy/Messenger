import { deepEqual } from "utils/objects-handle";
import * as StateProxies from "./main-states-proxies";

export function stateMainPropsSetter(
  target: StoreTypings.AppState,
  prop: Keys<StoreTypings.AppState>,
  newValue: unknown
) {
  const oldValue = target[prop];
  if (deepEqual(oldValue, newValue)) {
    return true;
  }

  (target as Record<string, unknown>)[prop] = newValue;
  console.log(
    `STORE ${prop}: ${JSON.stringify(oldValue)} -> ${JSON.stringify(newValue)}`
  );

  switch (prop) {
    case "page":
      StateProxies.pageSetter.call(this, newValue);
      break;
    case "user":
      StateProxies.userSetter.call(this, oldValue, newValue);
      break;
    case "chats":
      StateProxies.chatsSetter.call(this, oldValue, newValue);
      break;
    case "currentChatID":
      StateProxies.currentChatSetter.call(this, oldValue, newValue);
      break;
    default:
  }

  return true;
}
