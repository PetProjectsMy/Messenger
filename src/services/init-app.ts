import { authAPI } from "api/auth";
import { UserDTO } from "api/types";
import type { Dispatch } from "core/store";
import { Pages } from "pages/pages-list";
import { transformUserData, APIResponseHasError } from "utils/api";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    // const { response } = (await authAPI.me()) as any;
    const response = { reason: "error" };

    if (APIResponseHasError(response)) {
      dispatch({ page: Pages.Login });
      window.history.replaceState({}, "", "/login");
      return;
    }

    dispatch({ user: transformUserData(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
