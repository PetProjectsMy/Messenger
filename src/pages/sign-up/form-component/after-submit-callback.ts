import { ProfileService } from "services/api/profile";
import { SignUpService } from "services/api/signup";
import {
  APIResponseHasError,
  transformProfileAPIResponseToUserData,
  transformSignUpFormDataToAPI,
} from "utils/api";

async function afterRequestCallback(response: any) {
  console.log(`SIGN-UP REQUEST RESPONSE: ${JSON.stringify(response)}`);
  if (APIResponseHasError(response)) {
    this.state.apiResponseError = response.reason;
    return;
  }

  this.state.apiResponseSuccess = "Sign Up Successful";
  const user = transformProfileAPIResponseToUserData(
    await ProfileService.getUserProfile(response.id)
  );
  window.store.dispatch({ user });
}

export async function afterSubmitCallback() {
  const formData = this.collectFormData();
  const apiData = transformSignUpFormDataToAPI(formData);
  console.log(`API data: ${JSON.stringify(apiData)}`);

  SignUpService.signup(apiData, afterRequestCallback.bind(this));
}
