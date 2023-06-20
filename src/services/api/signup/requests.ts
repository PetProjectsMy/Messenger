import { request } from "utils/api";

class SignUpAPIClass {
  signup(data: TSignUpFormDTO) {
    return request.post("auth/signup", { data });
  }
}

export const SignUpAPI = new SignUpAPIClass();
