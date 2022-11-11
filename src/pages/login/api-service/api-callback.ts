import { AuthorizationService } from "services";
import {
  transformLoginFormDatatoAPI as transformFormDatatoAPI,
  APIResponseHasError,
} from "utils/api";

function makeAPIRequest() {
  const formData = this.collectFormData();

  const apiData = transformFormDatatoAPI(formData);
  console.log(`API data: ${JSON.stringify(apiData)}`);
  return AuthorizationService.login(apiData);
}

function handleAPIResponse(response: any) {
  console.log(`LOGIN REQUEST RESPONSE: ${JSON.stringify(response)}`);
  if (APIResponseHasError(response)) {
    this.state.apiResponseError = response.reason;
  }
}

export async function afterValidationCallback() {
  const response = await makeAPIRequest.call(this);
  handleAPIResponse.call(this, response);
}
