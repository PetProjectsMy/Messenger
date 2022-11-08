import { authAPI } from "api/auth";
import { EnumAppRoutes } from "core/router";
import type { Dispatch } from "core/store";
import { transformUserData, APIResponseHasError } from "utils/api";

type LoginPayload = {
  login: string;
  password: string;
};

export const logout = async (dispatch: Dispatch<TAppState>) => {
  await authAPI.logout();

  dispatch({ user: null });

  window.router.go(EnumAppRoutes.Login);
};

export const login = async (
  dispatch: Dispatch<TAppState>,
  state: TAppState,
  action: LoginPayload
) => {
  const response = await authAPI.login(action);

  if (APIResponseHasError(response)) {
    dispatch({ loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ loginFormError: null });

  if (APIResponseHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUserData(responseUser as TUserDTO) });

  window.router.go(EnumAppRoutes.Profile);
};
