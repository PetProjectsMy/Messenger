import { AuthorizationService } from "services";
import { EnumLoginAPIErrors } from "services/authorization";
import { transformLoginFormDatatoAPI, APIResponseHasError } from "utils/api";

async function afterRequestCallback(response: any) {
  if (
    APIResponseHasError(response) &&
    response.reason !== EnumLoginAPIErrors.AlreadyInSystem
  ) {
    this.state.apiResponseError = response.reason;
  }
}

export async function afterValidationCallback() {
  const formData = this.collectFormData();
  const apiData = transformLoginFormDatatoAPI(formData);
  console.log(`API data: ${JSON.stringify(apiData)}`);

  await AuthorizationService.login(apiData, afterRequestCallback.bind(this));
}
