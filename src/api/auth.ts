import request from "./http-trasnport";

type LoginRequestData = {
  login: string;
  password: string;
};

export const authAPI = {
  login: (data: LoginRequestData) => request.post("auth/signin", data),

  me: () =>
    request.get("auth/user", { headers: { accept: "application/json" } }),

  logout: () => request.post("auth/logout"),
};
