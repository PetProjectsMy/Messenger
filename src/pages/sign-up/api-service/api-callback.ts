import { SignUpService } from "services";
import {
  transformSignUpFormDatatoAPI as transformFormDatatoAPI,
  APIResponseHasError,
} from "utils/api";

function makeAPIRequest() {
  const formData = this.collectFormData();

  const apiData = transformFormDatatoAPI(formData);
  console.log(`API data: ${JSON.stringify(apiData)}`);
  return SignUpService.signup(apiData);
}

function handleAPIResponse(response: any) {
  console.log(`SIGN-UP REQUEST RESPONSE: ${JSON.stringify(response)}`);
  if (APIResponseHasError(response)) {
    this.state.apiResponseError = response.reason;
  } else {
    this.state.apiResponseSuccess = "Sign Up Successfull";
  }
  this._render();
}

export async function afterValidationCallback() {
  const response = await makeAPIRequest.call(this);
  handleAPIResponse.call(this, response);
}
