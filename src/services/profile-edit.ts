import { ProfileAPI } from "api";

class ProfileEditServiceClass {
  async changeUserProfile(data: TProfileChangeDTO) {
    const response = await ProfileAPI.changeProfile(data);

    console.log(
      `PROFILE CHANGE REQUEST:\nstatus ${
        response.status
      }; response: ${JSON.stringify(response.response)}`
    );

    return response.response;
  }
}

export const ProfileEditService = new ProfileEditServiceClass();
