import { AuthorizationService, ProfileService } from "services";
import {
  transformLoginFormDatatoAPI,
  APIResponseHasError,
  transformProfileAPIResponseToUserData,
} from "utils/api";
import { EnumAppRoutes } from "core/router";

async function afterRequestCallback(response: any) {
  const userAlreadyInSystemError = "User already in system";

  if (
    APIResponseHasError(response) &&
    response.reason !== userAlreadyInSystemError
  ) {
    this.state.apiResponseError = response.reason;
    return;
  }

  if (
    !APIResponseHasError(response) ||
    response.reason === "User already in system"
  ) {
    const userID = (await AuthorizationService.getUser()).id;
    const userData = transformProfileAPIResponseToUserData(
      await ProfileService.getUserProfile(userID)
    );

    window.store.dispatch({
      user: userData,
    });
    window.router.go(EnumAppRoutes.Chats);
  }
}

export async function afterValidationCallback() {
  const formData = this.collectFormData();
  const apiData = transformLoginFormDatatoAPI(formData);
  console.log(`API data: ${JSON.stringify(apiData)}`);

  await AuthorizationService.login(apiData, afterRequestCallback.bind(this));
}
