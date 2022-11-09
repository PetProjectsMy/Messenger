import request from "./http-trasnport";

class ProfileAPIClass {
  changeProfile(data: TProfileChangeDTO) {
    return request.put("user/profile", { data });
  }
}

export const ProfileAPI = new ProfileAPIClass();
