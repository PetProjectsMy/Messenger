import { ProfileAPI } from "api";

class ProfileEditServiceClass {
  changeUserData(data: TProfileChangeDTO) {
    ProfileAPI.changeData(data);
  }
}

export const ProfileEditService = new ProfileEditServiceClass();
