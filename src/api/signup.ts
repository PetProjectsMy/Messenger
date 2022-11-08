import request from "./http-trasnport";

class SignUpAPIClass {
  signup(data: SignUpFormDTO) {
    return request.post("/auth/signup", data);
  }
}

export const SignUpAPI = new SignUpAPIClass();
