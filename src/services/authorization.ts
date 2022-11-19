import { AuthorizationAPI } from "api";

import { EnumAppRoutes } from "core/router";
import { APIResponseHasError } from "utils/api";
import { initAppData } from "services/init-app";

export const enum EnumLoginAPIErrors {
  AlreadyInSystem = "User already in system",
}

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
    afterRequestCallback: TAfterRequestCallback = () => {}
  ) {
    const requestLogin = await AuthorizationAPI.login(data);
    const { status, response } = requestLogin;

    console.log(
      `LOGIN REQUEST: status ${status}; response ${JSON.stringify(response)}`
    );

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }

    if (
      !APIResponseHasError(response) ||
      response.reason === EnumLoginAPIErrors.AlreadyInSystem
    ) {
      const userResponse = await this.getUser();
      if (!APIResponseHasError(userResponse)) {
        await initAppData(userResponse.id);
      } else {
        throw new Error(
          `Unexpecter User Response After Login: ${userResponse.reason}`
        );
      }
      window.router.go(EnumAppRoutes.Chats);
    }

    return response;
  }

  async logout() {
    await AuthorizationAPI.logout();
    window.store.dispatch({ user: null });
    window.store.dispatch({ currentChatID: null });
    window.router.go(EnumAppRoutes.Login);
  }
}

export const AuthorizationService = new AuthorizationServiceClass();
