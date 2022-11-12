import { ProfileService } from "services";
import {
  transformProfileFormDatatoAPI as transformFormDatatoAPI,
  transformProfileAPIResponseToUserData as transformResponseToUserData,
  APIResponseHasError,
} from "utils/api";

function makeAPIRequest() {
  const formData = this.collectFormData();
  const apiData = transformFormDatatoAPI(formData);
  console.log(`API data: ${JSON.stringify(apiData)}`);
  return ProfileService.changeUserProfile(apiData);
}

function handleAPIResponse(response: any) {
  console.log(`PROFILE CHANGE REQUEST RESPONSE: ${JSON.stringify(response)}`);
  if (APIResponseHasError(response)) {
    this.state.apiResponseError = response.reason;
    return;
  }

  this.state.apiResponseSuccess = "Profile Data Updated Successfully";
  window.store.dispatch({ user: transformResponseToUserData(response) });
}

export async function afterValidationCallback() {
  const response = await makeAPIRequest.call(this);
  handleAPIResponse.call(this, response);
}
