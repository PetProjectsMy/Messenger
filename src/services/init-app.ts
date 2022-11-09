import { AuthorizationAPI } from "api";
import { Store } from "core/store";
import { Router } from "core/router";
import { APIResponseHasError } from "utils/api";

export async function initApp() {
  try {
    const store = new Store<TAppState>();
    const router = new Router();
    window.router = router;
    window.store = store;
    router.init();
    store.init();

    const { response } = await AuthorizationAPI.me();
    if (APIResponseHasError(response)) {
      return;
    }
    store.dispatch({ user: response });
  } catch (err) {
    console.error(err);
  } finally {
    window.store.dispatch({ appIsInited: true });
  }
}
