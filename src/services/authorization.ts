import { AuthorizationAPI } from "api/authorization";
import { EnumAppRoutes } from "core/router";
import { transformUserData, APIResponseHasError } from "utils/api";

type LoginFormData = {
  login: string;
  password: string;
};

class AuthorizationServiceClass {
  async login(data: LoginFormData) {
    const apiResponse = await AuthorizationAPI.login(data);
    const { status, response } = apiResponse;

    console.log(
      `LOGIN REQUEST:\nstatus ${status}; response ${JSON.stringify(response)}`
    );

    if (!APIResponseHasError(response)) {
      const responseUser = await AuthorizationAPI.me();
      window.store.dispatch({
        user: transformUserData(responseUser as TUserDTO),
      });
      window.router.go(EnumAppRoutes.Profile);
    }

    return response;
  }

  async logout() {
    await AuthorizationAPI.logout();
    window.store.dispatch({ user: null });
    window.router.go(EnumAppRoutes.Login);
  }
}

export const AuthorizationService = new AuthorizationServiceClass();
