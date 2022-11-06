// import { authAPI } from "api/auth";

import { Store } from "core/store";
import { Router } from "core/router";
import { UserDTO } from "api/types";
import { transformUserData, APIResponseHasError } from "utils/api";

export async function initApp() {
  try {
    const store = new Store<TAppState>();
    const router = new Router();
    window.router = router;
    window.store = store;
    router.init();
    store.init();
    // const { response } = (await authAPI.me()) as any;
    const response = { reason: "error" };
    if (APIResponseHasError(response)) {
      return;
    }
    store.dispatch({ user: transformUserData(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    window.store.dispatch({ appIsInited: true });
  }
}
