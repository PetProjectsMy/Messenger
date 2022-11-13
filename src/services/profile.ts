import { ProfileAPI } from "api";

class ProfileServiceClass {
  async getUserProfile(userID: number) {
    const request = await ProfileAPI.getProfileData(userID);
    const { status, response } = request;

    console.log(
      `PROFILE GET ID(${userID})REQUEST: status ${status}; response: ${JSON.stringify(
        response
      )}`
    );

    return response;
  }

  async changeUserProfile(
    data: TProfileChangeDTO,
    afterRequestCallback: TAfterRequestCallback
  ) {
    const request = await ProfileAPI.changeProfile(data);
    const { status, response } = request;

    console.log(
      `PROFILE CHANGE REQUEST: status ${status}; response: ${JSON.stringify(
        response
      )}`
    );

    afterRequestCallback(response);
    return response;
  }

  async changeUserAvatar(
    avatarFormData: FormData,
    afterRequestCallback: TAfterRequestCallback
  ) {
    const request = await ProfileAPI.changeAvatar(avatarFormData);
    const { status, response } = request;

    console.log(
      `PROFILE CHANGE AVATAR REQUEST: status ${status}; response: ${JSON.stringify(
        response
      )}`
    );

    afterRequestCallback(response);
    return response;
  }
}

export const ProfileService = new ProfileServiceClass();
