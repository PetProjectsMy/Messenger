import { SignUpAPI } from "api";

export class SignUpServiceClass {
  async signup(
    data: TSignUpFormDTO,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    let status;
    let response;

    try {
      const request = await SignUpAPI.signup(data);
      status = request.status;
      response = request.response;

      console.log(
        `SIGN UP REQUEST: status ${status}; response: ${JSON.stringify(
          response
        )}`
      );

      if (afterRequestCallback) {
        await afterRequestCallback(response);
      }
    } catch (error) {
      console.error(`SIGN UP REQUEST ERROR: ${error}`);
      throw error;
    }

    return response;
  }
}

export const SignUpService = new SignUpServiceClass();
