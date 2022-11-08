import { SignUpAPI } from "api";

export class SignUpServiceClass {
  async signup(data: SignUpFormDTO) {
    const response = await SignUpAPI.signup(data);
    return response;
  }
}

export const SignUpService = new SignUpServiceClass();
