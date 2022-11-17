import { AuthorizationAPI } from "api";
import { ProfileService, ChatsService, SocketsCreator } from "services";
import { EnumAppRoutes } from "core/router";
import { APIResponseHasError } from "utils/api";

export const enum EnumLoginAPIErrors {
  AlreadyInSystem = "User already in system",
}

export const afterAuthorizationHandler = async function (
  authorizationFailedCallback: TAfterRequestCallback = () => {}
) {
  const userResponse = await this.getUser();
  if (APIResponseHasError(userResponse)) {
    await authorizationFailedCallback(userResponse);
    return;
  }

  await ProfileService.getUserProfile(userResponse.id);
  await ChatsService.getChats();

  const { currentChatID } = localStorage;
  window.store.dispatch({ currentChatID });

  await SocketsCreator.createAllChatsSockets();
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
      await afterAuthorizationHandler.call(this, (userResponse) => {
        throw new Error(
          `Unexpecter User Response After Login: ${userResponse.reason}`
        );
      });
      window.router.go(EnumAppRoutes.Chats);
    }

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }
  }

  async logout() {
    await AuthorizationAPI.logout();
    window.store.dispatch({ user: null });
    window.store.dispatch({ currentChatID: null });
    window.router.go(EnumAppRoutes.Login);
  }
}

export const AuthorizationService = new AuthorizationServiceClass();
