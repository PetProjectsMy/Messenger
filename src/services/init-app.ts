import { Store } from "core/store";
import { Router } from "core/router";
import { AuthorizationService } from "services";
import { afterAuthenticationHandler } from "services/authorization";

export async function initApp() {
  try {
    console.log(`INIT APP STATRTING`);

    const store = new Store();
    const router = new Router();
    window.router = router;
    window.store = store;
    router.init();
    store.init();

    await afterAuthenticationHandler.call(AuthorizationService);
  } catch (err) {
    console.error(err);
  } finally {
    window.store.dispatch({ appIsInited: true });
    console.log(`INIT APP COMPLETED`);
  }
}
