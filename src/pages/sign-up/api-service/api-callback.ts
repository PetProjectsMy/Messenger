import { SignUpService } from "services";
import {
  transformSignUpFormDatatoAPI as transformFormDatatoAPI,
  APIResponseHasError,
} from "utils/api";

function makeAPIRequest() {
  const formData = this.collectFormData();
  // const formData = {
  //   first_name: "Rtu",
  //   second_name: "Rtu",
  //   login: "Rtu42",
  //   password: "Rtu42Rtu42",
  //   password_repeat: "Rtu42Rtu42",
  //   email: "Rtu42@mail.net",
  //   phone: "87778888777",
  // };

  const apiData = transformFormDatatoAPI(formData);
  console.log(`API data: ${JSON.stringify(apiData)}`);
  return SignUpService.signup(apiData);
}

function handleAPIResponse(apiResponse: any) {
  apiResponse.then((response: any) => {
    if (APIResponseHasError(response)) {
      this.state.apiResponseError = response.reason;
    } else {
      this.state.apiResponseSuccess = "Sign Up Successfull";
    }
    this._render();
  });
}

export async function afterValidationCallback() {
  const response = makeAPIRequest.call(this);
  handleAPIResponse.call(this, response);
}
