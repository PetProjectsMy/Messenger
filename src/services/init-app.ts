import { AuthorizationAPI, ProfileAPI } from "api";
import { Store } from "core/store";
import { Router } from "core/router";
import {
  APIResponseHasError,
  transformProfileChangeResponseToUserData as transformToUserData,
} from "utils/api";

export async function initApp() {
  try {
    const store = new Store();
    const router = new Router();
    window.router = router;
    window.store = store;
    router.init();
    store.init();

    const requestUser = await AuthorizationAPI.me();
    console.log(
      `REQUEST USER ON INIT APP: status ${
        requestUser.status
      }; response ${JSON.stringify(requestUser.response)}`
    );
    if (APIResponseHasError(requestUser.response)) {
      return;
    }

    const requestGetProfile = await ProfileAPI.getProfileData(
      requestUser.response.id
    );
    console.log(
      `REQUEST PROFILE DATA ON INIT APP: status ${
        requestGetProfile.status
      }; response ${JSON.stringify(requestGetProfile.response)}`
    );

    const userData = transformToUserData(requestGetProfile.response);
    store.dispatch({ user: userData });
  } catch (err) {
    console.error(err);
  } finally {
    window.store.dispatch({ appIsInited: true });
  }
}
