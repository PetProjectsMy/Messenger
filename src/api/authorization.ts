import request from "./http-trasnport";

type LoginRequestData = {
  login: string;
  password: string;
};

class AuthorizationAPIClass {
  login(data: LoginRequestData) {
    return request.post("auth/signin", { data });
  }

  me() {
    return request.get("auth/user");
  }

  logout() {
    return request.post("auth/logout");
  }
}

export const AuthorizationAPI = new AuthorizationAPIClass();
