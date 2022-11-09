import request from "./http-trasnport";

class ProfileAPIClass {
  changeData(data: TProfileChangeDTO) {
    return request.put("user/profile", { data });
  }
}

export const ProfileAPI = new ProfileAPIClass();
