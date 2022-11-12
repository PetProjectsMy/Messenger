import request from "./http-trasnport";

class ProfileAPIClass {
  changeProfile(data: TProfileChangeDTO) {
    return request.put("user/profile", { data });
  }

  changeAvatar(data: FormData) {
    return request.put("user/profile/avatar", {
      headers: { "Content-Type": "multipart/form-data" },
      data,
    });
  }

  getProfileData(userID: number) {
    return request.get(`user/${userID}`);
  }
}

export const ProfileAPI = new ProfileAPIClass();
