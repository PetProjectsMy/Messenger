import { SignUpService } from "services";
import { ProfileAPI } from "api";
import {
  transformSignUpFormDatatoAPI,
  transformProfileChangeAPIResponseToAppUserData,
  APIResponseHasError,
} from "utils/api";

function makeAPIRequest() {
  const formData = this.collectFormData();

  const apiData = transformSignUpFormDatatoAPI(formData);
  console.log(`API data: ${JSON.stringify(apiData)}`);
  return SignUpService.signup(apiData);
}

async function handleAPIResponse(response: any) {
  console.log(`SIGN-UP REQUEST RESPONSE: ${JSON.stringify(response)}`);
  if (APIResponseHasError(response)) {
    this.state.apiResponseError = response.reason;
  } else {
    this.state.apiResponseSuccess = "Sign Up Successfull";

    const userID = response.id;
    const userData = (await ProfileAPI.getProfileData(userID)).response;
    window.store.dispatch({
      user: transformProfileChangeAPIResponseToAppUserData(userData),
    });
  }
}

export async function afterValidationCallback() {
  const response = await makeAPIRequest.call(this);
  await handleAPIResponse.call(this, response);
}
