import { AuthorizationAPI } from "api";
import { EnumAppRoutes } from "core/router";
import { APIResponseHasError } from "utils/api";

class AuthorizationServiceClass {
  async getUser() {
    const response = await AuthorizationAPI.me();
    return response.response;
  }

  async login(data: TLoginFormDTO) {
    const response = await AuthorizationAPI.login(data);

    console.log(
      `LOGIN REQUEST:\nstatus ${response.status}; response ${JSON.stringify(
        response.response
      )}`
    );

    if (!APIResponseHasError(response)) {
      const responseUser = await AuthorizationAPI.me();
      console.log(
        `USER REQUEST:\nstatus ${
          responseUser.status
        }; response ${JSON.stringify(responseUser.response)}`
      );

      window.store.dispatch({
        user: responseUser,
      });
      window.router.go(EnumAppRoutes.Chats);
    }

    return response.response;
  }

  async logout() {
    await AuthorizationAPI.logout();
    window.store.dispatch({ user: null });
    window.router.go(EnumAppRoutes.Login);
  }
}

export const AuthorizationService = new AuthorizationServiceClass();
