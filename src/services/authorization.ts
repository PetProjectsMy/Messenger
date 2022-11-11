import { AuthorizationAPI, ProfileAPI } from "api";
import { EnumAppRoutes } from "core/router";
import {
  APIResponseHasError,
  transformProfileChangeAPIResponseToAppUserData as transformProfileAPIResponse,
} from "utils/api";

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

      const requestProfileData = await ProfileAPI.getProfileData(
        requestUser.response.id
      );
      const userData = transformProfileAPIResponse(requestProfileData.response);
      window.store.dispatch({
        user: userData,
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
