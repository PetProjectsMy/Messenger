import { AuthorizationAPI } from "api";
import { ProfileService } from "services";
import { EnumAppRoutes } from "core/router";
import {
  APIResponseHasError,
  transformProfileAPIResponseToUserData,
} from "utils/api";

export const enum EnumLoginAPIErrors {
  AlreadyInSystem = "User already in system",
}

export const afterAuthentificationHandler = async function (userID: number) {
  const user = transformProfileAPIResponseToUserData(
    await ProfileService.getUserProfile(userID)
  );
  window.store.dispatch({ user });
};

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

    if (
      !APIResponseHasError(response) ||
      response.reason === EnumLoginAPIErrors.AlreadyInSystem
    ) {
      const userID = (await this.getUser()).id;
      afterAuthentificationHandler(userID);
      window.router.go(EnumAppRoutes.Chats);
    }

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
