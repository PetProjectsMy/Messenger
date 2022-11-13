import { AuthorizationAPI } from "api";
import { EnumAppRoutes } from "core/router";

class AuthorizationServiceClass {
  async getUser() {
    const request = await AuthorizationAPI.me();
    const { status, response } = request;

    console.log(
      `LOGIN REQUEST: status ${status}; response ${JSON.stringify(response)}`
    );

    return response;
  }

  async login(
    data: TLoginFormDTO,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    const requestLogin = await AuthorizationAPI.login(data);
    const { status, response } = requestLogin;

    console.log(
      `LOGIN REQUEST: status ${status}; response ${JSON.stringify(response)}`
    );

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }
  }

  async logout() {
    await AuthorizationAPI.logout();
    window.store.dispatch({ user: null });
    window.router.go(EnumAppRoutes.Login);
  }
}

export const AuthorizationService = new AuthorizationServiceClass();
