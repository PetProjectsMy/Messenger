import { SignUpAPI } from "api";

export class SignUpServiceClass {
  async signup(data: SignUpFormDTO) {
    const apiResponse = await SignUpAPI.signup(data);
    const { status, response } = apiResponse;

    console.log(
      `SIGNUP REQUEST:\nstatus ${status}; response: ${JSON.stringify(response)}`
    );

    return response;
  }
}

export const SignUpService = new SignUpServiceClass();
