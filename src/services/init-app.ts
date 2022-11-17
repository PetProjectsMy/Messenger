import { Store } from "core/store";
import { PathRouter } from "core/router";
import { AuthorizationService } from "services";
import { afterAuthorizationHandler } from "services/authorization";

export async function initApp() {
  console.log(`INIT APP STATRTING`);

  const store = new Store();
  const router = new PathRouter();
  window.router = router;
  window.store = store;
  router.init();
  store.init();

  await afterAuthorizationHandler.call(AuthorizationService);

  const { route, path } = router.matchRouteByPath(window.location.pathname);
  router.start(route, path);

  console.log(`INIT APP COMPLETED`);
}
