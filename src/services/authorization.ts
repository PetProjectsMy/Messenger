import { AuthorizationAPI } from "api";

import { EnumAppRoutes } from "core/router";
import { APIResponseHasError } from "utils/api";
import { initAppData } from "services/init-app/init-app-data";

export const enum EnumLoginAPIErrors {
  AlreadyInSystem = "User already in system",
}

class AuthorizationServiceClass {
  async getUser() {
    let response;
    let status;

    try {
      const request = await AuthorizationAPI.me();
      status = request.status;
      response = request.response;

      console.log(
        `GET USER REQUEST: status ${status}; response ${JSON.stringify(
          response
        )}`
      );
    } catch (error) {
      console.error(`GET USER REQUEST ERROR: ${error}`);
      throw error;
    }

    return response;
  }

  async login(
    data: TLoginFormDTO,
    afterRequestCallback: TAfterRequestCallback = () => {}
  ) {
    let response;
    let status;

    try {
      const requestLogin = await AuthorizationAPI.login(data);
      status = requestLogin.status;
      response = requestLogin.response;

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
    } catch (error) {
      console.error(`LOGIN REQUEST ERROR: ${error}`);
      throw error;
    }

    return response;
  }

  async logout() {
    let response;
    let status;

    try {
      const request = await AuthorizationAPI.logout();
      status = request.status;
      response = request.response;

      console.log(
        `LOGIN LOGOUT: status ${status}; response ${JSON.stringify(response)}`
      );

      window.store.dispatch({ user: null });
      window.store.dispatch({ currentChatID: null });
      window.router.go(EnumAppRoutes.Login);
    } catch (error) {
      console.error(`LOGOUT REQUEST ERROR: ${error}`);
      throw error;
    }

    return response;
  }
}

export const AuthorizationService = new AuthorizationServiceClass();
