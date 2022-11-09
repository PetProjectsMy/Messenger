import { ProfileAPI } from "api";

class ProfileEditServiceClass {
  changeUserProfile(data: TProfileChangeDTO) {
    ProfileAPI.changeProfile(data);
  }
}

export const ProfileEditService = new ProfileEditServiceClass();
