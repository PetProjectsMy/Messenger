import { SignUpAPI } from "api";

export class SignUpService {
  async signup(data: SignUpFormDTO) {
    const response = await SignUpAPI.signup(data);
    return response;
  }
}
