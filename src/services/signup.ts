import { SignUpAPI } from "api";

export class SignUpServiceClass {
  async signup(data: TSignUpFormDTO) {
    const response = await SignUpAPI.signup(data);

    console.log(
      `SIGN-UP REQUEST:\nstatus ${response.status}; response: ${JSON.stringify(
        response.response
      )}`
    );

    return response.response;
  }
}

export const SignUpService = new SignUpServiceClass();
