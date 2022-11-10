import request from "./http-trasnport";

class ProfileAPIClass {
  changeProfile(data: TProfileChangeDTO) {
    return request.put("user/profile", { data });
  }

  getProfileData(userID: number) {
    return request.get(`user/${userID}`);
  }
}

export const ProfileAPI = new ProfileAPIClass();
