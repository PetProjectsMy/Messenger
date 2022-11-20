import { ProfileService } from "services";
import {
  transformProfileFormDatatoAPI,
  transformProfileAPIResponseToUserData,
  APIResponseHasError,
} from "utils/api";

function afterRequestCallback(response: any) {
  if (APIResponseHasError(response)) {
    this.state.apiResponseError = response.reason;
    return;
  }

  window.store.dispatch({
    user: transformProfileAPIResponseToUserData(response),
  });
  this.state.apiResponseSuccess = "Profile Data Updated Successfully";
}

export async function afterValidationCallback() {
  const formData = this.collectFormData();
  const apiData = transformProfileFormDatatoAPI(formData);
  console.log(`API data: ${JSON.stringify(apiData)}`);
  await ProfileService.changeUserProfile(
    apiData,
    afterRequestCallback.bind(this)
  );
}
