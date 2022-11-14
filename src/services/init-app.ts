import { Store } from "core/store";
import { Router } from "core/router";
import {
  APIResponseHasError,
  transformProfileAPIResponseToUserData,
} from "utils/api";
import { AuthorizationService, ProfileService } from "services";
import { afterAuthentificationHandler } from "services/authorization";

export async function initApp() {
  try {
    const store = new Store();
    const router = new Router();
    window.router = router;
    window.store = store;
    router.init();
    store.init();

    console.log(`INIT APP STATRTING`);
    const responseUser = await AuthorizationService.getUser();
    if (APIResponseHasError(responseUser)) {
      return;
    }

    await afterAuthentificationHandler(responseUser.id);
  } catch (err) {
    console.error(err);
  } finally {
    window.store.dispatch({ appIsInited: true });
    console.log(`INIT APP COMPLETED`);
  }
}
