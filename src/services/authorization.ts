import { AuthorizationAPI } from "api";
import { EnumAppRoutes } from "core/router";
import { APIResponseHasError } from "utils/api";

class AuthorizationServiceClass {
  async getUser() {
    const response = await AuthorizationAPI.me();
    return response.response;
  }

  async login(data: TLoginFormDTO) {
    const requestLogin = await AuthorizationAPI.login(data);

    console.log(
      `LOGIN REQUEST:\nstatus ${requestLogin.status}; response ${JSON.stringify(
        requestLogin.response
      )}`
    );

    if (!APIResponseHasError(requestLogin.response)) {
      const requestUser = await AuthorizationAPI.me();
      console.log(
        `USER REQUEST:\nstatus ${requestUser.status}; response ${JSON.stringify(
          requestUser.response
        )}`
      );

      window.store.dispatch({
        user: requestUser.response,
      });
      window.router.go(EnumAppRoutes.Chats);
    }

    return requestLogin.response;
  }

  async logout() {
    await AuthorizationAPI.logout();
    window.store.dispatch({ user: null });
    window.router.go(EnumAppRoutes.Login);
  }
}

export const AuthorizationService = new AuthorizationServiceClass();
