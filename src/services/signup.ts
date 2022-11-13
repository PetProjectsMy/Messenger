import { SignUpAPI } from "api";

export class SignUpServiceClass {
  async signup(
    data: TSignUpFormDTO,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    const request = await SignUpAPI.signup(data);
    const { status, response } = request;

    console.log(
      `SIGN-UP REQUEST: status ${status}; response: ${JSON.stringify(response)}`
    );

    if (afterRequestCallback) {
      await afterRequestCallback(response);
    }
  }
}

export const SignUpService = new SignUpServiceClass();
